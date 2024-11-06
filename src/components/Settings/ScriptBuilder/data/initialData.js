const initialData = {
  columns: {
    actionsColumn: {
      id: "actionsColumn",
      title: "Actions",
      items: [
        { id: "a1", type: "click" },
        { id: "a2", type: "fill" },
        {
          id: "a3",
          type: "waitForTimeout",
        },
        {
          id: "a4",
          type: "waitForElement",
        },
        // { id: "a5", content: "Go to URL", type: "goto" },
      ],
    },
    scriptsColumn: {
      id: "scriptsColumn",
      title: "Scripts",
      items: [
      //   {
      //     id: "h2j3jsdk2-34gfd",
      //     step: 2,
      //     type: "click",
      //     locator: "#searchbutton",
      //   },
      //   {
      //     id: "a324ohjhf-4dfgfdg",
      //     step: 1,
      //     type: "fill",
      //     locator: "#searchbar",
      //   },
      //   {
      //     id: "324kjdsfsdk2-34gfd",
      //     step: 3,
      //     type: "waitForElement",
      //     locator: "#header",
      //   },
      ],
    },
  },
};

export default initialData;
