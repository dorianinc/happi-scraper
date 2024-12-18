const Store = require("electron-store");

// Define the settings schema
const settingsSchema = {
  type: "object",
  properties: {
    similarityThreshold: {
      type: "integer",
      default: 80,
      minimum: 0,
      maximum: 100,
    },
    filterLimit: {
      type: "integer",
      default: 50,
      minimum: 1,
    },
    selectAll: {
      type: "boolean",
      default: false,
    },
    selectHighest: {
      type: "boolean",
      default: true,
    },
    darkMode: {
      type: "boolean",
      default: false,
    },
  },
  required: [
    "similarityThreshold",
    "filterLimit",
    "selectAll",
    "selectHighest",
    "darkMode",
  ],
  additionalProperties: false,
};

// Define the schema for the store
const schema = {
  settings: settingsSchema,
};

// Create the store instance
const store = new Store({ watch: true, schema });

// Function to check and initialize missing settings
function initializeSettings() {
  const defaultSettings = Object.entries(settingsSchema.properties);
  for (const [key, config] of defaultSettings) {
    if (!store.has(`settings.${key}`)) {
      store.set(`settings.${key}`, config.default);
    }
  }
}

// Initialize settings at runtime
initializeSettings();

module.exports = { store };
