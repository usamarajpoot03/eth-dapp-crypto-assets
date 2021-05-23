const CryptoKitties = artifacts.require("CryptoKitties");
const LinkTokenInterface = artifacts.require("LinkTokenInterface");

const linkTokenPayment = "3000000000000000000";
module.exports = async (callback) => {
  try {
    const cryptoKittiesInstance = await CryptoKitties.deployed();
    console.log(
      "Crypto Kitties Deployed at : " + cryptoKittiesInstance.address
    );
    const linkTokenAddress = await cryptoKittiesInstance.LinkToken();
    console.log("ChainLink Token Address : " + linkTokenAddress);
    const linkToken = await LinkTokenInterface.at(linkTokenAddress);
    const tx = await linkToken.transfer(
      cryptoKittiesInstance.address,
      linkTokenPayment
    );

    console.log(`Successfully Funded with 3 LINK Tokens`);
    callback(tx.tx);
  } catch (error) {
    callback(error);
  }
};
