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

  findCandidate (id) {
    return this.candidates.find(candidate => candidate.id == id)
  },

  vote: function (candidateId) {
    let candidate = this.findCandidate(candidateId)

    this.$dialog.confirm({
      title: 'Confirm Vote',
      message: `Confirm vote to ${candidate.name}?`,
      onConfirm: () => {
        axios.post('/vote', { candidate_id: candidate.id })
        .then(response => {
          this.user.categories.push(candidate.category_id)
          this.user.candidates.push(candidate.id)

          this.$toast.open({
            message: `Your vote to ${candidate.name} has been submitted!`,
            type: 'is-success'
          })
        })
        .catch(error => {
          if (!error.response) {
            return
          }

          if ('error' in error.response.data) {
            this.$dialog.alert({
              title: 'Error',
              message: error.response.data.error.message,
              type: 'is-danger'
            })

            return
          }
        })
      }
    })
  },

  isVoted: function (candidateId) {
    if (this.user == null) {
      return false
    }

    return this.user.candidates.indexOf(candidateId) > -1
  },

  isCategoryTaken: function (categoryId) {
    if (this.user == null) {
      return true
    }

    return this.user.categories.indexOf(categoryId) > -1
  },

  fbLoginFromModal: function () {
    this.ui.modal.showLoginPrompt = false

    this.fbLogin()
  },

  fbLogin: function () {
    this.ui.button.fbLoginDisabled = true

    FB.login(response => {
      if (response.status !== 'connected') {
        this.$dialog.alert({
          title: 'Error',
          message: 'Cannot login with Facebook. Please try again.',
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
        this.$dialog.alert({
          title: 'Error',
          message: response.data.error.message,
          type: 'is-danger'
        })

        return
      }

      this.user = response.data.user
    })
  },

  logout: function (el) {
    this.$dialog.confirm({
      title: 'Logout',
      message: 'Are you sure you want to logout?',
      onConfirm: () => {
        axios.get('/auth/logout').then(response => {
          this.user = null
        })
      }
    })
  }

}
