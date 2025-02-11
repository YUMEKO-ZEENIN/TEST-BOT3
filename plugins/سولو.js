let gameState = {};

const initialSkulls = 3;

const maxPlayers = 6;

const createRoom = async (chatId, conn) => {

    if (gameState[chatId]) {

        await conn.sendMessage(chatId, { text: "*يوجد بالفعل غرفة نشطة. استخدم أمر .احذف لحذفها*" });

        return;

    }

    gameState[chatId] = {

        players: [],

        started: false,

        skulls: {}

    };

    await conn.sendMessage(chatId, { text: "*تم إنشاء الغرفة بنجاح! استخدم أمر .دخول للانضمام*" });

};

const joinRoom = async (chatId, conn, sender) => {

    if (!gameState[chatId]) {

        await conn.sendMessage(chatId, { text: "*لا توجد غرفة نشطة حالياً. استخدم أمر *.إنشاء* لإنشاء غرفة*" });

        return;

    }

    if (gameState[chatId].players.length >= maxPlayers) {

        await conn.sendMessage(chatId, { text: "*الغرفة ممتلئة. لا يمكن الانضمام*" });

        return;

    }

    if (!gameState[chatId].players.includes(sender)) {

        gameState[chatId].players.push(sender);

        gameState[chatId].skulls[sender] = initialSkulls;

        await conn.sendMessage(chatId, { text: `*تم انضمام @${sender.split('@')[0]} إلى الغرفة*`, mentions: [sender] });

    } else {

        await conn.sendMessage(chatId, { text: "*أنت بالفعل في الغرفة*" });

    }

};

const startGame = async (chatId, conn) => {

    if (!gameState[chatId]) {

        await conn.sendMessage(chatId, { text: "*لا توجد غرفة نشطة حالياً. استخدم أمر *.إنشاء* لإنشاء غرفة*" });

        return;

    }

    if (gameState[chatId].players.length < 2) {

        await conn.sendMessage(chatId, { text: "*يجب أن يكون هناك لاعبين على الأقل لبدء اللعبة*" });

        return;

    }

    gameState[chatId].started = true;

    await conn.sendMessage(chatId, { text: "*تم بدء اللعبة! استخدم أمر *.اطلاق @اللاعب* للإطلاق على اللاعبين الآخرين*" });

};

const fireAtPlayer = async (chatId, conn, targetMention, sender) => {

    if (!gameState[chatId] || !gameState[chatId].started) {

        await conn.sendMessage(chatId, { text: "*لم تبدأ اللعبة بعد. استخدم أمر .بدء لبدء اللعبة*" });

        return;

    }

    const target = targetMention.replace('@', '') + '@s.whatsapp.net';

    

    if (!gameState[chatId].players.includes(target)) {

        await conn.sendMessage(chatId, { text: "*اللاعب المستهدف غير موجود في الغرفة*" });

        return;

    }

    if (target === sender) {

        await conn.sendMessage(chatId, { text: "*لا يمكنك الإطلاق على نفسك*" });

        return;

    }

    gameState[chatId].skulls[target] -= 1;

    await conn.sendMessage(chatId, { text: `*@${sender.split('@')[0]} أطلق على @${target.split('@')[0]}. عدد الجماجم المتبقية: ${gameState[chatId].skulls[target]}*`, mentions: [sender, target] });

    if (gameState[chatId].skulls[target] <= 0) {

        gameState[chatId].players = gameState[chatId].players.filter(player => player !== target);

        await conn.sendMessage(chatId, { text: `*@${target.split('@')[0]} قد خسر اللعبة!*`, mentions: [target] });

        if (gameState[chatId].players.length === 1) {

            const winner = gameState[chatId].players[0];

            await conn.sendMessage(chatId, { text: `*اللعبة انتهت! الفائز هو @${winner.split('@')[0]} 🎉*`, mentions: [winner] });

            delete gameState[chatId];

        }

    }

};

const deleteRoom = async (chatId, conn) => {

    if (gameState[chatId]) {

        delete gameState[chatId];

        await conn.sendMessage(chatId, { text: "*تم حذف الغرفة*" });

    } else {

        await conn.sendMessage(chatId, { text: "*لا توجد غرفة نشطة حاليا*" });

    }

};

const handler = async (m, { conn, command, text }) => {

    const chatId = m.chat;

    const sender = m.sender;

    if (command === 'ديث') {

        await createRoom(chatId, conn);

    } else if (command === 'دخول') {

        await joinRoom(chatId, conn, sender);

    } else if (command === 'بدء') {

        await startGame(chatId, conn);

    } else if (command.startsWith('اطلاق')) {

        if (text.trim()) {

            const targetMention = text.trim().split(' ')[0];

            await fireAtPlayer(chatId, conn, targetMention, sender);

        } else {

            await conn.sendMessage(chatId, { text: "يجب تحديد اللاعب المستهدف. استخدم الأمر بشكل صحيح: *.اطلاق @اللاعب*." });

        }

    } else if (command === 'حذفف') {

        await deleteRoom(chatId, conn);

    }

};

handler.help = ['ديث', 'تسجيل', 'بدء', 'اطلاق @اللاعب', 'حذفف'];

handler.tags = ['game'];

handler.command = /^(ديث|دخول|بدء|اطلاق|حذفف)$/i;

export default handler;

