import fs from 'fs';
const timeout = 60000;
const dollar = 7000;
const handler = async (m, {conn, usedPrefix}) => {
  conn.tekateki = conn.tekateki ? conn.tekateki : {};
  const id = m.chat;
  if (id in conn.tekateki) {
    conn.reply(m.chat, '*❐┃في سؤال هنا يــا بــاكــا┃❌ ❯*', conn.tekateki[id][0]);
    throw false;
  }
  const tekateki = JSON.parse(fs.readFileSync(`./src/game/asr3.json`));
  const json = tekateki[Math.floor(Math.random() * tekateki.length)];
  const _clue = json.response;
  const clue = _clue.replace(/[A-Za-z]/g, '_');
  const caption = `
ⷮ > ˼⚡˹↜ اسـرع واحـد يـجـيـب الـايـمـوجـي ده↶
> الـايـمـوجـي↜ ˼${json.question}˹ 
╮───────────────────⟢ـ
┆˼⏳˹┇الـوقـت↞ ⌊${(timeout / 1000).toFixed(2)} ثانية⌉
┆˼💷˹┇الـجـائـزة↞ ⌊${dollar} دولار⌉
┆˼🤖˹┇المطور ↞ ⌊نــاروتـو - زاك⌉
╯───────────────────⟢ـ
> رايــزل بــوت
`.trim();
  conn.tekateki[id] = [
    await conn.reply(m.chat, caption, m), json,
    dollar,
    setTimeout(async () => {
      if (conn.tekateki[id]) await conn.reply(m.chat, `*❮ ⌛┇انتهي الوقت┇⌛❯*\n *❐↞┇الاجـابـة✅↞ ${json.response}┇*`, conn.tekateki[id][0]);
      delete conn.tekateki[id];
    }, timeout)];
};
handler.help = ['acertijo'];
handler.tags = ['game'];
handler.command = /^(الاسرع|اسرع|pregunta|adivinanza|tekateki)$/i;
export default handler;
