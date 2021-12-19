export type IResponseTodo = {
  id: number;
  title: string;
  description: string;
  done: boolean;
};

export type IFormTodo = {
  title: string;
  description: string;
};

export type IQueryFetchTodo = {
  q: string;
};
