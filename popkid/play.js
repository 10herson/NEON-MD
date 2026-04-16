/**
 * yt-play.js
 * Exact styling for Popkid-MD
 * Requires: axios, yt-search
 */

const axios = require("axios");
const yts = require("yt-search");
const { cmd } = require("../command");
const config = require("../config");

// Exact Newsletter and Bot Info
const NEWSLETTER_JID = "120363423997837331@newsletter";
const NEWSLETTER_NAME = "POPKID MD";
const BOT = "POPKID-MD";

const buildCaption = (type, video) => {
  const banner = type === "video" ? `🎬 POPKID MD VIDEO PLAYER` : `🎶 POPKID MD PLAYER`;
  const duration = video.timestamp || video.duration || "N/A";

  return (
    `*${banner}*\n\n` +
    `╭───────────────◆\n` +
    `│ 📑 Title: ${video.title}\n` +
    `│ ⏳ Duration: ${duration}\n` +
    `╰────────────────◆\n\n` +
    `⏳ *Sending audio...*`
  );
};

const getContextInfo = (query = "") => ({
  forwardingScore: 999,
  isForwarded: true,
  forwardedNewsletterMessageInfo: {
    newsletterJid: NEWSLETTER_JID,
    newsletterName: NEWSLETTER_NAME,
    serverMessageId: -1
  },
  body: query ? `Requested: ${query}` : undefined,
  title: BOT
});

const BASE_URL = process.env.BASE_URL || "https://noobs-api.top";

/* ========== PLAY (audio stream) ========== */
cmd({
  pattern: "play",
  alias: ["p"],
  use: ".play <song name>",
  react: "🎵",
  desc: "Play audio (stream) from YouTube",
  category: "download",
  filename: __filename
},
async (conn, mek, m, { from, args, q, quoted, isCmd, reply }) => {
  const query = q || args.join(" ");
  if (!query) return conn.sendMessage(from, { text: "Please provide a song name." }, { quoted: mek });

  try {
    // 1. YouTube Search
    const search = await yts(query);
    const video = (search && (search.videos && search.videos[0])) || (search.all && search.all[0]);
    if (!video) return conn.sendMessage(from, { text: "No results found." }, { quoted: mek });

    const safeTitle = video.title.replace(/[\\/:*?"<>|]/g, "");
    const fileName = `${safeTitle}.mp3`;
    
    // 2. Fetch using working API
    const apiURL = `${BASE_URL}/dipto/ytDl3?link=${encodeURIComponent(video.videoId || video.url)}&format=mp3`;
    const { data } = await axios.get(apiURL);
    
    if (!data || !data.downloadLink) return conn.sendMessage(from, { text: "Failed to get download link." }, { quoted: mek });

    // 3. Send exact Image Preview with "View Channel" link
    await conn.sendMessage(from, {
      image: { url: video.thumbnail },
      caption: buildCaption("audio", video),
      contextInfo: {
        ...getContextInfo(query),
        externalAdReply: {
            title: NEWSLETTER_NAME,
            body: "Get more info about this message.",
            mediaType: 1,
            sourceUrl: "https://whatsapp.com/channel/0029VaeS6id0VycC9uY09s0F", // View Channel link
            renderLargerThumbnail: false
        }
      }
    }, { quoted: mek });

    // 4. Send Playable Audio (Matching the look in your last photo)
    await conn.sendMessage(from, {
      audio: { url: data.downloadLink },
      mimetype: "audio/mpeg",
      fileName: fileName,
      contextInfo: {
        externalAdReply: {
          title: video.title,
          body: "Popkid-MD Music",
          mediaType: 1,
          thumbnailUrl: video.thumbnail,
          renderLargerThumbnail: false
        }
      }
    }, { quoted: mek });

    // Success Reaction
    await conn.sendMessage(from, { react: { text: "✅", key: mek.key } });

  } catch (e) {
    console.error("[PLAY ERROR]", e);
    await conn.sendMessage(from, { text: "An error occurred while processing your request." }, { quoted: mek });
  }
});
