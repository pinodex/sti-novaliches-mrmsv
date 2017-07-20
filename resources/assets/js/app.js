/*!
 * (c) 2017, Raphael Marco
 */

'use strict'

import Vue from 'vue'

import methods from './methods.js'

Vue.directive('focus', {
    inserted: (el) => {
        el.focus()
    }
})

let app = new Vue({
    el: '#app',

    data: function () {
        return {
            ui: {
                nav: {
                    sideBarActive: false
                }
            },

            modal: {
                helpModal: false
            },

            form: {
                disabled: false,
                errors: false,
                image: null
            }
        }
    },

    methods
})
