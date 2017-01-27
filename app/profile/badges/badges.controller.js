import angular from 'angular'
import moment from 'moment-timezone'

(function () {
  'use strict'

  angular.module('tc.profile').controller('BadgesController', BadgeCtrl)

  BadgeCtrl.$inject = ['$scope', 'CONSTANTS', 'ProfileService', 'UserService', 'userHandle', 'profile']

  // The controller for badges section of member-profile page.
  function BadgeCtrl($scope, CONSTANTS, ProfileService, UserService, userHandle, profile) {
    $scope.achievements = profile.badges.Achievements
    var badgeCtrl = this

    // Use logged in user's handle for showing badges if not injected into the controller
    badgeCtrl.userHandle = userHandle ? userHandle : UserService.getUserIdentity().username
    badgeCtrl.init($scope)
    badgeCtrl.mapBadges()
    badgeCtrl.profile = profile
    badgeCtrl.dealWithBadgeData($scope, ProfileService)
  }

  // Deal with badge data when we have the user profile ready.
  BadgeCtrl.prototype.dealWithBadgeData = function($scope, ProfileService){
    var badgeCtrl = this
    // The service method getUser( handle )  already contains achievements information.
    // So we don't need another more service method here.

    // Some data is not available, so lets exclude them.
    // var excluded_badgesID = [1,6, 11, 16, 21, 52, 1000, 1001, 1002, 1003, 1004, 1005, 1006]

    if ($scope.achievements) {
      angular.forEach($scope.achievements, function(achievement){
        var desc = achievement.description
        // Fix Studio Badges
        if(badgeCtrl.map[achievement.description] === undefined && desc.indexOf('Studio ') === 0) {
          desc = desc.substring(7)
        }
        // Fix Studio bad badge name
        if(desc === 'Fifty Milestone Prize' || desc === 'One Hundred Milestone Prize' || desc === 'Two Hundred And Fifty Milestone Prize') {
          desc = desc + 's'
        }
        if(desc.indexOf('Designer of the Month') !== -1) {
          desc = 'Designer of the Month'
        }
        if(desc.indexOf('Member of the Month') !== -1) {
          desc = 'Member of the Month'
        }
        var value = badgeCtrl.map[desc]
        // Activate all active badges.
        if(value){
          value.date = badgeCtrl.formatDate(achievement.date)
          value.active = true
          if(achievement.description.indexOf('Studio ') === 0) {
            value.isStudio = true
          }
        }
      })
    }
  }

  // Construct a map containing all badges.
  BadgeCtrl.prototype.mapBadges = function(){
    var badgeCtrl = this
    badgeCtrl.map = {}
    angular.forEach(badgeCtrl.achievementGroups, function(achievementGroup){
      angular.forEach(achievementGroup.specificAchievements, function(achievement){
        achievement.id = achievementGroup.id
        badgeCtrl.map[achievement.name] = achievement
      })
    })
    angular.forEach(badgeCtrl.singleAchievements, function(achievement){
      badgeCtrl.map[achievement.name] = achievement
    })
  }

  // Convert the date with format like 'Sep 09,2013'
  BadgeCtrl.prototype.formatDate = function(date) {
    // Some function is passing in undefined timezone_string variable causing js errors,
    // so check if undefined and set default:
    if (typeof timezone_string === 'undefined') {
      var timezone_string = 'America/New_York' // lets set to TC timezone
    }
    return moment(date).tz(timezone_string).format('MMM DD, YYYY')
  }

  // Construct the data 'currentlyEarned'.
  BadgeCtrl.prototype.populateData = function(destination, count){
    var quantifier = ''
    switch(destination.id){
    case '1':
      quantifier = 'Post'
      break
    case '6':
      quantifier = 'Submission'
      break
    case '11':
      quantifier = 'Prize'
      break
    case '16':
    case '117':
      quantifier = 'Placement'
      break
    case '89':
      quantifier = 'SRM'
      break
    case '99':
    case '126':
    case '127':
      quantifier = 'Problem'
      break
    default:
      quantifier = 'Win'
      break
    }

    if (count && count > 1) {
      quantifier += 's'
    }
    if(count){
      destination.currentlyEarned = count + ' ' + quantifier
    }
  }
  // Initialize the data array needed by badge section.
  BadgeCtrl.prototype.init = function($scope){
    this.scope = $scope

    this.achievementGroups =
    [
      {
        id : 1,
        groupClass : 'Forum-Posts',
        specificAchievements : [
          {
            name : 'First Forum Post',
            active : false,
            specificClass : 'Forum-Posts-1'
          },
          {
            name : 'One Hundred Forum Posts',
            active : false,
            specificClass : 'Forum-Posts-100'
          },
          {
            name : 'Five Hundred Forum Posts',
            active : false,
            specificClass : 'Forum-Posts-500'
          },
          {
            name : 'One Thousand Forum Posts',
            active : false,
            specificClass : 'Forum-Posts-1000'
          },
          {
            name : 'Five Thousand Forum Posts',
            active : false,
            specificClass : 'Forum-Posts-5000'
          }
        ]
      },
      {
        id : 89,
        groupClass : 'Rated-SRMs',
        specificAchievements : [
          {
            name : 'First Rated Algorithm Competition',
            active : false,
            specificClass : 'Rated-SRMs-1'
          },
          {
            name : 'Five Rated Algorithm Competitions',
            active : false,
            specificClass : 'Rated-SRMs-5'
          },
          {
            name : 'Twenty Five Rated Algorithm Competitions',
            active : false,
            specificClass : 'Rated-SRMs-25'
          },
          {
            name : 'One Hundred Rated Algorithm Competitions',
            active : false,
            specificClass : 'Rated-SRMs-100'
          },
          {
            name : 'Three Hundred Rated Algorithm Competitions',
            active : false,
            specificClass : 'Rated-SRMs-300'
          }
        ]
      },
      {
        id : 94,
        groupClass : 'SRM-Room-Wins',
        specificAchievements : [
          {
            name : 'First SRM Room Win (Any Division)',
            active : false,
            specificClass : 'SRM-Room-Wins-1'
          },
          {
            name : 'Five SRM Room Wins (Any Division)',
            active : false,
            specificClass : 'SRM-Room-Wins-5'
          },
          {
            name : 'Twenty SRM Room Wins (Any Division)',
            active : false,
            specificClass : 'SRM-Room-Wins-20'
          },
          {
            name : 'Fifty SRM Room Wins (Any Division)',
            active : false,
            specificClass : 'SRM-Room-Wins-50'
          },
          {
            name : 'One Hundred SRM Room Wins (Any Division)',
            active : false,
            specificClass : 'SRM-Room-Wins-100'
          }
        ]
      },
      {
        id : 99,
        groupClass : 'Solved-SRM-Problems',
        specificAchievements : [
          {
            name : 'First Solved Algorithm Problem',
            active : false,
            specificClass : 'Solved-SRM-Problems-1'
          },
          {
            name : 'Ten Solved Algorithm Problems',
            active : false,
            specificClass : 'Solved-SRM-Problems-10'
          },
          {
            name : 'Fifty Solved Algorithm Problems',
            active : false,
            specificClass : 'Solved-SRM-Problems-50'
          },
          {
            name : 'Two Hundred Solved Algorithm Problems',
            active : false,
            specificClass : 'Solved-SRM-Problems-200'
          },
          {
            name : 'Five Hundred Solved Algorithm Problems',
            active : false,
            specificClass : 'Solved-SRM-Problems-500'
          }
        ]
      },
      {
        id : 104,
        groupClass : 'Successful-Challenges',
        specificAchievements : [
          {
            name : 'First Successful Challenge',
            active : false,
            specificClass : 'Successful-Challenges-1'
          },
          {
            name : 'Five Successful Challenges',
            active : false,
            specificClass : 'Successful-Challenges-5'
          },
          {
            name : 'Twenty Five Successful Challenges',
            active : false,
            specificClass : 'Successful-Challenges-25'
          },
          {
            name : 'One Hundred Successful Challenges',
            active : false,
            specificClass : 'Successful-Challenges-100'
          },
          {
            name : 'Two Hundred Successful Challenges',
            active : false,
            specificClass : 'Successful-Challenges-250'
          }
        ]
      },
      {
        id : 113,
        groupClass : 'Marathon-Matches',
        specificAchievements : [
          {
            name : 'First Marathon Competition',
            active : false,
            specificClass : 'Marathon-Matches-1'
          },
          {
            name : 'Three Marathon Competitions',
            active : false,
            specificClass : 'Marathon-Matches-3'
          },
          {
            name : 'Ten Marathon Competitions',
            active : false,
            specificClass : 'Marathon-Matches-10'
          },
          {
            name : 'Twenty Marathon Competitions',
            active : false,
            specificClass : 'Marathon-Matches-20'
          },
          {
            name : 'Fifty Marathon Competitions',
            active : false,
            specificClass : 'Marathon-Matches-50'
          }
        ]
      },
      {
        id : 117,
        groupClass : 'Marathon-Top-5-Placements',
        specificAchievements : [
          {
            name : 'First Marathon Top-5 Placement',
            active : false,
            specificClass : 'Marathon-Top-5-Placements-1'
          },
          {
            name : 'Two Marathon Top-5 Placements',
            active : false,
            specificClass : 'Marathon-Top-5-Placements-2'
          },
          {
            name : 'Four Marathon Top-5 Placements',
            active : false,
            specificClass : 'Marathon-Top-5-Placements-4'
          },
          {
            name : 'Eight Marathon Top-5 Placements',
            active : false,
            specificClass : 'Marathon-Top-5-Placements-8'
          },
          {
            name : 'Sixteen Marathon Top-5 Placements',
            active : false,
            specificClass : 'Marathon-Top-5-Placements-16'
          }
        ]
      },
      {
        id : 6,
        groupClass : 'Passing-Submissions',
        specificAchievements : [
          {
            name : 'First Passing Submission',
            active : false,
            specificClass : 'Passing-Submissions-1'
          },
          {
            name : 'Fifty Passing Submissions',
            active : false,
            specificClass : 'Passing-Submissions-50'
          },
          {
            name : 'One Hundred Passing Submissions',
            active : false,
            specificClass : 'Passing-Submissions-100'
          },
          {
            name : 'Two Hundred And Fifty Passing Submissions',
            active : false,
            specificClass : 'Passing-Submissions-250'
          },
          {
            name : 'Five Hundred Passing Submissions',
            active : false,
            specificClass : 'Passing-Submissions-500'
          }
        ]
      },
      {
        id : 11,
        groupClass : 'Checkpoint-Prizes',
        specificAchievements : [
          {
            name : 'First Milestone Prize',
            active : false,
            specificClass : 'Checkpoint-Prizes-1'
          },
          {
            name : 'Fifty Milestone Prizes',
            active : false,
            specificClass : 'Checkpoint-Prizes-50'
          },
          {
            name : 'One Hundred Milestone Prizes',
            active : false,
            specificClass : 'Checkpoint-Prizes-100'
          },
          {
            name : 'Two Hundred And Fifty Milestone Prizes',
            active : false,
            specificClass : 'Checkpoint-Prizes-250'
          },
          {
            name : 'Five Hundred Milestone Prizes',
            active : false,
            specificClass : 'Checkpoint-Prizes-500'
          }
        ]
      },
      {
        id : 16,
        groupClass : 'Winning-Placements',
        specificAchievements : [
          {
            name : 'First Placement',
            active : false,
            specificClass : 'Winning-Placements-1'
          },
          {
            name : 'Twenty Five Placements',
            active : false,
            specificClass : 'Winning-Placements-25'
          },
          {
            name : 'Fifty Placements',
            active : false,
            specificClass : 'Winning-Placements-50'
          },
          {
            name : 'One hundred Placements',
            active : false,
            specificClass : 'Winning-Placements-100'
          },
          {
            name : 'Two Hundred And Fifty Placements',
            active : false,
            specificClass : 'Winning-Placements-250'
          }
        ]
      },
      {
        id : 21,
        groupClass : 'First-Place-Wins',
        specificAchievements : [
          {
            name : 'First Win',
            active : false,
            specificClass : 'First-Place-Wins-1'
          },
          {
            name : 'Twenty Five First Placement Win',
            active : false,
            specificClass : 'First-Place-Wins-25'
          },
          {
            name : 'Fifty First Placement Win',
            active : false,
            specificClass : 'First-Place-Wins-50'
          },
          {
            name : 'One Hundred First Placement Win',
            active : false,
            specificClass : 'First-Place-Wins-100'
          },
          {
            name : 'Two Hundred And Fifty First Placement Win',
            active : false,
            specificClass : 'First-Place-Wins-250'
          }
        ]
      },
      {
        id : 0,
        groupClass : 'HP-Badges-Level-1',
        specificAchievements : [
          {
            name : 'Getting Started',
            active : false,
            specificClass : 'Getting-Started'
          },
          {
            name : 'Novice',
            active : false,
            specificClass : 'Novice'
          },
          {
            name : 'Journeyman',
            active : false,
            specificClass : 'Journeyman'
          },
          {
            name : 'Expert',
            active : false,
            specificClass : 'Expert'
          }
        ]
      },
      {
        id : 0,
        groupClass : 'HP-Badges-Level-2',
        specificAchievements : [
          {
            name : 'Master',
            active : false,
            specificClass : 'Master'
          },
          {
            name : 'Grand Master',
            active : false,
            specificClass : 'Grand-Master'
          },
          {
            name : 'Paragon',
            active : false,
            specificClass : 'Paragon'
          },
          {
            name : 'Grand Paragon',
            active : false,
            specificClass : 'Grand-Paragon'
          },
          {
            name : 'Social Evangelist',
            active : false,
            specificClass : 'Social-Evangelist'
          }
        ]
      }
    ]

    this.singleAchievements =
    [
      {
        id : 121,
        name : 'Marathon Match Winner',
        groupClass : 'Marathon-Match-Winner',
        active : false
      },
      {
        id : 122,
        name : 'Algorithm Target',
        groupClass : 'Algorithm-Target',
        active : false
      },
      {
        id : 119,
        name : 'SRM Winner Div 1',
        groupClass : 'SRM-Winner-Div-1',
        active : false
      },
      {
        id : 120,
        name : 'SRM Winner Div 2',
        groupClass : 'SRM-Winner-Div-2',
        active : false
      },
      {
        id : 127,
        name : 'Solved Hard Div2 Problem in SRM',
        groupClass : 'Solved-Hard-Div2-Problem-in-SRM',
        active : false
      },
      {
        id : 126,
        name : 'Solved Hard Div1 Problem in SRM',
        groupClass : 'Solved-Hard-Div1-Problem-in-SRM',
        active : false
      },
      {
        id : 51,
        name : 'Digital Run Winner',
        groupClass : 'Digital-Run-Winner',
        active : false
      },
      {
        id : 52,
        name : 'Digital Run Top Five',
        groupClass : 'Digital-Run-Top-5',
        active : false
      },
      {
        id : 1,
        name : 'Two Hundred Successful Challenges',
        groupClass : 'Successful-Challenges-200',
        active : false
      },
      {
        id : 129,
        name : 'CoECI Client Badge',
        groupClass : 'CoECI-Client-Badge',
        active : false
      },
      {
        id : 0,
        name : 'TopCoder Reviewer',
        groupClass : 'TopCoder-Reviewer',
        active : false
      },
      {
        id : 1000,
        name : 'Studio Reviewer',
        groupClass : 'Studio-Reviewer',
        active : false
      },
      {
        id : 1000,
        name : 'Studio Cup Top Five',
        groupClass : 'Studio-Cup-Top-5',
        active : false
      },
      {
        id : 1001,
        name : 'Studio Cup Winner',
        groupClass : 'Studio-Cup-Winner',
        active : false
      },
      {
        id : 1002,
        name : 'Studio Spec Reviewer',
        groupClass : 'Studio-Spec-Reviewer',
        active : false
      },
      {
        id : 1003,
        name : 'Studio Screener',
        groupClass : 'Studio-Screener',
        active : false
      },
      {
        id : 1003,
        name : 'Studio Spirit',
        groupClass : 'Studio-Spirit',
        active : false
      },
      {
        id : 1004,
        name : 'Studio Mentor',
        groupClass : 'Studio-Mentor',
        active : false
      },
      {
        id : 1005,
        name : 'Member of the Month',
        groupClass : 'Member-of-the-Month',
        active : false
      },
      {
        id : 1006,
        name : 'Designer of the Month',
        groupClass : 'Member-of-the-Month',
        active : false
      },
      {
        id: 1007,
        name: 'Crowd for Good',
        groupClass: 'Crowd-for-Good',
        active: false
      },
      {
        id: 1008,
        name: 'Predix Coder',
        groupClass: 'Predix-Coder',
        active: false
      }
    ]
  }
})()
