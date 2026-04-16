const { cmd } = require('../command');
const axios = require('axios');
const { sendButtons } = require('gifted-btns');

cmd({
    pattern: "apk",
    alias: ["mod", "playstore"],
    desc: "Search and download APK files",
    category: "downloader",
    filename: __filename
}, async (conn, mek, m, { from, q, reply, botFooter, botPic }) => {
    try {
        if (!q) return reply("📂 *Popkid, please provide an app name! (e.g., .apk WhatsApp)*");

        await conn.sendMessage(from, { react: { text: "🔍", key: mek.key } });

        // Fetching data from your EliteProTech API
        const searchUrl = `https://eliteprotech-apis.zone.id/apk?q=${encodeURIComponent(q)}`;
        const { data } = await axios.get(searchUrl);

        if (!data.status || !data.results || data.results.length === 0) {
            return reply("❌ No results found for that application.");
        }

        // Take the most relevant (first) result
        const app = data.results[0];
        const sizeMb = (app.size / (1024 * 1024)).toFixed(2);
        const dateNow = Date.now();

        const fancyCaption = `
╔═══════════════════╗
     📂  *𝐏𝐎𝐏𝐊𝐈𝐃-𝐌𝐃 𝐀𝐏𝐊* 📂
╚═══════════════════╝

📌 *𝐍𝐚𝐦𝐞:* ${app.name}
📦 *𝐏𝐚𝐜𝐤𝐚𝐠𝐞:* ${app.package}
⚖️ *𝐒𝐢𝐳𝐞:* ${sizeMb} MB
🆙 *𝐕𝐞𝐫𝐬𝐢𝐨𝐧:* ${app.file.vername}
🛡️ *𝐒𝐭𝐚𝐭𝐮𝐬:* ${app.file.malware.rank}

*Choose how you want to receive the app:*
`.trim();

        // Sending Buttons
        await sendButtons(conn, from, {
            title: `ᴀᴘᴋ ᴅᴏᴡɴʟᴏᴀᴅᴇʀ`,
            text: fancyCaption,
            footer: botFooter || 'ᴘᴏᴘᴋɪᴅ ᴀɪ ᴋᴇɴʏᴀ 🇰🇪',
            image: app.icon || botPic,
            buttons: [
                { id: `appdoc_${dateNow}`, text: "📁 𝐒𝐞𝐧𝐝 𝐀𝐏𝐊 𝐅𝐢𝐥𝐞" },
                { id: `applink_${dateNow}`, text: "🔗 𝐃𝐨𝐰𝐧𝐥𝐨𝐚𝐝 𝐋𝐢𝐧𝐤" }
            ],
        });

        // ==================== BUTTON INTERACTION HANDLER ====================
        const handleApkResponse = async (event) => {
            const messageData = event.messages[0];
            if (!messageData.message) return;

            const selectedButtonId = messageData.message?.templateButtonReplyMessage?.selectedId || 
                                     messageData.message?.buttonsResponseMessage?.selectedButtonId;
            
            if (!selectedButtonId || !selectedButtonId.includes(`${dateNow}`)) return;
            if (messageData.key?.remoteJid !== from) return;

            await conn.sendMessage(from, { react: { text: "📥", key: messageData.key } });

            try {
                const buttonType = selectedButtonId.split("_")[0];

                if (buttonType === "appdoc") {
                    // 1. Sends the actual APK file (Document)
                    await conn.sendMessage(from, { 
                        document: { url: app.file.path }, 
                        mimetype: "application/vnd.android.package-archive", 
                        fileName: `${app.name}.apk`,
                        caption: `✅ *${app.name}* successfully uploaded.`
                    }, { quoted: messageData });
                } 
                
                else if (buttonType === "applink") {
                    // 2. Sends the direct link text
                    await conn.sendMessage(from, { 
                        text: `🔗 *Direct Download Link for ${app.name}:*\n\n${app.file.path}\n\n_Note: Click the link to download manually if the file upload fails._`
                    }, { quoted: messageData });
                }

                await conn.sendMessage(from, { react: { text: "✅", key: messageData.key } });
                
                // Keep listener alive for 5 mins so user can try both buttons
            } catch (err) {
                console.error("APK Button Error:", err);
                reply("❌ Failed to process the request. The file might be too large.");
            }
        };

        // Register the listener
        conn.ev.on("messages.upsert", handleApkResponse);

        // Auto-kill listener after 5 minutes
        setTimeout(() => {
            conn.ev.off("messages.upsert", handleApkResponse);
        }, 300000);

    } catch (err) {
        console.error(err);
        reply("❌ Error fetching APK data from EliteProTech.");
    }
});
