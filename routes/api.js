const express = require('express');
const router = express.Router();
const Irc = require('../irc/index')

const irc = new Irc();

const actions = require('../irc/actions');

router.get('/', (req, res, next) => {
    res.json(actions);
});

router.get('/officetv', (req, res, next) => {
    const allowedActions = actions[0].actions;
    res.json(allowedActions);
});

router.get('/officetv/power', (req, res, next) => {
    const thisAction = actions[0].actions['power']
    irc.send('officetv', thisAction);
    res.json({action: thisAction});
});

router.get('/officetv/channel/:action', (req, res, next) => {
    const action = req.params.action.toLowerCase();
    var thisAction = '';
    if (action === 'up' || action === 'down') {
        thisAction = actions[0].actions['ch' + action];
    } else {
        thisAction = actions[0].actions['ch'] + action;
    }
    irc.send('officetv', thisAction);
    res.json({action: thisAction});
});

router.get('/officetv/volume/:dir', (req, res, next) => {
    const dir = req.params.dir.toLowerCase();
    const thisAction = actions[0].actions['v' + dir]
    irc.send('officetv', thisAction);
    res.json({action: thisAction});
});

router.get('/officetv/mute', (req, res, next) => {
    const thisAction = actions[0].actions['mute']
    irc.send('officetv', thisAction);
    res.json({action: thisAction});
});

module.exports = router;