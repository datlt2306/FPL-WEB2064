export function saveTodos() {
    localStorage.setItem("todos", JSON.stringify(this.todos));
}
export function loadTodos() {
    const todos = JSON.parse(localStorage.getItem("todos")) || [];
    return todos;
}
