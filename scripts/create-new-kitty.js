const CryptoKitties = artifacts.require("CryptoKitties");

module.exports = async (callback) => {
  try {
    const cryptoKittiesInstance = await CryptoKitties.deployed();
    const fantasticKityTx = await cryptoKittiesInstance.generateNewRandomKitty(
      "123456987654321",
      "Cool Kitty"
    );
    callback(fantasticKityTx.tx);
  } catch (error) {
    callback(error);
  }
};
