const { cmd } = require("../command");

// ===== CONFIG =====
let autoReactEnabled = false; // default off
const emojis = [
  "😀","😃","😄","😁","😆","😅","😂","🤣","😊","😇","🙂","🙃","😉","😌",
  "😍","🥰","😘","😗","😙","😚","😋","😛","😝","😜","🤪","🤨","🧐","🤓","😎",
  "🤩","🥳","😏","😒","😞","😔","😟","😕","🙁","☹️","😣","😖","😫","😩","🥺",
  "😢","😭","😤","😠","😡","🤬","🤯","😳","🥵","🥶","😱","😨","😰","😥","😓",
  "🤗","🤔","🤭","🤫","🤥","😶","😐","😑","😬","🙄","😯","😦","😧","😮","😲",
  "🥱","😴","🤤","😪","😵","🤐","🥴","🤢","🤮","🤧","😷","🤒","🤕","🤑","🤠",
  "😈","👿","👹","👺","💀","☠️","👻","👽","👾","🤖","🎃"
  // add more emojis if needed (max ~500)
];

// ===== COMMANDS =====
cmd({
  pattern: "mreacton",
  desc: "Turn on automatic emoji reactions",
  category: "utility"
}, async (danuwa, mek, m, { from, reply }) => {
  autoReactEnabled = true;
  reply("*✅ Automatic message reactions are now ON!*");
});

cmd({
  pattern: "mreactoff",
  desc: "Turn off automatic emoji reactions",
  category: "utility"
}, async (danuwa, mek, m, { from, reply }) => {
  autoReactEnabled = false;
  reply("*❌ Automatic message reactions are now OFF!*");
});

// ===== GLOBAL MESSAGE REACTION =====
cmd({
  filter: (text, { sender }) => autoReactEnabled,
  reactAll: true // custom key to mark global reactions
}, async (danuwa, mek, m, { from }) => {
  try {
    // pick a random emoji
    const emoji = emojis[Math.floor(Math.random() * emojis.length)];
    await danuwa.sendMessage(from, { react: { text: emoji, key: m.key } });
  } catch (e) {
    console.error("Failed to react to message:", e);
  }
});
