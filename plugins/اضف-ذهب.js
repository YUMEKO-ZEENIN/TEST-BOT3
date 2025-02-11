//import db from '../lib/database.js'

let handler = async (m, { conn, text }) => {
    let who
    if (m.isGroup) who = m.mentionedJid[0]
    else who = m.chat
    if (!who) throw '✳️ منشن المستخدم'
    let txt = text.replace('@' + who.split`@`[0], '').trim()
    if (!txt) throw '✳️ أدخل المبلغ *الحد* الذي تريد إضافته'
    if (isNaN(txt)) throw '🔢 مجرد ارقام'
    let dmt = parseInt(txt)
    let gold = dmt

    if (gold < 1) throw '✳️ الحد الأدنى  *1*'
    let users = global.db.data.users
   users[who].gold += dmt

    await m.reply(`
*⌊ اضــافــه ذهــــب ⌉* ↶
*╭┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈•*
*┆ تــم اضـافـة : ${dmt} ذهب 🪙*
*╰┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈*`)
   conn.fakeReply(m.chat, `
*⌊ لـقـد حـصـلـت عـلـي ⌉* ↶
*╭┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈•*
*┆ ⌊ ${dmt} ⌉ ذهب 🪙*
*╰┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈*
> استخدم امر ⌊ .ذهبي ⌉ لي الاطلاع علي ذهبك`, who, m.text)
}

handler.help = ['adddi <@user>']
handler.tags = ['econ']
handler.command = ['addgold', 'ذهب'] 
handler.owner = true

export default handler

