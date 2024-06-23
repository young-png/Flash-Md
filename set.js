const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'FLASH-MD-WA-BOT;;;=>eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiNkJnamFVdGdOV2w3cklGc1k4M2tjWnRxeGQ1SFgvNmsvQUZLbktkMmMzdz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoibTY2UVZuQ1pmRnRxaDJKdjBPaWJNOWNhQ3lvVm1aYkZJcldFT3FKWWhRZz0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJZQkdVTFNwUWY0UXpxQlVGVFhVcTh3RlRCNWVUc3d4T3BRUElWS05ycDNrPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJMTmtUYXpsVG1sUXdhRkM1MjBoMGVsMTl0VWtIZVZTNWkxc1d3K1dVcVI4PSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImFGY0tiSy9Ra1l6L1B2cWsvVHRKL0ZJY2JjYnV2QS9sdXBSdUcxRVZGbDg9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IlJvTjQyQWtCUk0xeDBkY21udlZYcWk2c01DdFNDUTNtTXZPQ0VvdW5qekU9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiT0VFNGJIT2xpRExsbW5zaWJraVppWHErK2NRV3BVU0tKT3IwMTBkZHQzQT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoibkJ5djh2engvai9MenIrNmJzNU5idDZEM2dOSUk3WjNZTFYxRXNsYlgyMD0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkY2emVKZVF4Y0VxZWp2c1A1bnpJUkZISUcvbEpralN0RHVVd1VrWW14akltTm9PYWVESTJRbzFLTkx1ZE5FbUtHZFVGT1RrZXdGSGx1dE0zNlBtaERBPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MywiYWR2U2VjcmV0S2V5IjoiTnVhU0FUZW1Ta1Y5TEhsUHVTY1BOU3MvODR4M29WZ3Z3elB6Q1JCVVhlQT0iLCJwcm9jZXNzZWRIaXN0b3J5TWVzc2FnZXMiOlt7ImtleSI6eyJyZW1vdGVKaWQiOiIyMzQ4MTY4MDAwOTM5QHMud2hhdHNhcHAubmV0IiwiZnJvbU1lIjp0cnVlLCJpZCI6IjM1QkVGRTlCRjE0QkZERDE5MzdFM0I0RkNBMzZBRTZCIn0sIm1lc3NhZ2VUaW1lc3RhbXAiOjE3MTkxNTMxNjN9XSwibmV4dFByZUtleUlkIjozMSwiZmlyc3RVbnVwbG9hZGVkUHJlS2V5SWQiOjMxLCJhY2NvdW50U3luY0NvdW50ZXIiOjAsImFjY291bnRTZXR0aW5ncyI6eyJ1bmFyY2hpdmVDaGF0cyI6ZmFsc2V9LCJkZXZpY2VJZCI6ImhxeG1zQ0Z4UkdhdFdoalJwY1dkbWciLCJwaG9uZUlkIjoiN2FjY2E1N2YtNTRhZi00YmE3LTlkNGQtZTU0MmNmZjJjZWVjIiwiaWRlbnRpdHlJZCI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6InFaMnY2MEJWZUNPTjdwVDNLdyszcjhMVFBTND0ifSwicmVnaXN0ZXJlZCI6dHJ1ZSwiYmFja3VwVG9rZW4iOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiIvYnNwK3EyQXFwYm11RlBEOWJQNGlRWTRObTQ9In0sInJlZ2lzdHJhdGlvbiI6e30sInBhaXJpbmdDb2RlIjoiRTc2MlJMWUUiLCJtZSI6eyJpZCI6IjIzNDgxNjgwMDA5Mzk6NjdAcy53aGF0c2FwcC5uZXQifSwiYWNjb3VudCI6eyJkZXRhaWxzIjoiQ0llMWg2c0JFUHJqNExNR0dBRWdBQ2dBIiwiYWNjb3VudFNpZ25hdHVyZUtleSI6IkY0SHIwNEhWOGRkUzg1Y2YzdFlZaFJkQzRJbnlRTnZQZ0RaV013ZGh3M0U9IiwiYWNjb3VudFNpZ25hdHVyZSI6IkI0VklHeWprR3dXaUlwM3pCSG1qK1dhUlFXRXk0eGhyQmFkSkpDemZzOTFTcHcwS1pXU1ROczF5YTZCVzNTN2xIVG9qWDQrZXVaZFl5aW5yM0RqM0FRPT0iLCJkZXZpY2VTaWduYXR1cmUiOiI2TG16b0Y0Z2RUOGZYRndXSkFDS1JWUmN5ekZVeUJ2alhhVWU4bzM5Y29JMlRBMVc2Uk1PMUpBV2ZqOE1aQkpoNkJIK2RlMlRGRHBQRWNrTnBGb1BDUT09In0sInNpZ25hbElkZW50aXRpZXMiOlt7ImlkZW50aWZpZXIiOnsibmFtZSI6IjIzNDgxNjgwMDA5Mzk6NjdAcy53aGF0c2FwcC5uZXQiLCJkZXZpY2VJZCI6MH0sImlkZW50aWZpZXJLZXkiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJCUmVCNjlPQjFmSFhVdk9YSDk3V0dJVVhRdUNKOGtEYno0QTJWak1IWWNOeCJ9fV0sInBsYXRmb3JtIjoiYW5kcm9pZCIsImxhc3RBY2NvdW50U3luY1RpbWVzdGFtcCI6MTcxOTE1MzE1OSwibXlBcHBTdGF0ZUtleUlkIjoiQUFBQUFBNXcifQ==, 
    PREFIXE: process.env.PREFIX || ".",
    OWNER_NAME: process.env.OWNER_NAME || "Alex",
    OWNER_NUMBER: process.env.OWNER_NUMBER || "2348168000939", 
             
    AUTO_VIEW_STATUS: process.env.AUTO_VIEW_STATUS || "off",
AUTOREAD_MESSAGES: process.env.AUTO_READ_MESSAGES || "off",
CHATBOT: process.env.CHAT_BOT || "off",
    AUTO_SAVE_STATUS: process.env.AUTO_SAVE_STATUS || 'off',
    BOT : process.env.BOT_NAME || 'FLASH-MD',
    OPENAI_API_KEY : process.env.OPENAI_API_KEY || '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',
    URL : process.env.BOT_MENU_LINKS || 'https://static.animecorner.me/2023/08/op2.jpg',
    MODE: process.env.MODE || "public",
    PM_PERMIT: process.env.PM_PERMIT || 'on',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_API_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    PRESENCE : process.env.PRESENCE || '',
    //GPT : process.env.OPENAI_API_KEY || '',
    DP : process.env.STARTING_BOT_MESSAGE || "on",
    ADM : process.env.ANTI_DELETE_MESSAGE || 'off',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9" : "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9",
    /* new Sequelize({
     dialect: 'sqlite',
     storage: DATABASE_URL,
     logging: false,
})
: new Sequelize(DATABASE_URL, {
     dialect: 'postgres',
     ssl: true,
     protocol: 'postgres',
     dialectOptions: {
         native: true,
         ssl: { require: true, rejectUnauthorized: false },
     },
     logging: false,
}),*/
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
