const fs = require('fs');
if (fs.existsSync('config.env')) require('dotenv').config({ path: './config.env' });

function convertToBool(text, fault = 'true') {
    return text === fault ? true : false;
}
module.exports = {
SESSION_ID: process.env.SESSION_ID || "2UtG1BQI#figiCdgP2qjIxDHSEY0J-Hs3sFw9rBwzuyHLvl4zp3c",
ALIVE_IMG: process.env.ALIVE_IMG || "https://res.cloudinary.com/dhpfn4umb/image/upload/v1768838728/i5awjdyhznmxyi8cm16l.jpg",
ALIVE_MSG: process.env.ALIVE_MSG || "*HELLO DEVIL X MD ALIVE NOW | POWERD BY SASANKA CHAMUTH*",
BOT_OWNER: '94774915917',  // Replace with the owner's phone number
AUTO_STATUS_SEEN: 'true',
AUTO_STATUS_REACT: 'true',



};
