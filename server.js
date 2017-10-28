// Finish Building Desk
// Module : Todo : Build a lesson / lab on Angular4

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

function getEvents() {
  console.log('Hitting Meetup API..');
  var url = 'https://api.meetup.com/2/events?&sign=true&photo-host=public&member_id=224317364&key=20452c26556e6e7b2f56023185e375a&page=20'

  return axios.get(url);
}

// Should check if event date is within 7 days of 'today'. (Today being when the code runs)
var isItWithinAWeek = function() {
  //var firstEvent = _upcomingEvents[0]
  //return firstEvent.time.getDate() - now.getDate() <= 7 ? true : false;

  var now = new Date();

// needs to check month as well as day(date)
  for(var i = 0; i < _upcomingEvents.length; i++){

      console.log("NOW MONTH: " + now.getMonth());
      console.log("NOW DATE: " + now.getDate());
      console.log( "--" );
      console.log("UPCOMING MONTH: " + _upcomingEvents[i].time.getMonth());
      console.log("UPCOMING DATE: " + _upcomingEvents[i].time.getDate());


      _upcomingEvents[i].time.getDate() - now.getDate() <= 7
      && _upcomingEvents[i].time.getDate() - now.getDate() >= 0
      && _upcomingEvents[i].time.getMonth() - now.getMonth() == 0
      ? console.log('***WITHIN A WEEK***') : console.log('***NOT WITHIN A WEEK***');

      console.log("");
  }
}

var printEvents = function() {
  console.log('Printing events..');
  return "testing";
  for (var i = 0; i < _upcomingEvents.length; i++) {
      console.log("\n" + _upcomingEvents[i].name);
      console.log(_upcomingEvents[i].group);
      console.log(_upcomingEvents[i].url);
      console.log(_upcomingEvents[i].time + "\n");
  }

  isItWithinAWeek();
  outputEvents();
}

var outputEvents = function() {
  console.log(_upcomingEvents.join(' '));
  return _upcomingEvents.join(' ');

}


var packageObject = function() {
  console.log('Packaging up event object..');

  for (var i = 0; i < _events.length; i++) {
    var time = new Date(_events[i].time)

    _upcomingEvents.push({
      name: _events[i].name,
      group: _events[i].group.name,
      url: _events[i].event_url,
      description: _events[i].description,
      time: time
    });

  }

printEvents();

}

axios.all([getEvents()]).then(axios.spread(function(response) {
  _events = response.data.results;
  // console.log('***');
  // console.log(response.data.results.length);
  // console.log('***');
  // console.log(_events.length);

packageObject();

}))



module.exports = app;
