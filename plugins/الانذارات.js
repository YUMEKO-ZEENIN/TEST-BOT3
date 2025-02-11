const handler = async (m, {conn, isOwner}) => {
  const adv = Object.entries(global.db.data.users).filter((user) => user[1].warn);
  const pp = imagen3;
  const img = './Menu2.jpg';
  const warns = global.db.data.users.warn;
  const user = global.db.data.users;
  const caption = `*عدد المستخدمين الحاصلين على انذار:*\n 
*❐═━━━═╊⊰🦇⊱╉═━━━═❐*
┊ *المجموع : ${adv.length} المستخدم* ${adv ? '\n' + adv.map(([jid, user], i) => `
┊
┊ *🦇︙↜*  ${isOwner ? '@' + jid.split`@`[0] : jid} *(${user.warn}/3)*\n┊\n┊ - - - - - - - - -`.trim()).join('\n') : ''}
*❐═━━━═╊⊰🦇⊱╉═━━━═❐*`;
conn.sendMessage(m.chat, {image: pp, caption: caption.trim(), mentions: [...caption.matchAll(/@([0-9]{5,16}|0)/g)].map((v) => v[1] + '@s.whatsapp.net')}, {quoted: m});};
handler.command = /^(الانذارات)$/i;
handler.group = true;
handler.admin = true;
export default handler;