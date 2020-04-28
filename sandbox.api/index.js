const express = require('express');
const axios = require('axios');
const app = express();
const userService = require('./services/userService');

app.use((req, res, next) => {
    console.log(`${req.method} ${req.originalUrl} ${JSON.stringify(req.body)}`);
    next();
});

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Welcome to the bucky api!!!!');
});

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

app.post('/api/user-management/users', (req, res) =>{

    response = userService.createClient(req.body);

    res.status(response.status_code || 200).send(
        response
    )
});

app.listen(process.env.PORT || 80, () => {
    console.log(`Welcome to the Novastone Sandbox API environment, you are listening on port: ${process.env.PORT || 80}`);
});
