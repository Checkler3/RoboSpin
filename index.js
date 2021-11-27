const tmi = require('tmi.js');

// Configuration Options 
// Login, Debug, Channels, etc..
const options = {
    identity: {
        username: 'robospin',
        password: 'oauth:wrni3qs3pdo4mzz4zul51fw5io4nhg',
    },
    options: {
        debug: true,
    },
    channels: 
        ['SpinnyHat']
};

// Initialize the bot
const client = new tmi.client(options);
console.log('initialized client');


// Register event handlers (defined below)
// This is what looks at each message and chat
client.on('message', onMessageHandler);
client.on('connected', onConnectedHandler);

// Connect to Twitch
client.connect();
console.log('connected to client');

client.on('connected', (address, port) => {
    client.action('SpinnyHat', 'RoboSpin has arrived. Bow at my command.');
});
 

// Called every time the bot connects to Twitch chat
function onConnectedHandler (addr, port) {
    console.log(`* Connected to ${addr}:${port}`);
};

function onMessageHandler (target, context, msg, self) {
    if (self) { return; } // Ignore messages from the bot
  
    // Remove whitespace from chat message
    const commandName = msg.trim();
  
    // If the command is known, let's execute it
    if (commandName === '!dice') {
      const num = rollDice();
      client.say(target, `You rolled a ${num}`);
      console.log(`* Executed ${commandName} command`);
    } else {
      console.log(`* Unknown command ${commandName}`);
    }
};
  
  // Function called when the "dice" command is issued
function rollDice () {
    const sides = 6;
    return Math.floor(Math.random() * sides) + 1;
};
