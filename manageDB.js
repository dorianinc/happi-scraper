import readline from "readline";
import { addWebsiteSeeds, deleteWebsiteSeeds } from "./seeders/websiteSeeds.js";
import {
  addSettingSeeds,
  deleteSettingsSeeds,
} from "./src/firestore/seeders/settingsSeeds.js";

// Interface for user input
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const showMenu = () => {
  console.log("\n1. Seed Database");
  console.log("2. Clear Database");
  console.log("3. Exit");

  rl.question("Choose an option: ", async (answer) => {
    switch (answer) {
      case "1":
        await addWebsiteSeeds();
        await addSettingSeeds();
        rl.close();
        break;
      case "2":
        await deleteWebsiteSeeds();
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
  }, 2000);
});

showMenu();
