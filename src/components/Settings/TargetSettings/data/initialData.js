const initialData = {
  columns: {
    actionsColumn: {
      id: "actionsColumn",
      title: "Actions",
      items: [
        { id: "a1", content: "Click", action: "click" },
        { id: "a2", content: "Fill", action: "fill" },
        {
          id: "a3",
          content: "Wait for Timeout",
          action: "waitForTimeout",
        },
        {
          id: "a4",
          content: "Wait for Element",
          action: "waitForElement",
        },
        // { id: "a5", content: "Go to URL", action: "goto" },
      ],
    },
    scriptsColumn: {
      id: "scriptsColumn",
      title: "Scripts",
      items: [
        {
          id: "h2j3jsdk2-34gfd",
          step: 2,
          content: "Click",
          action: "click",
          locator: "#searchbutton",
        },
        {
          id: "a324ohjhf-4dfgfdg",
          step: 1,
          content: "Fill",
          action: "fill",
          locator: "#searchbar",
        },
        {
          id: "324kjdsfsdk2-34gfd",
          step: 3,
          content: "Wait for Element",
          action: "waitForElement",
          locator: "#header",
        },
      ],
    },

  },
};

export default initialData;
