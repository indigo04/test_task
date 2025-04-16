"use client";

import { createTodo, getTodos, removeTodo, Todo } from "@/utils/todos";
import TodoItem from "./TodoItem";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";

export default function TodoList() {
  const query = useQuery({ queryKey: ["todos"], queryFn: getTodos });
  const [todos, setTodos] = useState<Todo[]>(query.data);
  useEffect(() => {
    if (query.data) {
      setTodos(query.data);
    }
  }, [query.data]);
  const [title, setTitle] = useState("");
  const createMutation = useMutation({
    mutationFn: createTodo,
    onSuccess: (result) => {
      setTodos([...todos, result]);
      setTitle("");
    },
  });
  const deleteMutation = useMutation({
    mutationFn: removeTodo,
    onSuccess: (data, variables) => {
      setTodos(todos.filter((todo) => todo.id !== +variables));
    },
  });

  return (
    <section className="flex flex-col w-full xl:w-[50%] mx-auto mt-10 gap-2">
      <form action={() => createMutation.mutate(title)}>
        <input
          type="text"
          name="todo"
          value={title}
          placeholder="New todo:"
          className="border-2 border-black w-full p-4 placeholder:text-center text-center"
          autoComplete="off"
          disabled={createMutation.isPending}
          onChange={(event) => setTitle(event.target.value)}
        />
      </form>
      {query.isPending && (
        <div className="mt-25 flex w-full items-center justify-center" data-cy="Loader">
        <div className="animate-spin rounded-full w-25 h-25 border-2 border-gray-700 border-l-amber-50" />
      </div>
      )}
      {todos?.map((todo: Todo) => (
        <TodoItem todo={todo} key={todo.id} deleteMutation={deleteMutation} />
      ))}
    </section>
  );
}
