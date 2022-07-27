const { ethers } = require("hardhat")

async function main() {
  const [deployer, addr1] = await ethers.getSigners()

  console.log(`Deploying contracts with the account ${deployer.address}...`)

  console.log(
    `Account balance ETH: ${(await deployer.getBalance()).toString()}`
  )

  const Token = await ethers.getContractFactory("Token")
  const token = await Token.deploy()
  const balance = await token.balanceOf(deployer.address)
  await token.transfer(addr1.address, 100000)
  const balanceAddr1 = await token.balanceOf(addr1.address)
  const updatedBalance = await token.balanceOf(deployer.address)

  console.log(`Token address: ${token.address}`)
  console.log(`Account balance - tokens: ${balance}`)
  console.log(`Account 2 balance - tokens: ${balanceAddr1}`)
  console.log(`New Account balance after transfer - tokens: ${updatedBalance}`)
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })

// Contract deployed on Rinkeby test network - address:
// 0x992B6f8681D76aaB20e0D0Ca76c23dceCFd4B4c7

// Second deployment
// 0x82D8D3cec24dE87c657A0851b745BFaAC5e67e0E

// Contract deployed to goerli test network - address:
// 0xDB7bdC6D6E8697E7A9E06a94daa430111E01b7e3
