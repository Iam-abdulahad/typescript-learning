let tasks = [];
let nextId = 1;

function addTask(title, description, priority = 'Medium') {
    const task = {
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

function completeTask(taskId) {
    const task = tasks.find(t => t.id === taskId);
    if (task) {
        task.completed = true;
        return true;
    }
    return false;
}

function listTasks(filter = 'All') {
    let filteredTasks = tasks;
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

function setDueDate(taskId, dueDate) {
    const task = tasks.find(t => t.id === taskId);
    if (task) {
        task.dueDate = dueDate;
        return true;
    }
    return false;
}

function getTasksByPriority(priority) {
    return tasks.filter(t => t.priority === priority);
}

// Example usage (you can use this to test)
// addTask("Learn TypeScript", "Convert this project to TS", "High");
// addTask("Buy groceries", "Milk and eggs");
// completeTask(1);
// setDueDate(2, "2023-10-31");
// listTasks();
// listTasks('Pending');
// console.log(getTasksByPriority('High'));