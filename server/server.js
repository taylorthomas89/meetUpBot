const express = require('express');
const axios = require('axios');
require('dotenv').load();

const app = express();
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Listening on PORT ${PORT}\n`);
});

var _description, _eventName, _groupName, _url;
var _events = [];
var _upcomingEvents = [];

var getEvents = function() {
  var url = 'https://api.meetup.com/2/events?&sign=true&photo-host=public&member_id=224317364&key=20452c26556e6e7b2f56023185e375a&page=20'
  return axios.get(url);
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

var isItWithinAWeek = function(event) {
  var now = new Date();

  return event.time.getDate() - now.getDate() <= 7 &&
  event.time.getDate() - now.getDate() >= 0  &&
  event.time.getMonth() - now.getMonth() == 0
  ? true : false;
}

var returnEvent = function(event) {
  console.log('Returning events');
  return isItWithinAWeek(event) ? event.url : console.log('Event not within a week!');
}


axios.all([getEvents()]).then(axios.spread(function(response) {
  _events = response.data.results;
  packageObject();
}))

module.exports = {
  app,
  returnEvent,
  _upcomingEvents
};
