module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    // plugins: ["nativewind/babel"],
    plugins: [
      [
        "react-native-dotenv",
        {
          envName: "APP_ENV", // or 'NODE_ENV'
          moduleName: "@env",
          path: ".env", // Path to .env file - will be automatically extended to .env.development or .env.production
          blacklist: null, // blacklist: restrict which keys can be loaded
          whitelist: null, // whitelist: restrict which keys can be loaded
          safe: false, // if true, will throw an error if missing keys are encountered
          allowUndefined: true, // if true, will not throw an error if missing keys are encountered
        },
      ],
    ],
  };
};
