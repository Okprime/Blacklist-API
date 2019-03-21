const express = require('express');
const app = express();
const router = require('./Route/router');


const port = 4001;

app.get('/', (req, res) => {
    res.send('Blacklist API');
});

app.use(router)

app.listen(port, () => {
    console.log(`Server is active on port ${port}`);
});
