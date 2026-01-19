const { cmd } = require("../command");

// Store users who activated status auto-reply
const statusAutoReply = {};

// Predefined Sinhala + English + emoji replies
const replies = [
    "👋 හෙලෝ! Thanks for checking my status! 🌟",
    "🔥 මම busy ඒත්, reply කරන්න soon! 😎",
    "💡 Stay awesome! ඔබට සුභ දවසක්! ☀️",
    "🍿 Watching movies! පසුව reply කරන්නම් 😜",
    "👍 Thanks for visiting my status! ඔබේ support එකට හොඳයි! 💖",
    "👿 Mind your business! 😈 Just kidding! 😁",
    "📌 Remember: Life is short, හුඟාම සතුටු වන්න! ✨"
];

// Function to get a random reply
function getRandomReply() {
    return replies[Math.floor(Math.random() * replies.length)];
}

// Command: .sron → Activate auto-reply
cmd({
    pattern: "sron",
    desc: "Activate WhatsApp status auto-reply",
    category: "utility"
}, async (danuwa, mek, m, { sender, reply }) => {
    statusAutoReply[sender] = true;
    reply("*✅ STATUS AUTO REPLY ACTIVATED!*\n> STATUS AUTO REPLY | DEVIL X MD");
});

// Command: .sroff → Deactivate auto-reply
cmd({
    pattern: "sroff",
    desc: "Deactivate WhatsApp status auto-reply",
    category: "utility"
}, async (danuwa, mek, m, { sender, reply }) => {
    delete statusAutoReply[sender];
    reply("*❌ STATUS AUTO REPLY DEACTIVATED!*\n> STATUS AUTO REPLY | DEVIL X MD");
});

// Listener for status view events
// Replace this with your bot's actual 'status viewed' event
async function onStatusViewed(senderId, viewerName) {
    if (!statusAutoReply[senderId]) return;

    const message = `> STATUS AUTO REPLY | DEVIL X MD\n${getRandomReply()}`;

    // Send auto-reply to the viewer
    await danuwa.sendMessage(senderId, { text: `👀 ${viewerName}, ${message}` });
}

// Optional cleanup interval (not strictly necessary here)
setInterval(() => {
    // Could add auto-expiry if desired
}, 10 * 60 * 1000);

module.exports = { statusAutoReply, onStatusViewed };
