import React, { useState } from "react";
import { NextPage } from "next";
import { Box, Container, Grid, HStack } from "@chakra-ui/layout";
import { Input } from "@chakra-ui/input";
import { useFetchTodoData } from "../../utils/hooks/todoData";
import { IResponseTodo } from "../../utils/types/todo";
import FormTodo from "../../componnets/FormTodo";
import ListTodo from "../../componnets/ListTodo";

const Todos: NextPage = () => {
  const [search, setSearch] = useState("");
  const [idActived, setIdActived] = useState(0);

  // fetch query
  const {
    isLoading,
    isError,
    isSuccess,
    data: todos,
  } = useFetchTodoData({ params: { q: search } });

  const renderResult = () => {
    if (isLoading) {
      return <div>Loading...</div>;
    }

    if (isError) {
      return <div>Something went wrong</div>;
    }

    if (isSuccess) {
      return todos?.map((todo: IResponseTodo) => (
        <ListTodo
          todo={todo}
          key={todo.id}
          updateId={(id) => setIdActived(id)}
        ></ListTodo>
      ));
    }

    return <></>;
  };

  return (
    <>
      <Container maxW="container.xl" p={[0, 10]}>
        <HStack spacing={10} align="start">
          <Box flex="1">
            <Input
              type="text"
              placeholder="Search..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              mb={10}
            />
            <Grid templateColumns="repeat(1, 1fr)" gap={6}>
              {renderResult()}
            </Grid>
          </Box>
          <Box flex="2">
            <FormTodo
              id={idActived}
              removeId={() => setIdActived(0)}
            ></FormTodo>
          </Box>
        </HStack>
      </Container>
    </>
  );
};

export default Todos;
