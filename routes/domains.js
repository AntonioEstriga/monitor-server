"use strict";

const express = require('express');
const router = express.Router();
const Response = require('../lib/_response');
const User = require('../models/user');
const Domain = require('../models/domain');

router.post('/create', async function (req, res, next) {
  try {
    req.check('websiteId', 'Ivalid Website Id').exists();
    req.check('url', 'Invalid Url').exists();
    req.check('cookie', 'User not logged in').exists();

    let errors = req.validationErrors();
    if (errors) {
      res.send(Response.params_error(errors));
    } else {
      const verification = await User.verify(res, req.body.cookie, true);
      if (verification) {
        let websiteId = req.body.websiteId;
        let url = req.body.url;
        let tags = req.body.tags;
        
        const domain = await Domain.create(websiteId, url, tags);
        res.send(domain);
      }
    }
  } catch (err) {
    console.log(err);
    res.send(Response.error(-17, 'SERVER_ERROR', err)); 
  }
});

/**
 * GETS
 */

router.get('/exists/:domain', async function (req, res, next) {
  try {
    req.check('domain', 'Invalid Domain').exists();

    let errors = req.validationErrors();
    if (errors) {
      res.send(Response.params_error(errors));
    } else {
      const domain = await Domain.exists(req.params.domain);
      res.send(domain); 
    }
  } catch (err) {
    console.log(err);
    res.send(Response.error(-17, 'SERVER_ERROR', err)); 
  }
});

router.post('/all', async function (req, res, next) {
  try {
    req.check('cookie', 'User not logged in').exists();

    let errors = req.validationErrors();
    if (errors) {
      res.send(Response.params_error(errors));
    } else {
      const verification = await User.verify(res, req.body.cookie, true);
      if (verification) {
        const domains = await Domain.all();
        res.send(domains);
      }
    }
  } catch (err) {
    console.log(err);
    res.send(Response.error(-17, 'SERVER_ERROR', err)); 
  }
});

router.post('/allInfo', async function (req, res, next) {
  try {
    req.check('cookie', 'User not logged in').exists();

    let errors = req.validationErrors();
    if (errors) {
      res.send(Response.params_error(errors));
    } else {
      const verification = await User.verify(res, req.body.cookie, true);
      if (verification) {
        const domains = await Domain.all_info();
        res.send(domains);
      }
    }
  } catch (err) {
    console.log(err);
    res.send(Response.error(-17, 'SERVER_ERROR', err)); 
  }
});

module.exports = router;