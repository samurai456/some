const express = require('express');
const session = require('express-session');
const app = express();

app.use(express.json());
app.use((req, res, next)=>{
    res.setHeader('Access-Control-Allow-Origin', req.get('origin'));
    res.setHeader('Access-Control-Allow-Methods', ['GET', 'POST', 'PUT', 'DELETE']);
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('Access-Control-Allow-Headers', "Content-Type");
    next();
});
app.use(session({secret:'some key', cookie: {sameSite: false} }));

app.post('/', (req, res)=>{
    
    let r = req.session.user;
    req.session.user = {id: 'someUser', password: 'password'};
    res.json(JSON.stringify(r));
});

app.listen(8000, ()=>console.log('good...'));
