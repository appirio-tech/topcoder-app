module.exports = function() {
  var constants = {
    'development': {
      'CONSTANTS': {
        ENVIRONMENT: process.env.ENVIRONMENT || 'development',
        API_URL: process.env.API_URL || 'https://api.topcoder-dev.com/v3',
        API_URL_V2: process.env.API_URL_V2 || 'https://api.topcoder-dev.com/v2',
        clientId: process.env.clientId || 'JFDo7HMkf0q2CkVFHojy3zHWafziprhT',
        domain: process.env.domain || 'topcoder-dev.com',
        auth0Domain: process.env.auth0Domain || 'topcoder-dev.auth0.com',
        // auth0Callback: process.env.auth0Callback || 'https://www.topcoder-dev.com/reg2/callback.action',
        auth0Callback: process.env.auth0Callback || 'https://api.topcoder-dev.com/pub/callback.html',
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
        ASSET_PREFIX: process.env.ASSET_PREFIX || '',

        // EVENTS
        EVENT_USER_LOGGED_IN: 'user_logged_in',
        EVENT_USER_LOGGED_OUT: 'user_logged_out',

        STATE_LOADING: 'loading',
        STATE_ERROR: 'error',
        STATE_READY: 'ready'

      }
    },
    'production': {
      'CONSTANTS': {
        ENVIRONMENT: process.env.ENVIRONMENT || 'production',
        API_URL: process.env.API_URL || 'https://api.topcoder.com/v3',
        API_URL_V2: process.env.API_URL_V2 || 'https://api.topcoder.com/v2',
        clientId: process.env.clientId || 'JFDo7HMkf0q2CkVFHojy3zHWafziprhT',
        domain: process.env.domain || 'topcoder.com',
        auth0Domain: process.env.auth0Domain || 'topcoder.auth0.com',
        // auth0Callback: process.env.auth0Callback || 'https://www.topcoder.com/reg2/callback.action',
        auth0Callback: process.env.auth0Callback || 'https://api.topcoder.com/pub/callback.html',
        submissionDownloadPath: '/review/actions/DownloadContestSubmission?uid=',
        COMMUNITY_URL: '//community.topcoder.com',
        PHOTO_LINK_LOCATION: 'https://community.topcoder.com',
        MAIN_URL: 'https://www.topcoder.com',
        FORUMS_APP_URL: 'forums.topcoder.com',
        HELP_APP_URL: 'help.topcoder.com',
        SWIFT_PROGRAM_ID: 3445,
        SWIFT_PROGRAM_URL: 'apple.topcoder.com',
        BLOG_LOCATION: 'https://www.topcoder.com/feed/?post_type=blog',
        UPCOMING_SRMS_URL: 'https://www.topcoder.com/challenges/data/upcoming/',
        NEW_CHALLENGES_URL: 'https://www.topcoder.com/challenges/develop/upcoming/',
        ASSET_PREFIX: process.env.ASSET_PREFIX || 'https://s3.amazonaws.com/app.topcoder-dev.com',

        // EVENTS
        EVENT_USER_LOGGED_IN: 'user_logged_in',
        EVENT_USER_LOGGED_OUT: 'user_logged_out',

        STATE_LOADING: 'loading',
        STATE_ERROR: 'error',
        STATE_READY: 'ready'

      }
    }
  };

  return constants;
};
