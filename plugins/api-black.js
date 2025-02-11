import fetch from 'node-fetch';

const handler = async (m, { conn, text }) => {
  try {
    const apiURL = `https://api-kurosaki-vs.vercel.app/api/ai/blackbox?text=${encodeURIComponent(text)}&lc=ar`;

    if (!text) {
      return conn.reply(
        m.chat,
        '*مرحبا انا بلاك كيف يمكنني مساعدك؟*\nمـثال:\n*.بلاك من هو اخر رسول؟*\n*.بلاك كيف حالك؟!*\n\n> *.بلاك بيحبك يا برو*',
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

handler.help = ['blackbox'];
handler.tags = ['ai'];
handler.command = /^(بلاك|بلاك_بوكس|بوكس)$/i;
export default handler;