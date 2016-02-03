// Tracking code for Kissmetrics
var _kmq = _kmq || []
var _kmk = _kmk || 'aa23cd43c455ef33b6a0df3de81a79af9ea30f75'
function _kms(u){
  setTimeout(function(){
    var d = document
    var f = d.getElementsByTagName('script')[0]
    var s = d.createElement('script')
    s.type = 'text/javascript'
    s.async = true
    s.src = u
    f.parentNode.insertBefore(s, f)
  }, 1)
}

_kms('//i.kissmetrics.com/i.js')
_kms('//scripts.kissmetrics.com/' + _kmk + '.2.js')
