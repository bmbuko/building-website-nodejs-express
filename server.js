const express = require('express');

const path = require('path');

const cookieSession = require('cookie-session');
const FeedbackService = require('./services/FeedbackService');
const SpeakerService = require('./services/SpeakerService');

const feedbackService = new FeedbackService('./data/feedback.json');
const speakersService = new SpeakerService('./data/speakers.json');

const app = express();
const routes = require('./routes');

const port = 3000;

app.set('trust proxy', 1);
app.use(
  cookieSession({
    name: 'session',
    keys: ['sbdbcjvmn754,', 'nfnvnffbfbf'],
  })
);

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, './views'));

app.locals.siteName = 'ROUX Meetups';

app.use(express.static(path.join(__dirname, './static')));

app.use(async (request, response, next) => {
  try {
    const names = await speakersService.getNames();
    response.locals.speakerNames = names;

    return next();
  } catch (err) {
    return next(err);
  }
});

app.use(
  '/',
  routes({
    feedbackService,
    speakersService,
  })
);

app.listen(port, () => {
  console.log(`express server listening on port ${port}!`);
});
