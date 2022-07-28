const { ethers } = require("hardhat")

async function main() {
  const [deployer, addr1] = await ethers.getSigners()

  console.log(`Deploying contracts with the account ${deployer.address}...`)

  console.log(
    `Account balance ETH: ${(await deployer.getBalance()).toString()}`
  )

  const Token = await ethers.getContractFactory("Token")
  console.log("Deploying the Token contract...")
  const token = await Token.deploy()
  await token.deployed()
  console.log(`Token deployed to: ${token.address}`)

  const balance = await token.balanceOf(deployer.address)
  await token.transfer(addr1.address, 100000)
  const balanceAddr1 = await token.balanceOf(addr1.address)
  const updatedBalance = await token.balanceOf(deployer.address)
  const owner = await token.owner()
  const symbol = await token.symbol()

  // console.log(`Token address: ${token.address}`)
  console.log(`Account balance ${owner} - tokens: ${balance} ${symbol}`)
  console.log(
    `Account 2 balance ${addr1.address} - tokens: ${balanceAddr1} ${symbol}`
  )
  console.log(
    `New Account balance after transfer - tokens: ${updatedBalance} ${symbol}`
  )
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

// Second deployment
// 0x46Ac71Da5252EA52905B1C9391A45f2E83f10C6A
