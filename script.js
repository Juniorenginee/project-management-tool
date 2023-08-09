const taskForm = document.getElementById('taskForm');
const taskListContainer = document.getElementById('taskList');
const chatForm = document.getElementById('chatForm');
const chatNameInput = document.getElementById('chatName');
const chatMessageInput = document.getElementById('chatMessage');
const chatMessagesContainer = document.getElementById('chatMessages');
const tasks = [];
const chatMessages = [];

taskForm.addEventListener('submit', function (event) {
    event.preventDefault();

    const assigner = document.getElementById('assigner').value;
    const task = document.getElementById('task').value;
    const assignee = document.getElementById('assignee').value;

    // Create a task object and add it to the tasks array
    const newTask = {
        assigner,
        task,
        assignee,
        comments: [], // Initialize an empty array for comments
        completed: false // Initialize the task as not completed
    };
    tasks.push(newTask);

    // Call a function to display the updated tasks list
    displayTasks();

    // Clear the form fields after submitting
    taskForm.reset();
});

chatForm.addEventListener('submit', function (event) {
    event.preventDefault();

    const name = chatNameInput.value.trim();
    const message = chatMessageInput.value.trim();

    if (name !== '' && message !== '') {
        const currentTime = new Date().toLocaleTimeString();
        const chatMessage = { name, message, time: currentTime };
        chatMessages.push(chatMessage);
        chatNameInput.value = '';
        chatMessageInput.value = '';
        displayChatMessages();
    }
});

function displayTasks() {
    // Clear the previous list
    taskListContainer.innerHTML = '';

    // Loop through the tasks and create the task elements
    tasks.forEach((task, index) => {
        const taskElement = document.createElement('div');
        taskElement.classList.add('task-item');

        const taskContent = `
            <strong>Task ${index + 1}:</strong><br>
            Assigner: ${task.assigner}<br>
            Task: ${task.task}<br>
            Assignee: ${task.assignee}<br>
            Completed: ${task.completed ? 'Yes' : 'No'}<br>
            <button onclick="toggleComplete(${index})">Toggle Complete</button><br>
            <label for="comment">Add a comment:</label>
            <input type="text" id="comment${index}" required>
            <button onclick="addComment(${index})">Add Comment</button>
            <div id="comments${index}"></div>
            <br>
        `;

        taskElement.innerHTML = taskContent;
        taskListContainer.appendChild(taskElement);

        // Display comments for this task
        const commentsContainer = document.getElementById(`comments${index}`);
        task.comments.forEach((comment, commentIndex) => {
            const commentElement = document.createElement('div');
            commentElement.classList.add('comment-item');
            commentElement.innerHTML = `<strong>Comment ${commentIndex + 1}:</strong> ${comment}`;
            commentsContainer.appendChild(commentElement);
        });
    });
}

function displayChatMessages() {
    // Clear the previous chat messages
    chatMessagesContainer.innerHTML = '';

    // Loop through the chat messages and display them
    chatMessages.forEach((chatMessage) => {
        const messageElement = document.createElement('div');
        messageElement.classList.add('chat-message');
        const messageContent = `
            <strong>${chatMessage.name}</strong> - ${chatMessage.time}<br>
            ${chatMessage.message}
        `;
        messageElement.innerHTML = messageContent;
        chatMessagesContainer.appendChild(messageElement);
    });
}

function addComment(taskIndex) {
    const commentInput = document.getElementById(`comment${taskIndex}`);
    const comment = commentInput.value.trim();

    if (comment !== '') {
        tasks[taskIndex].comments.push(comment);
        commentInput.value = '';
        displayTasks();
    }
}

function toggleComplete(taskIndex) {
    tasks[taskIndex].completed = !tasks[taskIndex].completed;
    displayTasks();
}

// Initial display of tasks and chat messages
displayTasks();
displayChatMessages();
