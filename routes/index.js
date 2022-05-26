const express = require('express');

const router = express.Router();

const speakerRoute = require('./speakers');
const feedbackRoute = require('./feedback');

module.exports = (params) => {
  const { speakersService } = params;

  router.get('/', async (request, response) => {
    const artwork = await speakersService.getAllArtwork()
    const topSpeakers = await speakersService.getList();
 response.render('layout', { pageTitle: 'welcome', template: 'index', topSpeakers,artwork });
  });

  router.use('/speakers', speakerRoute(params));
  router.use('/feedback', feedbackRoute(params));
  return router;
};
