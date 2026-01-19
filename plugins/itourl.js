const { cmd } = require("../command");
const axios = require("axios");
const FormData = require("form-data");

const IMGBB_API_KEY = "0148f06c5aaf8c10c6c6d91990f13d33";

cmd({
  pattern: "itourl",
  react: "🖼️",
  desc: "👿 CONVERT IMAGE TO URL | DEVIL X MD 👿",
  category: "tools",
  filename: __filename
}, async (danuwa, mek, m, { from, reply }) => {

  // check reply image
  const quoted = m.quoted;
  if (!quoted || !quoted.imageMessage) {
    return reply("*❌ Reply to an image with `.itourl`*");
  }

  reply("*⏳ Uploading image...*");

  try {
    // download image buffer
    const buffer = await danuwa.downloadMediaMessage(quoted);

    const form = new FormData();
    form.append("image", buffer.toString("base64"));

    const res = await axios.post(
      `https://api.imgbb.com/1/upload?key=${IMGBB_API_KEY}`,
      form,
      { headers: form.getHeaders() }
    );

    const imageUrl = res.data.data.url;

    await reply(
      `*✅ Image Uploaded Successfully!*\n\n` +
      `🔗 *URL:* ${imageUrl}`
    );

  } catch (e) {
    console.error(e);
    reply("*❌ Failed to upload image!*");
  }
});
