import {createHash} from 'crypto';
const handler = async function(m, {args}) {
  if (!args[0]) throw '*[❗خطاء❗] ادخل الايدي,\n*مثال:*\n.تسجيل-خروج <وهنا الايدي>*';
  const user = global.db.data.users[m.sender];
  const sn = createHash('md5').update(m.sender).digest('hex');
  if (args[0] !== sn) throw '*[❗خطاء❗] الرقم السري خطا, اتاكد ان انت كتبته صح!*';
  user.registered = false;
  m.reply(`*[ ✔ ] تم بنجاح, لم تعد مسجل في البوت*`);
};
handler.help = ['', 'ister'].map((v) => 'unreg' + v + ' <numero de serie>');
handler.tags = ['xp'];
handler.command = /^(تسجيل-خروج)$/;
handler.register = true;
export default handler;
