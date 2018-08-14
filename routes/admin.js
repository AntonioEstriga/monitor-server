'use strict';

/**
 * Admin Router and Controller
 */

const express = require('express');
const router = express.Router();
const { ServerError, ParamsError } = require('../lib/_error');
const { error } = require('../lib/_response');

const { 
  verify_user,
  get_number_of_access_studies_users,
  get_number_of_my_monitor_users,
  get_all_users,
  get_all_monitor_users,
  create_user,
  user_exists
} = require('../models/user');

const {
  get_number_of_access_studies_tags,
  get_number_of_observatorio_tags,
  get_all_tags,
  tag_official_name_exists,
  create_official_tag
} = require('../models/tag');

const {
  get_all_entities,
  entity_short_name_exists,
  entity_long_name_exists,
  create_entity
} = require('../models/entity');

const {
  get_all_websites,
  get_number_of_access_studies_websites,
  get_number_of_my_monitor_websites,
  get_number_of_observatorio_websites,
  get_all_official_websites,
  get_all_websites_without_user,
  get_all_websites_without_entity,
  get_all_user_websites,
  get_all_tag_websites,
  get_all_entity_websites,
  get_website_current_domain,
  website_name_exists,
  create_website
} = require('../models/website');

const {
  get_all_domains,
  get_all_official_domains,
  get_all_website_domains,
  domain_exists,
  create_domain
} = require('../models/domain');

const {
  get_all_pages,
  get_all_domain_pages,
  create_pages
} = require('../models/page');

const {
  get_all_page_evaluations,
  get_evaluation
} =  require('../models/evaluation');

/**
 * GET
 */

router.post('/users/studies/total', async function (req, res, next) {
  try {
    req.check('cookie', 'User not logged in').exists();

    const errors = req.validationErrors();
    if (errors) {
      res.send(error(new ParamsError(errors)));
    } else {
      const user_id = await verify_user(res, req.body.cookie, true);
      if (user_id !== -1) {
        get_number_of_access_studies_users()
          .then(total => res.send(total))
          .catch(err => res.send(err));
      }
    }
  } catch (err) {
    console.log(err);
    res.send(error(new ServerError(err))); 
  }
});

router.post('/users/monitor/total', async function (req, res, next) {
  try {
    req.check('cookie', 'User not logged in').exists();

    const errors = req.validationErrors();
    if (errors) {
      res.send(error(new ParamsError(errors)));
    } else {
      const user_id = await verify_user(res, req.body.cookie, true);
      if (user_id !== -1) {
        get_number_of_my_monitor_users()
          .then(total => res.send(total))
          .catch(err => res.send(err));
      }
    }
  } catch (err) {
    console.log(err);
    res.send(error(new ServerError(err))); 
  }
});

router.post('/tags/studies/total', async function (req, res, next) {
  try {
    req.check('cookie', 'User not logged in').exists();

    const errors = req.validationErrors();
    if (errors) {
      res.send(error(new ParamsError(errors)));
    } else {
      const user_id = await verify_user(res, req.body.cookie, true);
      if (user_id !== -1) {
        get_number_of_access_studies_tags()
          .then(total => res.send(total))
          .catch(err => res.send(err));
      }
    }
  } catch (err) {
    console.log(err);
    res.send(error(new ServerError(err))); 
  }
});

router.post('/tags/observatorio/total', async function (req, res, next) {
  try {
    req.check('cookie', 'User not logged in').exists();

    const errors = req.validationErrors();
    if (errors) {
      res.send(error(new ParamsError(errors)));
    } else {
      const user_id = await verify_user(res, req.body.cookie, true);
      if (user_id !== -1) {
        get_number_of_observatorio_tags()
          .then(total => res.send(total))
          .catch(err => res.send(err));
      }
    }
  } catch (err) {
    console.log(err);
    res.send(error(new ServerError(err))); 
  }
});

router.post('/websites/studies/total', async function (req, res, next) {
  try {
    req.check('cookie', 'User not logged in').exists();

    const errors = req.validationErrors();
    if (errors) {
      res.send(error(new ParamsError(errors)));
    } else {
      const user_id = await verify_user(res, req.body.cookie, true);
      if (user_id !== -1) {
        get_number_of_access_studies_websites()
          .then(total => res.send(total))
          .catch(err => res.send(err));
      }
    }
  } catch (err) {
    console.log(err);
    res.send(error(new ServerError(err))); 
  }
});

