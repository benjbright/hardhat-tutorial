require("@nomicfoundation/hardhat-toolbox")

const RINKEBY_RPC_URL = process.env.RINKEBY_RPC_URL
const PRIVATE_KEY = process.env.PRIVATE_KEY

const {
  alchemyApiKey,
  mnemonic,
  PrivateKey,
  alchemyGoerliApiKey,
} = require("./secrets.json")

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.9",
  networks: {
    localhost: {
      url: "http://127.0.0.1:8545/",
    },
    rinkeby: {
      url: `https://eth-rinkeby.alchemyapi.io/v2/${alchemyApiKey}`,
      // accounts: { mnemonic: mnemonic },
      accounts: [PrivateKey],
    },
    goerli: {
      url: `https://eth-goerli.g.alchemy.com/v2/${alchemyGoerliApiKey}`,
      accounts: [PrivateKey],
    },
  },
}
