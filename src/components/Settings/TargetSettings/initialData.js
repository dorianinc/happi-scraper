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
      actionIds: [],
    },
    'column-2': {
      id: 'column-2',
      name: 'Actions',
      actionIds: ['action-5', 'action-1', 'action-2', 'action-4', 'action-3'],
    },
  },
  // Facilitate reordering of the columns
  columnOrder: ['column-1', 'column-2'],
};


export default initialData;