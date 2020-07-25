require('dotenv').config();

const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose');
const cors = require('cors');

const { graphqlHTTP } = require('express-graphql');
const schema = require('./schema/schema');

const seed = require('./seed/seed');

const app = express();
app.use(cors());

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

const mongooseConfig = { 
    useNewUrlParser: true,
    useUnifiedTopology: true 
};
// Need to copy link from mlab.com and replace username, password, port and database name in .env File
const uri = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PSW}@${process.env.DB_NAME_LINK}/${process.env.DB_NAME}?retryWrites=true&w=majority`;
mongoose.connect(uri, mongooseConfig);
mongoose.connection.once('open', () => {
    console.log('Successfully connected to cloud database');
})


app.use('/api/graphql', graphqlHTTP({
    schema,
    graphiql: true
}));

app.use('/api/seed', async (req, res) => {
    console.log('Seeding database')
    // seed.createUsers();
    // seed.createSkills();
    // seed.createInterests();
    // seed.createCohorts();
    // seed.createAdmins();
    // seed.createFellows();
    // seed.createVolunteers();
    // seed.createEvents();
    seed.addVolunteersToEvents();
    res.send('Database Seeded')
});


const port = process.env.PORT || '2723'
app.listen(port, () => {
    console.log('Listening on port', port);
})