const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const BlacklistController = require('../Controller/BlacklistController');

// using bodyparser

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: false }));

// adding MSISDNs and MNOs to the db

router.get('/add', (req, res) => {
    return new BlacklistController().addMSISDNAndMNO(req, res);
});

// fetching MSISDNs according to their respective MNOs

router.get('/list', (req, res) => {
    return new BlacklistController().fetchMSISDNAndMNO(req, res);
});

// delete MSISDNs
router.get('/delete', (req, res) => {
    return new BlacklistController().deleteMSISDN(req, res);
});




module.exports = router;


























