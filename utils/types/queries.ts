import { IResponseTodo } from "../types/todo";

export type IOptionsReactQuery = {
  id?: number;
  onSuccess?: (data?: IResponseTodo) => void;
  onError?: (data?: IResponseTodo) => void;
};
