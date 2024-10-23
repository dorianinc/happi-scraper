const initialData = {
  actions: {
    'action-1': { id: 'action-1', content: 'Click', action: 'click' },
    'action-2': { id: 'action-2', content: 'Fill', action: 'fill' },
    'action-3': { id: 'action-3', content: 'Wait for Timeout', action: 'waitForTimeout' },
    'action-4': { id: 'action-4', content: 'Wait for Element', action: 'waitForElement' },
    'action-5': { id: 'action-5', content: 'Go to URL', action: 'goto' },
  },
  columns: {
    'column-1': {
      id: 'column-1',
      name: 'Script',
      items: [],
    },
    'column-2': {
      id: 'column-2',
      name: 'Actions',
      items: [{id: "c1-action-1", key: "action-1" },{id: "c1-action-1", key: "action-1" }, ],
    },
  },
  // Facilitate reordering of the columns
  columnOrder: ['column-1', 'column-2'],
};


export default initialData;

// actions column, will never update, it will stay as is. so that mean's it will have to be a constant values.


//create an actions object that contains only the names of the actions
//create separate objects that will handle the data