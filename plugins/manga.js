import fetch from 'node-fetch';

var handler = async (m, { conn, text }) => {
    if (!text) throw '⚠️ *أدخل عنوان المانغا الذي تريد البحث عنه!*';
    conn.reply(m.chat, '🔍 *جارِ البحث عن المانغا... يرجى الانتظار*', m);

    let res = await fetch(`https://api.jikan.moe/v4/manga?q=${encodeURIComponent(text)}`);
    if (!res.ok) throw '❌ *لم يتم العثور على المانغا*';

    let json = await res.json();
    if (json.data.length === 0) throw '❌ *لم يتم العثور على المانغا*';

    let {
        chapters, url, type, score, scored, scored_by, rank, popularity, members, background, status, volumes, synopsis, favorites
    } = json.data[0];

    let judul = json.data[0].titles.map(jud => `${jud.title} [${jud.type}]`).join('\n');
    let authors = json.data[0].authors.map(author => `${author.name} (${author.url})`).join('\n');
    let genres = json.data[0].genres.map(genre => `${genre.name}`).join('\n');

    let mangaInfo = `📚 *العنوان:* ${judul}
📑 *الفصول:* ${chapters}
✉️ *نوع النقل:* ${type}
🗂 *الحالة:* ${status}
😎 *النوع:* ${genres}
🗃 *المجلدات:* ${volumes}
🌟 *المفضلة:* ${favorites}
🧮 *التقييم:* ${score}
🧮 *التقييم الكلي:* ${scored}
🧮 *تقييمه من قبل:* ${scored_by}
🌟 *التصنيف:* ${rank}
🤩 *شعبية:* ${popularity}
👥 *الأعضاء:* ${members}
⛓️ *الرابط:* ${url}
👨‍🔬 *المؤلفون:* ${authors}
📝 *الخلفية:* ${background}
💬 *الملخص:* ${synopsis}
`;

    conn.sendFile(m.chat, json.data[0].images.jpg.image_url, 'manga.jpg', `📖 *معلومات المانغا* 🖋️\n` + mangaInfo, m);
    conn.reply(m.chat, '🔗 *لا تنسى الدخول إلى قناة المطور*\nhttps://whatsapp.com/channel/0029VaXddtu0lwgiREisx82C', m);
};

handler.help = ['manga <اسم المانغا>'];
handler.tags = ['anime'];
handler.command = /^(manga|مانغا|مانجا)$/i;

export default handler;