const sampleTodos = [
    {
        id: 1,
        text: "Học TailwindCSS",
        completed: false,
        createdAt: new Date().toISOString(),
    },
    {
        id: 2,
        text: "Tạo ứng dụng Todo List",
        completed: true,
        createdAt: new Date().toISOString(),
    },
    {
        id: 3,
        text: "Thực hành JavaScript",
        completed: false,
        createdAt: new Date().toISOString(),
    },
];

class TodoApp {
    constructor() {
        this.todos = sampleTodos;
        this.init();
    }
    init() {
        this.bindEvents();
        this.render();
    }
    bindEvents() {
        const todoForm = document.getElementById("todo-form");
        todoForm.addEventListener("submit", (e) => {
            e.preventDefault();
            this.addTodo();
        });
    }
    addTodo() {
        const todoInput = document.getElementById("todo-input");
        const text = todoInput.value.trim();
        if (text) {
            const todo = {
                id: this.todos.length + 1,
                text: text,
                completed: false,
                createdAt: new Date().toISOString(),
            };
            // thêm todo vào danh sách
            this.todos.push(todo);
            // hiển thị lại danh sách todo sau khi thêm
            this.render();
        }
    }
    createTodoHTML(todo) {
        const isCompleted = todo.completed;
        const createdAt = new Date(todo.createdAt).toLocaleDateString("vi-VN");
        return `
            <div class="todo-item bg-white rounded-lg shadow-md p-4 animate-slide-in ${
                isCompleted ? "opacity-75" : ""
            }" data-id="${todo.id}">
                        <div class="flex items-center space-x-3">
                            <button
                                onclick="todoApp.toggleTodo(${todo.id})"
                                class="w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${
                                    isCompleted
                                        ? "bg-success border-success text-white"
                                        : "border-gray-300 hover:border-primary"
                                }"
                            >
                                ${
                                    isCompleted
                                        ? `
                                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                                    </svg>
                                `
                                        : ""
                                }
                            </button>
                            
                            <div class="flex-1 min-w-0">
                                <p class="text-gray-800 ${
                                    isCompleted ? "line-through text-gray-500" : ""
                                }">${todo.text}</p>
                                <p class="text-xs text-gray-500 mt-1">Tạo lúc: ${createdAt}</p>
                            </div>
                            
                            <div class="flex items-center space-x-2">
                                <button
                                    onclick="todoApp.editTodo(${todo.id})"
                                    class="p-2 text-gray-400 hover:text-primary transition-colors duration-300"
                                    title="Chỉnh sửa"
                                >
                                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
                                    </svg>
                                </button>
                                
                                <button
                                    onclick="todoApp.deleteTodo(${todo.id})"
                                    class="p-2 text-gray-400 hover:text-danger transition-colors duration-300"
                                    title="Xóa"
                                >
                                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>`;
    }
    render() {
        const todoList = document.getElementById("todo-list");
        todoList.innerHTML = this.todos.map((todo) => this.createTodoHTML(todo)).join("");
    }
}
// Initialize the app
const todoApp = new TodoApp();
