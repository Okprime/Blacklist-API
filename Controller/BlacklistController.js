const router = require('../Route/router');


class blacklist {

    addMSISDNAndMNO (res, req) {
        const { msisdn, mno } = req.query;
        client.sadd (mno,msisdn, (err, data) => {
            if (!err) {
                console.log('Saved Successfully');
                return res.send ({
                    error: false,
                    message: 'Saved Successfully', data
                })
            } else {
                console.log('Unable to save data');
                return res.send({
                    error: true,
                    message: 'Unable to save data'
                })
            }
        });
    }
}
