const fs = require('fs');
if (fs.existsSync('config.env')) require('dotenv').config({ path: './config.env' });

function convertToBool(text, fault = 'true') {
    return text === fault ? true : false;
}

module.exports = {
    // ==========================================
    // 🔑 SESSION & AUTH
    // ==========================================
    SESSION_ID: process.env.SESSION_ID || "ICRAHM;;;HcURgQQT#el1w53_DkYDDW13cEvqw0q80vHfOfnyZO_cyAL0mAUU",
    
    // ==========================================
    // 🚀 STATUS SETTINGS (Optimized for Speed)
    // ==========================================
    AUTO_STATUS_SEEN: process.env.AUTO_STATUS_SEEN || "true",
    AUTO_STATUS_REACT: process.env.AUTO_STATUS_REACT || "true",
    AUTO_STATUS_REPLY: process.env.AUTO_STATUS_REPLY || "false",
    AUTO_STATUS_MSG: process.env.AUTO_STATUS_MSG || "*ICRAHM 𝐌𝐃 𝐈𝐃✅*",
    CUSTOM_STATUS_EMOJIS: process.env.CUSTOM_STATUS_EMOJIS || "❤️,✨,🔥,💯,👑,🥰,😇,🧡",

    // ==========================================
    // 🛡️ ANTI-DELETE & PRIVACY
    // ==========================================
    ANTI_DELETE: process.env.ANTI_DELETE || "false",
    ANTI_DELETE_DM: process.env.ANTI_DELETE_DM || "false",
    ANTI_DEL_PATH: process.env.ANTI_DEL_PATH || "inbox",
    ANTI_CALL: process.env.ANTI_CALL || "false",
    ANTI_VV: process.env.ANTI_VV || "true",
    ALWAYS_ONLINE: process.env.ALWAYS_ONLINE || "true",
    READ_MESSAGE: process.env.READ_MESSAGE || "false",
    READ_CMD: process.env.READ_CMD || "false",

    // ==========================================
    // 🤖 BOT BASICS & OWNER INFO
    // ==========================================
    PREFIX: process.env.PREFIX || ".",
    MODE: process.env.MODE || "public",
    BOT_NAME: process.env.BOT_NAME || "ICRAHM 𝐌𝐃    OWNER_NAME: process.env.OWNER_NAME || "ICRAHM",
    OWNER_NUMBER: process.env.OWNER_NUMBER || "254117061862",
    DEV: process.env.DEV || "254117061862",
    
    // ==========================================
    // 🎨 UI & AUTOMATION
    // ==========================================
    AUTO_BIO: process.env.AUTO_BIO || "true",
    TIME_ZONE: process.env.TIME_ZONE || "Africa/Nairobi", 
    MENU_IMAGE_URL: process.env.MENU_IMAGE_URL || "https://i.ibb.co/7xbz8jRr/a66c659b4c10.jpg",
    ALIVE_IMG: process.env.ALIVE_IMG || "https://i.ibb.co/spswdL2j/6d0c5603b684.jpg",
    DESCRIPTION: process.env.DESCRIPTION || "*ICRAHM 𝚇𝙼𝙳 ICRAHM MD🤖*",
    LIVE_MSG: process.env.LIVE_MSG "ICRAHM 𝐁𝐎𝐓🤖",
    AUTO_TYPING: process.env.AUTO_TYPING || "true",
    AUTO_RECORDING: process.env.AUTO_RECORDING || "false",
    
    // ==========================================
    // ❤️ REACTIONS & INTERACTIONS
    // ==========================================
    AUTO_REACT: process.env.AUTO_REACT || "false",
    CUSTOM_REACT: process.env.CUSTOM_REACT || "false",
    CUSTOM_REACT_EMOJIS: process.env.CUSTOM_REACT_EMOJIS || "💝,💖,💗,❤️‍🩹,❤️,🧡,💛,💚,💙,💜,🤎,🖤,🤍",
    AUTO_STICKER: process.env.AUTO_STICKER || "false",
    AUTO_REPLY: process.env.AUTO_REPLY || "false",
    MENTION_REPLY: process.env.MENTION_REPLY || "false",

    // ==========================================
    // 👥 GROUP MANAGEMENT & SECURITY
    // ==========================================
    WELCOME: process.env.WELCOME || "false",
    ADMIN_EVENTS: process.env.ADMIN_EVENTS || "true",
    ANTI_BAD: process.env.ANTI_BAD || "true",
    ANTI_LINK: process.env.ANTI_LINK || "false",
    ANTI_LINK_KICK: process.env.ANTI_LINK_KICK || "false",
    DELETE_LINKS: process.env.DELETE_LINKS || "true",
    LINK_WHITELIST: "youtube.com,github.com",
    LINK_WARN_LIMIT: 3,
    ANTI_LINK_WARN_MSG: process.env.ANTI_LINK_WARN_MSG || "⚠️ Links are not allowed in this group.",
    ANTI_LINK_KICK_MSG: process.env.ANTI_LINK_KICK_MSG || "🚪 You have been removed for sending links.",
};
