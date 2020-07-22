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
const cohorts = require('./cohorts');
const fellows = require('./fellows')

const createUsers = () => {
    users.forEach(user => {
        const newUser = new User(user)
        newUser.save()
    })
}

const getAllFellowUsers = async () => {
    return await User.find({ role: 'fellow'})
}

const getAllVolunteerUsers = async () => {
    return await User.find({ role: 'volunteer'})
}

const createSkills = () => {
    skills.forEach(skill => {
        const newSkill = new Skill(skill)
        newSkill.save()
    })
}

const getAllSkills = async () => {
    return await Skill.find({})
}

const createInterests = () => {
    interests.forEach(interest => {
        const newInterest = new Interest(interest)
        newInterest.save()
    })
}

const getAllInterests = async () => {
    return await Interest.find({})
}

const createCohorts = () => {
    cohorts.forEach(cohort => {
        const newCohort = new Cohort(cohort)
        newCohort.save()
    })
}

const getAllCohorts = async () => {
    return await Cohort.find({})
}

const generateRandomUniques = (arr, num) => {
    if (num > arr.length) {
        return arr
    }
    const uniques = [];
    const manipulatedArr = [...arr];
    while (uniques.length < num) {
        const randomIndex = Math.floor(Math.random() * manipulatedArr.length);
        const randomElement = manipulatedArr.splice(randomIndex, 1);
        uniques.push(randomElement[0]);
    }
    return uniques;
}

const createFellows = async () => {
    const cohorts = await getAllCohorts();
    cohorts.splice(0, 2);
    const allFellows = await getAllFellowUsers()
    fellows.forEach(fellow => {
        const lastName = (fellow.name.split(' ')[1]).toLocaleLowerCase();
        const fellowCredentials = allFellows.filter(user =>  user.email.includes(lastName))[0];
        fellow.userId = fellowCredentials._id;
        fellow.cohortId = generateRandomUniques(cohorts, 1)[0]._id;
        const newFellow = new Fellow(fellow);
        newFellow.save();
    })
}

module.exports = {
    createUsers,
    createSkills,
    createInterests,
    createCohorts,
    createFellows,
}