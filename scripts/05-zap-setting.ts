import { ethers } from "hardhat";

import { config } from "./config";

async function main() {
    const [deployer] = await ethers.getSigners();

    console.log("deployer address:", deployer.address);
    const zapper = await ethers.getContractAt("ZapV3", config.zap);

    await zapper.setCoreValues(
        config.router,
        config.factory,
        config.wild,
        config.baseLp,
        config.weth
    );

    // weth - wild
    console.log("set swap path for weth-wild");
    await zapper.setSwapPath(config.wild, config.weth, [config.wild, config.weth]);
    await zapper.setSwapPath(config.weth, config.wild, [config.weth, config.wild]);


    console.log({
        zapper: zapper.address,
    });
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
