/*!
 * (c) 2017, Raphael Marco
 */

'use strict'

import axios from 'axios'

export default {

    toggleSideBar: function () {
      this.ui.nav.sideBarActive = !this.ui.nav.sideBarActive
    },

    closeOverlays: function () {
      this.ui.nav.sideBarActive = false
    },

    previewImage: function (e) {
      const input = e.target

      if (input.files && input.files[0]) {
        let reader = new FileReader()

        reader.onload = e => {
          this.form.image = e.target.result
        }

        reader.readAsDataURL(input.files[0])
      }
    },

    fbLoginFromModal: function () {
      this.ui.modal.showLoginPrompt = false

      this.fbLogin()
    },

    fbLogin: function () {
      this.ui.button.fbLoginDisabled = true

      FB.login(response => {
        if (response.status !== 'connected') {
          this.$dialog.alert('Cannot login with Facebook. Please try again.', {
            type: 'is-danger'
          })

          this.ui.button.fbLoginDisabled = false

          return
        }

        this.fbPostLogin(response)
      })
    },

    fbPostLogin: function (response) {
      axios
      .post('/auth/login', { access_token: response.authResponse.accessToken })
      .then(response => {
        this.ui.button.fbLoginDisabled = false

        if ('error' in response.data) {
          this.$dialog.alert(response.data.error.message, {
            type: 'is-danger'
          })

          return
        }

        this.user = response.data.user
      })
    }

}
