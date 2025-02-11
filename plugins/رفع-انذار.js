const handler = async (m, {conn, text, command, usedPrefix}) => {
  const pp = './src/warn.jpg';
  let who;
  if (m.isGroup) who = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : text;
  else who = m.chat;
  const user = global.db.data.users[who];
  const bot = global.db.data.settings[conn.user.jid] || {};
  const warntext = `*❐═━━━═╊⊰🦇⊱╉═━━━═❐*\n*❐┃سوي منشن او ريبلاي للشخص يلي تريده┃🛑❯*\n\n*❐↞┇ مثال ↞ ${usedPrefix + command}  @${global.suittag}┇*\n*❐═━━━═╊⊰🦇⊱╉═━━━═❐*\n*𝐑𝐀𝐈𝐙𝐄𝐋﹝🦇﹞𝐁𝐎𝐓*`;
  if (!who) throw m.reply(warntext, m.chat, {mentions: conn.parseMention(warntext)});
  if (m.mentionedJid.includes(conn.user.jid)) return;
  if (user.warn == 0) throw '*❐┃الشخص طيب ما عنده انذارات🤨 شكله انت يبي لك┃❌❯*';
  user.warn -= 1;
  await m.reply(`*❐═━━━═╊⊰🦇⊱╉═━━━═❐*\n*❐┃تمت مسامحتك لانك صرت طيب يا ${user.warn == 1 ? `@${who.split`@`[0]} حاول لا تعيدها┃✅❯*` :`@${who.split`@`[0]} مبروك راحو الانذارات┃✅❯*`}\n*『عـدد انـذاراتـ⛔ـك┇↜ ${user.warn}/5』*\n*❐═━━━═╊⊰🦇⊱╉═━━━═❐*\n*𝐑𝐀𝐈𝐙𝐄𝐋﹝🦇﹞𝐁𝐎𝐓*`, null, {mentions: [who]});
};
handler.command = /^unwarn|delwarn|سحب_انذار|رفع-انذار|مسامحة|مسامحه|الغاءتنبيه$/i;
handler.group = true;
handler.admin = true;
handler.botAdmin = true;
export default handler;