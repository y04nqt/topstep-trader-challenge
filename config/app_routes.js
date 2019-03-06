const path = require('path');
const express = require('express');
const request = require("request");
require('dotenv').config()


module.exports = (app) => {
  app.use('/', express.static('public'));
  app.use('/images', express.static('public/static/images'));
  app.use('/css', express.static('public/static/css'));
  app.use('/js', express.static('public/static/js'));

  app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/html/dist/home.html'));
  });
  app.get('/problem-one', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/html/dist/problem-one.html'));
  });
  app.get('/problem-two', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/html/dist/problem-two.html'));
  });
  app.get('/problem-three', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/html/dist/problem-three.html'));
  });

  app.get('/test-data', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify(
      [


        {
          symbol: 'SPX',
          price: 2780,
          shares: 2,
          action: 'BUY'
        },
        {
          symbol: 'SPX',
          price: 2770,
          shares: 2,
          action: 'SELL'
        },

        {
          symbol: 'SPY',
          price: 277,
          shares: 4,
          action: 'BUY'
        },
        {
          symbol: 'NDX',
          price: 7081,
          shares: 2,
          action: 'BUY'
        },
        {
          symbol: 'SPY',
          price: 236,
          shares: 3,
          action: 'SELL'
        },
        {
          symbol: 'SPY',
          price: 246,
          shares: 1,
          action: 'BUY'
        },
        {
          symbol: 'SPY',
          price: 236,
          shares: 1,
          action: 'SELL'
        },
        {
          symbol: 'NDX',
          price: 7021,
          shares: 1,
          action: 'SELL'
        },

        {
          symbol: 'DXY',
          price: 96,
          shares: 6,
          action: 'BUY'
        },
        {
          symbol: 'NDX',
          price: 7097,
          shares: 1,
          action: 'SELL'
        },
        {
          symbol: 'DXY',
          price: 108,
          shares: 1,
          action: 'SELL'
        },

        {
          symbol: 'UKX',
          price: 7226,
          shares: 2,
          action: 'BUY'
        },
        {
          symbol: 'SPY',
          price: 240,
          shares: 1,
          action: 'SELL'
        },
        {
          symbol: 'UKX',
          price: 7426,
          shares: 2,
          action: 'SELL'
        },
        {
          symbol: 'DXY',
          price: 85,
          shares: 1,
          action: 'SELL'
        },
        {
          symbol: 'DXY',
          price: 98,
          shares: 4,
          action: 'SELL'
        }

      ]
    ));
  });
};