router.post('/websites/monitor/total', async function (req, res, next) {
  try {
    req.check('cookie', 'User not logged in').exists();

    const errors = req.validationErrors();
    if (errors) {
      res.send(error(new ParamsError(errors)));
    } else {
      const user_id = await verify_user(res, req.body.cookie, true);
      if (user_id !== -1) {
        get_number_of_my_monitor_websites()
          .then(total => res.send(total))
          .catch(err => res.send(err));
      }
    }
  } catch (err) {
    console.log(err);
    res.send(error(new ServerError(err))); 
  }
});

router.post('/websites/observatorio/total', async function (req, res, next) {
  try {
    req.check('cookie', 'User not logged in').exists();

    const errors = req.validationErrors();
    if (errors) {
      res.send(error(new ParamsError(errors)));
    } else {
      const user_id = await verify_user(res, req.body.cookie, true);
      if (user_id !== -1) {
        get_number_of_observatorio_websites()
          .then(total => res.send(total))
          .catch(err => res.send(err));
      }
    }
  } catch (err) {
    console.log(err);
    res.send(error(new ServerError(err))); 
  }
});

router.post('/users/all', async function (req, res, next) {
  try {
    req.check('cookie', 'User not logged in').exists();

    const errors = req.validationErrors();
    if (errors) {
      res.send(error(new ParamsError(errors)));
    } else {
      const user_id = await verify_user(res, req.body.cookie, true);
      if (user_id !== -1) {
        get_all_users()
          .then(users => res.send(users))
          .catch(err => res.send(err));
      }
    }
  } catch (err) {
    console.log(err);
    res.send(error(new ServerError(err))); 
  }
});

router.post('/users/monitor', async function (req, res, next) {
  try {
    req.check('cookie', 'User not logged in').exists();

    const errors = req.validationErrors();
    if (errors) {
      res.send(error(new ParamsError(errors)));
    } else {
      const user_id = await verify_user(res, req.body.cookie, true);
      if (user_id !== -1) {
        get_all_monitor_users()
          .then(users => res.send(users))
          .catch(err => res.send(err));
      }
    }
  } catch (err) {
    console.log(err);
    res.send(error(new ServerError(err))); 
  }
});

router.post('/tags/all', async function (req, res, next) {
  try {
    req.check('cookie', 'User not logged in').exists();

    const errors = req.validationErrors();
    if (errors) {
      res.send(error(new ParamsError(errors)));
    } else {
      const user_id = await verify_user(res, req.body.cookie, true);
      if (user_id !== -1) {
        get_all_tags()
          .then(tags => res.send(tags))
          .catch(res => res.send(res));
      }
    }
  } catch (err) {
    console.log(err);
    res.send(error(new ServerError(err))); 
  }
});

router.post('/entities/all', async function (req, res, next) {
  try {
    req.check('cookie', 'User not logged in').exists();

    const errors = req.validationErrors();
    if (errors) {
      res.send(error(new ParamsError(errors)));
    } else {
      const user_id = await verify_user(res, req.body.cookie, true);
      if (user_id !== -1) {
        get_all_entities()
          .then(entities => res.send(entities))
          .catch(err => res.send(res));
      }
    }
  } catch (err) {
    console.log(err);
    res.send(error(new ServerError(err))); 
  }
});

router.post('/websites/all', async function (req, res, next) {
  try {
    req.check('cookie', 'User not logged in').exists();

    const errors = req.validationErrors();
    if (errors) {
      res.send(error(new ParamsError(errors)));
    } else {
      const user_id = await verify_user(res, req.body.cookie, true);
      if (user_id !== -1) {
        get_all_websites()
          .then(websites => res.send(websites))
          .catch(err => re.send(err));
      }
    }
  } catch (err) {
    console.log(err);
    res.send(error(new ServerError(err))); 
  }
});

