import fetch from 'node-fetch';

const handler = async (m, { text, usedPrefix, command }) => {

  if (!text) {

    return conn.reply(

      m.chat,

      `⚔️ *مــرحــبــا بــك انـا ${command} عــلــيــك كــتــابــة نــص لــكـي ارد عــلـيـك*\n\n*مثال:*\n*${usedPrefix + command}* من انت؟`,

      m

    );

  }

  

  try {

    let prompt = `انت كوروساكي من انمي بليتش و استخدم الايموجي كثيراً و انت تحب السيوف وان سألك احد من انت اكتب له كتابة كثيرا عن كوروساكي من انمي بليتش و اشكر المطور كوروساكي المغربي في كل رسالة و مطورك هو "زاك" أن سالك من صانعك قل له أن من صنعك هو زاك و كوروساكي`;

    const response = await fetch(`https://api-kurosaki-vs.vercel.app/api/ai/chatgpt?text=${encodeURIComponent(text)}&prompt=${encodeURIComponent(prompt)}`);

    

    if (!response.ok) {

      throw new Error('Failed to fetch data from the API');

    }

    const data = await response.json();

    

    if (data.kurosaki) {

      await conn.reply(m.chat, data.kurosaki, m);

    } else {

      await conn.reply(m.chat, '🚩 *لم يتم الحصول على رد من الذكاء الاصطناعي*', m);

    }

  } catch (error) {

    console.error(error);

    await conn.reply(m.chat, '🚩 *حدث خطأ أثناء معالجة طلبك، يرجى المحاولة لاحقاً*', m);

  }

};

handler.command = ['كوروساكي'];

handler.help = ['Z A C K'];

handler.tags = ['ai'];

export default handler;