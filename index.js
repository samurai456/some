const express = require('express');
const session = require('express-session');
const cors = require('cors');
const app = express();

app.use(express.json());

app.use(
    session({
        name: "SESS_NAME",
        secret: "SESS_SECRET",
        saveUninitialized: false,
        resave: false,
        cookie: {
            sameSite: false,
            maxAge: 10000,
            httpOnly: true,
        },
    })
);

app.use(
    cors({
        origin: 'https://some-front-test-9098.onrender.com/',
        methods: ["POST", "PUT", "GET", "DELETE"],
        credentials: true,
    })
);

app.post('/', (req, res)=>{
    console.log('request');
    if(req.session.user){
        res.json(JSON.stringify(req.session.user));
        return
    }
    req.session.user = {id: 'someUser', password: 'password11'};
    res.json(JSON.stringify({type: 'making session'}))
});

app.listen(8000, ()=>console.log('good...'));
