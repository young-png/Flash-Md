require('dotenv').config();

function mapPresence(val) {
    const mapping = {
        typing: 'composing',
        online: 'available',
        recording: 'recording',
        paused: 'paused',
        offline: 'unavailable'
    };
    return mapping[val?.toLowerCase()?.trim()] || 'paused';
}

module.exports = {
    prefixes: process.env.PREFIX
        ? process.env.PREFIX.split('.').map(p => p.trim())
        : [''],

    NUMBER: process.env.YOUR_NUMBER || '2348168000939',
    MODE: (process.env.MODE || 'private').toLowerCase().trim(),
    WARN_LIMIT: process.env.WARNINGS || '3',
    ON: process.env.YOUR_NAME || 'Aura',
    ANTICALL: process.env.ANTICALL || 'on',
    ADM: process.env.ANTIDELETE || 'on',
    AUTO_VIEW_STATUS: process.env.AUTO_READ_STATUS === 'off',
    AUTO_LIKE: process.env.AUTO_LIKE === 'on',
    AUTO_READ_MESSAGES: process.env.AUTO_READ_DM === 'off',
    HEROKU_API_KEY: process.env.HEROKU_API_KEY,
    HEROKU_APP_NAME: process.env.HEROKU_APP_NAME,
   ALIVE_URL: process.env.ALIVE_URL,
    sessionBase64: process.env.SESSION || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiY083WVhYMWJaU3czNEVjcWtOSlFWQmV3VnVnVGNDWmxmYWh0bndQbFhIRT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiYjBkUUJFQ3hHM0kzZitNd0h0RDNVTExleFptbnB3RG9sZHFIQkNheFdVRT0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiI4TGJWUnc2eGlXd2JXbDRIRUFqd0psR29ZMmZLN3dCS0IvVGFaenM5UlZZPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiI0RDNvYWM0RXdjM3JUSzR4RER5WUo4QkthUXN6OEVocXgvREZCTnFMd1QwPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IjBGcEtlRjFNcmhZT0tzd0pSTFBQNjJIdEZ1QWVzak9TY0pkbWM3NTJTRzA9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6InVuTWVTbmhNK2pFcVlJdXR4bWd4eFlhc0N3K0sxU2FraVFEd2V0OWdTMjA9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiRUNtMllBUm5XMGo3Vmh2ZEIreU51blRtbVZuNGoxdlRIcHhSTzZCdjVtVT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiY3g5cVVCbUI3ZjBkWmdKRFhuMkxma0lpa3VURWRQYWJteDJkOTFRMmVGVT0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IlVZSFVqOHdtLzU5WWt2TWdlS0g1aE1aemlBREFNaE5lV3R5NHVHQVVabVpVMUtQaEJJZUFCKzhaT0tIaXFYTUgxSWd2OGxSWlJra0ZocHo5SS9rVURRPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MTc0LCJhZHZTZWNyZXRLZXkiOiJ5SzJCbnAwQ2tlRjkzWjJZRmxKWWhVWFN5ZkdUeTkwaFI4UTFVWElmT2ZnPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W3sia2V5Ijp7InJlbW90ZUppZCI6IjIzNDgxNjgwMDA5MzlAcy53aGF0c2FwcC5uZXQiLCJmcm9tTWUiOnRydWUsImlkIjoiMzgzRjQxRERCMzEwQkJFMzcyRTIzNTlGNkRFNTIyMzIifSwibWVzc2FnZVRpbWVzdGFtcCI6MTc1MDA2',
    timezone: 'Africa/Lagos',
    USER_LID: process.env.YOUR_LID || 3798105014706418,
    PRESENCE_DM: mapPresence(process.env.PRESENCE_DM || 'typing'),
    PRESENCE_GROUP: mapPresence(process.env.PRESENCE_GROUP || 'typing'),

    mapPresence
};
