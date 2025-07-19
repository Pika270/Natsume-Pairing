const express = require('express');
const fs = require('fs');
const path = require('path');
const pino = require("pino");
const { makeid } = require('./id');
const {
  default: Venocyber_Tech,
  useMultiFileAuthState,
  delay,
  makeCacheableSignalKeyStore
} = require("@whiskeysockets/baileys");

const router = express.Router();

function removeFile(FilePath) {
  if (fs.existsSync(FilePath)) fs.rmSync(FilePath, { recursive: true, force: true });
}

router.get('/', async (req, res) => {
  const id = makeid();
  let number = req.query.number;

  async function generateSession(retry = 0) {
    if (retry > 3) return res.send({ code: "Service Unavailable" });

    const { state, saveCreds } = await useMultiFileAuthState('./temp/' + id);  
    try {  
      const client = Venocyber_Tech({  
        auth: {  
          creds: state.creds,  
          keys: makeCacheableSignalKeyStore(state.keys, pino({ level: "silent" }))  
        },  
        printQRInTerminal: false,  
        logger: pino({ level: "silent" }),  
        browser: ["Ubuntu", "Chrome", "20.0.04"]  
      });  

      if (!client.authState.creds.registered) {  
        await delay(1500);  
        number = number.replace(/[^0-9]/g, '');  
        const code = await client.requestPairingCode(number);  
        if (!res.headersSent) res.send({ code });  
      }  

      client.ev.on('creds.update', saveCreds);  

      client.ev.on('connection.update', async (update) => {  
        const { connection, lastDisconnect } = update;  

        if (connection === "open") {  
          await delay(3000);  

          let credsPath = path.join(__dirname, 'temp', id, 'creds.json');  
          let raw;  
          try {  
            raw = JSON.parse(fs.readFileSync(credsPath));  
          } catch (err) {  
            console.error("Failed to read session file:", err);  
            return;  
          }  

     // ✅ ULTRA-COMPACT SINGLE-LINE ESSENTIAL SESSION (WITH ALL KEYS)
// ✅ ULTRA-COMPACT SINGLE-LINE ESSENTIAL SESSION (WITH ALL 28 KEYS)
const session = JSON.stringify({
  "noiseKey": raw.noiseKey,
  "pairingEphemeralKeyPair": raw.pairingEphemeralKeyPair,
  "signedIdentityKey": raw.signedIdentityKey,
  "signedPreKey": raw.signedPreKey,
  "registrationId": raw.registrationId,
  "advSecretKey": raw.advSecretKey,
  "processedHistoryMessages": raw.processedHistoryMessages,
  "nextPreKeyId": raw.nextPreKeyId,
  "firstUnuploadedPreKeyId": raw.firstUnuploadedPreKeyId,
  "accountSyncCounter": raw.accountSyncCounter,
  "accountSettings": raw.accountSettings,
  "deviceId": raw.deviceId,
  "phoneId": raw.phoneId,
  "identityId": raw.identityId,
  "registered": raw.registered,
  "backupToken": raw.backupToken,
  "registration": raw.registration,
  "pairingCode": raw.pairingCode,
  "me": raw.me,
  "account": {
    "details": raw.account?.details,
    "accountSignatureKey": raw.account?.accountSignatureKey,
    "accountSignature": raw.account?.accountSignature,
    "deviceSignature": raw.account?.deviceSignature
  },
  "signalIdentities": raw.signalIdentities,
  "platform": raw.platform,
  "routingInfo": raw.routingInfo,
  "lastAccountSyncTimestamp": raw.lastAccountSyncTimestamp,
  "lastPropHash": raw.lastPropHash,
  "myAppStateKeyId": raw.myAppStateKeyId,
  "preKeys": raw.preKeys,
  "senderKeys": raw.senderKeys,
  "timestamp": raw.timestamp
});

          try {  
            // Send the compact session
            await client.sendMessage(client.user.id, { 
              text: `${session}` 
            });
            
            // Your complete instructions with newsletter
            const instructions = `
╔════════════════════════╗
║ 𝐂𝐎𝐍𝐍𝐄𝐂𝐓𝐄𝐃 𝐒𝐔𝐂𝐂𝐄𝐒𝐒𝐅𝐔𝐋𝐋𝐘! 🚀
║   🦄 𝐅𝐈𝐑𝐒𝐓 𝐒𝐓𝐄𝐏 𝐂𝐎𝐌𝐏𝐋𝐄𝐓𝐄𝐃!
╚════════════════════════╝

🌸 𝐍𝐄𝐗𝐓 𝐒𝐓𝐄𝐏𝐒: 𝐂𝐎𝐍𝐅𝐈𝐆𝐔𝐑𝐄 𝐘𝐎𝐔𝐑 𝐁𝐎𝐓 𝐎𝐍 𝐓𝐀𝐋𝐊𝐃𝐎𝐕𝐄 🌸

➊ 𝐂𝐨𝐩𝐲 & 𝐏𝐚𝐬𝐭𝐞 𝐘𝐨𝐮𝐫 𝐒𝐄𝐒𝐒𝐈𝐎𝐍_𝐈𝐃
└ 𝐘𝐨𝐮𝐫 𝐒𝐄𝐒𝐒𝐈𝐎𝐍_𝐈𝐃 𝐢𝐬 𝐲𝐨𝐮𝐫 𝐤𝐞𝐲 𝐭𝐨 𝐬𝐭𝐚𝐫𝐭 𝐭𝐡𝐞 𝐛𝐨𝐭
└ 𝐎𝐩𝐞𝐧 ➜ https://host.talkdrove.com/auth/signup?ref=415778C7
└ 𝐋𝐨𝐠𝐢𝐧/𝐒𝐢𝐠𝐧 𝐮𝐩 ➜ 𝐜𝐥𝐢𝐜𝐤 𝐭𝐡𝐞 ➕ 𝐢𝐜𝐨𝐧 ➜ 𝐅𝐢𝐧𝐝 ႳUΣΣП BΣΛƬЯICΣ 🌸

➋ 𝐄𝐧𝐭𝐞𝐫 𝐘𝐨𝐮𝐫 𝐒𝐄𝐒𝐒𝐈𝐎𝐍_𝐈𝐃
└ 𝐒𝐜𝐫𝐨𝐥𝐥 𝐝𝐨𝐰𝐧 𝐭𝐨: "𝐏𝐮𝐭 𝐲𝐨𝐮𝐫 𝐒𝐄𝐒𝐒𝐈𝐎𝐍_𝐈𝐃 𝐡𝐞𝐫𝐞."
└ 𝐏𝐚𝐬𝐭𝐞 𝐢𝐭 𝐢𝐧𝐭𝐨 𝐭𝐡𝐞 𝐢𝐧𝐩𝐮𝐭 𝐟𝐢𝐞𝐥𝐝.

➌ 𝐒𝐞𝐭 𝐚 𝐏𝐫𝐞𝐟𝐢𝐱 𝐟𝐨𝐫 𝐘𝐨𝐮𝐫 𝐁𝐨𝐭
└ 𝐓𝐲𝐩𝐞 𝐚 𝐬𝐲𝐦𝐛𝐨𝐥 𝐥𝐢𝐤𝐞:  '!', '.', '#', 𝐨𝐫 𝐚𝐧𝐲 𝐜𝐡𝐚𝐫𝐚𝐜𝐭𝐞𝐫 𝐲𝐨𝐮 𝐰𝐚𝐧𝐭.

➍ 𝐀𝐝𝐝 𝐀𝐝𝐦𝐢𝐧𝐬 𝐭𝐨 𝐓𝐡𝐞 𝐁𝐨𝐭
└ 𝐄𝐧𝐭𝐞𝐫 𝐩𝐡𝐨𝐧𝐞 𝐧𝐮𝐦𝐛𝐞𝐫𝐬 (𝐢𝐧 𝐢𝐧𝐭𝐞𝐫𝐧𝐚𝐭𝐢𝐨𝐧𝐚𝐥 𝐟𝐨𝐫𝐦𝐚𝐭)

➎ 𝐂𝐡𝐨𝐨𝐬𝐞 𝐁𝐨𝐭 𝐓𝐲𝐩𝐞 (𝐏𝐮𝐛𝐥𝐢𝐜 / 𝐏𝐫𝐢𝐯𝐚𝐭𝐞)
└ 𝐏𝐮𝐛𝐥𝐢𝐜 ➜ 𝐀𝐧𝐲𝐨𝐧𝐞 𝐜𝐚𝐧 𝐮𝐬𝐞
└ 𝐏𝐫𝐢𝐯𝐚𝐭𝐞 ➜ 𝐎𝐧𝐥𝐲 𝐲𝐨𝐮 𝐜𝐚𝐧 𝐮𝐬𝐞

➏ 𝐒𝐞𝐭 𝐒𝐭𝐢𝐜𝐤𝐞𝐫 𝐏𝐚𝐜𝐤 𝐀𝐮𝐭𝐡𝐨𝐫
└ 𝐘𝐨𝐮𝐫 𝐧𝐚𝐦𝐞 𝐨𝐫 𝐛𝐫𝐚𝐧𝐝

➐ 𝐃𝐞𝐩𝐥𝐨𝐲 𝐘𝐨𝐮𝐫 𝐁𝐨𝐭!
└ 𝐂𝐥𝐢𝐜𝐤 "𝐃𝐞𝐩𝐥𝐨𝐲" 𝐚𝐧𝐝 𝐞𝐧𝐣𝐨𝐲 ✨

━━━━━━━━━━━━━━━━━━━━━━
🌸 𝐘𝐨𝐮𝐓𝐮𝐛𝐞: https://youtube.com/@thugtechies
🌸 𝐎𝐰𝐧𝐞𝐫: https://wa.me/2347079059033
🌸 𝐆𝐢𝐭𝐇𝐮𝐛: https://github.com/Pika270/Kokkoro-Natsume-MD
🌸 𝐖𝐡𝐚𝐭𝐬𝐀𝐩𝐩: https://whatsapp.com/channel/0029VaoOiuwDp2QH070eTE01
━━━━━━━━━━━━━━━━━━━━━━
`;

            await client.sendMessage(client.user.id, {  
              text: instructions,  
              contextInfo: {  
                forwardingScore: 999,  
                isForwarded: true,  
                forwardedNewsletterMessageInfo: {  
                  newsletterJid: "120363312761563081@newsletter",  
                  newsletterName: "ႳUΣΣП BΣΛƬЯICΣ 🌸",  
                  serverMessageId: 628  
                },  
                externalAdReply: {  
                  title: 'ႳUΣΣП BΣΛƬЯICΣ 🌸',  
                  body: '𝐔𝐧𝐚𝐮𝐭𝐡𝐨𝐫𝐢𝐳𝐞𝐝 𝐫𝐞𝐛𝐫𝐚𝐧𝐝𝐢𝐧𝐠 𝐢𝐬 𝐬𝐭𝐫𝐢𝐜𝐭𝐥𝐲 𝐟𝐨𝐫𝐛𝐢𝐝𝐝𝐞𝐧',  
                  thumbnailUrl: "https://i.ibb.co/NDFhwkY/Img2url-bot.jpg",  
                  mediaType: 1,  
                  renderLargerThumbnail: true  
                }  
              }  
            });

            await delay(100);  
            await client.ws.close();  
            removeFile('./temp/' + id);  
          } catch (sendError) {  
            console.error("Failed to send messages:", sendError);  
          }  
        }  
        else if (connection === "close" && lastDisconnect?.error?.output?.statusCode !== 401) {  
          await delay(8000);  
          generateSession(retry + 1);  
        }  
      });  

    } catch (err) {  
      console.error("Error:", err);  
      removeFile('./temp/' + id);  
      if (!res.headersSent) res.send({ code: "Service Unavailable" });  
    }
  }

  generateSession();
});

module.exports = router;