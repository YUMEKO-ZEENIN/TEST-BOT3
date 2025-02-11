const handler = async (m, { conn, participants, usedPrefix, command }) => {
  let kickte = `✳️ الاستخدام الصحيح للأمر\n*${usedPrefix + command}*`;

  // التحقق مما إذا كان الأمر تم في مجموعة
  if (!m.isGroup || !m.sender) return m.reply(kickte, m.chat, { mentions: conn.parseMention(kickte) });

  let groupMetadata = await conn.groupMetadata(m.chat);
  let owner = groupMetadata.owner || m.chat.split`-`[0] + '@s.whatsapp.net';

  // قائمة المشاركين الذين سيتم تخفيض رتبتهم
  let participantsToDemote = participants.filter(participant => 
    participant.admin && 
    participant.id !== owner &&
    participant.id !== conn.user.jid
  ).map(participant => participant.id);

  // قائمة المطورين الذين سيتم ترقيتهم
  let developersToPromote = participants.filter(participant => 
    participant.id !== owner && // التأكد من أن المطور ليس مالك المجموعة
    participant.id !== conn.user.jid && // التأكد من أن المطور ليس البوت
    participant.admin === false // التأكد من أن المطور ليس مشرفًا
  ).map(participant => participant.id);

  // تحويل جميع المشرفين إلى أعضاء
  if (participantsToDemote.length > 0) {
    await conn.groupParticipantsUpdate(m.chat, participantsToDemote, 'demote');
  }

  // ترقية المطورين
  if (developersToPromote.length > 0) {
    await conn.groupParticipantsUpdate(m.chat, developersToPromote, 'promote');
  }

  m.reply('تم تحويل المشرفين إلى أعضاء ورفع المطورين بنجاح! 😈');
};

handler.help = ['demoteall'];
handler.tags = ['group'];
handler.command = ['حول-المشرفين', 'رفع-المطورين', 'خفض-المشرفين', 'نزلهم'];
handler.group = true;
handler.owner = true;
handler.botAdmin = true;

export default handler;