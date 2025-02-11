let handler = async (m, { conn, isOwner, isPrems }) => {
let vip = global.db.data.users[m.sender].premium
let prem = Object.entries(global.db.data.users).filter(user => user[1].premium)
let user = global.db.data.users[m.sender];
let caption = `🎟️ قــائــمــة الــمــشــتــركــيــن VIP
*╭•·–––––––––––––––––––·•*
│ *الــمــجــمــوع : ${prems.length} مستخدم* ${isPrems ? '\n' + prem.map(([jid], i) => `
│ *${i + 1}.* ${conn.getName(jid) == undefined ? 'Sin فقط' : conn.getName(jid)}
│ ${isOwner ? '@' + jid.split`@`[0] : jid}\n│ - - - - - - - - -`.trim()).join('\n') : ''}
*╰•·–––––––––––––––––––·•*\n\n🎟️ بــريــمــيــام ⇢ ${user.premiumTime > 0 ? '✅' : (isPrems ? '✅' : '❌') || ''}\n> ${wm}`
await conn.reply(m.chat, caption, m, { mentions: await conn.parseMention(caption) })
//await conn.sendButton(m.chat, caption, `🎟️ مــشــتــرك ⇢ ${user.premiumTime > 0 ? '✅' : (isPrems ? '✅' : '❌') || ''}`, null, [ 
//[`'✦ الــمــطــوريــن ✦': '✦ اشــتــرك فــي فــلاش بــوت ✦'}`, `'.المطور': '.الباقات'}`]], m, { mentions: await conn.parseMention(caption) })
}
handler.command = /^(المشتركين|listpremium)$/i

export default handler
