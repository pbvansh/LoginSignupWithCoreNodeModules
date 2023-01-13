const http = require('http');
const cluster = require('cluster');
const os = require('os')
const { SIGNUP, LOGIN, LISTOFUSERS } = require('./routes');

if (cluster.isMaster) {
    for (let i = 0; i < os.cpus().length; i++) {
        cluster.fork()
    }
} else {
    http.createServer((req, res) => {
        res.write('server run in fork : ' + process.pid + '\n')
        if (req.method == 'POST') {
            if (req.url == '/login') {
                res.write('this is login page')
                LOGIN(req, res);
            }
            else if (req.url == '/signup') {
                res.write('this is signup page')
                SIGNUP(req, res);
            }
            else if (req.url == '/user/list') {
                res.write('\nHere is list of users :')
                LISTOFUSERS(req, res);
            }
            else if (req.url == '/user/email') {
                res.write('\nHere is your information :')
                res.end()
                // SIGNUP(req, res);
            }
        } else if (req.method == 'GET') {
            res.end('GET')
        }
    }).listen(5000)
}

