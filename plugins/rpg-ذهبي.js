const handler = async (m, {usedPrefix}) => {
  let who;
  if (m.isGroup) who = m.mentionedJid[0] ? m.mentionedJid[0] : m.sender;
  else who = m.sender;
  const name = conn.getName(who);
  m.reply(`ذهــبـي ↶
╮───────────────────⟢ـ
┆🪪↜ الاسـم : ${name}
┆🪙↜ الــذهــب : ${global.db.data.users[who].gold}
╯───────────────────⟢ـ
> رايــزل بــوت`);
};
handler.help = ['ami'];
handler.tags = ['xp'];
handler.command = ['ذهبي'];
export default handler;
