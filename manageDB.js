import readline from "readline";
import { addProductSeeds, deleteProductSeeds } from "./src/firestore/seeders/productSeeds.js";
import { addWebsiteSeeds, deleteWebsiteSeeds } from "./src/firestore/seeders/websiteSeeds.js";
import { addMatchSeeds, deleteMatchSeeds } from "./src/firestore/seeders/matchSeeds.js";
import { applyDefaultSettings } from "./src/firestore/seeders/settingsSeeds.js";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const showMenu = () => {
  console.log("\n1. Seed Database");
  console.log("2. Refresh Database");
  console.log("3. Exit");

  rl.question("Choose an option: ", async (answer) => {
    switch (answer) {
      case "1":
        await addProductSeeds();
        await addMatchSeeds();
        await addWebsiteSeeds();
        await applyDefaultSettings();
        rl.close();
        break;
      case "2":
        await deleteMatchSeeds();
        await deleteProductSeeds();
        await deleteWebsiteSeeds();
        await addProductSeeds();
        await addWebsiteSeeds();
        await applyDefaultSettings();
        await addMatchSeeds();
        rl.close();
        break;
      case "3":
        rl.close();
        break;
      default:
        console.log("Invalid option");
        rl.close();
    }
  });
};

rl.on("close", () => {
  console.log("\nExiting program.");
  setTimeout(() => {
    process.exit(0);
  }, 5000);
});

showMenu();
