// Todo status types
export const TODO_STATUSES = {
  BACKLOG: 'backlog',
  IN_PROGRESS: 'in_progress',
  DONE: 'done',
} as const;

export type TodoStatus = typeof TODO_STATUSES[keyof typeof TODO_STATUSES];

// Todo status display names
export const TODO_STATUS_DISPLAY_NAMES = {
  [TODO_STATUSES.BACKLOG]: 'Backlog',
  [TODO_STATUSES.IN_PROGRESS]: 'In Progress',
  [TODO_STATUSES.DONE]: 'Done',
} as const;

// Todo status colors for columns
export const TODO_STATUS_COLORS = {
  [TODO_STATUSES.BACKLOG]: 'border-t-gray-500',
  [TODO_STATUSES.IN_PROGRESS]: 'border-t-yellow-500',
  [TODO_STATUSES.DONE]: 'border-t-green-500',
} as const;

// Priority types
export const PRIORITIES = {
  LOW: 'low',
  MEDIUM: 'medium',
  HIGH: 'high',
  URGENT: 'urgent',
} as const;

export type Priority = typeof PRIORITIES[keyof typeof PRIORITIES];

// Priority configurations
export const PRIORITY_CONFIGS = {
  [PRIORITIES.LOW]: {
    id: PRIORITIES.LOW,
    name: 'Low',
    color: 'border-l-green-400',
    bgColor: 'bg-green-400/10',
  },
  [PRIORITIES.MEDIUM]: {
    id: PRIORITIES.MEDIUM,
    name: 'Medium',
    color: 'border-l-blue-400',
    bgColor: 'bg-blue-400/10',
  },
  [PRIORITIES.HIGH]: {
    id: PRIORITIES.HIGH,
    name: 'High',
    color: 'border-l-orange-400',
    bgColor: 'bg-orange-400/10',
  },
  [PRIORITIES.URGENT]: {
    id: PRIORITIES.URGENT,
    name: 'Urgent',
    color: 'border-l-red-400',
    bgColor: 'bg-red-400/10',
  },
} as const;

// Tag types
export const TAG_TYPES = {
  BUG: 'bug',
  DOCUMENTATION: 'documentation',
  FEATURE: 'feature',
} as const;

export type TagType = typeof TAG_TYPES[keyof typeof TAG_TYPES];

// Tag configurations
export const TAG_CONFIGS = {
  [TAG_TYPES.BUG]: {
    id: TAG_TYPES.BUG,
    name: 'Bug',
    color: 'bg-red-500/20 text-red-500',
  },
  [TAG_TYPES.DOCUMENTATION]: {
    id: TAG_TYPES.DOCUMENTATION,
    name: 'Documentation',
    color: 'bg-blue-900/20 text-blue-400',
  },
  [TAG_TYPES.FEATURE]: {
    id: TAG_TYPES.FEATURE,
    name: 'Feature',
    color: 'bg-purple-500/20 text-purple-400',
  },
} as const;

// UI text constants
export const UI_TEXT = {
  ADD_TASK: 'Add task',
  ADD_TAG: 'Add tag',
  ADD_TAG_OPTIONAL: 'Add tag (optional)',
  TASK_NAME: 'Task Name',
  DESCRIPTION: 'Description',
  TAGS: 'Tags',
  STATUS: 'Status',
  PRIORITY: 'Priority',
  SAVE: 'Save',
  CANCEL: 'Cancel',
  DELETE: 'Delete',
  EDIT_TODO: 'Edit Todo',
  TODO_APP: 'Todo App',
  ENTER_TASK_NAME: 'Enter task name',
  ENTER_DESCRIPTION: 'Enter task description (optional)',
  SELECT_PRIORITY: 'Select priority',
} as const;

// Modal actions
export const MODAL_ACTIONS = {
  SAVE: 'save',
  CANCEL: 'cancel',
  DELETE: 'delete',
} as const;

// Button variants
export const BUTTON_VARIANTS = {
  PRIMARY: 'primary',
  SECONDARY: 'secondary',
  DANGER: 'danger',
  GHOST: 'ghost',
} as const;

// Button sizes
export const BUTTON_SIZES = {
  SM: 'sm',
  MD: 'md',
  LG: 'lg',
} as const;
