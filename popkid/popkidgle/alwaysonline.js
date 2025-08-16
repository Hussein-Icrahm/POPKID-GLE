import config from '../../config.cjs';

const alwaysonlineCommand = async (m, Matrix) => {
    const botNumber = await Matrix.decodeJid(Matrix.user.id);
    const isCreator = [botNumber, config.OWNER_NUMBER + '@s.whatsapp.net'].includes(m.sender);
    const prefix = config.PREFIX;
    const cmd = m.body.startsWith(prefix) ? m.body.slice(prefix.length).split(' ')[0].toLowerCase() : '';
    const text = m.body.slice(prefix.length + cmd.length).trim().toLowerCase();

    // Show menu if no argument
    if (cmd === "alwaysonline" && !text) {
        if (!isCreator) {
            return m.reply("*⛔ ACCESS DENIED!*\n\nOnly the *bot owner* can use this command.");
        }

        const enableBtn = {
            buttonId: `${prefix}alwaysonline on`,
            buttonText: { displayText: "🟢 Enable Always Online" },
            type: 1
        };

        const disableBtn = {
            buttonId: `${prefix}alwaysonline off`,
            buttonText: { displayText: "🔴 Disable Always Online" },
            type: 1
        };

        const contextInfo = {
            forwardedNewsletterMessageInfo: {
                newsletterName: "Popkid-Xmd ⚙️",
                newsletterJid: "120363420342566562@newsletter"
            }
        };

        return await Matrix.sendMessage(m.from, {
            text: "⚙️ *Always Online Control*\n\n💡 Choose an option below to toggle Always Online mode:",
            buttons: [enableBtn, disableBtn],
            headerType: 1,
            contextInfo
        }, { quoted: m });
    }

    // Handle enable / disable
    if (cmd === "alwaysonline" && text) {
        if (!isCreator) {
            return m.reply("*⛔ ACCESS DENIED!*\n\nOnly the *bot owner* can use this command.");
        }

        let message;
        if (text === "on") {
            config.ALWAYS_ONLINE = true;
            message = `
╭─❍「 🟢 ALWAYS ONLINE ENABLED 」❍
│ ✅ Bot will now stay connected 24/7.
│ 🌐 Useful for continuous uptime.
│
│  🚀 Powered by *Popkid-Xmd*
╰─────────────────────⧘`.trim();
        } else if (text === "off") {
            config.ALWAYS_ONLINE = false;
            message = `
╭─❍「 🔴 ALWAYS ONLINE DISABLED 」❍
│ ❌ Bot will idle when inactive.
│ 💤 Saves resources.
│
│  🚀 Powered by *Popkid-Xmd*
╰─────────────────────⧘`.trim();
        } else {
            message = `
╭─❍「 📛 INVALID USAGE 」❍
│ Please choose an option using the buttons.
│
│  🚀 Powered by *Popkid-Xmd*
╰─────────────────────⧘`.trim();
        }

        const contextInfo = {
            forwardedNewsletterMessageInfo: {
                newsletterName: "Popkid-Xmd ⚙️",
                newsletterJid: "120363420342566562@newsletter"
            }
        };

        return await Matrix.sendMessage(m.from, {
            text: message,
            contextInfo
        }, { quoted: m });
    }
};

export default alwaysonlineCommand;
