(function() {
  'use strict';

  angular.module('topcoder').constant('CONSTANTS', {
    name: 'development',
    API_URL: 'https://api.topcoder-dev.com/v3',
    API_URL_V2: 'https://api.topcoder-dev.com/v2',
    clientId: 'JFDo7HMkf0q2CkVFHojy3zHWafziprhT',
    domain: 'topcoder-dev.com',
    auth0Domain: 'topcoder-dev.auth0.com',
    // auth0Callback: 'https://www.topcoder-dev.com/reg2/callback.action',
    auth0Callback: 'https://api.topcoder-dev.com/pub/callback.html',
    submissionDownloadPath: '/review/actions/DownloadContestSubmission?uid=',
    COMMUNITY_URL: '//community.topcoder-dev.com',
    PHOTO_LINK_LOCATION: 'https://community.topcoder-dev.com',
    MAIN_URL: 'https://www.topcoder-dev.com',
    FORUMS_APP_URL: 'forums.topcoder-dev.com',
    HELP_APP_URL: 'help.topcoder-dev.com',
    SWIFT_PROGRAM_ID: 3445,
    SWIFT_PROGRAM_URL: 'apple.topcoder-dev.com',
    BLOG_LOCATION: 'https://www.topcoder-dev.com/feed/?post_type=blog',
    UPCOMING_SRMS_URL: 'https://www.topcoder.com/challenges/data/upcoming/',
    NEW_CHALLENGES_URL: 'https://www.topcoder.com/challenges/develop/upcoming/',



    // EVENTS
    EVENT_USER_LOGGED_IN: 'user_logged_in',
    EVENT_USER_LOGGED_OUT: 'user_logged_out'

  });
})();
