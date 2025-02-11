.gps المالك-المضادات|
//import db from '../lib/database.js'

let handler = async (m, { conn, usedPrefix, command, args, isOwner, isAdmin, isROwner }) => {
  let isEnable = /تفعيل|true|enable|(turn)?on|1/i.test(command)
  let chat = global.db.data.chats[m.chat]
  let user = global.db.data.users[m.sender]
  let bot = global.db.data.settings[conn.user.jid] || {}
  let type = (args[0] || '').toLowerCase()
  
  let isChat = false
  let isBot = false
  
  switch (type) {
  
    case 'الترحيب':
    isChat = true
      if (!m.isGroup) {
        if (!isOwner) {
          global.dfail('group', m, conn)
          throw false
        }
      } else if (!isAdmin) {
        global.dfail('admin', m, conn)
        throw false
      }
      chat.welcome = isEnable
      break
      
      case 'الكشف': 
      isChat = true
      if (!m.isGroup) {
        if (!isOwner) {
          global.dfail('group', m, conn);
          throw false;
        }
      } else if (!isAdmin) {
        global.dfail('admin', m, conn);
        throw false;
      }
      chat.detect = isEnable;
      break;
      
    case 'الكشف2': 
    isChat = true
      if (!m.isGroup) {
        if (!isOwner) {
          global.dfail('group', m, conn);
          throw false;
        }
      } else if (!isAdmin) {
        global.dfail('admin', m, conn);
        throw false;
      }
      chat.detect2 = isEnable;
      break;
      
      case 'الربط':
      isBot = true
      if (!(isROwner || isOwner)) {
        global.dfail('owner', m, conn)
        throw false
      }
      bot.jadibotmd = isEnable
      break
      
      case 'الفضح': 
      isChat = true
    isChat = true
      if (!m.isGroup) {
        if (!isOwner) {
          global.dfail('group', m, conn)
          throw false
        }
      } else if (!isAdmin) {
        global.dfail('admin', m, conn)
        throw false
      }
      chat.antiviewonce = isEnable;
      break;
      
    case 'jarvis':
    case 'autotalk':
    isChat = true
      isChat = true
      if (!m.isGroup) {
        if (!isOwner) {
          global.dfail('group', m, conn)
          throw false
        }
      } else if (!isAdmin) {
        global.dfail('admin', m, conn)
        throw false
      }
      chat.jarvis = isEnable
      break
      
    case 'pmblocker':
      isBot = true
      if (!isROwner) {
        global.dfail('rowner', m, conn)
        throw false
      }
      bot.pmblocker = isEnable
      break
      
    case 'البايو':
      isBot = true
      if (!isROwner) {
        global.dfail('rowner', m, conn)
        throw false
      }
      bot.autoBio = isEnable
      break 
  
    case 'الملصقات':
    isChat = true
     
      if (!m.isGroup) {
        if (!isOwner) {
          global.dfail('group', m, conn)
          throw false
        }
      } else if (!isAdmin) {
        global.dfail('admin', m, conn)
        throw false
      }
      chat.autosticker = isEnable
      break
      
    case 'الاسبام':
    isChat = true
     
      if (!m.isGroup) {
        if (!isOwner) {
          global.dfail('group', m, conn)
          throw false
        }
      } else if (!isAdmin) {
        global.dfail('admin', m, conn)
        throw false
      }
      chat.antiSpam = isEnable
      break
      
    case 'antidelete':
    case 'الحذف':
    isChat = true
      isChat = true
      if (!m.isGroup) {
        if (!isOwner) {
          global.dfail('group', m, conn)
          throw false
        }
      } else if (!isAdmin) {
        global.dfail('admin', m, conn)
        throw false
      }
      chat.delete = isEnable
      chat.antidelete = isEnable
      break
      
    case 'antitoxic':
    case 'الشتائم':
    isChat = true
      isChat = true
      if (!m.isGroup) {
        if (!isOwner) {
          global.dfail('group', m, conn)
          throw false
        }
      } else if (!isAdmin) {
        global.dfail('admin', m, conn)
        throw false
      }
      chat.antiToxic = isEnable
      break

    case 'document':
    case 'الملفات':
    isChat = true
     isChat = true
      if (!m.isGroup) {
        if (!isOwner) {
          global.dfail('group', m, conn)
          throw false
        }
      } else if (!isAdmin) {
        global.dfail('admin', m, conn)
        throw false
      }
      chat.useDocument = isEnable
      break
      
    case 'الاستوريهات':
      isBot = true
      if (!isROwner) {
        global.dfail('rowner', m, conn)
        throw false
      }
      chat.viewStory = isEnable
      break

    case 'antilink':
    case 'الروابط':
    case 'antilinkwha':
    isChat = true
      isChat = true
      if (!m.isGroup) {
        if (!isOwner) {
          global.dfail('group', m, conn)
          throw false
        }
      } else if (!isAdmin) {
        global.dfail('admin', m, conn)
        throw false
      }
      chat.antiLink = isEnable
      break

      
    case 'antilink2':
    case 'الروابط2':
    case 'antilinkwha2':
    isChat = true
      isChat = true
      if (!m.isGroup) {
        if (!isOwner) {
          global.dfail('group', m, conn)
          throw false
        }
      } else if (!isAdmin) {
        global.dfail('admin', m, conn)
        throw false
      }
      chat.antiLink2 = isEnable
      break

    case 'nsfw':
    case 'الاباحية':
    case 'modohorny':
    isChat = true
      isChat = true
      if (!m.isGroup) {
        if (!isOwner) {
          global.dfail('group', m, conn)
          throw false
        }
      } else if (!isAdmin) {
        global.dfail('admin', m, conn)
        throw false
      }
      chat.nsfw = isEnable
      chat.modohorny = isEnable
      break

    case 'المستويات':
      isChat = true
      
      if (!m.isGroup) {
        if (!isOwner) {
          global.dfail('group', m, conn)
          throw false
        }
      } else if (!isAdmin) {
        global.dfail('admin', m, conn)
        throw false
      }
    
      chat.autolevelup = isEnable
      break
      
      case 'الصوتيات': 
      isChat = true
      isChat = true
      if (!m.isGroup) {
        if (!isOwner) {
          global.dfail('group', m, conn)
          throw false
        }
      } else if (!isAdmin) {
        global.dfail('admin', m, conn)
        throw false
      }
      chat.audios = isEnable;
      break;
      
      case 'الصوت': 
      isBot = true
      if (!(isROwner || isOwner)) {
        global.dfail('owner', m, conn);
        throw false;
      }
      bot.audios_bot = isEnable;
      break;

    case 'الشات':
    isChat = true
      isChat = true
      if (!m.isGroup) {
        if (!isOwner) {
          global.dfail('group', m, conn)
          throw false
        }
      } else if (!isAdmin) {
        global.dfail('admin', m, conn)
        throw false
      }
      chat.chatbot = isEnable
      break
      
      case 'الصحين': 
      isBot = true
      if (!(isROwner || isOwner)) {
        global.dfail('rowner', m, conn);
        throw false;
      }
      bot.autoread2 = isEnable;
      break;

    case 'restrict':
    case 'التقييد':
      isBot = true
      if (!isOwner) {
        global.dfail('owner', m, conn)
        throw false
      }
      bot.restrict = isEnable
      break
      
    case 'autotype':
    case 'الاونلاين':
      isBot = true
      if (!isOwner) {
        global.dfail('owner', m, conn)
        throw false
      }
      chat.autotype = isEnable
      break

      case 'الخاص':
      isBot = true
      if (!isOwner) {
        global.dfail('owner', m, conn)
        throw false
      }
      bot.antiPrivate = isEnable
      break
      
      
      case 'التحميلات':
      isBot = true
      if (!isOwner) {
        global.dfail('owner', m, conn)
        throw false
      }
      bot.autodownload = isEnable
      break
      
    case 'anticall':
    case 'المكالمات':
      isBot = true
      if (!isOwner) {
        global.dfail('owner', m, conn)
        throw false
      }
      bot.antiCall = isEnable
      break
      
    case 'onlypv':
    case 'onlydm':
    case 'onlymd':
    case 'للخاص':
      isBot = true
      if (!isROwner) {
        global.dfail('rowner', m, conn)
        throw false
      }
      global.opts['pconly'] = isEnable
      break

    case 'gponly':
    case 'onlygp':
    case 'grouponly':
    case 'sologp':
    case 'للمجموعات':
      isBot = true
      if (!isROwner) {
        global.dfail('rowner', m, conn)
        throw false
      }
      global.opts['gconly'] = isEnable
      break

    default:
      if (!/[01]/.test(command))
        return m.reply(
`
≡ 〘 قائمة الإعدادات 〙

◈──『 *المشرفين* 』───⳹
⛊ الترحيب
⛊ الروابط
⛊ الروابط2
⛊ الاسبام
⛊ الحذف
⛊ الشتائم
⛊ الملصقات
⛊ الفضح
⛊ المستويات
⛊ الشات
⛊ الصوتيات
⛊ الكشف
⛊ الكشف2
⛊ الاباحية
⛊ الملفات
╰──────────⳹ 

◈──『 *المطورين* 』───⳹
⛊ للخاص
⛊ للمجموعات
⛊ الربط
⛊ الاونلاين
⛊ الصحين
⛊ التقييد
⛊ الاستوريهات
⛊ الخاص
⛊ المكالمات
⛊ البايو
⛊ الصوت
⛊ التحميلات
╰──────────⳹
*📌 مثال :*
*${usedPrefix}تفعيل* الترحيب
*${usedPrefix}تعطيل* الترحيب
`)
      throw false
  }

  m.reply(
`
◈──『 *${type}* 』───⳹
⛊ تم *${isEnable ? 'تفعيله' : 'تعطيله'}* 
⛊ تم التطبيق علي ${isChat ? 'المحادثة' : isBot ? 'البوت' : 'الجميع'}
`.trim()
  )
}
handler.help = ['en', 'dis'].map(v => v + 'able <option>')
handler.tags = ['config']
handler.command = /^(تفعيل|تعطيل|(en|dis)able|(turn)?o(n|ff)|[01])$/i

export default handler