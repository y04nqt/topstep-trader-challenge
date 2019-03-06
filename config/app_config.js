const compression = require('compression');
const bodyParser = require('body-parser');
const lusca = require('lusca');
const expressValidator = require('express-validator');
const expressStatusMonitor = require('express-status-monitor');

module.exports = (app) => {
  // Express configuration
  app.set('host', process.env.OPENSHIFT_NODEJS_IP || '0.0.0.0');
  app.set('port', process.env.PORT || process.env.OPENSHIFT_NODEJS_PORT || 3000);

  app.use(expressStatusMonitor());

  app.use(compression());

  app.use(bodyParser.json());

  app.use(bodyParser.urlencoded({ extended: true }));

  app.use(expressValidator());

  app.use(lusca.xssProtection(true));

  app.use((req, res, next) => {
    res.locals.user = req.user;
    next();
  });
};
