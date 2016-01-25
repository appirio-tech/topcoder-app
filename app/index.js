require('angular')
require('angular-ui-router')

// require './topcoder.module'
// require './topcoder.constants'
// require './topcoder.interceptors'
// require './topcoder.controller'
// require './topcoder.routes'

const requireContextFiles = function(files) {
  const paths = files.keys()

  return paths.map((path) => {
    return files(path)
  })
}

// Require all SCSS files
requireContextFiles(require.context('../assets/css/', true, /^(.*\.(scss$))[^.]*$/igm))

// Require all JS files that aren't tests
requireContextFiles(require.context('./', true, /^(?:(?!\.spec\.js$).)*\.js$/igm))
