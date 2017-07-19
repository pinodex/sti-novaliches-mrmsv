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

}
