/*!
 * (c) 2017, Raphael Marco
 */

'use strict'

import Vue from 'vue'
import Buefy from 'buefy'
import axios from 'axios'

import io from 'adonis-websocket-client'
import qs from 'qs'

import methods from './methods.js'

require('./array-find-polyfill')
require('./array-findindex-polyfill')

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

    if ('categories' in window && window.categories) {
      this.categories = categories
    }

    if ('candidates' in window && window.candidates) {
      this.candidates = candidates
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

      categories: [],
      candidates: [],

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
})

app.$client.on('candidates', data => {
  app.candidates = data
})

app.$client.on('candidate.voted', id => {
  let index = app.candidates.findIndex(candidate => candidate.id == id)

  if (index > -1) {
    app.candidates[index].votes++
  }
})

let pageSelector = document.getElementById('page-selector')

if (pageSelector) {
  let query = location.search.substr(1),
      params = qs.parse(query)

  pageSelector.addEventListener('change', e => {
    params.page = e.target.value

    query = qs.stringify(params)

    window.location = `${location.pathname}?${query}`
  }, false)
}
