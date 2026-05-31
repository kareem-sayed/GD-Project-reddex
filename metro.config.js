const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

// ✅ إجبار المترو يشتغل على عملية واحدة عشان الرام متخلصش عند 70%
config.maxWorkers = 1; 

module.exports = config;