router.post('/websites/allOfficial', async function (req, res, next) {
  try {
    req.check('cookie', 'User not logged in').exists();

    const errors = req.validationErrors();
    if (errors) {
      res.send(error(new ParamsError(errors)));
    } else {
      const user_id = await verify_user(res, req.body.cookie, true);
      if (user_id !== -1) {
        get_all_official_websites()
          .then(websites => res.send(websites))
          .catch(err => re.send(err));
      }
    }
  } catch (err) {
    console.log(err);
    res.send(error(new ServerError(err))); 
  }
});

router.post('/websites/user', async function (req, res, next) {
  try {
    req.check('user', 'Invalid user').exists();
    req.check('cookie', 'User not logged in').exists();

    const errors = req.validationErrors();
    if (errors) {
      res.send(error(new ParamsError(errors)));
    } else {
      const user_id = await verify_user(res, req.body.cookie, true);
      if (user_id !== -1) {
        const user = req.body.user;

        get_all_user_websites(user)
          .then(websites => res.send(websites))
          .catch(err => re.send(err));
      }
    }
  } catch (err) {
    console.log(err);
    res.send(error(new ServerError(err))); 
  }
});

router.post('/websites/tag', async function (req, res, next) {
  try {
    req.check('tag', 'Invalid tag').exists();
    req.check('user', 'Invalid user').exists();
    req.check('cookie', 'User not logged in').exists();

    const errors = req.validationErrors();
    if (errors) {
      res.send(error(new ParamsError(errors)));
    } else {
      const user_id = await verify_user(res, req.body.cookie, true);
      if (user_id !== -1) {
        const tag = req.body.tag;
        const user = req.body.user;

        get_all_tag_websites(user, tag)
          .then(websites => res.send(websites))
          .catch(err => re.send(err));
      }
    }
  } catch (err) {
    console.log(err);
    res.send(error(new ServerError(err))); 
  }
});

router.post('/websites/entity', async function (req, res, next) {
  try {
    req.check('entity', 'Invalid entity').exists();
    req.check('cookie', 'User not logged in').exists();

    const errors = req.validationErrors();
    if (errors) {
      res.send(error(new ParamsError(errors)));
    } else {
      const user_id = await verify_user(res, req.body.cookie, true);
      if (user_id !== -1) {
        const entity = req.body.entity;

        get_all_entity_websites(entity)
          .then(websites => res.send(websites))
          .catch(err => re.send(err));
      }
    }
  } catch (err) {
    console.log(err);
    res.send(error(new ServerError(err))); 
  }
});

router.post('/domains/all', async function (req, res, next) {
  try {
    req.check('cookie', 'User not logged in').exists();

    const errors = req.validationErrors();
    if (errors) {
      res.send(error(new ParamsError(errors)));
    } else {
      const user_id = await verify_user(res, req.body.cookie, true);
      if (user_id !== -1) {
        get_all_domains()
          .then(domains => res.send(domains))
          .catch(err => re.send(err));
      }
    }
  } catch (err) {
    console.log(err);
    res.send(error(new ServerError(err))); 
  }
});

router.post('/domains/website', async function (req, res, next) {
  try {
    req.check('user', 'Invalid user').exists();
    req.check('website', 'Invalid website').exists();
    req.check('cookie', 'User not logged in').exists();

    const errors = req.validationErrors();
    if (errors) {
      res.send(error(new ParamsError(errors)));
    } else {
      const user_id = await verify_user(res, req.body.cookie, true);
      if (user_id !== -1) {
        const user = req.body.user;
        const website = req.body.website;

        get_all_website_domains(user, website)
          .then(domains => res.send(domains))
          .catch(err => re.send(err));
      }
    }
  } catch (err) {
    console.log(err);
    res.send(error(new ServerError(err))); 
  }
});

router.post('/pages/all', async function (req, res, next) {
  try {
    req.check('cookie', 'User not logged in').exists();

    const errors = req.validationErrors();
    if (errors) {
      res.send(error(new ParamsError(errors)));
    } else {
      const user_id = await verify_user(res, req.body.cookie, true);
      if (user_id !== -1) {
        get_all_pages()
          .then(pages => res.send(pages))
          .catch(err => re.send(err));
      }
    }
  } catch (err) {
    console.log(err);
    res.send(error(new ServerError(err))); 
  }
});

