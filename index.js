/* Created By ohlx Bot WhatsApp */
/* WhatsApp Creator Di Bawah */
/* wa.me/6283160327945 */

const { modul } = require('./module');
const { baileys, boom, chalk, fs, figlet, FileType, path, pino, process, PhoneNumber } = modul;
const { Boom } = boom
const { default: ohlxConnect, useSingleFileAuthState, DisconnectReason, fetchLatestBaileysVersion, generateForwardMessageContent, generateWAMessage, prepareWAMessageMedia, generateWAMessageFromContent, generateMessageID, downloadContentFromMessage, makeInMemoryStore, jidDecode, proto } = baileys
const { color, bgcolor } = require('./lib/color')
const { uncache, nocache } = require('./lib/loader')
const { state } = useSingleFileAuthState(`./ohlx.data.json`)
const { imageToWebp, videoToWebp, writeExifImg, writeExifVid } = require('./lib/exif')
const { smsg, isUrl, generateMessageTag, getBuffer, getSizeMedia, fetchJson, await, sleep, reSize } = require('./lib/myfunc')

const owner = JSON.parse(fs.readFileSync('./database/owner.json').toString())

const store = makeInMemoryStore({ logger: pino().child({ level: 'silent', stream: 'store' }) })

require('./ohlx.js')
nocache('../ohlx.js', module => console.log(color('[ UPDATE ]', 'cyan'), color(`'${module}'`, 'green'), 'File Is Update!!!'))
require('./index.js')
nocache('../index.js', module => console.log(color('[ UPDATE ]', 'cyan'), color(`'${module}'`, 'green'), 'File Is Update!!!'))

