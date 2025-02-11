const delay = time => new Promise(res => setTimeout(res, time))

export async function before(m) {
  let bot = global.db.data.settings[this.user.jid] || {}
 
  if (m.isBaileys) return
  if (!bot.antiCall) return

  const messageType = {
    40: '📞 لقد فاتتك مكالمة صوتية، وتم حظرك بسبب المكالمة.',
    41: '📹 لقد فاتتك مكالمة فيديو، وتم حظرك بسبب المكالمة.',
    45: '📞 لقد فاتتك مكالمة صوتية جماعية، وتم حظرك بسبب المكالمة.',
    46: '📹 لقد فاتتك مكالمة فيديو جماعية، وتم حظرك بسبب المكالمة.',
  }[m.messageStubType]

  
  if (messageType) {
   

    await this.sendMessage(m.chat, {
      text: `أنت محظور +
      
  تم حظره بسبب الاتصال علي الروبوت`,
      mentions: [m.sender],
    })

   
    await delay(1000)

    global.db.data.users[m.sender].banned = true
    global.db.data.users[m.sender].warning = 1

   

    await this.updateBlockStatus(m.sender, 'block')

  
    if (m.isGroup) {
      await this.groupParticipantsUpdate(m.chat, [m.sender], 'remove')
    }
  } else {
    console.log({
      messageStubType: m.messageStubType,
      messageStubParameters: m.messageStubParameters,
      type: m.messageStubType,
    })
  }
}

export const disabled = false
