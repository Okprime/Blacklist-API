const client = require('../Config/ redisDemo');
const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');

// using bodyparser

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: false }));

// adding MSISDNs and MNOs to the db

router.get('/add', (req, res) => {
    return new BlacklistController().addMSISDNAndMNO(res, req);
});

// fetching MSISDNs according to their respective MNOs

router.get('/list', (req, res) => {
    const { mno } = req.query;
    client.smembers(mno, (err, data) => {
        if (!err) {
            console.log('Fetch was Successful');
            return res.send ({
                error: false,
                message: 'Fetch was Successful', data
            })
        } else {
            console.log('Unable to fetch data');
            return res.send({
                error: true,
                message: 'Unable to fetch data'
            })
        }
    })
})

module.exports = router;


