router.post('/pages/domain', async function (req, res, next) {
  try {
    req.check('user', 'Invalid user').exists();
    req.check('domain', 'Invalid domain').exists();
    req.check('cookie', 'User not logged in').exists();

    const errors = req.validationErrors();
    if (errors) {
      res.send(error(new ParamsError(errors)));
    } else {
      const user_id = await verify_user(res, req.body.cookie, true);
      if (user_id !== -1) {
        const user = req.body.user;
        const domain = decodeURIComponent(req.body.domain);

        get_all_domain_pages(user, domain)
          .then(pages => res.send(pages))
          .catch(err => re.send(err));
      }
    }
  } catch (err) {
    console.log(err);
    res.send(error(new ServerError(err))); 
  }
});

router.post('/evaluations/page', async function (req, res, next) {
  try {
    req.check('page', 'Invalid page').exists();
    req.check('cookie', 'User not logged in').exists();

    const errors = req.validationErrors();
    if (errors) {
      res.send(error(new ParamsError(errors)));
    } else {
      const user_id = await verify_user(res, req.body.cookie, true);
      if (user_id !== -1) {
        const user = req.body.user;
        const page = decodeURIComponent(req.body.page);

        get_all_page_evaluations(page)
          .then(evaluations => res.send(evaluations))
          .catch(err => re.send(err));
      }
    }
  } catch (err) {
    console.log(err);
    res.send(error(new ServerError(err))); 
  }
});

router.post('/page/evaluation', async function (req, res, next) {
  try {
    req.check('url', 'Invalid url').exists();
    req.check('evaluation_date', 'Invalid evaluation_date').exists();
    req.check('cookie', 'User not logged in').exists();

    const errors = req.validationErrors();
    if (errors) {
      res.send(error(new ParamsError(errors)));
    } else {
      const user_id = await verify_user(res, req.body.cookie, true);
      if (user_id !== -1) {
        const url = decodeURIComponent(req.body.url);
        const evaluation_date = req.body.evaluation_date;
        
        get_evaluation(url, evaluation_date)
          .then(evaluation => res.send(evaluation))
          .catch(err => re.send(err));
      }
    }
  } catch (err) {
    console.log(err);
    res.send(error(new ServerError(err))); 
  }
});


router.post('/websites/withoutUser', async function (req, res, next) {
  try {
    req.check('cookie', 'User not logged in').exists();

    const errors = req.validationErrors();
    if (errors) {
      res.send(error(new ParamsError(errors)));
    } else {
      const user_id = await verify_user(res, req.body.cookie, true);
      if (user_id !== -1) {
        get_all_websites_without_user()
          .then(websites => res.send(websites))
          .catch(err => re.send(err));
      }
    }
  } catch (err) {
    console.log(err);
    res.send(error(new ServerError(err))); 
  }
});

router.post('/websites/withoutEntity', async function (req, res, next) {
  try {
    req.check('cookie', 'User not logged in').exists();

    const errors = req.validationErrors();
    if (errors) {
      res.send(error(new ParamsError(errors)));
    } else {
      const user_id = await verify_user(res, req.body.cookie, true);
      if (user_id !== -1) {
        get_all_websites_without_entity()
          .then(websites => res.send(websites))
          .catch(err => re.send(err));
      }
    }
  } catch (err) {
    console.log(err);
    res.send(error(new ServerError(err))); 
  }
});

router.post('/domains/allOfficial', async function (req, res, next) {
  try {
    req.check('cookie', 'User not logged in').exists();

    const errors = req.validationErrors();
    if (errors) {
      res.send(error(new ParamsError(errors)));
    } else {
      const user_id = await verify_user(res, req.body.cookie, true);
      if (user_id !== -1) {
        get_all_official_domains()
          .then(domains => res.send(domains))
          .catch(err => re.send(err));
      }
    }
  } catch (err) {
    console.log(err);
    res.send(error(new ServerError(err))); 
  }
});

