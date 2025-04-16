"use client";

import { Todo } from "@/utils/todos";
import { UseMutationResult } from "@tanstack/react-query";

type Props = {
  todo: Todo,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  deleteMutation: UseMutationResult<any, Error, string, unknown>
}

export default function TodoItem({ todo, deleteMutation }: Props) {
  const border = todo.completed
    ? "flex gap-4 items-center w-full justify-between p-3 border-2 bg-green-400"
    : "flex gap-4 items-center w-full justify-between p-3 border-2 bg-yellow-300";
  return (
    <article className="flex">
      <div className={border}>
        <h2>{todo.id}.</h2>
        <h2 className="overflow-hidden">{todo.title}</h2>
        <span
          className="bg-[url(/trash_icon.png)] w-7 h-7 bg-contain bg-no-repeat duration-500 hover:scale-125 cursor-pointer shrink-0"
          onClick={() => deleteMutation.mutate(`${todo.id}`)}
        ></span>
      </div>
    </article>
  );
}
