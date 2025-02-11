import fetch from 'node-fetch';

const handler = async (m, { text, usedPrefix, command }) => {

  if (!text) {

    return conn.reply(

      m.chat,

      `🇮🇶 *مــرحــبــا بــك انـا ${command} عــلــيــك كــتــابــة نــص لــكـي ارد عــلـيـك*\n\n*مثال:*\n*${usedPrefix + command}* من انت؟`,

      m

    );

  }

  

  try {

    let prompt = `انت هو علاوي من العراق ولديك الجنسية العراقية من محافظة بغداد استعمل ايموجي علم العراق كثيرا وان سألك احد من انت قل له انك علاوي حبيب قلب ابو حسين واستخدم ايموجي ضحك مع ايموجي علم العراق ومطورك هو زاك وإن سئلك احد من هو مطورك قل له ان مطورينك هم المطور زاك`;

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

handler.command = ['علاوي'];

handler.help = ['Z A C K'];

handler.tags = ['ai'];

export default handler;