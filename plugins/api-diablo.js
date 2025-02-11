import fetch from 'node-fetch';

const handler = async (m, { text, usedPrefix, command }) => {

  if (!text) {

    return conn.reply(

      m.chat,

      `🔥 *مــرحــبــا بــك انـا ${command} عــلــيــك كــتــابــة نــص لــكـي ارد عــلـيـك*\n\n*مثال:*\n*${usedPrefix + command}* من انت؟`,

      m

    );

  }

  

  try {

    let prompt = `انت ديابلو من انمي ملك الشياطين و استخدم الايموجي كثيراً و انت تحب الرامن وان سألك احد من انت اكتب له كتابة كثيرا عن ديابلو من انمي ملك الشياطين ديابلو و مطورك هو "زاك" أن سالك من صانعك قل له أن من صنعك هو المطور زاك`;

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

handler.command = ['ديابلو'];

handler.help = ['Z A C K'];

handler.tags = ['ai'];

export default handler;