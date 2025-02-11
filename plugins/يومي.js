import fetch from 'node-fetch'
let handler = async (m, { isPrems, conn }) => {
let user = global.db.data.users[m.sender]
let premium = user.premium

let gold = `${pickRandom([500, 600, 700, 800, 900, 999, 1000, 1300, 1500, 1800])}` * 1
let goldpremium = `${pickRandom([1000, 1500, 1800, 2100, 2500, 2900, 3300, 3600, 4000, 4500])}` * 1
	
let exp = `${pickRandom([300, 500, 700, 900, 500, 800, 900, 1100, 1350, 1500])}` * 1
let exppremium = `${pickRandom([800, 1300, 1600, 1900, 2200, 2500, 2700, 3000, 3300, 3500])}` * 1


let diamond = `${pickRandom([300, 500, 700, 900, 500, 800, 900, 1100, 1350, 1500])}` * 1
let diamondpremium = `${pickRandom([800, 1300, 1600, 1900, 2200, 2500, 2700, 3000, 3300, 3500])}` * 1


//let gata = Math.floor(Math.random() * 2000)

const recompensas = {	
  exp: premium ? exppremium : exp,
  diamond: premium ? tiketcoinpremium : diamond,	
}

let time = user.lastclaim + 7200000 //2 Horas 7200000
if (new Date - user.lastclaim < 7200000) return await conn.sendButton(m.chat, `*لقد اخذت بالفعل هديتك* 🎁\n*ارجع بعد :* *${msToTime(time - new Date())}*`, wm, null, [['𝗠 𝗘 𝗡 𝗨 🤖', '/menu']], null, null, fkontak)
 //await conn.reply(m.chat, `𝙔𝘼 𝙍𝙀𝘾𝙇𝘼𝙈𝘼𝙎𝙏𝙀 𝙏𝙐 𝙍𝙀𝙂𝘼𝙇𝙊 🎁\n𝙑𝙐𝙀𝙇𝙑𝙀 𝙀𝙉 *${msToTime(time - new Date())}* 𝙋𝘼𝙍𝘼 𝙑𝙊𝙇𝙑𝙀𝙍 𝘼 𝙍𝙀𝘾𝙇𝘼𝙈𝘼𝙍\n\n𝙔𝙊𝙐 𝘼𝙇𝙍𝙀𝘼𝘿𝙔 𝘾𝙇𝘼𝙄𝙈𝙀𝘿 𝙔𝙊𝙐𝙍 𝙂𝙄𝙁𝙏 🎁\n𝘾𝙊𝙈𝙀 𝘽𝘼𝘾𝙆 𝙄𝙉 *${msToTime(time - new Date())}* 𝙏𝙊 𝘾𝙇𝘼𝙄𝙈 𝘼𝙂𝘼𝙄𝙉`, fkontak,  m)
let texto = ''
for (let reward of Object.keys(recompensas)) {
    if (!(reward in user)) continue
    user[reward] += recompensas[reward]
texto += `*+${recompensas[reward]}* ${global.rpgshop.emoticon(reward)}\n┇ `}
let text = `╮ ── ⋆⋆ ── ⋆⋆ ── ⋆⋆ ── ⋆⋆ ── ⋆⋆ ── ⋆⋆ ╭ـ
┇ *⌫┇مــكــافــئــة يــومــيــة ┇〄*
┇┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈•
┇ *${user.premiumTime > 0 ? '⌫┇مــكــافــئــة مــمــيــزة ┇〄' : (isPrems ? '⌫┇مــكــافــئــة مــمــيــزة ┇〄' : '⌫┇مــكــافــئــة مــجــانـيـة ┇〄') || ''}*
┇┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈•
┇ ${texto}
╯ ── ⋆⋆ ── ⋆⋆ ── ⋆⋆ ── ⋆⋆ ── ⋆⋆ ── ⋆⋆ ╰ـ

🎟️ 𝗣 𝗥 𝗘 𝗠 𝗜 𝗨 𝗠 ⇢ ${user.premiumTime > 0 ? '✅' : (isPrems ? '✅' : '❌') || ''}\n> ${wm}`
let img = 'https://img.freepik.com/vector-gratis/gente-diminuta-enormes-cajas-regalo-ilustracion-vectorial-plana-personas-que-celebran-cumpleanos-envian-o-reciben-regalos-lealtad-o-ideas-brillantes-recompensa-bonificacion-concepto-fiesta_74855-25016.jpg?w=2000'
//await conn.sendFile(m.chat, gataImg, 'gata.jpg', text, fkontak)
await conn.sendButton(m.chat, text,/* texto*/ + `\n\n🎟️ 𝗣 𝗥 𝗘 𝗠 𝗜 𝗨 𝗠 ⇢ ${user.premiumTime > 0 ? '✅' : (isPrems ? '✅' : '❌') || ''}\n> ${wm}`, img, [['لـلــمـتـجـر', '/متجر1'], ['𝗠 𝗘 𝗡 𝗨 🤖', '/menu']], null, null, m)  
user.lastclaim = new Date * 1
}
handler.help = ['daily']
handler.tags = ['xp']
handler.command = ['يومي', 'reclamar', 'reclamo', 'regalo', 'claim'] 
export default handler

function pickRandom(list) {
return list[Math.floor(Math.random() * list.length)]}

function msToTime(duration) {
  var milliseconds = parseInt((duration % 1000) / 100),
    seconds = Math.floor((duration / 1000) % 60),
    minutes = Math.floor((duration / (1000 * 60)) % 60),
    hours = Math.floor((duration / (1000 * 60 * 60)) % 24)

  hours = (hours < 10) ? "0" + hours : hours
  minutes = (minutes < 10) ? "0" + minutes : minutes
  seconds = (seconds < 10) ? "0" + seconds : seconds

  return hours + " ساعة " + minutes + " دقيقة "
}
