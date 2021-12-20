import axios from "axios";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { IFormTodo, IQueryFetchTodo, IResponseTodo } from "../types/todo";
import { IOptionsReactQuery } from "../types/queries";

export const useFetchTodoData = ({ params }: { params: IQueryFetchTodo }) => {
  return useQuery<Array<IResponseTodo>>(["fetchTodos", params], () =>
    axios
      .get(`http://localhost:4000/todos`, { params })
      .then(({ data }) => data)
  );
};

export const useFetchTodoIdData = ({ id, onSuccess }: IOptionsReactQuery) => {
  return useQuery(
    ["fetchTodoId", id],
    () =>
      axios.get(`http://localhost:4000/todos/${id}`).then(({ data }) => data),
    {
      enabled: Boolean(id),
      onSuccess,
    }
  );
};

export const useAddTodoData = ({ onSuccess }: IOptionsReactQuery) => {
  const queryClient = useQueryClient();
  return useMutation(
    (todo: IFormTodo) => axios.post("http://localhost:4000/todos", todo),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("fetchTodos");
        if (onSuccess) onSuccess();
      },
    }
  );
};

export const useUpdateTodoData = ({ onSuccess }: IOptionsReactQuery) => {
  const queryClient = useQueryClient();
  return useMutation(
    ({ id, todo }: { id: number; todo: IFormTodo }) =>
      axios.put(`http://localhost:4000/todos/${id}`, todo),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("fetchTodos");
        if (onSuccess) onSuccess();
      },
    }
  );
};

export const useDeleteTodoData = () => {
  const queryClient = useQueryClient();
  return useMutation(
    (id: number) => axios.delete(`http://localhost:4000/todos/${id}`),
    {
      onSuccess: () => queryClient.invalidateQueries("fetchTodos"),
    }
  );
};
