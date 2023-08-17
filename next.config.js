/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    // apiUrl: 'http://localhost:1337',
    apiUrl: 'https://house-kebab-back.herokuapp.com',
    // wcUrl: 'ws://localhost:3001',
    wcUrl: 'wss://house-kebab-socket.herokuapp.com',
    api1Url: 'https://house-kebab-socket.herokuapp.com',
    // api1Url: 'http://localhost:3001',
    botToken: process.env.BOT_TOKEN,
    chatId: process.env.CHAT_ID
  },
}

module.exports = nextConfig
