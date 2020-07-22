const User = require('../models/user');
const Admin = require('../models/admin');
const Cohort = require('../models/cohort');
const Event = require('../models/event');
const Fellow = require('../models/fellow');
const Interest = require('../models/interest');
const Skill = require('../models/skill');
const Volunteer = require('../models/volunteer');


const users = require('../seed/users');
const skills = require('./skills');
const interests = require('./interests');

const createUsers = () => {
    users.forEach(user => {
        const newUser = new User(user)
        newUser.save()
    })
}

const createSkills = () => {
    skills.forEach(skill => {
        const newSkill = new Skill(skill)
        newSkill.save()
    })
}

const createInterests = () => {
    interests.forEach(interest => {
        const newInterest = new Interest(interest)
        newInterest.save()
    })
}

module.exports = {
    createUsers,
    createSkills,
    createInterests,
}