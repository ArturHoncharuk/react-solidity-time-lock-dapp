import { ethers } from "hardhat";
import * as fs from "fs";
import * as path from "path";

async function main() {
  const TimeLock = await ethers.getContractFactory("TimeLock");
  const timeLock = await TimeLock.deploy();
  await timeLock.waitForDeployment();

  const address = await timeLock.getAddress();
  console.log("TimeLock deployed to:", address);

  // Create parameters.json
  const parameters = {
    timeLockAddress: address,
  };

  // Save the parameters to both the contracts directory and the client directory
  const contractsPath = path.join(__dirname, "..", "parameters.json");
  const clientPath = path.join(
    __dirname,
    "..",
    "..",
    "client",
    "src",
    "parameters.json"
  );

  fs.writeFileSync(contractsPath, JSON.stringify(parameters, null, 2));
  fs.writeFileSync(clientPath, JSON.stringify(parameters, null, 2));

  console.log("Parameters saved to:", contractsPath);
  console.log("Parameters saved to:", clientPath);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
