const http = require('http');
const URL = require('url');
const { SIGNUP, LOGIN } = require('./routes');

const app = http.createServer((req, res) => {
    if (req.method == 'POST') {
        // res.end(' post ')
        if (req.url == '/login') {
            res.write('this is login page')
            LOGIN(req,res);
        }
        else if (req.url == '/signup') {
            res.write('this is signup page')
            SIGNUP(req,res);
        }
        // res.end('POST')
    } else if (req.method == 'GET') {
        res.end('GET')
    }
})

app.listen(5000)
