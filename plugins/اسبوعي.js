import fetch from 'node-fetch'
let handler = async (m, { isPrems, conn }) => {
let user = global.db.data.users[m.sender]
let premium = user.premium

let exp = `${pickRandom([500, 1000, 1500, 2000, 2500, 3000, 3500, 4000, 4500, 5000])}` * 1
let exppremium = `${pickRandom([1000, 2000, 3000, 4000, 5000, 6000, 7000, 8000, 9000, 10000])}` * 1

let wood = `${pickRandom([100, 200, 300, 400, 500, 600, 700, 800, 900, 1000])}` * 1
let woodpremium = `${pickRandom([200, 300, 400, 500, 600, 700, 800, 900, 10000, 100000])}` * 1

let diamond = `${pickRandom([20, 40, 60, 80, 100, 120, 150])}` * 1
let diamondpremium = `${pickRandom([50, 100, 150, 200, 250, 300])}` * 1

let gold = `${pickRandom([4, 7, 9, 14, 18])}` * 1
let goldpremium = `${pickRandom([9, 18, 26, 38, 45])}` * 1

let dollar = `${pickRandom([1000, 2000, 3000, 4000, 5000])}` * 1
let dollarpremium = `${pickRandom([10000, 20000, 30000, 40000, 50000])}` * 1

const recompensas = {
  dollar: premium ? dollarpremium : dollar,
  wood: premium ? woodpremium : wood,
  diamond: premium ? diamondpremium : diamond,
  gold: premium ? goldpremium : gold,
  exp: premium ? exppremium : exp,
}

let time = user.lastmonthly + 730000000 //432000000 5 dias
if (new Date - user.lastmonthly < 730000000) return await conn.reply(m.chat, `*مرحبا لقد اخذت جوائزك الاسبوعية بل الفعل 🙌*\n\n*حاول مجددا بعد 👇🏻:*\n\n${clockString(time - new Date() * 1)}`, fkontak,  m)
//await conn.sendButton(m.chat, `*مرحبا لقد اخذت جوائزك الاسبوعية بل الفعل 🙌*`, wm + `\n\n*حاول مجددا بعد 👇🏻:*\n\n${clockString(time - new Date() * 1)}`, null, [['لــلاوامـر 🎗', '/اوامر']], fkontak, m)
let pp = 'https://envs.sh/SKm.jpg'
let texto = ''
for (let reward of Object.keys(recompensas)) {
    if (!(reward in user)) continue
    user[reward] += recompensas[reward]
texto += `*+${recompensas[reward]}* ${global.rpgshop.emoticon(reward)}\n┆ `}
let text = `*╮───────────────────⟢ـ*
┆ 🎖️ ⌊ جـوائـزك الاسـبـوعـيـة!!! ⌉
┊┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈•
┆ *${user.premiumTime > 0 ? '🎟️ مـكـافـأة الـمـمـيـزيـن' : (isPrems ? '🎟️ مـكـافـأة الـمـمـيـزيـن' : '🆓 مـكـافـأة مـجـانـيـة') || ''}*
┊┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈•
┆ ${texto}
╯───────────────────⟢ـ\n\n🎟️ بــريــمــيــام ⇢ ${user.premiumTime > 0 ? '✅' : (isPrems ? '✅' : '❌') || ''}\n${wm}`
conn.sendMessage(m.chat, {image: {url: pp}, caption: text, mentions: conn.parseMention(text)}, {quoted: fkontak, ephemeralExpiration: 24*60*100, disappearingMessagesInChat: 24*60*100})
 //await conn.sendButton(m.chat, text, texto + `\n\n🎟️ 𝗣 𝗥 𝗘 𝗠 𝗜 𝗨 𝗠 ⇢ ${premium ? '✅' : '❌'}\n${wm}`, gata.getRandom(), [['⚗️ 𝙍𝙀𝘾𝙇𝘼𝙈𝘼𝙍 𝘾𝙊𝙁𝙍𝙀 ⚗️', '/cofre'], ['𝙑𝙤𝙡𝙫𝙚𝙧 𝙖𝙡 𝙈𝙚𝙣𝙪́ | 𝘽𝙖𝙘𝙠 𝙩𝙤 𝙈𝙚𝙣𝙪 ☘️', '/menu']], m, enlace)  
user.lastmonthly = new Date * 1
}
handler.command = ['اسبوعي', 'اسبوع', 'اس', 'سبوعي', 'entregadelmes'] 
handler.level = 0
export default handler

function pickRandom(list) {
return list[Math.floor(Math.random() * list.length)]}

function clockString(ms) {
  let ye = isNaN(ms) ? '--' : Math.floor(ms / 31104000000) % 10
  let mo = isNaN(ms) ? '--' : Math.floor(ms / 2592000000) % 12
  let d = isNaN(ms) ? '--' : Math.floor(ms / 86400000) % 30
  let h = isNaN(ms) ? '--' : Math.floor(ms / 3600000) % 24
  let m = isNaN(ms) ? '--' : Math.floor(ms / 60000) % 60
  let s = isNaN(ms) ? '--' : Math.floor(ms / 1000) % 60
  return ['┃⇢ ', ye, ' *🗓️ ســنــوات*\n', '┃⇢ ', mo, ' *⛅ شــهــر*\n', '┃⇢ ', d, ' *☀️ يــوم*\n', '┃⇢ ', h, ' *⏰ ســاعــة*\n', '┃⇢ ', m, ' *🕐 دقــيــقــة*\n', '┃⇢ ', s, ' *⏱️ ثــانــيــة*'].map(v => v.toString().padStart(2, 0)).join('')
}
