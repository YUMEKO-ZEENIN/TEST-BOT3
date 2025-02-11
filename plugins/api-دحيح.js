import fetch from 'node-fetch';

const handler = async (m, { conn, text }) => {
  try {
    const apiURL = `https://api-kurosaki-vs.vercel.app/api/ai/gemini?prompt=${encodeURIComponent(text)}&lc=ar`;

    if (!text) {
      return conn.reply(
        m.chat,
        '*مرحبا انا دحيح كيف يمكنني مساعدك؟*\nمـثال:\n*.دحيح من هو اخر رسول؟*\n*.دحيح كيف حالك؟!*\n\n> *.دحيح بيحبك يا برو*',
        m
      );
    }

    const response = await fetch(apiURL);
    const data = await response.json();

    if (data && data.kurosaki) {
      const replyMessage = data.kurosaki;
      
      conn.reply(m.chat, replyMessage, m);
    } else {
      conn.reply(m.chat, 'حصل خطأ في التواصل مع الـ API.', m);
    }

  } catch (error) {
    conn.reply(m.chat, 'حصل خطأ في التواصل مع الـ API.', m);
  }
};

handler.help = ['gemini'];
handler.tags = ['ai'];
handler.command = /^(دحيح|دحدوح|جيمي)$/i;
export default handler;