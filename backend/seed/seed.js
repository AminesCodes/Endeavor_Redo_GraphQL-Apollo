const User = require('../models/user');
const Admin = require('../models/admin');
const Cohort = require('../models/cohort');
const Event = require('../models/event');
const Fellow = require('../models/fellow');
const Interest = require('../models/interest');
const Skill = require('../models/skill');
const Volunteer = require('../models/volunteer');
const interest = require('../models/interest');
const fellow = require('../models/fellow');
const user = require('../models/user');


const users = require('../seed/users');

const createUsers = () => {
    users.forEach(user => {
        const newUser = new User(user)
        newUser.save()
    })
}

module.exports = {
    createUsers,
}