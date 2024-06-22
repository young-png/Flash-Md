const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'FLASH-MD-WA-BOT;;;=>eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiR1Bod3JDY0w2QlVMZFNFd0NTeXRGRHhObGNHR0NtYXhLMVE1ZDFTVWltaz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiNFlFMTBlWkhpSk5QOXliMUp2MXdJMytxZFF2dWtvZTVjK2FjUlRWVnh6Zz0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJ3TmNVZmNvOVlETGV4ajV3VWl6dEZVWXM1dlVyKzFXbjRxQWtSWjRvUUZzPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiI2dDRQMjhPSTczV1FnTUZYT1p3cnNOa0EyL3FGZytuellza0dZZ3JMMjNzPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IjRMang5M1FwN1lxNWcyZmJhT3cwWDUrSW9TS1o4b2dPY2xvSEw4cFAybUU9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IlEvUzAvbHJHbkNFcE5rdjQwSWp6dkl5Sm1Id2J2Q2F5V2hQMWN3VXNwa1k9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiU1ByejBwLzJHYk8vNit0V2xSWWw2SzhkVjd6QnRkRXB4LytYWTBPYWcxYz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoib2xqR21XOWhzRWhWMlh2azgzY2R4Y2w5YWJZQW9VQWdIb2xIQmYra2lrOD0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IklsZUowdFdTZExaMmprbkZ0ZTdRTGMySjBZdGdKNGRFVFpPdFk0Z25UWU1LcnF0NTJPZ2FXVjhZclhQL2oyRGpjV3NkZnN6a1orWHNsWkd1eERxMGd3PT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MywiYWR2U2VjcmV0S2V5IjoiNTNEdWZMR3BoWkR4ZzU3S1FCaXpmK1pZZjg0bklPellkTGo4TlF6b25tbz0iLCJwcm9jZXNzZWRIaXN0b3J5TWVzc2FnZXMiOlt7ImtleSI6eyJyZW1vdGVKaWQiOiIyMzQ4MTY4MDAwOTM5QHMud2hhdHNhcHAubmV0IiwiZnJvbU1lIjp0cnVlLCJpZCI6IkE0NjZCQkUxQjk4NDNCMUU1QzE1M0NFRkVBMjY5MjkxIn0sIm1lc3NhZ2VUaW1lc3RhbXAiOjE3MTkwNzg0ODR9XSwibmV4dFByZUtleUlkIjozMSwiZmlyc3RVbnVwbG9hZGVkUHJlS2V5SWQiOjMxLCJhY2NvdW50U3luY0NvdW50ZXIiOjAsImFjY291bnRTZXR0aW5ncyI6eyJ1bmFyY2hpdmVDaGF0cyI6ZmFsc2V9LCJkZXZpY2VJZCI6ImF0ZUxTUkkwUnZxdDFUVGl4NEU3a1EiLCJwaG9uZUlkIjoiZjFhYjIyMTEtNTA2Ni00ZDZiLWJlYmEtNzkwYmE5ZmIxNmQ5IiwiaWRlbnRpdHlJZCI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImduTS9McDErZmg4ZzZxbjkvOENJRml5SmtrST0ifSwicmVnaXN0ZXJlZCI6dHJ1ZSwiYmFja3VwVG9rZW4iOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJ2UXhHWXVEcTNydEJYbStZeU0vVDlBdlhFVlE9In0sInJlZ2lzdHJhdGlvbiI6e30sInBhaXJpbmdDb2RlIjoiUTdGNFc0NDUiLCJtZSI6eyJpZCI6IjIzNDgxNjgwMDA5Mzk6NjVAcy53aGF0c2FwcC5uZXQifSwiYWNjb3VudCI6eyJkZXRhaWxzIjoiQ0lXMWg2c0JFTUtjM0xNR0dBRWdBQ2dBIiwiYWNjb3VudFNpZ25hdHVyZUtleSI6IkY0SHIwNEhWOGRkUzg1Y2YzdFlZaFJkQzRJbnlRTnZQZ0RaV013ZGh3M0U9IiwiYWNjb3VudFNpZ25hdHVyZSI6IlBrbk1iMnltSDVScjh0ZDd5TmFTaFZYbllYem9pbXo1NkRRV2ZlaHlGV1B3eWI5cG9lRDFmaHVFQUtodm43REtHeG05RnBlQ0VUK1VuZDdzMkJhN0FRPT0iLCJkZXZpY2VTaWduYXR1cmUiOiJ4dUZEaW8rSXFTb0YyRllxbzB4SmI0eE5MbmZSZy9lZVBFWXJoTmFGT2V0cElMOHBpR1A3eUFwclZwaVlEN2k3SEVualJXd2tkcXZiekJPaWpZY0poUT09In0sInNpZ25hbElkZW50aXRpZXMiOlt7ImlkZW50aWZpZXIiOnsibmFtZSI6IjIzNDgxNjgwMDA5Mzk6NjVAcy53aGF0c2FwcC5uZXQiLCJkZXZpY2VJZCI6MH0sImlkZW50aWZpZXJLZXkiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJCUmVCNjlPQjFmSFhVdk9YSDk3V0dJVVhRdUNKOGtEYno0QTJWak1IWWNOeCJ9fV0sInBsYXRmb3JtIjoiYW5kcm9pZCIsImxhc3RBY2NvdW50U3luY1RpbWVzdGFtcCI6MTcxOTA3ODQ3OSwibXlBcHBTdGF0ZUtleUlkIjoiQUFBQUFBNXcifQ==, 
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
    MODE: process.env.MODE || "private",
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
