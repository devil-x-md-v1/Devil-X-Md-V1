// plugins/anticall.js
let antiCallStatus = true; // Default ON

module.exports = (sock, cmd) => {

  // === Event Listener for Incoming Calls ===
  sock.ev.on("call", async (calls) => {
    if (!antiCallStatus) return; // If OFF, do nothing

    for (const call of calls) {
      if (call.status !== "offer") continue;

      const jid = call.from;

      try {
        // Reject the call
        await sock.rejectCall(call.id, jid);

        // Optional: send warning
        await sock.sendMessage(jid, {
          text: "❌ *Please do not call this bot!*\nThis is an automated bot 🤖"
        });

        console.log("📞 Auto-rejected call from:", jid);
      } catch (err) {
        console.error("Anti-call error:", err);
      }
    }
  });

  // === Commands ===
  cmd({
    pattern: "anticlon",
    desc: "Turn ON anti-call (auto reject)",
    category: "owner",
    sucReact: "✅",
    owner: true
  }, async (danuwa, mek, m, { reply }) => {
    antiCallStatus = true;
    await reply("*✅ Anti-call turned ON!*");
  });

  cmd({
    pattern: "anticloff",
    desc: "Turn OFF anti-call",
    category: "owner",
    sucReact: "❌",
    owner: true
  }, async (danuwa, mek, m, { reply }) => {
    antiCallStatus = false;
    await reply("*❌ Anti-call turned OFF!*");
  });

};
