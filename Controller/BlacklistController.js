const router = require('../Route/router');
const client = require('../Config/ redisDemo');
const Sanitizer = require('../Controller/validate');


class BlacklistController {

    // add MSISDNs and MNOs
    addMSISDNAndMNO(req, res) {
        const { msisdn, mno } = req.query;
        Sanitizer(msisdn)
            .then((newMsisdn) => {
                client.sadd(mno,newMsisdn, (err, data) => {
                    if (!err) {
                        console.log('Saved Successfully')
                        return res.send({
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
            })
            .catch((err) => {
                return res.send({
                    code: 400,
                    error: true,
                    message: err
                })
            })
 
    }

   
    // fetching MSISDNs according to their respective MNOs

    fetchMSISDNAndMNO(req, res) {
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
    }

    // delete MSISDNs and MNOs
    deleteMSISDN (req, res) {
                const { mno, msisdn } = req.query;
                client.srem(mno, msisdn, (err, data) => {
                if (data == 1) {
                    console.log('Deleted Successfully')
                    return res.send ({
                        error: false,
                        message: 'Deleted Successfully', data
                    })
                } else {
                    console.log('Unable to Delete')
                    return res.send({
                        error: true,
                        message: 'Unable to Delete'
                    })
                }
                })
            }
}

module.exports = BlacklistController;