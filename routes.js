const { getReqBodyData, readDataBase, isUniqueUser, addNewUser, checkUserCredential } = require("./helperFun")

const SIGNUP = async (req, res) => {
    const details = await getReqBodyData(req)
    const database = await readDataBase();
    if (database.length > 0) {
        const ans = await isUniqueUser(details, database, res);
        if (ans) {
            addNewUser(details, database)
            res.write('\nSingUp successfully..')
        }
    } else {
        addNewUser(details, database)
        res.write('\nSingUp successfully..')
    }
    res.end();
}

const LOGIN = async (req, res) => {
    const credential = await getReqBodyData(req)
    const database = await readDataBase();
    const valid = await checkUserCredential(credential, database)
    if (valid) {
        res.write('\nLogin Successfully..')
    } else {
        res.write('\nInvalid Creadintials..')
    }
    res.end();
}

const LISTOFUSERS = async (req, res) => {
    const users = await readDataBase();
    res.write(JSON.stringify(users));
    res.end()
}

const GETSINGLEUSER = (req, res) => {
    res.end()
}

module.exports = {
    SIGNUP, LOGIN, LISTOFUSERS, GETSINGLEUSER
}
