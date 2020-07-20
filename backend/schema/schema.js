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

const formatStr = str => {
    return str.toLowerCase().replace(/[^a-z0-9]/g, '')
}

const Admin = require('../models/admin');
// const Cohort = require('../models/cohort');
// const Event = require('../models/event');
// const Fellow = require('../models/fellow');
// const Field = require('../models/field');
// const Skill = require('../models/skill');
const User = require('../models/user');
const Volunteer = require('../models/volunteer');
// const VolunteerField = require('../models/volunteerField');
// const VolunteerSkill = require('../models/volunteerSkill');


const UserType = new GraphQLObjectType({
    name: 'User',
    fields: () => ({
        id: { type: GraphQLID },
        email: { type: GraphQLString },
        password: { type: GraphQLString },
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
        // skills: {
        //     type: new GraphQLList(VolunteerSkillType),
        //     resolve(parent, args) {
        //         return VolunteerSkill.find({volunteerId: parent.id});
        //     }
        //     ... get the skills as well after that
        // },
        // interests: {},
    })
})

// const AuthorType = new GraphQLObjectType({
//     name: 'Author',
//     fields: () => ({
//         id: { type: GraphQLID},
//         name: { type: GraphQLString},
//         age: { type: GraphQLInt},
//         books: {
//             type: new GraphQLList(BookType),
//             resolve(parent, args) {
//                 return Book.find({authorId: parent.id});
//             }
//         }
//     })
// })

// const SkillType = new GraphQLObjectType({
//     name: 'Skill',
//     fields: () => ({
//         id: { type: GraphQLID},
//         skill: { type: GraphQLString},
//         deleted: { type: GraphQLString },
//         // volunteers: {
//         //     type: new GraphQLList(VolunteerType),
//         //     resolve(parent, args) {
//         //         // return _.filter(books, {authorId: parent.id})
//         //     }
//         // }
//     })
// });

module.exports = {
    UserType,
    AdminType,
}


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
            args: { id: {type: GraphQLID}}, 
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
    }
});

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
                name: { type: new GraphQLNonNull(GraphQLString) },
                userId: { type: new GraphQLNonNull(GraphQLID) },
                // admin: { type: new GraphQLNonNull(GraphQLBoolean) },
            },
            resolve(parent, args) {
                const newAdmin = new Admin({
                    name: args.name,
                    userId: args.userId,
                    // admin: args.admin,
                }); 
                newAdmin.save();
                return newAdmin.save();
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
                const savedVolunteer = await newVolunteer.save();

                
                
                return savedVolunteer;
            }
        },
    }
})

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
})