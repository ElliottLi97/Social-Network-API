const connection = require('../config/connection');
const { user, thought } = require('../models');
const { getRandomName, getRandomThoughts } = require('./data');

connection.on('error', (err) => err);

connection.once('open', async () => {
  console.log('connected');

  // Drop existing courses
  await thought.deleteMany({});

  // Drop existing students
  await user.deleteMany({});


  function addThoughtids(thoughtArr){
    let thoughts =[]
    thoughtArr.forEach(thought => thoughts.push(thought._id) )
    return thoughts
  }
  // Create empty array to hold the users
  const users = [];
  // Loop 20 times -- add students to the students array
  for (let i = 0; i < 3; i++) {
    // Get some random assignment objects using a helper function that we imported from ./data

    const username = getRandomName();
    const thoughtsArray = getRandomThoughts(username)
    await thought.collection.insertMany(thoughtsArray)
    console.table(thoughtsArray)
    //thoughts.forEach(thought => console.log(thought._id, thought.username))
    const email = `${username}${Math.floor(Math.random() * (99 - 18 + 1) + 18)}@gmail.com`;
    users.push({
        username,
        email,
        thoughts: addThoughtids(thoughtsArray),
        friends: []
    });
  }

  // Add students to the collection and await the results
  await user.collection.insertMany(users);



  // Log out the seed data to indicate what should appear in the database
  //console.table(users);
  console.info('Seeding complete! 🌱');
  process.exit(0);
});
