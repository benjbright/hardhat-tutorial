const { ethers } = require("hardhat") // Note - ethers variable in global scope
const { loadFixture } = require("@nomicfoundation/hardhat-network-helpers")
const { expect } = require("chai")

describe("Token contract", function () {
  async function deployTokenFixture() {
    const [owner, addr1, addr2] = await ethers.getSigners()
    const Token = await ethers.getContractFactory("Token")

    const hardhatToken = await Token.deploy()
    await hardhatToken.deployed()

    // Fixtures can return anything you consider useful for your tests
    return { Token, hardhatToken, owner, addr1, addr2 }
  }

  it("Deployment should assign the total supply of tokens to the owner", async function () {
    // const [owner] = await ethers.getSigners()
    // const Token = await ethers.getContractFactory("Token")
    // const hardhatToken = await Token.deploy()
    const { hardhatToken, owner } = await loadFixture(deployTokenFixture)

    const ownerBalance = await hardhatToken.balanceOf(owner.address)
    expect(await hardhatToken.totalSupply()).to.equal(ownerBalance)
  })

  it("Should transfer tokens between accounts", async function () {
    // const [owner, addr1, addr2] = await ethers.getSigners()
    // const Token = await ethers.getContractFactory("Token")
    // const hardhatToken = await Token.deploy()
    const { hardhatToken, owner, addr1, addr2 } = await loadFixture(
      deployTokenFixture
    )

    // Transfer 50 tokens from owner to addr1
    await hardhatToken.transfer(addr1.address, 50)
    expect(await hardhatToken.balanceOf(addr1.address)).to.equal(50)

    // Transfer 50 tokens from addr1 to addr2
    // Use 'connect(signer) to send a tx from another account
    await hardhatToken.connect(addr1).transfer(addr2.address, 50)
    expect(await hardhatToken.balanceOf(addr2.address)).to.equal(50)
  })
})
