const CryptoKitties = artifacts.require("CryptoKitties");

module.exports = async (callback) => {
  try {
    const cryptoKittiesInstance = await CryptoKitties.deployed();
    const kitty = await cryptoKittiesInstance.kitties(0);
    console.log(kitty.name);
    // callback(fantasticKityTx.tx);
  } catch (error) {
    callback(error);
  }
};
