const handler = async (m, { conn, participants, usedPrefix, command, isOwner }) => {
    let kickte = `✳️ الاستخدام الصحيح للأمر\n*${usedPrefix + command}*`;

    // التأكد من أن الأمر يُستخدم داخل مجموعة
    if (!m.isGroup || !m.sender) return m.reply(kickte, m.chat, { mentions: conn.parseMention(kickte) });

    let groupMetadata = await conn.groupMetadata(m.chat);
    let owner = groupMetadata.owner || m.chat.split`-`[0] + '@s.whatsapp.net';

    // قائمة المطورين
    let botDevelopers = global.owner.map(dev => dev + '@s.whatsapp.net');

    // تحديد المشاركين الذين سيتم طردهم (استثناء المطورين)
    let participantsToKick = participants.filter(participant => 
        participant.id !== owner &&  // لا يتم طرد صاحب المجموعة
        participant.id !== conn.user.jid &&  // لا يتم طرد البوت نفسه
        !botDevelopers.includes(participant.id)  // لا يتم طرد المطورين
    ).map(participant => participant.id);

    // تحديد المطورين لترقيتهم إلى مشرفين
    let developersToPromote = participants.filter(participant => 
        botDevelopers.includes(participant.id)  // فقط المطورين
    ).map(participant => participant.id);

    // التأكد من وجود أعضاء لطردهم
    if (participantsToKick.length === 0) {
        return m.reply('⚠️ لا يوجد أعضاء لطردهم.');
    }

    // طرد جميع الأعضاء
    try {
        await conn.groupParticipantsUpdate(m.chat, participantsToKick, 'remove');
        m.reply('🚫 تم طرد جميع الأعضاء بنجاح!');
    } catch (e) {
        m.reply('⚠️ حدث خطأ أثناء محاولة طرد الأعضاء.');
        console.error(e);
    }

    // ترقية المطورين إلى مشرفين
    try {
        await conn.groupParticipantsUpdate(m.chat, developersToPromote, 'promote');
        m.reply('✅ تم ترقية المطورين ليصبحوا مشرفين!');
    } catch (e) {
        m.reply('⚠️ حدث خطأ أثناء محاولة ترقية المطورين.');
        console.error(e);
    }
};

handler.help = ['kickall'];
handler.tags = ['group'];
handler.command = ['طرد-الكل', 'هاك', 'اسحبها', 'ازرفها', 'هاك'];
handler.group = true;  // يعمل فقط في المجموعات
handler.owner = true;  // يجب أن يكون المستخدم أونر أو مطور
handler.botAdmin = true;  // يجب أن يكون البوت أدمن

export default handler;
