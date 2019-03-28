const router = require('../Route/router');
const client = require('../Config/ redisDemo');
const Sanitizer = require('../Controller/validate');


class BlacklistController {

    // add MSISDNs and MNOs
    addMSISDNAndMNO(req, res) {
        let { msisdn, mno } = req.query;
        mno = mno.toString().trim().toUpperCase(); 
        Sanitizer(msisdn)
            .then((newMsisdn) => {
                client.sadd(mno,newMsisdn, (err, data) => {
                    console.info(mno+"===========>", msisdn)
                    if (!err) {
                        if (data === 1) {
                            console.log('MSISDN added sucessfully');
                            return res.send({
                                error:false,
                                message: `${newMsisdn} added successfully`
                            })
                        } if(data === 0) {
                            console.log('Unable to save data');
                            return res.send({
                                error: true,
                                message: `${newMsisdn} already exists`
                            })
                        }
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
        let { mno } = req.query;
        mno = mno.toString().trim().toUpperCase();
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
                let { mno, msisdn } = req.query;
                 mno = mno.toString().trim().toUpperCase();
                 Sanitizer(msisdn).then( newMsisdn =>{
                    client.srem(mno, newMsisdn, (err, data) => {
                    if (data === 1) {
                        console.log('Deleted Successfully')
                        return res.send ({
                            error: false,
                            response: data,
                            message: `${newMsisdn} deleted successfully`
                        })
                    } if(data === 0) {
                        console.log('msisdn not found')
                        return res.send({
                            error: false,
                            response: data,
                            message: `${newMsisdn} does not exist anymore`
                        })
                    }
                    })
                 }).catch( err=>{
                    return res.send({
                        error: false,
                        message: 'Ooops! Something went wrong',
                        response: err,
                        
                    })
                 });
                
            }
}

module.exports = BlacklistController;