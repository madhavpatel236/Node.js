
const validator = require("validator")

const signupValidator = (req) => {

    const { firstName, lastName, emailID, password, gender } = req.body

    if (!firstName || firstName.length > 20) {
        throw new Error("Please enter a valid user name")
    }
    else if (!lastName || lastName.length > 30) {
        throw new Error("please enter a valid last name")
    }
    else if (!emailID) {
        throw new Error("please enter a emailID")
    }
    else if (!validator.isStrongPassword(password)) {
        throw new Error("please enter a strong password")
    }
    else if (gender && !["male", "female", "others"].includes(gender)) {
        throw new Error("please select from a male, female or others gender categories only")
    }




}

module.exports = {
    signupValidator
}
