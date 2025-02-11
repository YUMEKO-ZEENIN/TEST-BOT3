import fetch from 'node-fetch'

let handler = async (m, { text, command, conn }) => {
  // التحقق من مدخلات المستخدم
  if (!text) return m.reply(`*مثال الاستخدام:*\n.رسم المسجد الاقصي`)

  try {
    // إرسال طلب إلى API لتوليد الصورة بناءً على النص المدخل
    let response = await fetch(`https://api1.zenonhs.store/api/generate-image?query=${encodeURIComponent(text)}&ratioIndex=2`)
    if (!response.ok) throw new Error("لم يتم العثور على البيانات المطلوبة.")

    // تحويل الاستجابة إلى JSON
    let data = await response.json()
    
    // التحقق من وجود رابط الصورة في `imageLink`
    let imageLink = data.imageLink
    if (!imageLink) return m.reply("عذرًا، لم يتم العثور على رابط مباشر للصورة.")

    // تحميل الصورة من الرابط
    let imageResponse = await fetch(imageLink)
    if (!imageResponse.ok) throw new Error("فشل في تحميل الصورة.")
await m.react('🕖') 

    let imageBuffer = await imageResponse.buffer()

    // إرسال الصورة في الواتساب
    await conn.sendMessage(m.chat, { image: imageBuffer, caption: `*﹝تم الرسم ايه رايك في رسمي؟ 🦇﹞*` }, { quoted: m })
 await m.react('✅') 

  } catch (error) {
    console.error("حدث خطأ أثناء محاولة جلب الصورة:", error)
    m.reply("*⚠️ حدث خطأ أثناء محاولة جلب الصورة*.")
  }
}

handler.help = ["generate-image"]
handler.tags = ["tools"]
handler.command = /^(generate-image|رسم)$/i

export default handler