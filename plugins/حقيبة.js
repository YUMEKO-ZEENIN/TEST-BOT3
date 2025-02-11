import pkg from '@whiskeysockets/baileys';
const { prepareWAMessageMedia } = pkg;

const handler = async (m, { conn }) => {
    await conn.sendMessage(m.chat, { react: { text: '🦇', key: m.key } });

    const zack = 'https://envs.sh/I1J.jpg';
    let { wood, diamond, Joya, pointxp, potion, magicwand, trash, Roca, string, iron, crystal, rock } = global.db.data.users[m.sender]
    let user = global.db.data.users[m.sender];
    let who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender
    let taguser = '@' + m.sender.split("@s.whatsapp.net")[0];
    let messageContent = {
        viewOnceMessage: {
            message: {
                interactiveMessage: {
                    header: { title: 'Zack' },
                    body: {
                        text: `˼🦇˹↜ مـࢪحـبـا بـك/ي ${taguser}
> ˼🪪˹↜ المــوارد الـخـاصـة بـك  ↶
*❐═━━━═╊⊰🦇⊱╉═━━━═❐*
*【🥤┇جرعة ⟣  ${potion} 】*
*【💎┇جوهرة ⟣  ${diamond} 】*
*【🗑┇نفاية ⟣  ${trash} 】*
*【🪵┇خشب ⟣  ${wood} 】*
*【🪨┇صخر ⟣  ${rock} 】*
*【🕸️┇خيط ⟣  ${string} 】*
*【⛓️┇حديد ⟣  ${iron} 】*
*【🔮┇كـريـسـتـال ⟣ ${crystal} 】*
*【🎄┇نـقـاط Xp ⟣ ${pointxp} 】*
*【⚕️┇عــصــا ســحــرية ⟣ ${magicwand} 】*
*❐═━━━═╊⊰🦇⊱╉═━━━═❐*
> © 𝐍𝐀𝐑𝐔𝐓𝐎 & 𝐙𝐀𝐂𝐊 2025`,
                        subtitle: "zack"
                    },
                    header: {
                        hasMediaAttachment: true,
                        ...(await prepareWAMessageMedia({ image: { url: zack } }, { upload: conn.waUploadToServer }, { quoted: m }))
                    },
                    nativeFlowMessage: {
                        buttons: [
                            {
                                name: "cta_url",
                                buttonParamsJson: '{"display_text":"⌈🤖╎قـنـاة الــبــوت╎🤖⌋","url":"https://whatsapp.com/channel/0029VaoUBmSKmCPIIiEatx1H","merchant_url":"https://whatsapp.com/channel/0029VaoUBmSKmCPIIiEatx1H"}'
                            }
                        ]
                    }
                }
            }
        }
    };

    conn.relayMessage(m.chat, messageContent, {});
};

handler.help = ['info'];
handler.tags = ['main'];
handler.command = ['شنطة', 'مواردي', 'حقيبه', 'حقيبة'];

export default handler;