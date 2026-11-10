const fetch = require('node-fetch');

exports.handler = async (event) => {
    if (event.httpMethod !== 'POST') {
        return { statusCode: 405, body: 'Method Not Allowed' };
    }

    try {
        const update = JSON.parse(event.body);

        if (!update.message || !update.message.text) {
            return { statusCode: 200, body: 'OK' };
        }

        const chatId = update.message.chat.id;
        const text = update.message.text;
        const botToken = process.env.TELEGRAM_BOT_TOKEN;

        let responseText = "Welcome! Silakan pilih channel di bawah:";
        let replyMarkup = {};

        if (text === '/start' || text === '/menu') {
            replyMarkup = {
                inline_keyboard: [
                    [
                        // Ganti URL di bawah dengan Link Invite Channel Privat Anda
                        { text: "CH Lokal", url: "https://t.me/+LINK_INVITE_CH_LOKAL" },
                        { text: "CH Of", url: "https://t.me/+LINK_INVITE_CH_OF" }
                    ],
                    [
                        { text: "CH Back up 1", url: "https://t.me/+LINK_INVITE_BACKUP_1" },
                        { text: "CH Back up 2", url: "https://t.me/+LINK_INVITE_BACKUP_2" }
                    ]
                ]
            };
        } else {
            responseText = `Pilihan diterima: "${text}"`;
        }

        // Kirim balasan ke Telegram
        await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                chat_id: chatId,
                text: responseText,
                reply_markup: replyMarkup
            })
        });

        return { statusCode: 200, body: 'OK' };
    } catch (error) {
        console.error('Error:', error);
        return { statusCode: 500, body: error.toString() };
    }
};
