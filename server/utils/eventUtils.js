'use strict';

const axios = require('axios');
require('dotenv').load();

var _description, _eventName, _groupName, _url;
var _events = [];
var _upcomingEvents = [];

var getEvents = function() {
  clearEvents();
  var url = `https://api.meetup.com/2/events?&sign=true&photo-host=public&member_id=224317364&key=${process.env.MEETUP_API_KEY}&page=20`
  return axios.get(url);
}

// I may want to start from the end of the array and work backwords -- test this
var clearEvents = function() {
  console.log('Clearing upcoming events array');
  for (var i = _upcomingEvents.length-1; i > 0; i--) {
  _upcomingEvents[i].splice(i, 1)
  };
}

var packageObject = function() {
  console.log('Packaging up event objects..');
  for (var i = 0; i < _events.length; i++) {
    var time = new Date(_events[i].time)

    _upcomingEvents.push({
      name: _events[i].name,
      group: _events[i].group.name,
      url: _events[i].event_url,
      time: time
    });

  };
}

var printEvents = function() {
  console.log('Printing events..');
  for (var i = 0; i < _upcomingEvents.length; i++) {
    console.log("\n" + _upcomingEvents[i].name);
    console.log(_upcomingEvents[i].group);
    console.log(_upcomingEvents[i].url);
    console.log(_upcomingEvents[i].time);
    console.log("");
  };
}

//This needs to be re-worked to account for edge cases(such as current day being towards end of month)
var isItWithinAWeek = function(event) {
  var now = new Date();
  return event.time.getDate() - now.getDate() <= 7 &&
  event.time.getDate() - now.getDate() >= 0  &&
  event.time.getMonth() - now.getMonth() == 0
  ? true : false;
}

var returnEvent = function(event) {
  return isItWithinAWeek(event) ? event.url : console.log('Event not within a week!');
}

axios.all([getEvents()]).then(axios.spread(function(response) {
  console.log('Getting Meetups..');
  _events = response.data.results;
  packageObject();
}));

module.exports = {
  _upcomingEvents,
  returnEvent
}
