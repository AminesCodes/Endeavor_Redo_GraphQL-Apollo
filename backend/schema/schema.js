const graphql = require('graphql');

const { 
    GraphQLObjectType,
    GraphQLString,
    GraphQLBoolean,
    GraphQLInt,
    GraphQLID,
    GraphQLNonNull,
    GraphQLList,
    GraphQLSchema 
} = graphql;

const { formatStr } = require('../helpers/helpers');

const Admin = require('../models/admin');
const Cohort = require('../models/cohort');
const Event = require('../models/event');
const Fellow = require('../models/fellow');
const Interest = require('../models/interest');
const Skill = require('../models/skill');
const User = require('../models/user');
const Volunteer = require('../models/volunteer');


const UserType = new GraphQLObjectType({
    name: 'User',
    fields: () => ({
        id: { type: GraphQLID },
        email: { type: GraphQLString },
        role: { type: GraphQLString },
        deleted: { type: GraphQLString },
        created: { type: GraphQLString }
    })
})

const AdminType = new GraphQLObjectType({
    name: 'Admin',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        userId: { type: GraphQLID },
        picture: { type: GraphQLString },
        admin: { type: GraphQLBoolean },
        eGrid: { type: GraphQLBoolean },
        vGrid: { type: GraphQLBoolean },
        deleted: { type: GraphQLString },
        created: { type: GraphQLString },
        identification: {
            type: UserType,
            resolve(parent, args) {
                return User.findById(parent.userId);
            }
        }
    })
})

const VolunteerType = new GraphQLObjectType({
    name: 'Volunteer',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        userId: { type: GraphQLID },
        confirmed: { type: GraphQLBoolean },
        picture: { type: GraphQLString },
        company: { type: GraphQLString },
        parsedCompany: { type: GraphQLString },
        title: { type: GraphQLString },
        bio: { type: GraphQLString },
        linkedIn: { type: GraphQLString },
        publicProfile: { type: GraphQLBoolean },
        eGrid: { type: GraphQLBoolean },
        vGrid: { type: GraphQLBoolean },
        deleted: { type: GraphQLString },
        created: { type: GraphQLString },
        identification: {
            type: UserType,
            resolve(parent, args) {
                return User.findById(parent.userId);
            }
        },
        skillsList: {
            type: new GraphQLList(SkillType),
            resolve(parent, args) {
                return Skill.find({ _id: {$in:  parent.skills} })
            }
        },
        interestsList: {
            type: new GraphQLList(InterestType),
            resolve(parent, args) {
                return Interest.find({ _id: {$in:  parent.interests} })
            }
        },
        confirmedEvents: {
            type: new GraphQLList(EventType),
            resolve(parent, args) {
                return Event.find({ _id: {$in:  parent.events.confirmed} })
            }
        },
        pendingEvents: {
            type: new GraphQLList(EventType),
            resolve(parent, args) {
                return Event.find({ _id: {$in:  parent.events.pending} })
            }
        },
    })
})

const FellowType = new GraphQLObjectType({
    name: 'Fellow',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        userId: { type: GraphQLID },
        picture: { type: GraphQLString },
        cohortId: { type: GraphQLID },
        bio: { type: GraphQLString },
        linkedIn: { type: GraphQLString },
        github: { type: GraphQLString },
        wantMentor: { type: GraphQLBoolean },
        eGrid: { type: GraphQLBoolean },
        vGrid: { type: GraphQLBoolean },
        deleted: { type: GraphQLString },
        created: { type: GraphQLString },
        identification: {
            type: UserType,
            resolve(parent, args) {
                return User.findById(parent.userId);
            }
        },
        cohort: {
            type: CohortType,
            resolve(parent, args) {
                return Cohort.findById(parent.cohortId);
            }
        }
    })
})

const SkillType = new GraphQLObjectType({
    name: 'Skill',
    fields: () => ({
        id: { type: GraphQLID },
        skill: { type: GraphQLString }
    })
})

const InterestType = new GraphQLObjectType({
    name: 'Interest',
    fields: () => ({
        id: { type: GraphQLID },
        interest: { type: GraphQLString }
    })
})

const CohortType = new GraphQLObjectType({
    name: 'Cohort',
    fields: () => ({
        id: { type: GraphQLID },
        cohort: { type: GraphQLString },
        class: { type: GraphQLString }
    })
})

