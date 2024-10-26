import COLUMN_NAMES from "./constants";

const { ACTIONS, SCRIPT } = COLUMN_NAMES;
const tasks = [
  { id: "task-1", name: "Item 1", column: ACTIONS },
  { id: "task-2", name: "Item 2", column: ACTIONS },
  { id: "task-3", name: "Item 3", column: ACTIONS },
  { id: "task-4", name: "Item 4", column: ACTIONS },
];


const initialData = {
  columns: {
    scriptsColumn: {
      id: "scriptsColumn",
      title: "Scripts",
      items: [],
    },
    actionsColumn: {
      id: "actionsColumn",
      title: "Actions",
      items: [
        { id: "task-1", name: "Item 1", column: ACTIONS },
        { id: "task-2", name: "Item 2", column: ACTIONS },
        { id: "task-3", name: "Item 3", column: ACTIONS },
        { id: "task-4", name: "Item 4", column: ACTIONS },
      ],
    },
  },
};
export default initialData;
