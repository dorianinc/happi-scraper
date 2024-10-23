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
        { id: "5a", content: "Go to URL", action: "goto" },
      ],
    },
    scriptsColumn: {
      id: "scriptsColumn",
      title: "Scripts",
      items: [],
    },
  },
};

export default initialData;
