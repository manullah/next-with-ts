import React from "react";
import { Button } from "@chakra-ui/button";
import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { Input } from "@chakra-ui/input";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import {
  useAddTodoData,
  useFetchTodoIdData,
  useUpdateTodoData,
} from "../utils/hooks/todoData";
import { IFormTodo } from "../utils/types/todo";

interface IPropsFormTodo {
  id: number;
  removeId: () => void;
}

const FormTodo = ({ id: idActived, removeId }: IPropsFormTodo) => {
  // fetch query
  const {
    isSuccess,
    data: todo,
    isLoading,
    isError,
  } = useFetchTodoIdData({
    id: idActived,
    onSuccess: (data) => {
      setValue("title", data?.title || "");
      setValue("description", data?.description || "");
    },
  });
  const { mutate: addTodo } = useAddTodoData({
    onSuccess: () => reset(),
  });
  const { mutate: editTodo } = useUpdateTodoData({
    onSuccess: () => {
      reset();
      removeId();
    },
  });

  // form
  const { control, handleSubmit, reset, setValue } = useForm<IFormTodo>({
    defaultValues: {
      title: "",
      description: "",
    },
  });
  const onSubmit: SubmitHandler<IFormTodo> = (data) =>
    idActived ? editTodo({ id: idActived, todo: data }) : addTodo(data);

  const renderResult = () => {
    if (isLoading) {
      return <div>Loading...</div>;
    }

    if (isError) {
      return <div>Something went wrong</div>;
    }

    if (isSuccess) {
      return <div>{JSON.stringify(todo)}</div>;
    }

    return <></>;
  };

  return (
    <>
      <Button
        colorScheme="teal"
        variant="solid"
        mb={4}
        onClick={() => {
          removeId();
          reset();
        }}
      >
        Create Todo
      </Button>
      <form onSubmit={handleSubmit(onSubmit)}>
        {renderResult()}
        <Controller
          name="title"
          control={control}
          rules={{ required: true }}
          render={({ field }) => (
            <FormControl id="title" isRequired mb={5}>
              <FormLabel>Title</FormLabel>
              <Input {...field} type="text" placeholder="Title..." />
            </FormControl>
          )}
        />
        <Controller
          name="description"
          control={control}
          rules={{ required: true }}
          render={({ field }) => (
            <FormControl id="title" isRequired>
              <FormLabel>Description</FormLabel>
              <Input {...field} type="text" placeholder="Description..." />
            </FormControl>
          )}
        />
        <Button
          colorScheme="teal"
          variant="solid"
          type="submit"
          width="full"
          mt={4}
        >
          Submit
        </Button>
      </form>
    </>
  );
};

export default FormTodo;
