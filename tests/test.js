// Right click on the script name and hit "Run" to execute
const { expect } = require("chai");
const { ethers } = require("hardhat");
const { parseEther, fromWei } = ethers.utils;

describe("Voting Token contract", function () {
  let votingToken;
  let deployer;

 beforeEach(async function () {
    const Token = await ethers.getContractFactory("VotingToken");
    votingToken = await Token.deploy("Community Token", "COM", 100);
    await votingToken.deployed();

    const VotingContract = await ethers.getContractFactory("VotingContract");
    votingContract = await VotingContract.deploy(votingToken.address);
    await votingContract.deployed();
    console.log("storage deployed at:"+ votingContract.address);
  });

it("should create a proposal", async () => {
    await votingToken.approve(votingContract.address, 20); 
    await votingContract.createProposal("Test Proposal");
    const proposalCount = await votingContract.proposalCount();

    expect(proposalCount.toNumber()).equals(1);
  });

});
