let handler = async (m, { conn, args, usedPrefix, command, isOwner }) => {
    if (!args[0]) {
        return conn.reply(m.chat, '[ 🌟 ] إدخل اسم التطبيق اللي عاوز تحمله. مثال:\n```................```\n.تطبيق القران\n.تطبيق kwai', m);
    }

    try {
        let res = await fetch(`https://api-streamline.vercel.app/dlapk?search=${args[0]}`);
        let result = await res.json();

        if (!result.file || !result.file.path) {
            return conn.reply(m.chat, '[ ⚠️ ] لم أستطع العثور على رابط تحميل التطبيق، حاول اسم آخر.', m);
        }

        let { name, size, package: packe, icon, updated } = result;
        let URL = result.file.path;
        let sizeInMB = (parseInt(size) / (1024 * 1024)).toFixed(2) + ' MB';

        let texto = `  ❯───「 𝗔𝗣𝗸 𝗗𝗢𝗪𝗡𝗟𝗢𝗔𝗗 」───❮
            ✦ الـاـــســم : ⇢ ${name} 📛
            ✦ المــقــاس  : ⇢ ${sizeInMB} ⚖️
            ✦ الطــرْد : ⇢ ${packe} 📦
            ✦ التـحـديـث  : ⇢ ${updated} 🗓️

        ## التطبيق بتاعك هييجي في لح;ظة، من فضلك استنى . . .`;

        await conn.sendFile(m.chat, icon, name + '.jpg', texto, m);
        
        await conn.sendMessage(m.chat, { 
            document: { url: URL }, 
            mimetype: 'application/vnd.android.package-archive', 
            fileName: name + '.apk', 
            caption: '' 
        }, { quoted: m });
        
    } catch (error) {
        console.error(error);
        return conn.reply(m.chat, '[ ⚠️ ] حدث خطأ أثناء محاولة تحميل التطبيق، حاول مرة أخرى لاحقًا.', m);
    }
}

handler.command = ['apk', 'بلاي', 'تطبيق', 'متجر'];
handler.help = ['apkdl'];
handler.tags = ['descargas'];

export default handler;