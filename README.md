# hardhat-tutorial

Walkthrough of the Hardhat tutorial project

## Notes and key learning points

### Notes on Testing contracts

- Seup `Token.js` for testing

Run `npx hardhat test`

```
    const [owner] = await.ethers.getSigners()
```

A `Signer` in ethers.js is an object that represents an Ethereum account - this is used to send transactions to contracts and other accounts.
Here we get a list of the accounts in the node we're connected to (Hardhat Network) and keep the first one.

The `ethers` variable is available in the global scope.

```
    const Token = await ethers.getContractFactory("Token")
```

A `ContractFactory` in ethers.js is an abstraction used to deploy new smart contracts, so `Token` here is a factory for instances of our token contract.

```
    const hardhatToken = await Token.deploy()
```

Calling a `deploy()` method on a `ContractFactory` will start the deployment and return a `Promise` that resolves to a `Contract`. This is the object that has a method for each of your smart contract functions.

```
const ownerBalance = await hardhatToken.balanceOf(owner.address)
```

Once the contract is deployed, can call contract methods on `hardhatToken`. Here get the balance of the owner account by calling the contract's `balanceOf` method.
Note that the account that deploys the contract gets the entire supply, by default `ContractFactory` and `Contract` instances are connected to the first signer. So the account in the `owner` variable executed the deployment and `balanceOf` should return the enture supply amount.

```
expect(await hardhatToken.totalSupply()).to.equal(ownerBalance)
```

Again use the `Contract` instance to call a smart contract function. `totalSupply()` returns the token's supply amount - check that it's equal to the `ownerBalance`.
Use `Chai` asserting functions called "matchers"

If you need to test by sending a tx from a different account (or signer), can use the `connect()` method on the ethers.js `Contract` object to connect to a different account.

```
await hardhatToken.connect(addr1).transfer(addr2.address, 50)
```
