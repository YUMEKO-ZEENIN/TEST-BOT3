import { igdl } from 'ruhend-scraper';

const handler = async (m, { text, conn, args, usedPrefix, command }) => {
  if (!args[0]) {
    return conn.reply(m.chat, '*❐═━━━═╊⊰🦇⊱╉═━━━═❐*\n*❮⛓️‍💥↜ضع الرابط يا بغل ❯*\nمثال:\n.فيس https://www.facebook.com/share/v/BAAGw9NDYktUjVWp/\n*❐═━━━═╊⊰🦇⊱╉═━━━═❐*', m);
  }

  let res;
  try {
    res = await igdl(args[0]);
  } catch (error) {
    return conn.reply(m.chat, 'فيه مشكله بجلب البيانات، تأكد من الرابط.', m);
  }

  let result = res.data;
  if (!result || result.length === 0) {
    return conn.reply(m.chat, 'ما لقينا شي.', m);
  }

  let data;
  try {
    data = result.find(i => i.resolution === "720p (HD)") || result.find(i => i.resolution === "360p (SD)");
  } catch (error) {
    return conn.reply(m.chat, 'فيه مشكله بمعالجة البيانات.', m);
  }

  if (!data) {
    return conn.reply(m.chat, 'ما لقينا جوده مناسبه.', m);
  }

  let video = data.url;
  try {
    // إضافة التعليق في محتوى الفيديو
    await conn.sendMessage(m.chat, { 
      video: { url: video }, 
      caption: 'تم بعت الفيديو بنجاح 👍', // التعليق هنا
      fileName: 'fb.mp4', 
      mimetype: 'video/mp4' 
    }, { quoted: m });
  } catch (error) {
    return conn.reply(m.chat, 'صار خطأ بإرسال الفيديو.', m);
  }
};

handler.command = /^(facebook|فيس|فيسبوك)$/i;

export default handler;