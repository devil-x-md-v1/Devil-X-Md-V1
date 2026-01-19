const { cmd } = require("../command");
const fetch = require("node-fetch");

// 🔑 Put your Bing API key here (Sinhala)
const BING_KEY = "e0dfa855cbebb1df6314162d17b179516a02fcd6377008e9000de9ff730b95e1";
const BING_ENDPOINT = "https://api.bing.microsoft.com/v7.0/images/search";

// Pending session (for future upgrades like next/prev)
const pendingImgSearch = {};

cmd({
  pattern: "searchpics",
  alias: ["pics","imgsearch"],
  react: "🖼️",
  desc: "Search pics by text and send images",
  category: "search",
  filename: __filename
}, async (danuwa, mek, m, { from, q, reply, sender }) => {
  if (!q) return reply("*❌ Usage:* `.searchpics <keyword>`\nExample: `.searchpics nature`");

  reply("*🖼️ Searching images...*");

  try {
    // Fetch images from Bing API
    const res = await fetch(`${BING_ENDPOINT}?q=${encodeURIComponent(q)}&count=6`, {
      headers: { "Ocp-Apim-Subscription-Key": BING_KEY }
    });
    const data = await res.json();

    if (!data.value || !data.value.length) {
      return reply("*❌ No images found!*");
    }

    // Save pending session (optional)
    pendingImgSearch[sender] = {
      keyword: q,
      results: data.value,
      timestamp: Date.now()
    };

    // Send images with English captions
    for (let i = 0; i < data.value.length; i++) {
      const img = data.value[i];
      await danuwa.sendMessage(from, {
        image: { url: img.contentUrl },
        caption: `🖼️ DEVIL X MD | IMG SEARCH CMD\nSearch keyword: ${q}\nImage #${i+1}`
      }, { quoted: mek });
    }

  } catch (err) {
    console.error(err);
    reply("*❌ Failed to fetch images.*");
  }
});

// Cleanup old pending sessions every 10 minutes
setInterval(() => {
  const now = Date.now();
  const timeout = 10*60*1000;
  for (const s in pendingImgSearch) if (now - pendingImgSearch[s].timestamp > timeout) delete pendingImgSearch[s];
}, 5*60*1000);

module.exports = { pendingImgSearch };
