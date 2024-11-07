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

      ],
    },
  },
};

export default initialData;
