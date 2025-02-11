import fs from 'fs';

const handler = async (m, { text }) => {
  if (!text) throw 'أدخل اسم الملف الذي تريد حذفه';

  const path = `plugins/${text}.js`;

  if (fs.existsSync(path)) {
    fs.unlinkSync(path);
    m.reply('تم الحذف بنجاح');
  } else {
    m.reply('الملف غير موجود');
  }
};

handler.help = ['deleteplugin'].map((v) => v + ' <اسم الملف>');
handler.tags = ['owner'];
handler.command = ['حذف_امر'];
handler.owner = true;

export default handler;