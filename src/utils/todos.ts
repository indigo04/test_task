export interface Todo {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

export async function getTodos() {
  const response = await fetch(
    "https://jsonplaceholder.typicode.com/todos?_limit=10"
  );
  return response.json();
}

export async function createTodo(title: string) {
  const newTodo = {
    userId: 1,
    title,
  };
  const response = await fetch("https://jsonplaceholder.typicode.com/todos", {
    method: "POST",
    body: JSON.stringify(newTodo),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  });
  return response.json();
}

export async function removeTodo(id: string) {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/todos/${id}`,
    { method: "DELETE" }
  );
  return response.json();
}
