const User = require('../models/user');
const Admin = require('../models/admin');
const Cohort = require('../models/cohort');
const Event = require('../models/event');
const Fellow = require('../models/fellow');
const Interest = require('../models/interest');
const Skill = require('../models/skill');
const Volunteer = require('../models/volunteer');
const EventVolunteer = require('../models/eventVolunteers');


const users = require('../seed/users');
const skills = require('./skills');
const interests = require('./interests');
const cohorts = require('./cohorts');
const fellows = require('./fellows');
const volunteers = require('./volunteers');
const events = require('./events');
const admins = require('./admins');

// ################## HELPER FUNCTIONS #####################
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

// ################## DB GET FUNCTIONS #####################

const getAdminAndStaffUsers = async () => {
    return await User.find({ $or: [{role: 'admin'}, {role: 'staff'}] })
}

const getAllFellowUsers = async () => {
    return await User.find({ role: 'fellow' })
}

const getAllVolunteerUsers = async () => {
    return await User.find({ role: 'volunteer' })
}

const getAllSkills = async () => {
    return await Skill.find({})
}

const getAllInterests = async () => {
    return await Interest.find({})
}

const getAllCohorts = async () => {
    return await Cohort.find({})
}

const getAdminsList = async () => {
    return await Admin.find({})
}

const getFellowsList = async () => {
    return await Fellow.find({})
}

const getVolunteersList = async () => {
    return await Volunteer.find({})
}

const getAllEvents = async () => {
    return await Event.find({})
}

// ################## DB CREATE FUNCTIONS #####################

const createUsers = () => {
    User.collection.drop();
    users.forEach(user => {
        const newUser = new User(user)
        newUser.save()
    })
}

const createSkills = () => {
    Skill.collection.drop();
    skills.forEach(skill => {
        const newSkill = new Skill(skill)
        newSkill.save()
    })
}

const createInterests = () => {
    Interest.collection.drop();
    interests.forEach(interest => {
        const newInterest = new Interest(interest)
        newInterest.save()
    })
}

const createCohorts = () => {
    Cohort.collection.drop();
    cohorts.forEach(cohort => {
        const newCohort = new Cohort(cohort)
        newCohort.save()
    })
}

const createAdmins = async () => {
    Admin.collection.drop();
    const adminAndStaff = await getAdminAndStaffUsers();
    admins.forEach(admin => {
        const firstName = (admin.name.split(' ')[0]).toLocaleLowerCase();
        const adminCredentials = adminAndStaff.filter(user =>  user.email.includes(firstName))[0];
        admin.userId = adminCredentials._id;
        const newAdmin = new Admin(admin);
        newAdmin.save();
    })
}

const createFellows = async () => {
    Fellow.collection.drop();
    const promises = [];
    promises.push(getAllCohorts());
    promises.push(getAllFellowUsers());
    const [ cohorts, allFellows ] = await Promise.all(promises);
    cohorts.splice(0, 2);

    fellows.forEach(fellow => {
        const lastName = (fellow.name.split(' ')[1]).toLocaleLowerCase();
        const fellowCredentials = allFellows.filter(user =>  user.email.includes(lastName))[0];
        fellow.userId = fellowCredentials._id;
        fellow.cohortId = generateRandomUniques(cohorts, 1)[0]._id;
        const newFellow = new Fellow(fellow);
        newFellow.save();
    })
}

const createVolunteers = async () => {
    Volunteer.collection.drop();
    const promises = []
    promises.push(getAllSkills());
    promises.push(getAllInterests());
    promises.push(getAllVolunteerUsers());
    const [ skillsList, interestsList, allVolunteers ] = await Promise.all(promises)

    volunteers.forEach(volunteer => {
        const lastName = (volunteer.name.split(' ')[1]).toLocaleLowerCase();
        const volunteerCredentials = allVolunteers.filter(user =>  user.email.includes(lastName))[0];
        volunteer.userId = volunteerCredentials._id;

        const randomSkills = generateRandomUniques(skillsList, 5);
        const skillsIds = [];
        for (let elem of randomSkills) {
            skillsIds.push(elem._id)
        }
        volunteer.skills = [...skillsIds];

        const randomInterests = generateRandomUniques(interestsList, 3);
        const interestsIds = [];
        for (let elem of randomInterests) {
            interestsIds.push(elem._id)
        }
        volunteer.interests = [...interestsIds];

        const newVolunteer = new Volunteer(volunteer);
        newVolunteer.save();
    })
}

const createEvents = async () => {
    Event.collection.drop();
    const promises = [];
    promises.push(getAllCohorts());
    promises.push(getAdminsList());
    const [ cohorts, instructors ] = await Promise.all(promises);
    instructors.splice(0, 1);
    
    events.forEach(event => {
        event.instructor = generateRandomUniques(instructors, 1)[0]._id;
        event.attendees = generateRandomUniques(cohorts, 1)[0]._id;
        const newEvent = new Event(event);
        newEvent.save();
    })
}

const addVolunteersToEvents = async () => {
    const promises = [];
    promises.push(getAllEvents());
    promises.push(getVolunteersList());
    const [ eventsList, volunteersList ] = await Promise.all(promises);

    
    for (let event of eventsList) {
        const allVolunteers = [...volunteersList]
        const pendingVolunteer = generateRandomUniques(allVolunteers, 5);
        const confirmedVolunteers = pendingVolunteer.splice(0, 2);
        event.volunteers = {
            confirmed: confirmedVolunteers,
            pending: pendingVolunteer
        }
        event.save((err, updatedEvent) => {
            if (err) {
                console.log('ERROR - UPDATE EVENT', err)
            }
            for (let volunteerId of updatedEvent.volunteers.confirmed) {
                Volunteer.findById(volunteerId, (error, volunteer) => {
                    if (!volunteer.events.confirmed.includes(updatedEvent._id)) {
                        volunteer.events.confirmed.push(updatedEvent._id);
                    }
                    volunteer.save()
                })
            }
            for (let volunteerId of updatedEvent.volunteers.pending) {
                Volunteer.findById(volunteerId, (error, volunteer) => {
                    if (!volunteer.events.pending.includes(updatedEvent._id)) {
                        volunteer.events.pending.push(updatedEvent._id);
                    }
                    volunteer.save()
                })
            }
        });
    }
    // eventsList[0].updateOne({}, {materialsUrl: 'testURL'})
    // Event.updateOne({_id: eventsList[0]._id}, {materialsUrl: 'testURL'})
    // eventsList[0].materialsUrl = 'test url, to be deleted later'
    // eventsList[0].save()
    // eventsList[0].save((err, updatedEvent) => {})
    // console.log('Called', eventsList[0]._id)
}
// const createEventVolunteers = async () => {
//     EventVolunteer.collection.drop();
//     const promises = [];
//     promises.push(getAllEvents());
//     promises.push(getVolunteersList());
//     const [ eventsList, volunteersList ] = await Promise.all(promises);

//     for (let event of eventsList) {
//         const randomVolunteer = generateRandomUniques(volunteersList, 3);
//         for (let user of randomVolunteer) {
//             const newEventVolunteer = new EventVolunteer({
//                 eventId: event._id,
//                 volunteerId: user._id,
//                 confirmed: Math.random() > .7
//             });
//             newEventVolunteer.save();
//         }
//     }
// }

// const getAllEventVolunteers = async () => {
//     return await EventVolunteer.find({});
// }



module.exports = {
    createUsers,
    createSkills,
    createInterests,
    createCohorts,
    createAdmins,
    createFellows,
    createVolunteers,
    createEvents,
    // createEventVolunteers,
    addVolunteersToEvents,
}