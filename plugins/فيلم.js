import fetch from 'node-fetch';

const films = async (m, { conn }) => {
    const url = 'https://api1.zenonhs.store/api/movie';
    let movieMenu = '*📽️ قائمة الأفلام:*\n\n';
    let seriesMenu = '*📺 قائمة المسلسلات:*\n\n';

    try {
        const response = await fetch(url);
        const data = await response.json();

        if (!data.movies || data.movies.length === 0) {
            throw 'لم يتم العثور على أفلام أو مسلسلات في الوقت الحالي.';
        }

        let movieCount = 1;
        let seriesCount = 1;

        data.movies.forEach((item) => {
            const title = item.title || 'عنوان غير متاح';
            const link = item.link || 'رابط غير متاح';

            // تحديد النوع بناءً على الكلمات في العنوان
            if (title.includes('فيلم')) {
                movieMenu += `${movieCount}. العنوان: ${title}\n`;
                movieMenu += `   الرابط: ${link}\n\n`;
                movieCount++;
            } else if (title.includes('مسلسل')) {
                seriesMenu += `${seriesCount}. العنوان: ${title}\n`;
                seriesMenu += `   الرابط: ${link}\n\n`;
                seriesCount++;
            } else {
                // إذا لم يُعرف النوع نضيفه إلى قائمة الأفلام كإفتراضي
                movieMenu += `${movieCount}. العنوان: ${title}\n`;
                movieMenu += `   الرابط: ${link}\n\n`;
                movieCount++;
            }
        });

        let menu = `${movieMenu}\n${seriesMenu}`;
        await conn.sendMessage(m.chat, { text: menu, mentions: [m.sender] }, { quoted: m });

    } catch (error) {
        console.error(error);
        await conn.sendMessage(m.chat, { text: 'حدث خطأ أثناء جلب المعلومات. حاول مرة أخرى.' }, { quoted: m });
    }
};

films.command = ['فيلم'];
export default films;