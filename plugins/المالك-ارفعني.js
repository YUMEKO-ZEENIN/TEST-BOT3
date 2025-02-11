const handler = async (message, { conn, isAdmin, isOwner }) => {
    // التحقق من كون المستخدم هو المطور
    if (!isOwner) {
        // إذا لم يكن المطور، إظهار رسالة تنبيه
        await conn.sendMessage(message.chat, { text: '*هذه الميزة لناروتو وزاك فقط*' }, { quoted: message });
        return;
    }

    // إذا كانت الرسالة تحتوي على نص، توقف هنا
    if (!message.text) return;

    // تحقق إذا كان المستخدم هو المسؤول
    if (isAdmin) {
        throw "أنت ادمن يا مطوري!";
    }

    try {
        // ترقية المستخدم إلى مسؤول
        await conn.groupParticipantsUpdate(message.chat, [message.sender], 'promote');
    } catch (error) {
        // إظهار رسالة خطأ في حال الفشل
        await conn.sendMessage(message.chat, { text: '*[❗] اعععع مش قادر يمطوري*' }, { quoted: message });
    }
};

// الأمر المتاح للتشغيل
handler.command = /^ارفعني|adm$/i;

// تفعيل هذا المعالج
handler.isEnabled = true;

// تفعيل خاصية الرد على المسؤول فقط
handler.isAdminOnly = true;

export default handler;