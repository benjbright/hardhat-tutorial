# hardhat-tutorial

Walkthrough of the Hardhat tutorial project

## Notes and key learning points

### Notes on `Token.js`

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