router.get('/users/exists/:email', async function (req, res, next) {
  try {
    req.check('email', 'Invalid Email').exists();

    const errors = req.validationErrors();
    if (errors) {
      res.send(error(new ParamsError(errors)));
    } else {
      const email = req.params.email;
      user_exists(email)
        .then(exists => res.send(exists))
        .catch(err => res.send(err)); 
    }
  } catch (err) {
    console.log(err);
    res.send(error(new ServerError(err))); 
  }
});

router.get('/tags/exists/:name', async function (req, res, next) {
  try {
    req.check('name', 'Invalid Name').exists();

    const errors = req.validationErrors();
    if (errors) {
      res.send(error(new ParamsError(errors)));
    } else {
      const name = req.params.name;
      tag_official_name_exists(name)
        .then(exists => res.send(exists))
        .catch(err => res.send(err)); 
    }
  } catch (err) {
    console.log(err);
    res.send(error(new ServerError(err))); 
  }
});

router.get('/entities/exists/shortName/:name', async function (req, res, next) {
  try {
    req.check('name', 'Invalid Name').exists();

    const errors = req.validationErrors();
    if (errors) {
      res.send(error(new ParamsError(errors)));
    } else {
      const name = req.params.name;
      entity_short_name_exists(name)
        .then(exists => res.send(exists))
        .catch(err => res.send(err)); 
    }
  } catch (err) {
    console.log(err);
    res.send(error(new ServerError(err))); 
  }
});

router.get('/entities/exists/longName/:name', async function (req, res, next) {
  try {
    req.check('name', 'Invalid Name').exists();

    const errors = req.validationErrors();
    if (errors) {
      res.send(error(new ParamsError(errors)));
    } else {
      const name = req.params.name;
      entity_long_name_exists(name)
        .then(exists => res.send(exists))
        .catch(err => res.send(err)); 
    }
  } catch (err) {
    console.log(err);
    res.send(error(new ServerError(err))); 
  }
});

router.get('/websites/exists/:name', async function (req, res, next) {
  try {
    req.check('name', 'Invalid Name').exists();

    const errors = req.validationErrors();
    if (errors) {
      res.send(error(new ParamsError(errors)));
    } else {
      const name = req.params.name;
      website_name_exists(name)
        .then(exists => res.send(exists))
        .catch(err => res.send(err)); 
    }
  } catch (err) {
    console.log(err);
    res.send(error(new ServerError(err))); 
  }
});

router.get('/domains/exists/:domain', async function (req, res, next) {
  try {
    req.check('domain', 'Invalid Domain').exists();

    const errors = req.validationErrors();
    if (errors) {
      res.send(error(new ParamsError(errors)));
    } else {
      const domain = decodeURIComponent(req.params.domain);
      domain_exists(domain)
        .then(exists => res.send(exists))
        .catch(err => res.send(err)); 
    }
  } catch (err) {
    console.log(err);
    res.send(error(new ServerError(err))); 
  }
});

router.get('/websites/currentDomain/:websiteId', async function (req, res, next) {
  try {
    req.check('websiteId', 'Invalid websiteId').exists();

    const errors = req.validationErrors();
    if (errors) {
      res.send(error(new ParamsError(errors)));
    } else {
      const websiteId = req.params.websiteId;
      get_website_current_domain(websiteId)
        .then(domain => res.send(domain))
        .catch(err => res.send(err)); 
    }
  } catch (err) {
    console.log(err);
    res.send(error(new ServerError(err))); 
  }
});

/**
 * CREATE
 */

router.post('/users/create', async function (req, res, next) {
  try {
    req.check('email', 'Invalid Email').exists();
    req.check('password', 'Invalid Password').exists();
    req.check('confirmPassword', 'Invalid Password Confirmation').exists().equals(req.body.password);
    req.check('app', 'Invalid user Type').exists();
    req.check('cookie', 'User not logged in').exists();

    const errors = req.validationErrors();
    if (errors) {
      res.send(error(new ParamsError(errors)));
    } else {
      const user_id = await verify_user(res, req.body.cookie, true);
      if (user_id !== -1) {
        const email = req.body.email;
        const password = req.body.password;
        const type = req.body.app;
        const websites = req.body.websites;

        create_user(email, password, type, websites)
          .then(success => res.send(success))
          .catch(err => res.send(err));
      }
    }
  } catch (err) {
    console.log(err);
    res.send(error(new ServerError(err))); 
  }
});

