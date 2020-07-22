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
const cohorts = require('./cohorts')

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

const createCohorts = () => {
    cohorts.forEach(cohort => {
        const newCohort = new Cohort(cohort)
        newCohort.save()
    })
}

module.exports = {
    createUsers,
    createSkills,
    createInterests,
    createCohorts,
}