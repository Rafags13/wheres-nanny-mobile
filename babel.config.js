module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    ["module-resolver", {
      "root": ["./src"],
      "alias": {
        "@app": "./src/app",
        "@enums": "./src/assets/enums",
        "@lottie": "./src/assets/lottie",
        "@models": "./src/assets/model",
        "@dtos": "./src/assets/model/dto",
        "@styles": "./src/assets/styles",
        "@util": "./src/assets/util",
        "@components": "./src/components",
        "@context": "./src/context",
        "@features": "./src/features",
        "@pages": './src/pages',
        "@tabs": './src/routes/tabs',
        "@services": './src/services',
        "@storage": './src/storage',
      }
    }]
  ]
};
