'use strict';

const express = require('express');
const router = express.Router();
const { ServerError, ParamsError } = require('../lib/_error');
const { error } = require('../lib/_response');
const { evaluate_url, save_url_evaluation } = require('../models/evaluation');

router.get('/eval/:url', function(req, res, next) {
  try {
    req.check('url', 'Invalid Url').exists();

    const errors = req.validationErrors();
    if (errors) {
      res.send(error(new ParamsError(errors)));
    } else {
      const url = decodeURIComponent(req.params.url);

      evaluate_url(url, 'examinator')
        .then(evaluation => {
          res.send(evaluation);

          save_url_evaluation(url, evaluation);
        })
        .catch(err => res.send(err));
    }
  } catch (err) {
    res.send(error(new ServerError(err)));
  }
});

module.exports = router;