async function ohlxBot() {
const { version, isLatest } = await fetchLatestBaileysVersion()
const ohlx = ohlxConnect({
logger: pino({ level: 'silent' }),
printQRInTerminal: true,
browser: ['ohlx Bot WhatsApp (2022)','Safari','1.0.0'],
auth: state,
version
})

store.bind(ohlx.ev)

console.log(color(figlet.textSync(`ohlx`, {
font: 'Standard',
horizontalLayout: 'default',
vertivalLayout: 'default',
whitespaceBreak: false
}), 'green'))

ohlx.ws.on('CB:Blocklist', json => {
if (blocked.length > 2) return
for (let i of json[1].blocklist) {
blocked.push(i.replace('c.us','s.whatsapp.net'))}})

ohlx.ws.on('CB:call', async (json) => {
const callerId = json.content[0].attrs['call-creator']
const idCall = json.content[0].attrs['call-id']
const Id = json.attrs.id
const T = json.attrs.t
ohlx.sendNode({
  tag: 'call',
    attrs: {
      from: '6283144670363@s.whatsapp.net',
      id: Id,
      t: T
    },
    content: [
      {
        tag: 'reject',
        attrs: {
          'call-creator': callerId,
          'call-id': idCall,
          count: '0'
        },
        content: null
      }
    ]
})
if (json.content[0].tag == 'offer') {
let qutsnya = await ohlx.sendContact(callerId, owner)
await ohlx.sendMessage(callerId, { text: `Sistem Otomatis Block!!!\nJangan Menelpon Bot!!!\nSilahkan Hubungi Owner Untuk Dibuka!!!`}, { quoted : qutsnya })
await sleep(8000)
await ohlx.updateBlockStatus(callerId, "block")
}
})

ohlx.ev.on('messages.upsert', async chatUpdate => {
try {
kay = chatUpdate.messages[0]
if (!kay.message) return
kay.message = (Object.keys(kay.message)[0] === 'ephemeralMessage') ? kay.message.ephemeralMessage.message : kay.message
if (kay.key && kay.key.remoteJid === 'status@broadcast') return
if (!ohlx.public && !kay.key.fromMe && chatUpdate.type === 'notify') return
if (kay.key.id.startsWith('BAE5') && kay.key.id.length === 16) return
m = smsg(ohlx, kay, store)
require('./ohlx')(ohlx, m, chatUpdate, store)
} catch (err) {
console.log(err)}})

ohlx.ev.on('group-participants.update', async (anu) => {
console.log(anu)
try {
let metadata = await ohlx.groupMetadata(anu.id)
let participants = anu.participants
let memb = metadata.participants.length
for (let num of participants) {
try {
ppuser = await ohlx.profilePictureUrl(num, 'image')
} catch {
ppuser = 'https://i0.wp.com/www.gambarunik.id/wp-content/uploads/2019/06/Top-Gambar-Foto-Profil-Kosong-Lucu-Tergokil-.jpg'
}
try {
ppgroup = await ohlx.profilePictureUrl(anu.id, 'image')
} catch {
ppgroup = 'https://i0.wp.com/www.gambarunik.id/wp-content/uploads/2019/06/Top-Gambar-Foto-Profil-Kosong-Lucu-Tergokil-.jpg'
}
if (anu.action == 'add') {
ohlx.sendMessage(anu.id, { image: { url: ppuser }, contextInfo: { mentionedJid: [num] }, caption: `Hello Sis @${num.split("@")[0]}, Welcome To The Group ${metadata.subject}, I Hope You Enjoy It, Sis`, 
jpegThumbnail: await reSize(ppuser, 200, 200), 
contextInfo: {
"mentionedJid": [num],
"externalAdReply": {
"showAdAttribution": true,
"renderLargerThumbnail": true,
"title": `Welcome Kak`, 
"containsAutoReply": true,
"mediaType": 1, 
"thumbnail": await reSize(ppuser, 200, 200),
"mediaUrl": 'https://linktr.ee/ohlxbot',
"sourceUrl": 'https://linktr.ee/ohlxbot'
}}})
} else if (anu.action == 'remove') {
ohlx.sendMessage(anu.id, { image: { url: ppuser }, contextInfo: { mentionedJid: [num] }, caption: `Goodbye Sis @${num.split("@")[0]}, I Hope You Feel At Home In Nature`,
jpegThumbnail: await reSize(ppuser, 200, 200), 
contextInfo: {
"mentionedJid": [num],
"externalAdReply": {
"showAdAttribution": true,
"renderLargerThumbnail": true,
"title": `Good Bye Kak`, 
"containsAutoReply": true,
"mediaType": 1, 
"thumbnail": await reSize(ppuser, 200, 200),
"mediaUrl": 'https://linktr.ee/ohlxbot',
"sourceUrl": 'https://linktr.ee/ohlxbot'
}}})
}
}
} catch (err) {
console.log(err)
}
})

ohlx.decodeJid = (jid) => {
if (!jid) return jid
if (/:\d+@/gi.test(jid)) {
let decode = jidDecode(jid) || {}
return decode.user && decode.server && decode.user + '@' + decode.server || jid
} else return jid
}

ohlx.ev.on('contacts.update', update => {
for (let contact of update) {
let id = ohlx.decodeJid(contact.id)
if (store && store.contacts) store.contacts[id] = { id, name: contact.notify }
}
})

ohlx.getName = (jid, withoutContact  = false) => {
id = ohlx.decodeJid(jid)
withoutContact = ohlx.withoutContact || withoutContact 
let v
if (id.endsWith("@g.us")) return new Promise(async (resolve) => {
v = store.contacts[id] || {}
if (!(v.name || v.subject)) v = ohlx.groupMetadata(id) || {}
resolve(v.name || v.subject || PhoneNumber('+' + id.replace('@s.whatsapp.net', '')).getNumber('international'))
})
else v = id === '0@s.whatsapp.net' ? {
id,
name: 'WhatsApp'
} : id === ohlx.decodeJid(ohlx.user.id) ?
ohlx.user :
(store.contacts[id] || {})
return (withoutContact ? '' : v.name) || v.subject || v.verifiedName || PhoneNumber('+' + jid.replace('@s.whatsapp.net', '')).getNumber('international')
}

ohlx.parseMention = (text = '') => {
return [...text.matchAll(/@([0-9]{5,16}|0)/g)].map(v => v[1] + '@s.whatsapp.net')
}

ohlx.sendContact = async (jid, kon, quoted = '', opts = {}) => {
let list = []
for (let i of kon) {
list.push({
displayName: await ohlx.getName(i + '@s.whatsapp.net'),
vcard: `BEGIN:VCARD\n
VERSION:3.0\n
N:${await ohlx.getName(i + '@s.whatsapp.net')}\n
FN:${await ohlx.getName(i + '@s.whatsapp.net')}\n
item1.TEL;waid=${i}:${i}\n
item1.X-ABLabel:Ponsel\n
item2.EMAIL;type=INTERNET:tesheroku123@gmail.com\n
item2.X-ABLabel:Email\n
item3.URL:https://bit.ly/39Ivus6\n
item3.X-ABLabel:YouTube\n
item4.ADR:;;Indonesia;;;;\n
item4.X-ABLabel:Region\n
END:VCARD`
})
}
ohlx.sendMessage(jid, { contacts: { displayName: `${list.length} Kontak`, contacts: list }, ...opts }, { quoted })
}

ohlx.setStatus = (status) => {
ohlx.query({
tag: 'iq',
attrs: {
to: '@s.whatsapp.net',
type: 'set',
xmlns: 'status',
},
content: [{
tag: 'status',
attrs: {},
content: Buffer.from(status, 'utf-8')
}]
})
return status
}

ohlx.public = true

ohlx.sendImage = async (jid, path, caption = '', quoted = '', options) => {
let buffer = Buffer.isBuffer(path) ? path : /^data:.*?\/.*?;base64,/i.test(path) ? Buffer.from(path.split`,`[1], 'base64') : /^https?:\/\//.test(path) ? await (await getBuffer(path)) : fs.existsSync(path) ? fs.readFileSync(path) : Buffer.alloc(0)
return await ohlx.sendMessage(jid, { image: buffer, caption: caption, ...options }, { quoted })
}

ohlx.sendImageAsSticker = async (jid, path, quoted, options = {}) => {
let buff = Buffer.isBuffer(path) ? path : /^data:.*?\/.*?;base64,/i.test(path) ? Buffer.from(path.split`,`[1], 'base64') : /^https?:\/\//.test(path) ? await (await getBuffer(path)) : fs.existsSync(path) ? fs.readFileSync(path) : Buffer.alloc(0)
let buffer
if (options && (options.packname || options.author)) {
buffer = await writeExifImg(buff, options)
} else {
buffer = await imageToWebp(buff)
}
await ohlx.sendMessage(jid, { sticker: { url: buffer }, ...options }, { quoted })
return buffer
}

ohlx.sendVideoAsSticker = async (jid, path, quoted, options = {}) => {
let buff = Buffer.isBuffer(path) ? path : /^data:.*?\/.*?;base64,/i.test(path) ? Buffer.from(path.split`,`[1], 'base64') : /^https?:\/\//.test(path) ? await (await getBuffer(path)) : fs.existsSync(path) ? fs.readFileSync(path) : Buffer.alloc(0)
let buffer
if (options && (options.packname || options.author)) {
buffer = await writeExifVid(buff, options)
} else {
buffer = await videoToWebp(buff)
}
await ohlx.sendMessage(jid, { sticker: { url: buffer }, ...options }, { quoted })
return buffer
}

ohlx.copyNForward = async (jid, message, forceForward = false, options = {}) => {
let vtype
if (options.readViewOnce) {
message.message = message.message && message.message.ephemeralMessage && message.message.ephemeralMessage.message ? message.message.ephemeralMessage.message : (message.message || undefined)
vtype = Object.keys(message.message.viewOnceMessage.message)[0]
delete(message.message && message.message.ignore ? message.message.ignore : (message.message || undefined))
delete message.message.viewOnceMessage.message[vtype].viewOnce
message.message = {
...message.message.viewOnceMessage.message
}
}
let mtype = Object.keys(message.message)[0]
let content = await generateForwardMessageContent(message, forceForward)
let ctype = Object.keys(content)[0]
let context = {}
if (mtype != "conversation") context = message.message[mtype].contextInfo
content[ctype].contextInfo = {
...context,
...content[ctype].contextInfo
}
const waMessage = await generateWAMessageFromContent(jid, content, options ? {
...content[ctype],
...options,
...(options.contextInfo ? {
contextInfo: {
...content[ctype].contextInfo,
...options.contextInfo
}
} : {})
} : {})
await ohlx.relayMessage(jid, waMessage.message, { messageId:  waMessage.key.id })
return waMessage
}

ohlx.downloadAndSaveMediaMessage = async (message, filename, attachExtension = true) => {
let quoted = message.msg ? message.msg : message
let mime = (message.msg || message).mimetype || ''
let messageType = message.mtype ? message.mtype.replace(/Message/gi, '') : mime.split('/')[0]
const stream = await downloadContentFromMessage(quoted, messageType)
let buffer = Buffer.from([])
for await(const chunk of stream) {
buffer = Buffer.concat([buffer, chunk])
}
let type = await FileType.fromBuffer(buffer)
trueFileName = attachExtension ? (filename + '.' + type.ext) : filename
await fs.writeFileSync(trueFileName, buffer)
return trueFileName
}

ohlx.downloadMediaMessage = async (message) => {
let mime = (message.msg || message).mimetype || ''
let messageType = message.mtype ? message.mtype.replace(/Message/gi, '') : mime.split('/')[0]
const stream = await downloadContentFromMessage(message, messageType)
let buffer = Buffer.from([])
for await(const chunk of stream) {
buffer = Buffer.concat([buffer, chunk])
}
return buffer
}

ohlx.getFile = async (PATH, save) => {
let res
let data = Buffer.isBuffer(PATH) ? PATH : /^data:.*?\/.*?;base64,/i.test(PATH) ? Buffer.from(PATH.split`,`[1], 'base64') : /^https?:\/\//.test(PATH) ? await (res = await getBuffer(PATH)) : fs.existsSync(PATH) ? (filename = PATH, fs.readFileSync(PATH)) : typeof PATH === 'string' ? PATH : Buffer.alloc(0)
let type = await FileType.fromBuffer(data) || {
mime: 'application/octet-stream',
ext: '.bin'}
filename = path.join(__filename, './lib' + new Date * 1 + '.' + type.ext)
if (data && save) fs.promises.writeFile(filename, data)
return {
res,
filename,
size: await getSizeMedia(data),
...type,
data}}

ohlx.sendMedia = async (jid, path, fileName = '', caption = '', quoted = '', options = {}) => {
let types = await ohlx.getFile(path, true)
let { mime, ext, res, data, filename } = types
if (res && res.status !== 200 || file.length <= 65536) {
try { throw { json: JSON.parse(file.toString()) } }
catch (e) { if (e.json) throw e.json }}
let type = '', mimetype = mime, pathFile = filename
if (options.asDocument) type = 'document'
if (options.asSticker || /webp/.test(mime)) {
let { writeExif } = require('./lib/exif')
let media = { mimetype: mime, data }
pathFile = await writeExif(media, { packname: options.packname ? options.packname : global.packname, author: options.author ? options.author : global.author, categories: options.categories ? options.categories : [] })
await fs.promises.unlink(filename)
type = 'sticker'
mimetype = 'image/webp'}
else if (/image/.test(mime)) type = 'image'
else if (/video/.test(mime)) type = 'video'
else if (/audio/.test(mime)) type = 'audio'
else type = 'document'
await ohlx.sendMessage(jid, { [type]: { url: pathFile }, caption, mimetype, fileName, ...options }, { quoted, ...options })
return fs.promises.unlink(pathFile)}

ohlx.sendText = (jid, text, quoted = '', options) => ohlx.sendMessage(jid, { text: text, ...options }, { quoted })

ohlx.serializeM = (m) => smsg(ohlx, m, store)

ohlx.ev.on('connection.update', async (update) => {
const { connection, lastDisconnect } = update	
if (connection === 'close') {
let reason = new Boom(lastDisconnect?.error)?.output.statusCode
if (reason === DisconnectReason.badSession) { console.log(`Bad Session File, Please Delete Session and Scan Again`); ohlx.logout(); }
else if (reason === DisconnectReason.connectionClosed) { console.log("Connection closed, reconnecting...."); ohlxBot(); }
else if (reason === DisconnectReason.connectionLost) { console.log("Connection Lost from Server, reconnecting..."); ohlxBot(); }
else if (reason === DisconnectReason.connectionReplaced) { console.log("Connection Replaced, Another New Session Opened, Please Close Current Session First"); ohlx.logout(); }
else if (reason === DisconnectReason.loggedOut) { console.log(`Device Logged Out, Please Scan Again And Run.`); ohlx.logout(); }
else if (reason === DisconnectReason.restartRequired) { console.log("Restart Required, Restarting..."); ohlxBot(); }
else if (reason === DisconnectReason.timedOut) { console.log("Connection TimedOut, Reconnecting..."); ohlxBot(); }
else ohlx.end(`Unknown DisconnectReason: ${reason}|${connection}`)
}
console.log('Connected...', update)
})

//send 5 button image by xeon
    ohlx.send5ButImg = async (jid , text = '' , footer = '', img, but = [], thumb, options = {}) =>{
        let message = await prepareWAMessageMedia({ image: img, jpegThumbnail:thumb }, { upload: ohlx.waUploadToServer })
        var template = generateWAMessageFromContent(m.chat, proto.Message.fromObject({
        templateMessage: {
        hydratedTemplate: {
        imageMessage: message.imageMessage,
               "hydratedContentText": text,
               "hydratedFooterText": footer,
               "hydratedButtons": but
            }
            }
            }), options)
            ohlx.relayMessage(jid, template.message, { messageId: template.key.id })
    }


    //send5butvid by xeon
        ohlx.send5ButVid = async (jid , text = '' , footer = '', vid, but = [], options = {}) =>{
        let message = await prepareWAMessageMedia({ video: vid }, { upload: ohlx.waUploadToServer })
        var template = generateWAMessageFromContent(jid, proto.Message.fromObject({
        templateMessage: {
        hydratedTemplate: {
        videoMessage: message.videoMessage,
               "hydratedContentText": text,
               "hydratedFooterText": footer,
               "hydratedButtons": but
            }
            }
            }), options)
            ohlx.relayMessage(jid, template.message, { messageId: template.key.id })
    }
    
    
    //send5butmsg by xeon
            ohlx.send5ButMsg = (jid, text = '' , footer = '', but = []) =>{
        let templateButtons = but
        var templateMessage = {
        text: text,
        footer: footer,
        templateButtons: templateButtons
        }
        ohlx.sendMessage(jid, templateMessage)
        }


//sendlistmsg by xeon
        ohlx.sendListMsg = (jid, text = '', footer = '', title = '' , butText = '', sects = [], quoted) => {
        let sections = sects
        var listMes = {
        text: text,
        footer: footer,
        title: title,
        buttonText: butText,
        sections
        }
        ohlx.sendMessage(jid, listMes, { quoted: quoted })
        }


    //send5butgif by xeon
        ohlx.send5ButGif = async (jid , text = '' , footer = '', gif, but = [], options = {}) =>{
        let message = await prepareWAMessageMedia({ video: gif, gifPlayback: true }, { upload: ohlx.waUploadToServer })
        var template = generateWAMessageFromContent(jid, proto.Message.fromObject({
        templateMessage: {
        hydratedTemplate: {
        videoMessage: message.videoMessage,
               "hydratedContentText": text,
               "hydratedFooterText": footer,
               "hydratedButtons": but
            }
            }
            }), options)
            ohlx.relayMessage(jid, template.message, { messageId: template.key.id })
    }
    
    
ohlx.sendButtonText = (jid, buttons = [], text, footer, quoted = '', options = {}) => {
let buttonMessage = {
text,
footer,
buttons,
headerType: 2,
...options
}
ohlx.sendMessage(jid, buttonMessage, { quoted, ...options })
}

ohlx.sendKatalog = async (jid , title = '' , desc = '', gam , options = {}) =>{
let message = await prepareWAMessageMedia({ image: gam }, { upload: ohlx.waUploadToServer })
const tod = generateWAMessageFromContent(jid,
{"productMessage": {
"product": {
"productImage": message.imageMessage,
"productId": "9999",
"title": title,
"description": desc,
"currencyCode": "IDR",
"priceAmount1000": "100000",
"url": `https://youtube.com/channel/UC7NslQroUqQYzo2wDFBOUMg`,
"productImageCount": 1,
"salePriceAmount1000": "0"
},
"businessOwnerJid": `6283160327945@s.whatsapp.net`
}
}, options)
return ohlx.relayMessage(jid, tod.message, {messageId: tod.key.id})
} 

ohlx.send5ButLoc = async (jid , text = '' , footer = '', img, but = [], options = {}) =>{
var template = generateWAMessageFromContent(jid, proto.Message.fromObject({
templateMessage: {
hydratedTemplate: {
"hydratedContentText": text,
"locationMessage": {
"jpegThumbnail": img },
"hydratedFooterText": footer,
"hydratedButtons": but
}
}
}), options)
ohlx.relayMessage(jid, template.message, { messageId: template.key.id })
}

return ohlx
}

ohlxBot()