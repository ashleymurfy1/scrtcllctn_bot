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
                        { text: "CH Lokal", url: "https://t.me/+y5eE87DiY7RmNzg9" },
                        { text: "CH Of", url: "https://t.me/+Xdqhk-4NGNQ2Yzg1" }
                    ],
                    [
                        { text: "CH Back up 1", url: "https://t.me/+Hv4E1xJRZ2EyOGU1" },
                        { text: "CH Back up 2", url: "https://t.me/+vRqevdVJ7m02MzZl" }
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