const EventType = new GraphQLObjectType({
    name: 'Event',
    fields: () => ({
        id: { type: GraphQLID },
        start: { type: GraphQLString },
        end: { type: GraphQLString },
        topic: { type: GraphQLString },
        description: { type: GraphQLString },
        staffDescription: { type: GraphQLString },
        attendees: {
            type: new GraphQLList(CohortType),
            resolve(parent, args) {
                return Cohort.find({ _id: {$in:  parent.attendees} })
            }
        },
        location: { type: GraphQLString },
        instructor: {
            type: new GraphQLList(AdminType),
            resolve(parent, args) {
                return Admin.find({ _id: {$in:  parent.instructor} })
            }
        },
        numberOfVolunteers: { type: GraphQLInt },
        confirmedVolunteers: {
            type: new GraphQLList(VolunteerType),
            resolve(parent, args) {
                return Volunteer.find({ _id: {$in:  parent.volunteers.confirmed} })
            }
        },
        pendingVolunteers: {
            type: new GraphQLList(VolunteerType),
            resolve(parent, args) {
                return Volunteer.find({ _id: {$in:  parent.volunteers.pending} })
            }
        },
        materialsUrl: { type: GraphQLString },
        important: { type: GraphQLBoolean },
        created: { type: GraphQLString },
        deleted: { type: GraphQLString }
    })
})



const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        user: {
            type: UserType,
            args: { id: {type: GraphQLID}}, 
            resolve(parent, args){ 
                return User.findById(args.id);
            }
        },

        users: {
            type: new GraphQLList(UserType),
            resolve(parent, args){
                return User.find({});
            }
        },

        admin: {
            type: AdminType,
            args: { id: {type: GraphQLID}}, 
            resolve(parent, args){ 
                return Admin.findById(args.id)
            }
        },

        admins: {
            type: new GraphQLList(AdminType),
            resolve(parent, args){ 
                return Admin.find({})
            }
        },

        volunteer: {
            type: VolunteerType,
            args: { id: {type: GraphQLID} }, 
            resolve(parent, args){ 
                return Volunteer.findById(args.id)
            }
        },

        volunteers: {
            type: new GraphQLList(VolunteerType),
            resolve(parent, args){ 
                return Volunteer.find({})
            }
        },

        fellow: {
            type: FellowType,
            args: { id: {type: GraphQLID} }, 
            resolve(parent, args){ 
                return Fellow.findById(args.id)
            }
        },

        fellows: {
            type: new GraphQLList(FellowType),
            resolve(parent, args){ 
                return Fellow.find({})
            }
        },

        skill: {
            type: SkillType,
            args: { id: {type: GraphQLID} },
            resolve(parent, args) {
                return Skill.findById(args.id);
            }
        },

        skills: {
            type: new GraphQLList(SkillType),
            resolve(parent, args) {
                return Skill.find({});
            }
        },

        interest: {
            type: InterestType,
            args: { id: {type: GraphQLID} },
            resolve(parent, args) {
                return Interest.findById(args.id);
            }
        },

        interests: {
            type: new GraphQLList(InterestType),
            resolve(parent, args) {
                return Interest.find({});
            }
        },

        cohort: {
            type: CohortType,
            args: { id: {type: GraphQLID} },
            resolve(parent, args) {
                return Cohort.findById(args.id);
            }
        },

        cohorts: {
            type: new GraphQLList(CohortType),
            resolve(parent, args) {
                return Cohort.find({}).sort([['cohort', 1]]);
                return Cohort.find({}).sort([['class', 1], ['cohort', -1]]).limit(2);
            }
        },

        event: {
            type: EventType,
            args: { id: {type: GraphQLID} },
            resolve(parent, args) {
                return Event.findById(args.id);
            }
        },

        events: {
            type: new GraphQLList(EventType),
            resolve(parent, args) {
                return Event.find({}).sort([['star', 1], ['end', -1]]);
            }
        }
    }
});

