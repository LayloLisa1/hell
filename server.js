const express = require('express');
const { Telegraf } = require('telegraf');
const fs = require('fs');
const path = require('path');

const dev = process.env.NODE_ENV !== 'production';

const bot = new Telegraf('7325960034:AAFFgld7kPpFYdKz5YJqOLxxjpZyOPy8AeI'); 

bot.start((ctx) => ctx.reply('Salom! Kitob nomini yozing va biz sizga PDF variantini yuboramiz.'));
bot.help((ctx) => ctx.reply('Savollaringiz bormi? Kitob nomini yozing va biz sizga yordam beramiz.'));

bot.on('text', (ctx) => {
  const bookName = ctx.message.text.toLowerCase();
  const booksDir = path.join(__dirname, 'books');
  const files = fs.readdirSync(booksDir);

  const foundBook = files.find(file => file.toLowerCase().includes(bookName));

  if (foundBook) {
    const bookPath = path.join(booksDir, foundBook);
    ctx.replyWithDocument({ source: bookPath });
  } else {
    ctx.reply('Kechirasiz, bu kitob topilmadi.');
  }
});

bot.launch();


  const app = express();

  app.listen(3000, (err) => {
    if (err) throw err;
    console.log('> Server http://localhost:3000 da ishlayapti');
  });