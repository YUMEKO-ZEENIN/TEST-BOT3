import { createHash } from 'crypto' 
import PhoneNumber from 'awesome-phonenumber'
import fetch from 'node-fetch'
let handler = async (m, { conn, usedPrefix }) => {
let pp = 'https://envs.sh/Sve.jpg'
//const pp = await conn.profilePictureUrl(conn.user.jid).catch(_ => './src/avatar_contact.png')
let user = global.db.data.users[m.sender]
let taguser = '@' + m.sender.split("@s.whatsapp.net")[0];
let who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender
try {
pp = await conn.getProfilePicture(who)         //pp = await conn.getProfilePicture(who)
} catch (e) {

} finally {
let { name, dollar, level, registered, isPrems, diamond, role } = global.db.data.users[who]
//let who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender
let mentionedJid = [who]
let username = conn.getName(who)
let prem = global.prems.includes(who.split`@`[0])
let sn = createHash('md5').update(who).digest('hex')
let str =
`*╮───────────────────⟢ـ*
*┆┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈*
*┆⚡❯ بـروفـايـلـك ❮⚡┆*
*┆┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈*
*┆🪪‣ اســمــك : ${name}*
*┆🔖‣ مــنــشــنــك : @${who.replace(/@.+/, '')}*
*┆💷‣ فــلــوســك: ⌊ ${dollar} ⌉*
*┆🎗‣ مــســتــواك: ⌊ ${level} ⌉*
*┆💎‣ الـمـاس: ⌊ ${diamond} ⌉* 
*┆🎪‣ رتـبـتـك : ⌊ ${role} ⌉*
*┆📇‣ مـــســـجـــل : ⌊ ${registered ? '✅' : '❌'} ⌉*
*╯───────────────────⟢ـ*`.trim()
    conn.sendFile(m.chat, pp, 'pp.jpg', str, fkontak, false, { contextInfo: { mentionedJid }}) 
  }
}
handler.help = ['profile [@user]']
handler.tags = ['xp']
handler.command = /^بروفايل|profile?$/i
export default handler
