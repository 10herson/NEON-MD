const { cmd } = require('../command');
const fetch = require('node-fetch');

cmd({
    pattern: "weather",
    desc: "Get weather info",
    category: "utility",
    react: "🌤️",
    filename: __filename
}, async (conn, m, mek, { from, reply }) => {

    const location = m.text.split(" ").slice(1).join(" ").trim();
    if (!location) return reply("❗ Enter location");

    const start = Date.now();
    await conn.sendMessage(from, { react: { text: "🌍", key: mek.key } });

    try {

        const url = `https://api.giftedtech.co.ke/api/search/weather?apikey=gifted&location=${encodeURIComponent(location)}`;
        const res = await fetch(url);
        const data = await res.json();

        if (!data.success) return reply("❌ Location not found");

        const w = data.result;
        const end = Date.now();

        const message = `🌍 *Weather — ${w.location}, ${w.sys.country}*

☁️ Condition: ${w.weather.main} (${w.weather.description})
🌡️ Temp: ${w.main.temp}°C
🤗 Feels Like: ${w.main.feels_like}°C
💧 Humidity: ${w.main.humidity}%
🌬️ Wind: ${w.wind.speed} m/s
👁️ Visibility: ${w.visibility}m

⚡ Speed: ${end - start}ms`;

        await reply(message);

    } catch (err) {
        console.log(err);
        reply("❗ Failed to fetch weather");
    }
});
