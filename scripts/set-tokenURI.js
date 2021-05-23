const CryptoKitties = artifacts.require("CryptoKitties");

module.exports = async (callback) => {
  try {
    const cryptoKittiesInstance = await CryptoKitties.deployed();
    const tx1 = await cryptoKittiesInstance.setTokenURI(
      0,
      "https://ipfs.io/ipfs/QmNXB5jYhY6THdhsw64h2XYucazBufLaYq54y1nvJUNuyY?filename=cool-kitty.json"
    );
    console.log(`Token URI is set for token id - ${0}`);
    await cryptoKittiesInstance.setTokenURI(
      1,
      "https://ipfs.io/ipfs/QmesrBTtptwviDCmuh3M6Jknn2my9J91nWkYZNT1dJq4a5?filename=fantastic-kitty.json"
    );
    console.log(`Token URI is set for token id - ${1}`);
    callback(tx1.tx);
  } catch (error) {
    callback(error);
  }
};
