import fetch from 'node-fetch';

const handler = async (m, { text, usedPrefix, command }) => {

  if (!text) {

    return conn.reply(

      m.chat,

      `🦇 *مــرحــبــا بــك انـا ${command} عــلــيــك كــتــابــة نــص لــكـي ارد عــلـيـك*\n\n*مثال:*\n*${usedPrefix + command}*من انت؟`,

      m

    );

  }

  

  try {

    let prompt = `انت زاك بطل انمي ملائكة الموت لديك قوة قتاليا فريدة ولديك شخصية غامضة و استخدم الايموجي كثيراً وان سألك احد من انت اكتب له كثيرا عن زاك من انمي ملائكة الموت و مطورك هو "فريق فلاش" أن سالك من صانعك قل له أن من صنعك هو المطور زاك`;

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

handler.command = ['زاك'];

handler.help = ['Z A C K'];

handler.tags = ['ai'];

export default handler;