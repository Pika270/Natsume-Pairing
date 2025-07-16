const PastebinAPI = require('pastebin-js'),
    pastebin = new PastebinAPI('EMWTMkQAVfJa9kM-MRUrxd5Oku1U7pgL');
const { makeid } = require('./id');
const express = require('express');
const fs = require('fs');
const path = require('path');
const pino = require("pino");
let router = express.Router();
const {
    default: Venocyber_Tech, useMultiFileAuthState, delay,
    makeCacheableSignalKeyStore, Browsers
} = require("@whiskeysockets/baileys");

function removeFile(FilePath) {
    if (fs.existsSync(FilePath)) fs.rmSync(FilePath, { recursive: true, force: true });
}

router.get('/', async (req, res) => {
    const id = makeid();
    let num = req.query.number;

    async function VENOCYBER_MD_PAIR_CODE(retryCount = 0) {
        if (retryCount > 3) return res.send({ code: "Service Unavailable" });

        const { state, saveCreds } = await useMultiFileAuthState('./temp/' + id);
        try {
            let Pair_Code_By_Venocyber_Tech = Venocyber_Tech({
                auth: { creds: state.creds, keys: makeCacheableSignalKeyStore(state.keys, pino({ level: "fatal" })) },
                printQRInTerminal: false, logger: pino({ level: "fatal" }),
                browser: ["Ubuntu", "Chrome", "20.0.04"]
            });

            if (!Pair_Code_By_Venocyber_Tech.authState.creds.registered) {
                await delay(1500);
                num = num.replace(/[^0-9]/g, '');
                const code = await Pair_Code_By_Venocyber_Tech.requestPairingCode(num);
                if (!res.headersSent) res.send({ code });
            }

            Pair_Code_By_Venocyber_Tech.ev.on('creds.update', saveCreds);
            Pair_Code_By_Venocyber_Tech.ev.on("connection.update", async (s) => {
                const { connection, lastDisconnect } = s;
                if (connection === "open") {
                    await delay(5000);
                    let sessionData;
                    try {
                        sessionData = JSON.parse(fs.readFileSync(path.join(__dirname, 'temp', id, 'creds.json')));
                    } catch (err) { console.error("Error reading session file:", err); return; }

                    let session = {
    noiseKey: sessionData.noiseKey, pairingEphemeralKeyPair: sessionData.pairingEphemeralKeyPair,
    signedIdentityKey: sessionData.signedIdentityKey, signedPreKey: sessionData.signedPreKey,
    registrationId: sessionData.registrationId, advSecretKey: sessionData.advSecretKey,
    processedHistoryMessages: sessionData.processedHistoryMessages || [], timestamp: Date.now(),
    nextPreKeyId: sessionData.nextPreKeyId || null, firstUnuploadedPreKeyId: sessionData.firstUnuploadedPreKeyId || null,
    keyId: sessionData.keyId || null, deviceId: sessionData.deviceId || "unknown",
    phoneId: sessionData.phoneId || "unknown", identityId: sessionData.identityId || null,
    registered: sessionData.registered ?? false, backupToken: sessionData.backupToken || null,
    registration: sessionData.registration || {}, pairingCode: sessionData.pairingCode || "",
    me: sessionData.me || {}, accountSyncCounter: sessionData.accountSyncCounter || 0,
    accountSettings: sessionData.accountSettings || { unarchiveChats: false }, isAuthenticated: sessionData.isAuthenticated ?? false,
    connectionState: sessionData.connectionState || "pending", retryCount: sessionData.retryCount || 0,
    lastError: sessionData.lastError || null, reconnectAttempts: sessionData.reconnectAttempts || 0,
    latency: sessionData.latency || null, dataUsage: sessionData.dataUsage || { sent: 0, received: 0 }, logs: sessionData.logs || [],
    signalIdentities: sessionData.signalIdentities || [], platform: sessionData.platform || "unknown",
    lastAccountSyncTimestamp: sessionData.lastAccountSyncTimestamp || 0, myAppStateKeyId: sessionData.myAppStateKeyId || null,
    account: sessionData.account || {}
};

                    let VENOCYBER_MD_TEXT = `
╔════════════════════════╗
║ 𝐂𝐎𝐍𝐍𝐄𝐂𝐓𝐄𝐃 𝐒𝐔𝐂𝐂𝐄𝐒𝐒𝐅𝐔𝐋𝐋𝐘! 🚀  
║   🦄 𝐅𝐈𝐑𝐒𝐓 𝐒𝐓𝐄𝐏 𝐂𝐎𝐌𝐏𝐋𝐄𝐓𝐄𝐃!  
╚════════════════════════╝

📌 𝐍𝐄𝐗𝐓 𝐒𝐓𝐄𝐏𝐒: 𝐂𝐎𝐍𝐅𝐈𝐆𝐔𝐑𝐄 𝐘𝐎𝐔𝐑 𝐁𝐎𝐓 𝐎𝐍 𝐓𝐀𝐋𝐊𝐃𝐎𝐕𝐄

➊ *𝐂𝐨𝐩𝐲 & 𝐏𝐚𝐬𝐭𝐞 𝐘𝐨𝐮𝐫 𝐒𝐄𝐒𝐒𝐈𝐎𝐍_𝐈𝐃*  
   └ 𝐘𝐨𝐮𝐫 𝐒𝐄𝐒𝐒𝐈𝐎𝐍_𝐈𝐃 𝐢𝐬 𝐲𝐨𝐮𝐫 𝐤𝐞𝐲 𝐭𝐨 𝐬𝐭𝐚𝐫𝐭 𝐭𝐡𝐞 𝐛𝐨𝐭  
   └ 𝐎𝐩𝐞𝐧 ➜ https://host.talkdrove.com  
   └ 𝐋𝐨𝐠𝐢𝐧/𝐒𝐢𝐠𝐧 𝐮𝐩 ➜ 𝐜𝐥𝐢𝐜𝐤 𝐭𝐡𝐞 ➕ 𝐢𝐜𝐨𝐧 ➜ 𝐅𝐢𝐧𝐝 *NΛƬƧƲMΞ ᙢᗫ🌸*

➋ *𝐄𝐧𝐭𝐞𝐫 𝐘𝐨𝐮𝐫 𝐒𝐄𝐒𝐒𝐈𝐎𝐍_𝐈𝐃*  
   └ 𝐒𝐜𝐫𝐨𝐥𝐥 𝐝𝐨𝐰𝐧 𝐭𝐨: *“𝐏𝐮𝐭 𝐲𝐨𝐮𝐫 𝐒𝐄𝐒𝐒𝐈𝐎𝐍_𝐈𝐃 𝐡𝐞𝐫𝐞.”*  
   └ 𝐏𝐚𝐬𝐭𝐞 𝐢𝐭 𝐢𝐧𝐭𝐨 𝐭𝐡𝐞 𝐢𝐧𝐩𝐮𝐭 𝐟𝐢𝐞𝐥𝐝.

➌ *𝐒𝐞𝐭 𝐚 𝐏𝐫𝐞𝐟𝐢𝐱 𝐟𝐨𝐫 𝐘𝐨𝐮𝐫 𝐁𝐨𝐭*  
   └ 𝐓𝐲𝐩𝐞 𝐚 𝐬𝐲𝐦𝐛𝐨𝐥 𝐥𝐢𝐤𝐞:  '!', '.', '#', 𝐨𝐫 𝐚𝐧𝐲 𝐜𝐡𝐚𝐫𝐚𝐜𝐭𝐞𝐫 𝐲𝐨𝐮 𝐰𝐚𝐧𝐭.

➍ *𝐀𝐝𝐝 𝐀𝐝𝐦𝐢𝐧𝐬 𝐭𝐨 𝐓𝐡𝐞 𝐁𝐨𝐭*  
   └ 𝐄𝐧𝐭𝐞𝐫 𝐩𝐡𝐨𝐧𝐞 𝐧𝐮𝐦𝐛𝐞𝐫𝐬 (𝐢𝐧 𝐢𝐧𝐭𝐞𝐫𝐧𝐚𝐭𝐢𝐨𝐧𝐚𝐥 𝐟𝐨𝐫𝐦𝐚𝐭) 𝐨𝐟 𝐮𝐬𝐞𝐫𝐬 𝐲𝐨𝐮 𝐰𝐚𝐧𝐭 𝐚𝐬 𝐛𝐨𝐭 𝐚𝐝𝐦𝐢𝐧𝐬  
   └ 𝐄.𝐠. 234xxxxxxxxxx, 91xxxxxxxxxx

➎ *𝐂𝐡𝐨𝐨𝐬𝐞 𝐁𝐨𝐭 𝐓𝐲𝐩𝐞 (𝐏𝐮𝐛𝐥𝐢𝐜 / 𝐏𝐫𝐢𝐯𝐚𝐭𝐞)*  
   └ 𝐏𝐮𝐛𝐥𝐢𝐜 ➜ 𝐀𝐧𝐲𝐨𝐧𝐞 𝐜𝐚𝐧 𝐮𝐬𝐞 𝐭𝐡𝐞 𝐛𝐨𝐭  
   └ 𝐏𝐫𝐢𝐯𝐚𝐭𝐞 ➜ 𝐎𝐧𝐥𝐲 𝐛𝐨𝐭 𝐧𝐮𝐦𝐛𝐞𝐫 𝐜𝐚𝐧 𝐮𝐬𝐞 𝐢𝐭

➏ *𝐒𝐞𝐭 𝐒𝐭𝐢𝐜𝐤𝐞𝐫 𝐏𝐚𝐜𝐤 𝐀𝐮𝐭𝐡𝐨𝐫*  
   └ 𝐓𝐲𝐩𝐞 𝐲𝐨𝐮𝐫 𝐧𝐚𝐦𝐞 𝐨𝐫 𝐛𝐫𝐚𝐧𝐝 𝐟𝐨𝐫 𝐬𝐭𝐢𝐜𝐤𝐞𝐫 𝐚𝐮𝐭𝐡𝐨𝐫𝐬𝐡𝐢𝐩

➐ *𝐃𝐞𝐩𝐥𝐨𝐲 𝐘𝐨𝐮𝐫 𝐁𝐨𝐭!*  
   └ 𝐂𝐥𝐢𝐜𝐤 *"𝐃𝐞𝐩𝐥𝐨𝐲 𝐁𝐨𝐭"* 𝐚𝐧𝐝 𝐥𝐞𝐭 𝐭𝐡𝐞 𝐌𝐀𝐆𝐈𝐂 𝐛𝐞𝐠𝐢𝐧 ✨🎉

━━━━━━━━━━━━━━━━━━━━━━  
💡 𝐍𝐄𝐄𝐃 𝐇𝐄𝐋𝐏?  
📌 𝐘𝐨𝐮𝐓𝐮𝐛𝐞: https://youtube.com/@thugtechies
📌 𝐎𝐰𝐧𝐞𝐫: https://wa.me/2347079059033  
📌 𝐆𝐢𝐭𝐇𝐮𝐛: https://github.com/Pika270/Kokkoro-Natsume-MD 
📌 𝐖𝐡𝐚𝐭𝐬𝐀𝐩𝐩 𝐂𝐡𝐚𝐧𝐧𝐞𝐥: https://whatsapp.com/channel/0029VaoOiuwDp2QH070eTE01  

━━━━━━━━━━━━━━━━━━━━━━  
✅ 𝐘𝐎𝐔 𝐀𝐑𝐄 𝐍𝐎𝐖 𝐑𝐄𝐀𝐃𝐘 𝐓𝐎 𝐃𝐄𝐏𝐋𝐎𝐘  
🔥 𝐋𝐞𝐭 𝐲𝐨𝐮𝐫 𝐛𝐨𝐭 𝐫𝐮𝐧 𝐰𝐢𝐥𝐝 𝐚𝐧𝐝 𝐞𝐧𝐣𝐨𝐲 𝐭𝐡𝐞 𝐉𝐎𝐔𝐑𝐍𝐄𝐘! 🔥  
`;

                    let sessionzz = `${JSON.stringify(session)}`;
                    await Pair_Code_By_Venocyber_Tech.sendMessage(m.chat, {
  text: VENOCYBER_MD_TEXT,
  contextInfo: {
    forwardingScore: 999,
    isForwarded: true,
    forwardedNewsletterMessageInfo: {
      newsletterJid: "120363312761563081@newsletter",
      newsletterName: "NΛƬƧƲMΞ ᙢᗫ🌸",
      serverMessageId: 628
    },
    externalAdReply: {
      title: 'NΛƬƧƲMΞ ᙢᗫ🌸',
      body: '𝐔𝐧𝐚𝐮𝐭𝐡𝐨𝐫𝐢𝐳𝐞𝐝 𝐜𝐥𝐨𝐧𝐢𝐧𝐠 𝐨𝐫 𝐫𝐞𝐛𝐫𝐚𝐧𝐝𝐢𝐧𝐠 𝐢𝐬 𝐬𝐭𝐫𝐢𝐜𝐭𝐥𝐲 𝐩𝐫𝐨𝐡𝐢𝐛𝐢𝐭𝐞𝐝.',
      thumbnailUrl: "https://i.ibb.co/93gXCswy/Img2url-bot.jpg", // replace with your actual URL later
      mediaType: 1,
      renderLargerThumbnail: true
    }
  }
}, { quoted: m });
                    await delay(100);
                    await Pair_Code_By_Venocyber_Tech.ws.close();
                    removeFile('./temp/' + id);
                } else if (connection === "close" && lastDisconnect?.error?.output?.statusCode !== 401) {
                    console.log("Reconnecting...");
                    await delay(10000);
                    VENOCYBER_MD_PAIR_CODE(retryCount + 1);
                }
            });
        } catch (err) {
            console.error("Service restarted due to error:", err);
            removeFile('./temp/' + id);
            if (!res.headersSent) res.send({ code: "Service Unavailable" });
        }
    }

    return VENOCYBER_MD_PAIR_CODE();
});

module.exports = router;