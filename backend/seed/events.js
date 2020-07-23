const events = [
    {
        start: '2020-03-22 10:00-04',
        end: '2020-06-29 20:00-04',
        topic: '6.2 CAPSTONE',
        description: 'Each year at the close of our technical curriculum, Pursuit Fellows work in teams to build fully-functional apps that they present at our annual Demo Days. This is a critical milestone in their journeys to become professional software developers: Fellows have the opportunity to work in teams while honing their design and presentation skills. Fellows will have a portfolio-worthy project they can show off to potential employers',
        location: 'Pursuit HQ: 47-10 Austell Place, 2nd Fl Long Island City, NY 11101',
        numberOfVolunteers: 9,
        important: true
    },

    {
        start: '2019-11-13 15:00-04',
        end: '2019-11-13 15:45-04',
        topic: 'Let\'s Do Remote Lunch!',
        description: 'Spend your WFH lunch break with 6 of our Fellows! Chat about anything! Get to know our Fellows and share your path to tech. We\'ll share a list of possible topics as well. We\'ll have 3 "Lunch Rooms" over Zoom each day so please choose more than 1 day in case dates get filled up. I\'ll reach back out to confirm your date.',
        location: 'Pursuit HQ: 47-10 Austell Place, 2nd Fl Long Island City, NY 11101',
        numberOfVolunteers: 20,
        important: false
    },

    {
        start: '2020-06-03 13:00-04',
        end: '2020-06-03 13:45-04',
        topic: 'Let\'s Do Remote Lunch!',
        description: 'Spend your WFH lunch break with 6 of our Fellows! Chat about anything! Get to know our Fellows and share your path to tech. We\'ll share a list of possible topics as well. We\'ll have 3 "Lunch Rooms" over Zoom each day so please choose more than 1 day in case dates get filled up. I\'ll reach back out to confirm your date.',
        location: 'Pursuit HQ: 47-10 Austell Place, 2nd Fl Long Island City, NY 11101',
        numberOfVolunteers: 20,
        important: false
    },

    {
        start: '2019-07-01 13:00-04',
        end: '2019-07-01 13:45-04',
        topic: 'Let\'s Do Remote Lunch!',
        description: 'Spend your WFH lunch break with 6 of our Fellows! Chat about anything! Get to know our Fellows and share your path to tech. We\'ll share a list of possible topics as well. We\'ll have 3 "Lunch Rooms" over Zoom each day so please choose more than 1 day in case dates get filled up. I\'ll reach back out to confirm your date.',
        location: 'Pursuit HQ: 47-10 Austell Place, 2nd Fl Long Island City, NY 11101',
        numberOfVolunteers: 20,
        important: false
    },

    {
        start: '2020-02-22 13:00-04',
        end: '2020-02-22 13:45-04',
        topic: 'Let\'s Do Remote Lunch!',
        description: 'Spend your WFH lunch break with 6 of our Fellows! Chat about anything! Get to know our Fellows and share your path to tech. We\'ll share a list of possible topics as well. We\'ll have 3 "Lunch Rooms" over Zoom each day so please choose more than 1 day in case dates get filled up. I\'ll reach back out to confirm your date.',
        location: 'Pursuit HQ: 47-10 Austell Place, 2nd Fl Long Island City, NY 11101',
        numberOfVolunteers: 20,
        important: false
    },

    {
        start: '2020-05-13 10:00-04',
        end: '2020-05-13 10:45-04',
        topic: 'Let\'s Do Remote Breakfast!',
        description: 'Spend your WFH lunch break with 6 of our Fellows! Chat about anything! Get to know our Fellows and share your path to tech. We\'ll share a list of possible topics as well. We\'ll have 3 "Lunch Rooms" over Zoom each day so please choose more than 1 day in case dates get filled up. I\'ll reach back out to confirm your date.',
        location: 'Pursuit HQ: 47-10 Austell Place, 2nd Fl Long Island City, NY 11101',
        numberOfVolunteers: 20,
        important: false
    },

    {
        start: '2020-03-12 13:00-04',
        end: '2020-03-12 13:45-04',
        topic: 'Let\'s Do Remote Lunch!',
        description: 'Spend your WFH lunch break with 6 of our Fellows! Chat about anything! Get to know our Fellows and share your path to tech. We\'ll share a list of possible topics as well. We\'ll have 3 "Lunch Rooms" over Zoom each day so please choose more than 1 day in case dates get filled up. I\'ll reach back out to confirm your date.',
        location: 'Pursuit HQ: 47-10 Austell Place, 2nd Fl Long Island City, NY 11101',
        numberOfVolunteers: 20,
        important: false
    },

    {
        start: '2020-05-04 13:00-04',
        end: '2020-05-04 13:45-04',
        topic: 'Let\'s Do Remote Lunch!',
        description: 'Spend your WFH lunch break with 6 of our Fellows! Chat about anything! Get to know our Fellows and share your path to tech. We\'ll share a list of possible topics as well. We\'ll have 3 "Lunch Rooms" over Zoom each day so please choose more than 1 day in case dates get filled up. I\'ll reach back out to confirm your date.',
        location: 'Pursuit HQ: 47-10 Austell Place, 2nd Fl Long Island City, NY 11101',
        numberOfVolunteers: 20,
        important: false
    },

    {
        start: '2020-04-22 13:00-04',
        end: '2020-04-22 13:45-04',
        topic: 'Let\'s Do Remote Lunch!',
        description: 'Spend your WFH lunch break with 6 of our Fellows! Chat about anything! Get to know our Fellows and share your path to tech. We\'ll share a list of possible topics as well. We\'ll have 3 "Lunch Rooms" over Zoom each day so please choose more than 1 day in case dates get filled up. I\'ll reach back out to confirm your date.',
        location: 'Pursuit HQ: 47-10 Austell Place, 2nd Fl Long Island City, NY 11101',
        numberOfVolunteers: 20,
        important: false
    },

    {
        start: '2020-04-02 17:30-04',
        end: '2020-04-02 19:30-04',
        topic: 'Code Review on Hackathon Projects',
        description: 'Join a group of 4 Fellows on April 2nd at 5:30pm to review their Hackathon projects.You\'ll provide feedback to help them to help improve and implement new features. We\'ll review the rubric you\'ll use to evaluate the projects and then you\'ll work with the groups remotely until 7:30pm. A week later, you\'ll find time with the group to follow-up and review their final products. Volunteers must know Javascript, React, Node.js, PostgresSQL and Express. We are looking for 6 Volunteers.',
            location: 'Pursuit HQ: 47-10 Austell Place, 2nd Fl Long Island City, NY 11101',
        numberOfVolunteers: 6,
        important: true
    },

    {
        start: '2020-06-21 10:00-04',
        end: '2020-06-22 20:00-04',
        topic: 'Hackathon 6.4',
        description: 'Volunteers will conduct two 45-minute 1:1 behavioral interviews using a sample job description and an interviewing guide, Afterwards, you\'ll provide us with feedback through an evaluation form.Interviews will take place virtually over Google Hangouts. We are looking for hiring managers or anyone who conducts interviews regularly. Engineers or tech-adjacent roles are a plus!',
            location: 'Pursuit HQ: 47-10 Austell Place, 2nd Fl Long Island City, NY 11101',
        numberOfVolunteers: 10,
        important: true
    },

    {
        start: '2020-06-15 00:00-04',
        end: '2020-06-15 23:59-04',
        topic: 'Capstone Demo Day',
        description: 'Volunteers will conduct two 45-minute 1:1 technical interviews using a question bank and an interviewing guide, Afterwards, you\'ll provide us with feedback through an evaluation form.Interviews will take place virtually over Google Hangouts and repl. We are looking for hiring managers or anyone who conducts interviews regularly.',
            location: 'Pursuit HQ: 47-10 Austell Place, 2nd Fl Long Island City, NY 11101',
        numberOfVolunteers: 10,
        important: true
    },

    {
        start: '2020-05-13 09:00-04',
        end: '2020-05-13 17:30-04',
        topic: 'Conduct Virtual Behavioral Interviews',
        description: 'Volunteers will conduct two 45-minute 1:1 behavioral interviews using a sample job description and an interviewing guide, Afterwards, you\'ll provide us with feedback through an evaluation form.Interviews will take place virtually over Google Hangouts. We are looking for hiring managers or anyone who conducts interviews regularly. Engineers or tech-adjacent roles are a plus!',
            location: 'Pursuit HQ: 47-10 Austell Place, 2nd Fl Long Island City, NY 11101',
        numberOfVolunteers: 10,
        important: true
    },

    {
        start: '2020-01-11 09:00-04',
        end: '2020-01-11 17:30-04',
        topic: 'Conduct Virtual Technical Interviews',
        description: 'Volunteers will conduct two 45-minute 1:1 technical interviews using a question bank and an interviewing guide, Afterwards, you\'ll provide us with feedback through an evaluation form.Interviews will take place virtually over Google Hangouts and repl. We are looking for hiring managers or anyone who conducts interviews regularly.',
            location: 'Pursuit HQ: 47-10 Austell Place, 2nd Fl Long Island City, NY 11101',
        numberOfVolunteers: 10,
        important: true
    },

    {
        start: '2020-05-26 00:00-04',
        end: '2020-05-28 23:59-04',
        topic: 'Staff Prep for Capstone',
        description: 'Faculty all-hands-on-deck roundtable regarding Capstone in 2020. Discussion and breakout rooms to help facilitate open dialogue and brainstorming. Virtual doughnuts will also be served.',
        location: 'Zoom: https://zoom.us/my/alejos',
        numberOfVolunteers: 6,
        important: false
    },

    {
        start: '2020-05-25 00:00-04',
        end: '2020-05-25 23:59-04',
        topic: '6.1 Capstone Tech Showcase',
        description: 'A showcase. Volunteers will conduct two 45-minute 1:1 technical interviews using a question bank and an interviewing guide, Afterwards, you\'ll provide us with feedback through an evaluation form.Interviews will take place virtually over Google Hangouts and repl. We are looking for hiring managers or anyone who conducts interviews regularly.',
            location: 'Pursuit HQ: 47-10 Austell Place, 2nd Fl Long Island City, NY 11101',
        numberOfVolunteers: 10,
        important: true
    },

    {
        start: '2020-06-13 10:00-04',
        end: '2020-06-13 15:00-04',
        topic: 'Pursuit + Clorox DTC 6.2 FullStack Web Technical Showcase',
        description: 'After several intensive months of training, Pursuit’s 6.2 FullStack Web fellows have spent the past 8 weeks working with volunteer mentors to build their capstone projects - original and innovative web applications from ideation to deployment. The Technical Showcase is an opportunity for Fellows to present their projects to industry professionals and receive technical feedback on their projects and pitches.  We are thrilled to partner with Clorox DTC on this event to celebrate the accomplishments of the 6.2 FullStack Web Fellows and further our shared goal of creating access to opportunity for everyone.  Join us to celebrate!',
            location: 'https://zoom.us/my/alejos',
        numberOfVolunteers: 10,
        important: true
    },

    {
        start: '2020-06-8 13:00-04',
        end: '2020-06-8 15:00-04',
        topic: 'Google Remote Onsite',
        description: 'Take some time getting to know some Google Engineers for an inside look at what it’s like to work at Google!',
        location: 'https://zoom.us/my/alejos',
        numberOfVolunteers: 10,
        important: false
    },

    {
        start: '2019-06-23 10:00-04',
        end: '2019-06-30 18:00-04',
        topic: '6.2 Welcome Week',
        description: 'Let’s Welcome our new group of fellows to their first week at Pursuit.',
            location: 'Pursuit HQ: 47-10 Austell Place, 2nd Fl Long Island City, NY 11101',
        numberOfVolunteers: 20,
        important: true
    },

    {
        start: '2019-08-08 19:00-04',
        end: '2019-08-08 20:30-04',
        topic: 'Industry Fluency: Career Pathways with Dion Ridley',
        description: 'I\'m excited to invite you to your first Industry Fluency event - a tech talk with Dion Ridley',
            location: 'Pursuit HQ: 47-10 Austell Place, 2nd Fl Long Island City, NY 11101',
        numberOfVolunteers: 20,
        important: false
    },

    {
        start: '2019-10-24 17:45-04',
        end: '2019-10-24 20:00-04',
        topic: 'Nomad Health Site Visit',
        description: 'Excited to have you join us for the Nomad Health Site Visit!',
        location: '335 Madison Ave 5th Floor, New York, NY 10017',
        numberOfVolunteers: 5,
        important: false
    },
        
    {
        start: '2019-11-16 10:00-04',
        end: '2019-11-16 13:00-04',
        topic: '6.2: Professional Skills: Diversity & Inclusion in Tech Workshop',
        description: 'Join us to learn about diversity and inclusion in the workplace and how to foster it.',
        location: 'Pursuit HQ: 47-10 Austell Place, 2nd Fl Long Island City, NY 11101',
        numberOfVolunteers: 5,
        important: false
    }
]

module.exports = events;