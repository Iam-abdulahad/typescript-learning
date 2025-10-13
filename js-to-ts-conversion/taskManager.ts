
// 1) Types
type Priority = 'Low' | 'Medium' | 'High';
type Filter = 'All' | 'Pending' | 'Completed';

interface Task {
  id: number;
  title: string;
  description: string;
  priority: Priority;
  completed: boolean;
  dueDate: string | null;
}

// 2) Data storage (typed)
const tasks: Task[] = [];
let nextId: number = 1;

// 3) Functions

export function addTask(
  title: string,
  description: string,
  priority: Priority = 'Medium'
): Task {
  const task: Task = {
    id: nextId++,
    title,
    description,
    priority,
    completed: false,
    dueDate: null
  };
  tasks.push(task);
  return task;
}

export function completeTask(taskId: number): boolean {
  const task = tasks.find(t => t.id === taskId);
  if (task) {
    task.completed = true;
    return true;
  }
  return false;
}

export function listTasks(filter: Filter = 'All'): Task[] {
  let filteredTasks: Task[] = tasks;
  if (filter === 'Pending') {
    filteredTasks = tasks.filter(t => !t.completed);
  } else if (filter === 'Completed') {
    filteredTasks = tasks.filter(t => t.completed);
  }

  console.log(`Tasks (${filter}):`);
  filteredTasks.forEach(task => {
    const status = task.completed ? '✓' : '◯';
    console.log(`[${status}] ${task.id}: ${task.title} (Priority: ${task.priority})`);
    if (task.dueDate) {
      console.log(`   Due: ${task.dueDate}`);
    }
  });

  return filteredTasks;
}

export function setDueDate(taskId: number, dueDate: string | null): boolean {
  const task = tasks.find(t => t.id === taskId);
  if (task) {
    task.dueDate = dueDate;
    return true;
  }
  return false;
}

export function getTasksByPriority(priority: Priority): Task[] {
  return tasks.filter(t => t.priority === priority);
}