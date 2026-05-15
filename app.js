const todoForm = document.getElementById("todo-form");
const todoInput = document.getElementById("todo-input");
const todoError = document.getElementById("todo-error");
const todoList = document.getElementById("todo-list");
const completedCount = document.getElementById("completed-count");
const totalCount = document.getElementById("total-count");

const MAX_TODO_LENGTH = 120;
let nextId = 1;
const todos = [];

const escapeHtml = (text) =>
  text
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");

const validateTodoText = (rawText) => {
  const value = rawText.trim();

  if (!value) {
    return "Nội dung không được để trống.";
  }

  if (value.length > MAX_TODO_LENGTH) {
    return `Nội dung tối đa ${MAX_TODO_LENGTH} ký tự.`;
  }

  return null;
};

const showError = (message = "") => {
  todoError.textContent = message;
};

const updateCounter = () => {
  const done = todos.filter((todo) => todo.done).length;
  completedCount.textContent = String(done);
  totalCount.textContent = String(todos.length);
};

const renderTodos = () => {
  if (!todos.length) {
    todoList.innerHTML = `
      <li class="rounded-lg border border-dashed border-slate-300 px-4 py-3 text-sm text-slate-500">
        Chưa có công việc nào.
      </li>
    `;
    updateCounter();
    return;
  }

  todoList.innerHTML = todos
    .map(
      (todo) => `
        <li data-id="${todo.id}" class="rounded-lg border border-slate-200 px-3 py-2">
          <div class="flex items-center gap-3">
            <input
              type="checkbox"
              class="size-4 accent-blue-600"
              data-action="toggle"
              aria-label="Đánh dấu hoàn thành"
              ${todo.done ? "checked" : ""}
            />
            <span class="flex-1 break-words text-sm ${todo.done ? "text-slate-400 line-through" : "text-slate-800"}">
              ${escapeHtml(todo.text)}
            </span>
            <button
              type="button"
              data-action="edit"
              class="rounded-md border border-amber-200 bg-amber-50 px-2 py-1 text-xs font-medium text-amber-700 hover:bg-amber-100"
              aria-label="Sửa công việc"
            >
              Sửa
            </button>
            <button
              type="button"
              data-action="delete"
              class="rounded-md border border-red-200 bg-red-50 px-2 py-1 text-xs font-medium text-red-700 hover:bg-red-100"
              aria-label="Xóa công việc"
            >
              Xóa
            </button>
          </div>
        </li>
      `,
    )
    .join("");

  updateCounter();
};

const handleAddTodo = (event) => {
  // ngăn sự kiện reload khi submit form
  event.preventDefault();
  const message = validateTodoText(todoInput.value);
  if (message) {
    showError(message);
    return;
  }
  const cleanText = todoInput.value.trim();

  todos.push({ id: nextId++, text: cleanText, done: false });
  todoInput.value = "";
  showError("");
  renderTodos();
  todoInput.focus();
};
const handleToggleTodo = (todoId) => {
  todos = todos.map((todo) => (todo.id === todoId ? { ...todo, done: !todo.done } : todo));
  renderTodos();
};
const handleDeleteTodo = (todoId) => {
  todos = todos.filter((todo) => todo.id !== todoId);
  renderTodos();
};

const handleEditTodo = (todoId) => {
  const todo = todos.find((item) => item.id === todoId);
  if (!todo) {
    return;
  }

  const nextText = window.prompt("Cập nhật công việc:", todo.text);
  if (nextText === null) {
    return;
  }

  const message = validateTodoText(nextText);
  if (message) {
    showError(message);
    return;
  }

  showError("");
  todos = todos.map((item) =>
    item.id === todoId ? { ...item, text: nextText.trim() } : item,
  );
  renderTodos();
};

const handleListAction = (event) => {
  const actionTarget = event.target.closest("[data-action]");
  if (!actionTarget) {
    return;
  }

  const item = actionTarget.closest("[data-id]");
  if (!item) {
    return;
  }

  const todoId = Number(item.dataset.id);
  const action = actionTarget.dataset.action;

  if (action === "toggle") {
    handleToggleTodo(todoId);
    return;
  }

  if (action === "edit") {
    handleEditTodo(todoId);
    return;
  }

  if (action === "delete") {
    handleDeleteTodo(todoId);
  }
};

todoForm.addEventListener("submit", handleAddTodo);
todoList.addEventListener("click", handleListAction);
todoList.addEventListener("change", handleListAction);

renderTodos();
