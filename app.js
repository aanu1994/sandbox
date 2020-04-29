const express = require('express');
const axios = require('axios');
const app = express();
const userService = require('./services/userService');


app.use((req, res, next) => {
    console.log(`${req.method} ${req.originalUrl} ${JSON.stringify(req.body) || ''}`);
    next();
});

app.use(express.json());

// Base endpoint giving you a hello and welcome
app.get('/', (req, res) => {
    res.send(
        {
            message: 'Welcome to the Novastone API'
        }
    )
});

// Making a request to a static file on S3. Would be worth making calls to the actual API but authentication handling would be required ---- Phase 1

app.get('/api/user-management/users/:id', (req, res) => {
    
    if(req.params.id) {
        axios.get('https://s3-eu-west-1.amazonaws.com/sandbox.novastone.api/singleUser.json')
        .then((response) => {
            if (response.status == 200) {
                return res.send(
                        response.data
                );
            }
        });
    }
});

app.get('/api/user-management/users', (req, res) => {
    
    axios.get('https://s3-eu-west-1.amazonaws.com/sandbox.novastone.api/listOfUsers.json')
    .then((response) => {
        if (response.status == 200) {
            return res.send(
                    response.data
            );
        }
    });
});

//Post endpoint for creating users

app.post('/api/user-management/users', (req, res) =>{

    response = userService.createClient(req.body);

    res.status(response.status_code || 200).send(
        response
    )
});

// Had to change the sunning port to be above 1024 as circleci containers only allow sub 1024 ports to be made listeners by adminstrators (darn you)
app.listen(process.env.PORT || 7000, () => {
    console.log(`Welcome to the Novastone Sandbox API environment, you are listening on port: ${process.env.PORT || 7000}`);
});

module.exports = app;