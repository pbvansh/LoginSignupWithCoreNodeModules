const http = require('http');
const cluster = require('cluster');
const os = require('os')
const { SIGNUP, LOGIN, LISTOFUSERS, GETSINGLEUSER } = require('./routes');
const url = require('url');

if (cluster.isMaster) {
    for (let i = 0; i < os.cpus().length; i++) {
        cluster.fork()
    }
} else {
    http.createServer((req, res) => {
        res.setHeader('Content-Type', 'application/json');
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
            else if (req.url.includes('/user/email')) {
                res.write('\nHere is your information :')
                const id = url.parse(req.url, true).query?.id;
                GETSINGLEUSER(req, res, id);
            } else {
                res.writeHead(404, 'Page not found.')
                res.end();
            }
        } else if (req.method == 'GET') {
            res.end('GET')
        }
    }).listen(5000)
}

