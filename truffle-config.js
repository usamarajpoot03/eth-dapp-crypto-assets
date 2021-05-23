const path = require("path");
require("dotenv").config({
  path: "./.env",
});
const HDWalletProvider = require("@truffle/hdwallet-provider");
const MetaMaskAccountIndex = 0;

module.exports = {
  // See <http://truffleframework.com/docs/advanced/configuration>
  // to customize your Truffle configuration!
  // contracts_build_directory: path.join(
  //   __dirname,
  //   "../eth-dapp-frontend/src/contracts/crypto-assets"
  // ),
  networks: {
    development: {
      port: 7545,
      host: "127.0.0.1",
      network_id: 5777,
    },
    ganache_local: {
      provider: function () {
        return new HDWalletProvider(
          process.env.MNEMONIC,
          "http://127.0.0.1:7545",
          MetaMaskAccountIndex
        );
      },
      network_id: 5777,
    },
    rinkyby_infura: {
      provider: function () {
        return new HDWalletProvider(
          process.env.MNEMONIC,
          "https://rinkeby.infura.io/v3/e70137790703401e80fbc017e1e6fa1d",
          MetaMaskAccountIndex
        );
      },
      network_id: 4,
      skipDryRun: true,
    },
  },
  compilers: {
    solc: {
      version: "^0.6.2",
    },
  },
};
