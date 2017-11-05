const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
    console.log('Index page')
    res.send('Hello World!');
});

module.exports = router;