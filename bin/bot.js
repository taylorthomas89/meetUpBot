'use strict';

var MeetupBot = require('../lib/meetupBot');

var token = process.env.BOT_API_KEY;
var name = process.env.BOT_NAME;

var meetupbot = new MeetupBot({
    token: token,
    name: name
});

meetupbot.run();
