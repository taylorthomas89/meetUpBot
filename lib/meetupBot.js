'use strict';

const util = require('util');
const path = require('path');
const Bot = require('slackbots')
const { returnEvent, _upcomingEvents } = require('../server/utils/eventUtils.js');

var MeetupBot = function Constructor(settings) {
  this.settings = settings;
  this.settings.name = this.settings.name || 'meetupbot';

  this.user = null;
};

util.inherits(MeetupBot, Bot);

MeetupBot.prototype.run = function () {
  MeetupBot.super_.call(this, this.settings);

  this.on('start', this._onStart);
  this.on('message', this._onMessage);
};

MeetupBot.prototype._onStart = function () {
  this._loadBotUser();
  //this._firstRunCheck(); //questionable if needed
  this._welcomeMessage();
};

MeetupBot.prototype._onMessage = function (message) {
  if (this._isChatMessage(message) &&
      this._isChannelConversation(message) &&
      !this._isFromMeetupBot(message) &&
      this._isMentioningMeetupBot(message)
    ) {
      this._replyWithMeetUps(message);
    }
};

MeetupBot.prototype._replyWithMeetUps = function (originalMessage) {
  var self = this;
  var channel = self._getChannelById(originalMessage.channel);
  // I should add a check here to send message A or message B depending on IF there are any meetups coming up next week
  self.postMessageToChannel(channel.name, 'Here are some upcoming meetups in Orange County: ', {as_user: true});
  
  setTimeout(function(){
    for (var i = 0; i < _upcomingEvents.length; i++) {
      self.postMessageToChannel(channel.name, returnEvent(_upcomingEvents[i]), {as_user: true});
    }
  }, 500)
};

MeetupBot.prototype._loadBotUser = function () {
  console.log('Loading MeetupBot..');
    var self = this;
    this.user = this.users.filter(function (user) {
      return user.name === self.name;
    })[0];
};

// MeetupBot.prototype._firstRunCheck = function() {
//  run some small verifications here
//   var self = this;
//   self._welcomeMessage();
// };

MeetupBot.prototype._welcomeMessage = function () {
  this.postMessageToChannel(this.channels[0].name, 'Hello World! I can let you know about upcoming meetups in your area. ' +
  'Just say `!meetups` to invoke me!', {as_user: true});
};

MeetupBot.prototype._isChatMessage = function (message) {
  return message.type === 'message' && Boolean(message.text);
};

MeetupBot.prototype._isChannelConversation = function (message) {
  return typeof message.channel === 'string' &&
    message.channel[0] === 'C';
};

MeetupBot.prototype._isMentioningMeetupBot = function (message) {
  return message.text.toLowerCase().indexOf('!meetup') > -1 ||
    message.text.toLowerCase().indexOf(this.name) > -1 ||
    message.text.toLowerCase().indexOf('!meetups') > -1;
};

MeetupBot.prototype._isFromMeetupBot = function (message) {
  return message.user === this.user.id;
};

MeetupBot.prototype._getChannelById = function (channelId) {
  return this.channels.filter(function (item) {
    return item.id === channelId;
  })[0];
};

module.exports = MeetupBot;
