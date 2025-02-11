import fetch from 'node-fetch';

const handler = async (m, { conn, text }) => {
  try {
    // التحقق من وجود مدخل المستخدم
    if (!text) {
      return conn.reply(
        m.chat,
        '*مرحبًا! أحتاج إلى رابط صورة وسؤال بالشكل التالي:*\n\nمثال:\n*.فلاش https://example.com/image.jpg |من هذا؟*\n\n> يرجى إدخال رابط صورة وسؤال.',
        m
      );
    }

    // تقسيم النص للحصول على الرابط والسؤال
    const [url, query] = text.split('|').map(part => part.trim());

    if (!url || !query) {
      return conn.reply(
        m.chat,
        'يبدو أن المدخل غير مكتمل. يرجى توفير رابط الصورة والسؤال بالشكل:\n\n*.فلاش https://example.com/image.jpg |من هذا؟*',
        m
      );
    }

    // إعداد الرابط النهائي للـ API
    const apiURL = `https://api-kurosaki-vs.vercel.app/api/ai/gemini-img-flash?url=${encodeURIComponent(url)}&q=${encodeURIComponent(query)}`;

    // إرسال الطلب إلى API
    const response = await fetch(apiURL);
    const data = await response.json();

    // معالجة الرد من API
    if (data && data.kurosaki) {
      const replyMessage = `نتيجة التحليل:\n${data.kurosaki}`;
      conn.reply(m.chat, replyMessage, m);
    } else {
      conn.reply(m.chat, 'لم أتمكن من معالجة الصورة أو الإجابة على السؤال. تحقق من المدخلات أو جرب مرة أخرى.', m);
    }
  } catch (error) {
    // معالجة الأخطاء
    conn.reply(m.chat, `حدث خطأ أثناء الاتصال بـ API:\n${error.message}`, m);
  }
};

// إعدادات الأمر
handler.help = ['فلاش'];
handler.tags = ['ai'];
handler.command = /^(فلاش|تحليل_صورة)$/i;

export default handler;
