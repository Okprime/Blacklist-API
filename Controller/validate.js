            const Sanitizer = (phoneNumber, plus) => {
              return new Promise ((resolve, reject) =>{
                let msisdn = phoneNumber;
              if (msisdn) {
                if (msisdn.length === 14) {
                  msisdn = `234${msisdn.substr(4)}`;
                }

                msisdn = msisdn.replace(/\s+/g, '');
                msisdn = msisdn.replace('+', '');

                if (!Number.isNaN(msisdn)) {
                  if (msisdn.match(/^234/i)) {
                    msisdn = `0${msisdn.substr(3)}`;
                  }
                  if (msisdn.length === 11) {
                    msisdn = `+234${msisdn.substr(1)}`;
                    if (!plus) {
                      msisdn = msisdn.replace('+', '');
                    }
                    return resolve(msisdn);
                  } else {
                    return reject('Invalid msisdn');
                  }
                }

                return '';
              }

                return '';
              })
          };

    module.exports = Sanitizer;