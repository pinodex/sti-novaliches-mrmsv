/*!
 * (c) 2017, Raphael Marco
 */

'use strict'

import Vue from 'vue'
import Buefy from 'buefy'
import axios from 'axios'

import io from 'adonis-websocket-client'
import objectFitImages from 'object-fit-images'

import methods from './methods.js'

const csrfMetaElement = document.querySelector('meta[name="csrf-token"]')

if (csrfMetaElement) {
  axios.defaults.headers.common['X-CSRF-TOKEN'] = csrfMetaElement.getAttribute('value')
}

const Ws = (Vue, url, options) => {
  Vue.prototype.$io = io(url, options)
}

Vue.directive('focus', {
  inserted: (el) => {
    el.focus()
  }
})

Vue.use(Buefy, {
  defaultIconPack: 'fa'
})

Vue.use(Ws, SOCKET_URL, {})

let app = new Vue({
  el: '#app',

  data: function () {
    return {
      ui: {
        nav: {
          sideBarActive: false
        },

        modal: {
          showLoginPrompt: true
        },

        button: {
          fbLoginDisabled: false
        }
      },

      user: null,

      entries: [],

      form: {
        disabled: false,
        errors: false,
        image: null
      }
    }
  },

  methods
})

let client = app.$io.channel('result')

client.connect((error, connected) => {
  if (error) {
    this.$toast.open('Cannot connect to server. Please try again', {
      type: 'is-danger',
      duration: 5000
    })

    return
  }

  if (connected) {
    client.emit('update')
  }
})

client.on('data', data => {
  app.entries = data
})

objectFitImages('video.video-background')