const inputEventType = {
    eventId: { type: GraphQLID },
    start: { type: new GraphQLNonNull(GraphQLString) },
    end: { type: new GraphQLNonNull(GraphQLString) },
    topic: { type: new GraphQLNonNull(GraphQLString) },
    description: { type: new GraphQLNonNull(GraphQLString) },
    staffDescription: { type: GraphQLString },
    attendees: { type: new GraphQLNonNull(GraphQLID) },
    location: { type: new GraphQLNonNull(GraphQLString) },
    instructor: { type: new GraphQLNonNull(GraphQLID) },
    numberOfVolunteers: { type: GraphQLInt },
    materialsUrl: { type: GraphQLString },
    important: { type: GraphQLBoolean },
};

const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addUser: {
            type: UserType,
            args: {
                email: { type: new GraphQLNonNull(GraphQLString) },
                password: { type: new GraphQLNonNull(GraphQLString) },
                role: { type: new GraphQLNonNull(GraphQLString) },
            },
            resolve(parent, args) {
                const newUser = new User({
                    email: args.email,
                    password: args.password,
                    role: args.role
                });
                return newUser.save();
            }
        },

        addAdmin: {
            type: AdminType,
            args: {
                email: { type: new GraphQLNonNull(GraphQLString) },
                password: { type: new GraphQLNonNull(GraphQLString) },
                name: { type: new GraphQLNonNull(GraphQLString) },
            },
            async resolve(parent, args) {
                const existingUser = await User.findOne({ email: args.email});
                if (existingUser && (existingUser.role === 'admin' || existingUser.role === 'staff')) {
                    // TODO: COMPARE ENCRYPTED PASSWORDS
                    if (existingUser.password === args.password) {
                        const newAdmin = new Admin({
                            name: args.name,
                            userId: existingUser._id,
                        }); 
                        return newAdmin.save();
                    } else {
                        // TODO: FIND A WAY TO HANDLE ERROR: password not matching
                        return null
                    }
                }
                // TODO: FIND A WAY TO HANDLE ERROR: user does not exist
                return null;
            }
        },

        addVolunteer: {
            type: VolunteerType,
            args: {
                email: { type: new GraphQLNonNull(GraphQLString) },
                password: { type: new GraphQLNonNull(GraphQLString) },
                name: { type: new GraphQLNonNull(GraphQLString) },
                company: { type: new GraphQLNonNull(GraphQLString) },
                title: { type: new GraphQLNonNull(GraphQLString) },
                publicProfile: { type: GraphQLBoolean },
            },
            async resolve(parent, args) {
                const newUser = new User({
                    email: args.email,
                    password: args.password,
                    role: 'volunteer'
                });
                const savedUser = await newUser.save();
                
                const newVolunteer = new Volunteer({
                    name: args.name,
                    userId: savedUser._id,
                    company: args.company,
                    parsedCompany: formatStr(args.company),
                    title: args.title,
                    publicProfile: args.publicProfile
                }); 
                return newVolunteer.save();
            }
        },

        addFellow: {
            type: FellowType,
            args: {
                email: { type: new GraphQLNonNull(GraphQLString) },
                password: { type: new GraphQLNonNull(GraphQLString) },
                name: { type: new GraphQLNonNull(GraphQLString) },
                cohortId: { type: new GraphQLNonNull(GraphQLString) },
            },
            async resolve(parent, args) {
                const existingUser = await User.findOne({ email: args.email});
                if (existingUser && existingUser.role === 'fellow') {
                    // TODO: COMPARE ENCRYPTED PASSWORDS
                    if (existingUser.password === args.password) {
                        const newFellow = new Fellow({
                            name: args.name,
                            userId: existingUser._id,
                            cohortId: args.cohortId,
                        }); 
                        return newFellow.save();
                    } else {
                        // TODO: FIND A WAY TO HANDLE ERROR: password not matching
                        return null
                    }
                }
                // TODO: FIND A WAY TO HANDLE ERROR: user does not exist
                return null;
            }
        },

        addSkill: {
            type: SkillType,
            args: {
                skill: { type: new GraphQLNonNull(GraphQLString) },
            },
            resolve(parent, args) {
                const newSkill = new Skill({
                    skill: args.skill
                }); 
                return newSkill.save();
            }
        },

        addInterest: {
            type: InterestType,
            args: {
                interest: { type: new GraphQLNonNull(GraphQLString) },
            },
            resolve(parent, args) {
                const newInterest = new Interest({
                    interest: args.interest
                }); 
                return newInterest.save();
            }
        },

        addCohort: {
            type: CohortType,
            args: {
                cohort: { type: new GraphQLNonNull(GraphQLString) },
                class: { type: new GraphQLNonNull(GraphQLString) },
            },
            resolve(parent, args) {
                const newCohort = new Cohort({
                    cohort: args.cohort,
                    class: args.class
                }); 
                return newCohort.save();
            }
        },

        addEvent: {
            type: EventType,
            args: inputEventType,
            resolve(parent, args) {
                delete args.eventId;
                const newEvent = new Event(args); 
                return newEvent.save();
            }
        },

        updateEvent: {
            type: EventType,
            args: inputEventType,
            resolve(parent, args) {
                if (!args.eventId) return null;
                return Event.findById(args.eventId, (err, targetEvent) => {
                    if (err) {
                        console.log(err);
                        return null;
                    } else {
                        delete args.eventId;
                        Object.assign(targetEvent, args);
                        return targetEvent.save();
                    }
                });
            }
        },

        volunteerForEvent: {
            type: EventType,
            args: {
                eventId: { type: new GraphQLNonNull(GraphQLID) },
                volunteerId: { type: new GraphQLNonNull(GraphQLID) },
            },
            resolve(parent, args) {
                return Event.findById(args.eventId, (err, targetEvent) => {
                    if (err) {
                        console.log(100, err);
                        return null;
                    } else if (!targetEvent.volunteers.confirmed.includes(args.volunteerId) && !targetEvent.volunteers.pending.includes(args.volunteerId)) {
                        targetEvent.volunteers.pending.push(args.volunteerId);
                        return targetEvent.save();
                    }
                    return null;
                });
            }
        },

        removeVolunteerFromEvent: {
            type: EventType,
            args: {
                eventId: { type: new GraphQLNonNull(GraphQLID) },
                volunteerId: { type: new GraphQLNonNull(GraphQLID) },
            },
            resolve(parent, args) {
                return Event.findById(args.eventId, (err, targetEvent) => {
                    if (err) {
                        console.log(err);
                        return null;
                    } else {
                        indexAtPending = targetEvent.volunteers.pending.indexOf(args.volunteerId);
                        indexAtConfirmed = targetEvent.volunteers.confirmed.indexOf(args.volunteerId);
                        if (indexAtPending >= 0) {
                            targetEvent.volunteers.pending.splice(indexAtPending, 1);
                        }
                        if (indexAtConfirmed >= 0) {
                            targetEvent.volunteers.confirmed.splice(indexAtConfirmed, 1);
                        }
                        return targetEvent.save();
                    }
                });
            }
        },

        confirmVolunteerForEvent: {
            type: EventType,
            args: {
                eventId: { type: new GraphQLNonNull(GraphQLID) },
                volunteerId: { type: new GraphQLNonNull(GraphQLID) },
            },
            resolve(parent, args) {
                return Event.findById(args.eventId, (err, targetEvent) => {
                    if (err) {
                        console.log(err);
                        return null;
                    } else {
                        indexAtPending = targetEvent.volunteers.pending.indexOf(args.volunteerId);
                        if (indexAtPending >= 0) {
                            targetEvent.volunteers.pending.splice(indexAtPending, 1);
                            targetEvent.volunteers.confirmed.push(args.volunteerId);
                            return targetEvent.save();
                        }
                        return null // TODO: Could be error also
                    }
                });
            }
        },

        pendVolunteerForEvent: {
            type: EventType,
            args: {
                eventId: { type: new GraphQLNonNull(GraphQLID) },
                volunteerId: { type: new GraphQLNonNull(GraphQLID) },
            },
            resolve(parent, args) {
                return Event.findById(args.eventId, (err, targetEvent) => {
                    if (err) {
                        console.log(err);
                        return null;
                    } else {
                        indexAtConfirmed = targetEvent.volunteers.confirmed.indexOf(args.volunteerId);
                        if (indexAtConfirmed >= 0) {
                            targetEvent.volunteers.confirmed.splice(indexAtConfirmed, 1);
                            targetEvent.volunteers.pending.push(args.volunteerId);
                            return targetEvent.save();
                        }
                        return null // TODO: Could be error also
                    }
                });
            }
        },
    }
})

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
})