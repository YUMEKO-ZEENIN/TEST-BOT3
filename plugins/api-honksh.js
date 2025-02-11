import fetch from 'node-fetch';

const handler = async (m, { conn, text }) => {
  try {
    const apiURL = `https://api-virus.vercel.app/api/simsimi?text=${encodeURIComponent(text)}&lc=ar`;

    if (!text) {
      return conn.reply(
        m.chat,
        '*ده هـو حـنـكـس اكـتب سـؤالـك وهـيرد عــلــيـك يــاحــب*\nمـثال:\n*.حنكش اسم اختك اي*\n*.حنكش امك عاملة اي*\n\n> خــلــي بالــك مــنــو عــشــان بــيــشــتــم كــتــيــر',
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

handler.help = ['simsimi'];
handler.tags = ['ai'];
handler.command = /^(حونكش|حنكش|حنون)$/i;
export default handler;