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
        keyboard: [
          [{ text: "CH Lokal" }, { text: "CH Of" }],
          [{ text: "CH Back up 1" }, { text: "CH Back up 2" }]
        ],
        resize_keyboard: true,
        is_persistent: true
      };
    } else if (text === 'CH Lokal') {
      responseText = "Ini adalah tautan untuk **CH Lokal**: [Masukkan Link Disini]";
    } else if (text === 'CH Of') {
      responseText = "Ini adalah tautan untuk **CH Of**: [Masukkan Link Disini]";
    } else if (text === 'CH Back up 1') {
      responseText = "Ini adalah tautan untuk **CH Back up 1**: [Masukkan Link Disini]";
    } else if (text === 'CH Back up 2') {
      responseText = "Ini adalah tautan untuk **CH Back up 2**: [Masukkan Link Disini]";
    } else {
      responseText = `Pilihan diterima: "${text}"`;
    }

    await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: chatId,
        text: responseText,
        reply_markup: replyMarkup,
        parse_mode: "Markdown"
      })
    });

    return { statusCode: 200, body: 'OK' };
  } catch (error) {
    console.error("Error:", error);
    return { statusCode: 500, body: error.toString() };
  }
};