router.post('/tags/create', async function (req, res, next) {
  try {
    req.check('name', 'Invalid Name').exists();
    req.check('observatorio', 'Invalid Observatorio').exists();
    req.check('cookie', 'User not logged in').exists();

    const errors = req.validationErrors();
    if (errors) {
      res.send(error(new ParamsError(errors)));
    } else {
      const user_id = await verify_user(res, req.body.cookie, true);
      if (user_id !== -1) {
        const name = req.body.name;
        const observatorio = req.body.observatorio;
        const websites = JSON.parse(req.body.websites);

        create_official_tag(name, observatorio, websites)
          .then(success => res.send(success))
          .catch(err => res.send(err));
      }
    }
  } catch (err) {
    console.log(err);
    res.send(error(new ServerError(err))); 
  }
});

router.post('/entities/create', async function (req, res, next) {
  try {
    req.check('shortName', 'Invalid ShortName').exists();
    req.check('longName', 'Invalid LongName').exists();
    req.check('cookie', 'User not logged in').exists();

    const errors = req.validationErrors();
    if (errors) {
      res.send(error(new ParamsError(errors)));
    } else {
      const user_id = await verify_user(res, req.body.cookie, true);
      if (user_id !== -1) {
        const shortName = req.body.shortName;
        const longName = req.body.longName;
        const websites = JSON.parse(req.body.websites);

        create_entity(shortName, longName, websites)
          .then(success => res.send(success))
          .catch(err => res.send(err));
      }
    }
  } catch (err) {
    console.log(err);
    res.send(error(new ServerError(err))); 
  }
});

router.post('/websites/create', async function (req, res, next) {
  try {
    req.check('name', 'Invalid Name').exists();
    req.check('domain', 'Invalid Domain').exists();
    req.check('cookie', 'User not logged in').exists();

    const errors = req.validationErrors();
    if (errors) {
      res.send(error(new ParamsError(errors)));
    } else {
      const user_id = await verify_user(res, req.body.cookie, true);
      if (user_id !== -1) {
        const name = req.body.name;
        const domain = decodeURIComponent(req.body.domain);
        const entity_id = req.body.entityId;
        const user_id = req.body.userId;
        const tags = JSON.parse(req.body.tags);

        create_website(name, domain, entity_id, user_id, tags)
          .then(success => res.send(success))
          .catch(err => res.send(err));
      }
    }
  } catch (err) {
    console.log(err);
    res.send(error(new ServerError(err))); 
  }
});

router.post('/domains/create', async function (req, res, next) {
  try {
    req.check('websiteId', 'Invalid WebsiteId').exists();
    req.check('url', 'Invalid Url').exists();
    req.check('cookie', 'User not logged in').exists();

    const errors = req.validationErrors();
    if (errors) {
      res.send(error(new ParamsError(errors)));
    } else {
      const user_id = await verify_user(res, req.body.cookie, true);
      if (user_id !== -1) {
        const website_id = req.body.websiteId;
        const url = decodeURIComponent(req.body.url);

        create_domain(website_id, url)
          .then(success => res.send(success))
          .catch(err => res.send(err));
      }
    }
  } catch (err) {
    console.log(err);
    res.send(error(new ServerError(err))); 
  }
});

router.post('/pages/create', async function (req, res, next) {
  try {
    req.check('domainId', 'Invalid DomainId').exists();
    req.check('uris', 'Invalid Uris').exists();
    req.check('cookie', 'User not logged in').exists();

    const errors = req.validationErrors();
    if (errors) {
      res.send(error(new ParamsError(errors)));
    } else {
      const user_id = await verify_user(res, req.body.cookie, true);
      if (user_id !== -1) {
        const domain_id = req.body.domainId;
        const uris = JSON.parse(req.body.uris);

        create_pages(domain_id, uris)
          .then(success => res.send(success))
          .catch(err => res.send(err));
      }
    }
  } catch (err) {
    console.log(err);
    res.send(error(new ServerError(err))); 
  }
});

/**
 * UPDATE
 */

/**
 * REMOVE
 */

module.exports = router;