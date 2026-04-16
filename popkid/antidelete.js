const { cmd } = require("../command");
const config = require("../config");

// ================================
// ANTI DELETE EVENT LISTENER
// ================================

cmd({ on: "messages.update" }, async (client, updates) => {
    try {
        if (!config.ANTI_DELETE) return;

        for (const update of updates) {

            if (!update.update) continue;

            const protocol = update.update.protocolMessage;

            // Detect delete for everyone
            if (protocol && protocol.type === 0) {

                const key = protocol.key;

                // Try loading original message from store
                const originalMsg = await client.loadMessage?.(key.remoteJid, key.id);

                if (!originalMsg) return;

                const sender = key.participant || key.remoteJid;

                const caption =
`*🚫 ANTI DELETE DETECTED 🚫*

👤 *User:* @${sender.split("@")[0]}
🕒 *Time:* ${new Date().toLocaleString()}

_Recovered deleted message below_`;

                // Send alert
                await client.sendMessage(client.user.id, {
                    text: caption,
                    mentions: [sender]
                });

                // Forward deleted message
                await client.copyNForward(
                    client.user.id,
                    originalMsg,
                    true
                );
            }
        }

    } catch (err) {
        console.log("AntiDelete Error:", err);
    }
});


// ================================
// ANTI DELETE TOGGLE COMMAND
// ================================

cmd({
    pattern: "antidelete",
    alias: ["nodelete","atd"],
    desc: "Toggle Anti Delete",
    category: "owner",
    react: "🗑️",
    filename: __filename,
    fromMe: true
},
async (client, message, m, { args, from }) => {

    try {

        const action = args[0]?.toLowerCase();

        if (action === "on") {
            config.ANTI_DELETE = true;

            return await client.sendMessage(from,{
                text: "✅ *Anti Delete Enabled*\nDeleted messages will be restored."
            },{ quoted: message });
        }

        if (action === "off") {
            config.ANTI_DELETE = false;

            return await client.sendMessage(from,{
                text: "❌ *Anti Delete Disabled*"
            },{ quoted: message });
        }

        return await client.sendMessage(from,{
            text: `🗑️ *Anti Delete Status*\n\n${
                config.ANTI_DELETE ? "✅ Enabled" : "❌ Disabled"
            }`
        },{ quoted: message });

    } catch(e) {

        console.log("Command Error:",e)

        await client.sendMessage(from,{
            text:"⚠️ Error occurred."
        })
    }

});
