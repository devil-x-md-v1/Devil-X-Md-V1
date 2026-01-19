const fs = require('fs');
if (fs.existsSync('config.env')) require('dotenv').config({ path: './config.env' });

function convertToBool(text, fault = 'true') {
    return text === fault ? true : false;
}
module.exports = {
SESSION_ID: process.env.SESSION_ID || "iFsGQLoT#wt9CpWwahD09M8uaBsDZ3EN2U5HvN2p-3KofGp2w_No",
ALIVE_IMG: process.env.ALIVE_IMG || "https://res.cloudinary.com/dhpfn4umb/image/upload/v1768838728/i5awjdyhznmxyi8cm16l.jpg",
ALIVE_MSG: process.env.ALIVE_MSG || "*HELLO DEVIL X MD ALIVE NOW | POWERD BY SASANKA CHAMUTH*",
BOT_OWNER: '94784167385',  // Replace with the owner's phone number
AUTO_STATUS_SEEN: 'true',
AUTO_STATUS_REACT: 'true',



};
