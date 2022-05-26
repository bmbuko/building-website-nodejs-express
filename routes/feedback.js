const express = require('express');

const router = express.Router();

module.exports = params => {
  const {feedbackService} = params
  router.get('/',async (request, response) =>{
    const feedback = await feedbackService.getList();
    response.json(feedback)
  }); 
  

  router.post('/:shortname', (request, response) => response.send(`Details page of ${request.params.shortname}`));

  return router;
};