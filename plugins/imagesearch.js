const { cmd } = require("../command");
const fetch = require("node-fetch");

// 🔑 Put your Pexels API key here
const PEXELS_KEY = "quQVT5O0l8OgLnx4Ye4oSraVCKjHYzCyzFLVoesuLVqZZj1NSCa5O0FR";

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
    // Fetch images from Pexels API
    const res = await fetch(`https://api.pexels.com/v1/search?query=${encodeURIComponent(q)}&per_page=6`, {
      headers: { Authorization: PEXELS_KEY }
    });
    const data = await res.json();

    if (!data.photos || !data.photos.length) {
      return reply("*❌ No images found!*");
    }

    // Save pending session (optional)
    pendingImgSearch[sender] = {
      keyword: q,
      results: data.photos,
      timestamp: Date.now()
    };

    // Send images with captions
    for (let i = 0; i < data.photos.length; i++) {
      const img = data.photos[i];
      await danuwa.sendMessage(from, {
        image: { url: img.src.original },
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
