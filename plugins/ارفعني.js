نص الملف ادمني.js:

const handler = async (m, {conn, isAdmin}) => {
  if (m.fromMe) return;
  if (isAdmin) throw '*[❗] انت ادمن اصلا يا مطوري  ❤️*';
  try {
    await conn.groupParticipantsUpdate(m.chat, [m.sender], 'promote');
  } catch {
    await m.reply('*[❗] اسف يا مطوري مش قادر*');
  }
};
handler.command = /^autoadmin|adm|ادمني|ارفعني$/i;
handler.rowner = true;
handler.group = true;
handler.premium = true; 
handler.botAdmin = true;
export default handler;
