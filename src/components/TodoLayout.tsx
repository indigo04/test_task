"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import TodoList from "./TodoList";

const queryClient = new QueryClient();

export default function TodoLayout() {
  return (
    <QueryClientProvider client={queryClient}>
      <TodoList />
    </QueryClientProvider>
  );
}
