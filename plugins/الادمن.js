let handler = async (m, { conn, participants, groupMetadata, args, usedPrefix, text, command }) => {
  if (!text) return m.reply(`> ⚠️ أدخل نصًا لطلب حضور ${command}`)

  const pp = await conn.profilePictureUrl(m.chat, 'image').catch(_ => null) || './src/admins.jpg'
  const groupAdmins = participants.filter(p => p.admin)
  
  if (groupAdmins.length === 0) {
    return m.reply(`> ⚠️ لا يوجد إداريين في هذه المجموعة.`)
  }

  const listAdmin = groupAdmins.map((v, i) => `*» ${i + 1}. @${v.id.split('@')[0]}*`).join('\n')
  const owner = groupMetadata.owner || groupAdmins.find(p => p.admin === 'superadmin')?.id || m.chat.split`-`[0] + '@s.whatsapp.net'
  let pesan = args.join` `
  let oi = `_${pesan}_`

  let textoA = 
`*⊱ ──── 《.⋅ 🐾 ⋅.》 ──── ⊰*
> *ෆ استدعاء حضور ${command}*
> *ෆ رساله العضو: ${oi}*
*⊱ ──── 《.⋅ ${vs || 'الادمنز'} ⋅.》 ──── ⊰*`

  let textoB = 
`${listAdmin}

> ⛔ الادمنز الذين تم طلب حضورهم`.trim()

  await conn.sendFile(m.chat, pp, 'error.jpg', textoA + textoB, m, false, { mentions: [...groupAdmins.map(v => v.id), owner] })
}

handler.command = /^(الادمنز|@الادمن|الادمن|المشرفين)$/i
handler.group = true
export default handler
