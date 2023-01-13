const { getReqBodyData, readDataBase, isUniqueUser, addNewUser } = require("./helperFun")

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
    const data = await readDataBase();
    console.log(data);
    res.end();
}

module.exports = {
    SIGNUP, LOGIN
}

// [{"email":"pratik@gmail.com","password":"pratik123"},{"email":"pratik1@gmail.com","password":"pratik1235"}]