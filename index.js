const { Telegraf } = require('telegraf');  
const express = require('express');  

// Создаем бота  
const bot = new Telegraf(process.env.BOT_TOKEN);  

// Настраиваем веб-сервер  
const app = express();  
app.use(express.json());  

// Добавляем команду /start  
bot.command('start', (ctx) => {  
  ctx.reply('Привет! Я DevOps-бот. Готов выполнять команды');  
});  

// Указываем боту использовать webhook  
const BOT_URL = process.env.TELEGRAM_BOT_URL || 'https://ваш-проект.up.railway.app';  
bot.telegram.setWebhook(`${BOT_URL}/webhook`);  

// Настраиваем обработку webhook-запросов  
app.post('/webhook', (req, res) => {  
  bot.handleUpdate(req.body, res);  
});  

// Простой эндпоинт для проверки работы  
app.get('/', (req, res) => {  
  res.send('Бот работает!');  
});  

// Запускаем сервер  
const PORT = process.env.PORT || 3000;  
app.listen(PORT, () => {  
  console.log(`Сервер запущен на порту ${PORT}`);  
});  
