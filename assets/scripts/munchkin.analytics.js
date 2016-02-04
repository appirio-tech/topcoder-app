// tracking code for Marketo
(function() {
  var didInit = false
  function initMunchkin() {
    if(didInit === false) {
      didInit = true
      /*eslint no-undef:0 */
      Munchkin.init('921-UOU-112', {'wsInfo':'jFRS'})
    }
  }
  var s = document.createElement('script')
  s.type = 'text/javascript'
  s.async = true
  s.src = '//munchkin.marketo.net/munchkin.js'
  s.onreadystatechange = function() {
    if (this.readyState == 'complete' || this.readyState == 'loaded') {
      initMunchkin()
    }
  }
  s.onload = initMunchkin
  document.getElementsByTagName('head')[0].appendChild(s)
})()
