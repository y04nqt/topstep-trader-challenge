// imports
const express = require('express');
const errorHandler = require('errorhandler');
const path = require('path');
const chalk = require('chalk');


// Create Express server
const app = express();

// Express configuration

require('./config/app_config')(app);

require('./config/app_routes')(app);


// Error Handler
app.use(errorHandler());

// Start Express server
app.listen(app.get('port'), () => {
  console.log('%s App is running at http://localhost:%d in %s mode', chalk.green('✓'), app.get('port'), app.get('env'));
  console.log('  Press CTRL-C to stop\n');
});

module.exports = app;
