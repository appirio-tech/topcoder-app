(function() {
  'use strict';

  angular.module('topcoder').constant('CONSTANTS', {
    name: 'development',
    API_URL: 'https://api.topcoder-dev.com/v3',
    API_URL_V2: 'https://api.topcoder-dev.com/v2',
    clientId: 'JFDo7HMkf0q2CkVFHojy3zHWafziprhT',
    domain: 'topcoder-dev.com',
    auth0Domain: 'topcoder-dev.auth0.com',
    auth0Callback: 'https://www.topcoder-dev.com/reg2/callback.action',
    submissionDownloadPath: '/review/actions/DownloadContestSubmission?uid=',



    // EVENTS
    EVENT_USER_LOGGED_IN: 'user_logged_in',
    EVENT_USER_LOGGED_OUT: 'user_logged_out'

  });
})();
