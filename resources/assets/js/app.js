/*!
 * (c) 2017, Raphael Marco
 */

'use strict'

import Vue from 'vue'
import Buefy from 'buefy'
import axios from 'axios'

import io from 'adonis-websocket-client'

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

Vue.use(Ws, window.location.origin, {})

let app = new Vue({
  el: '#app',

  mounted: function () {
    if ('user' in window && window.user) {
      this.ui.modal.showLoginPrompt = false
      this.user = user
    }
  },

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

app.$client = app.$io.channel('result')

app.$client.connect((error, connected) => {
  if (error) {
    this.$toast.open('Cannot connect to server. Please try again', {
      type: 'is-danger',
      duration: 5000
    })

    return
  }

  if (connected) {
    app.$client.emit('update')
  }
})

app.$client.on('data', data => {
  app.entries = data
})

app.$client.on('candidate.inc', data => {
  let catId = data.category_id,
      canId = data.candidate_id

  app.entries[catId].candidates[canId].votes++
})
