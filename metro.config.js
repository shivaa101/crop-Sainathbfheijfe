const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

// Add this line to disable Bridgeless Mode
config.transformer = {
  ...config.transformer,
  enableBabelRCLookup: false, // Disables Bridgeless Mode
};

module.exports = config;
