import uploadFile from '../lib/uploadFile.js';
import uploadImage from '../lib/uploadImage.js';
import fetch from 'node-fetch';

let handler = async (m) => {
  try {
    // تحديد الرسالة المستهدفة ونوع الميديا
    let q = m.quoted ? m.quoted : m;
    let mime = (q.msg || q).mimetype || '';

    // التحقق من وجود ميديا وأن نوعها مدعوم
    if (!mime) throw '*يرجى الرد على صورة أو فيديو لرفعه.*';
    if (!/image\/(png|jpe?g|gif)|video\/mp4/.test(mime)) {
      throw '*الرجاء استخدام صورة (PNG/JPG/GIF) أو فيديو (MP4) فقط.*';
    }

    // تحميل الميديا
    let media = await q.download();
    let isImage = /image\/(png|jpe?g|gif)/.test(mime);
    let link = await (isImage ? uploadImage : uploadFile)(media);

    // تكوين رابط الـ API مع الرابط المرفوع
    const apiURL = `https://api-kurosaki-vs.vercel.app/api/ai/catbox?url=${encodeURIComponent(link)}`;

    // إرسال الطلب إلى الـ API
    const response = await fetch(apiURL);
    const data = await response.json();

    // التحقق من استجابة الـ API
    if (data && data.status && data.imageUrl) {
      m.reply(`*تم رفع الملف بنجاح!*\n\n*رابط الملف:* ${data.imageUrl}\n*حجم الملف:* ${data.imageSize}`);
    } else {
      m.reply(`*حدث خطأ أثناء رفع الملف باستخدام الـ API.*\n\n*استجابة الـ API:*\n${JSON.stringify(data, null, 2)}`);
    }
  } catch (error) {
    // معالجة الأخطاء
    m.reply(`*خطأ:* ${error.message}`);
    console.error('Error Details:', error);
  }
};

handler.help = ['catbox <reply image/video>'];
handler.tags = ['tools'];
handler.command = /^(catbox|تليجراف2)$/i;

export default handler;
