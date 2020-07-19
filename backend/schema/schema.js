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
                picture: { type: GraphQLString },
                admin: { type: new GraphQLNonNull(GraphQLBoolean) },
            },
            async resolve(parent, args) {
                const newAdmin = new Admin({
                    name: args.name,
                    userId: args.userId,
                    picture: args.picture,
                    admin: args.admin,
                }); 
                const savedAdmin = await newAdmin.save();
                console.log(savedAdmin)
                return savedAdmin;
                return newAdmin.save();
            }
        },
    }
})

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
})