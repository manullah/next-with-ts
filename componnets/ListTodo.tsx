import React from "react";
import { VStack, Text, HStack } from "@chakra-ui/layout";
import { IResponseTodo } from "../utils/types/todo";
import { Button } from "@chakra-ui/button";
import { useDeleteTodoData } from "../utils/hooks/todoData";

const ListTodo = ({
  todo,
  updateId,
}: {
  todo: IResponseTodo;
  updateId: (id: number) => void;
}) => {
  // fetch query
  const { mutate: deleteTodo } = useDeleteTodoData();

  return (
    <VStack
      borderWidth={1}
      borderRadius={8}
      padding="4"
      align="start"
      spacing={2}
    >
      <Text fontWeight="semibold">{todo.title}</Text>
      <Text fontSize="sm">{todo.description}</Text>
      <HStack width="full">
        <Button
          colorScheme="teal"
          variant="outline"
          width="full"
          size="sm"
          onClick={() => updateId(todo.id)}
        >
          Update
        </Button>
        <Button
          colorScheme="red"
          variant="outline"
          width="full"
          size="sm"
          onClick={() => deleteTodo(todo.id)}
        >
          Delete
        </Button>
      </HStack>
    </VStack>
  );
};

export default ListTodo;
