/*!
 * (c) 2017, Raphael Marco
 */

'use strict'

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
    }

}
