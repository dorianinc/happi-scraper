const { FusesPlugin } = require("@electron-forge/plugin-fuses");
const { FuseV1Options, FuseVersion } = require("@electron/fuses");
const path = require("path"); // Import path module

module.exports = {
  packagerConfig: {
    name: "Happi Scraper",
    asar: true,
    osxSign: {},
    appCategoryType: "public.app-category.developer-tools",
    icon: path.join(__dirname, "assets", "images", "happi-supply-boxes"), // No extension here
  },
  rebuildConfig: {},
  makers: [
    // Windows Installer
    {
      name: "@electron-forge/maker-squirrel",
      config: {
        name: "happi-scraper",
        iconUrl:  path.join(__dirname, "assets", "images", "happi-supply-boxes.ico"), // Ensures desktop icon
        setupIcon: path.join(__dirname, "assets", "images", "happi-supply-boxes.ico"), // Ensures desktop icon
      },
    },
  ],
  plugins: [
    {
      name: "@electron-forge/plugin-auto-unpack-natives",
      config: {},
    },
    new FusesPlugin({
      version: FuseVersion.V1,
      [FuseV1Options.RunAsNode]: false,
      [FuseV1Options.EnableCookieEncryption]: true,
      [FuseV1Options.EnableNodeOptionsEnvironmentVariable]: false,
      [FuseV1Options.EnableNodeCliInspectArguments]: false,
      [FuseV1Options.EnableEmbeddedAsarIntegrityValidation]: true,
      [FuseV1Options.OnlyLoadAppFromAsar]: true,
    }),
  ],
};
