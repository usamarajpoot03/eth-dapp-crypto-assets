const { assert } = require("chai");
const _deploy_contracts = require("../migrations/2_deploy_contracts");

const Color = artifacts.require("./Color.sol");

require("chai").use(require("chai-as-promised")).should();

contract("Color", (accounts) => {
  let colorContract;

  beforeEach(async () => {
    colorContract = await Color.deployed();
  });

  describe("deployment", async () => {
    it("deploys successfully", async () => {
      const address = colorContract.address;
      assert.notEqual(address, "");
      assert.notEqual(address, 0x0);
      assert.notEqual(address, null);
      assert.notEqual(address, undefined);
    });

    it("has a name", async () => {
      const name = await colorContract.name();
      assert.equal(name, "Color");
    });

    it("has a symbol", async () => {
      const name = await colorContract.symbol();
      assert.equal(name, "COLOR");
    });
  });

  describe("minting", async () => {
    it("creates new token", async () => {
      colorContract = await Color.new();
      const result = await colorContract.mint("#EC5454");
      const totalSupply = await colorContract.totalSupply();
      assert.equal(totalSupply, 1);

      const event = result.logs[0].args;
      assert.equal(event.tokenId.toNumber(), 0, "Id is correct");
      assert.equal(
        event.from,
        "0x0000000000000000000000000000000000000000",
        "from is correct"
      );
      assert.equal(event.to, accounts[0], "to is correct");

      await colorContract.mint("#EC5454").should.be.rejected;
    });
  });

  describe("indexing", async () => {
    it("list colors", async () => {
      let expectedColors = ["#EC5444", "#FFFFFF", "#000000"];
      colorContract = await Color.new();
      await colorContract.mint(expectedColors[0]);
      await colorContract.mint(expectedColors[1]);
      await colorContract.mint(expectedColors[2]);
      const totalSupply = await colorContract.totalSupply();

      let color;
      let resultantColors = [];

      for (var i = 0; i < totalSupply; i++) {
        color = await colorContract.colors(i);
        resultantColors.push(color);
      }
      assert.equal(resultantColors.join(","), expectedColors.join(","));
    });
  });
});
