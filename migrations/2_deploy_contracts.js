var CryptoKitties = artifacts.require("CryptoKitties.sol");
var Color = artifacts.require("Color.sol");

const RINKEBY_VRF_COORDINATOR = "0xb3dCcb4Cf7a26f6cf6B120Cf5A73875B7BBc655B";
const RINKEBY_LINKTOKEN = "0x01be23585060835e02b77ef475b0cc51aa1e0709";
const RINKEBY_KEYHASH =
  "0x2ed0feb3e7fd2022120aa84fab1945545a9f2ffc9076fd6156fa96eaff4c1311";

require("dotenv").config({
  path: "../.env",
});

module.exports = async function (deployer, network, [defaultAccount]) {
  // await deployer.deploy(Color);
  if (network.startsWith("rinkyby_infura")) {
    await deployer.deploy(
      CryptoKitties,
      RINKEBY_VRF_COORDINATOR,
      RINKEBY_LINKTOKEN,
      RINKEBY_KEYHASH
    );
    let cryptoKittiesInstance = await CryptoKitties.deployed();
  } else if (network.startsWith("mainnet")) {
    console.log(
      "If you're interested in early access to Chainlink VRF on mainnet, please email vrf@chain.link"
    );
  } else {
    console.log(
      "Right now only rinkeby works! Please change your network to Rinkeby"
    );
  }
};
