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
    let exp = dmt

    if (exp < 1) throw '✳️ الحد الأدنى  *1*'
    let users = global.db.data.users
   users[who].exp += dmt

    await m.reply(`
*⌊ اضــافــه اكـس بـي ⌉* ↶
*╭┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈•*
*┆ تــم اضـافـة : ${dmt} اكـس بـي 🎉*
*╰┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈*`)
   conn.fakeReply(m.chat, `
*⌊ لـقـد حـصـلـت عـلـي ⌉* ↶
*╭┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈•*
*┆ ⌊ ${dmt} ⌉ اكـس بـي 🎈*
*╰┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈*
> استخدم امر ⌊ .لفل ⌉ لي الاطلاع علي مستواك`, who, m.text)
}

handler.help = ['adddi <@user>']
handler.tags = ['econ']
handler.command = ['addgold', 'اكس_بي'] 
handler.owner = true

export default handler

