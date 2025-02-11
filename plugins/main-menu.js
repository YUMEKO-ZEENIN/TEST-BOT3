let handler = async (m, { conn, taguser, gold, dollar, exp, role }) => {
    let d = new Date(new Date() + 3600000);  // تعديل هنا لتضمين عملية إنشاء الكائن Date بشكل صحيح
    let locale = 'ar';
    let week = d.toLocaleDateString(locale, { weekday: 'long' });
    let date = d.toLocaleDateString(locale, { day: 'numeric', month: 'long', year: 'numeric' });
    let _uptime = process.uptime() * 1000;
    let uptime = clockString(_uptime);
    let user = global.db.data.users[m.sender];
    let { money, joincount } = global.db.data.users[m.sender];
    let rtotalreg = Object.values(global.db.data.users).filter(user => user.registered == true).length;
    let more = String.fromCharCode(8206);
    let readMore = more.repeat(850);
    let img = 'https://envs.sh/pFb.jpg';

    await conn.sendMessage(m.chat, { react: { text: "🦇", key: m.key } });

    let text = `˼🦇˹↜ مـࢪحـبـا بـك/ي @${m.sender.split('@')[0]}
❐═━━━═╊⊰🦇⊱╉═━━━═❐
⌊🤖┇الــبــوت┇🤖⌉
●━── ⊱•┇«🦇»┇•⊰ ──━●
【🦇┇اسم البوت ⟣  رايـزل 】
【📌┇الـتـشـغـيل ⟣  ${uptime} 】
【📅┇الــيــوم ⟣  ${week} 】
【🗓┇الـتـاريـخ ⟣  ${date}】
【🎶┇الــمــســتـخـدمـيـن ⟣  ${rtotalreg} 】
❐═━━━═╊⊰🇵🇸⊱╉═━━━═❐
⌊🦇┇القوائم┇🦇⌉
❐═━━━═╊⊰🇵🇸⊱╉═━━━═❐
*❮🦇↜قسم الاعضاء┇ق1 ❯*
*❮🕋↜قسم الدين┇ق2 ❯*
*❮👑↜قسم المطور┇ق3 ❯*
*❮🛡️↜قسم التنزيلات ┇ق4 ❯*
*❮🎮↜قسم الالعاب┇ق5 ❯*
*❮♻️↜قسم التحويلات┇ق6 ❯*
*❮🤖↜قسم الانمي الــAi┇ق7 ❯*
*❮🚨↜قسم الدعم┇ق8 ❯*
*❮🎴↜قسم شخصيات الــAi┇ق9 ❯*
*❮👨🏻‍💻↜قسم المشرفين┇ق10 ❯*
*❮🔍↜قسم البحث┇ق11 ❯*
*❮⚗️↜قسم الادوات┇ق12 ❯*
*❮🎯↜قسم التسلية┇ق13 ❯*
*❮📺↜قسم الاديت┇ق14 ❯*
*❮🔮↜قسم الالقاب┇ق15 ❯*
*❮🏦↜قسم البنك┇ق16 ❯*
❐═━━━═╊⊰🦇⊱╉═━━━═❐
> © By Z4cK 2025 🦇`;

    let fkontak = {
        key: {
            participants: '0@s.whatsapp.net',
            remoteJid: 'status@broadcast',
            fromMe: false,
            id: ''
        },
        message: {
            contactMessage: {
                vcard: `BEGIN:VCARD\nVERSION:3.0\nN:Sy;Bot;;;\nFN:y\nitem1.TEL;waid=${m.sender.split('@')[0]}:${m.sender.split('@')[0]}\nitem1.X-ABLabel:Ponsel\nEND:VCARD`
            }
        },
        participant: '0@s.whatsapp.net'
    };

    await conn.sendMessage(m.chat, {
        image: { url: img },
        caption: text,
        mentions: [...text.matchAll(/@([0-9]{5,16}|0)/g)].map((v) => v[1] + '@s.whatsapp.net')
    }, { quoted: fkontak });
};

handler.command = /^(اوامر|menu)$/i;

export default handler;

function clockString(ms) {
    let h = isNaN(ms) ? '--' : Math.floor(ms / 3600000);
    let m = isNaN(ms) ? '--' : Math.floor(ms / 60000) % 60;
    let s = isNaN(ms) ? '--' : Math.floor(ms / 1000) % 60;
    return [h, m, s].map(v => v.toString().padStart(2, '0')).join(':');
}