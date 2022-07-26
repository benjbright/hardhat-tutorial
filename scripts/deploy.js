const { ethers } = require("hardhat")

async function main() {
  const [deployer] = await ethers.getSigners()

  console.log(`Deploying contracts with the account ${deployer.address}...`)

  console.log(`Account balance: ${(await deployer.getBalance()).toString()}`)

  const Token = await ethers.getContractFactory("Token")
  const token = await Token.deploy()

  console.log(`Token address: ${token.address}`)
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })

// Contract deployed on Rinkeby test network - address:
// 0x992B6f8681D76aaB20e0D0Ca76c23dceCFd4B4c7
