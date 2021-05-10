var Color = artifacts.require("Color.sol");

require("dotenv").config({
  path: "../.env",
});

module.exports = async function (deployer) {
  //all accounts created
  const accounts = await web3.eth.getAccounts();

  await deployer.deploy(Color);
};
