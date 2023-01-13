const fs = require('fs/promises')

const getReqBodyData = async (req) => {
    try {
        return new Promise((resolve, rej) => {
            let data = []
            req.on('data', (chunk) => {
                data.push(chunk)
            })
            req.on('end', () => {
                resolve(JSON.parse(data))
            })
        })
    } catch (err) {
        console.log(err);
        return -1;
    }

}

const readDataBase = async () => {
    try {
        const data = await fs.readFile('data.json')
        if (data.length > 0) {
            return JSON.parse(data);
        } else {
            return [];
        }

    } catch (error) {
        console.log(error);
    }

}

const isUniqueUser = async (user, database, res) => {
    return new Promise((resolve, rej) => {
        const ans = database.every((DBuser) => {
            if (DBuser.email === user.email) {
                res.write('\nEmail is already taken.');
                res.end()
                return false
            } else if (DBuser.password === user.password) {
                res.write('\nPlease provide unique password')
                res.end()
                return false
            }
            return true;
        })
        resolve(ans);
    })

}

const checkUserCredential = async (user, database) => {
    return new Promise((resolve, rej) => {
        const ans = database.some((DBuser) => {
            if (DBuser.email === user.email && DBuser.password === user.password) {
                return true
            }
        })
        resolve(ans);
    })
}

const addNewUser = async (user, database) => {
    console.log(user);
    console.log(database.length);
    const newDatabase = JSON.stringify([...database, user])
    fs.writeFile('data.json', newDatabase)
}

module.exports = {
    getReqBodyData,
    readDataBase,
    isUniqueUser,
    addNewUser,
    checkUserCredential
}