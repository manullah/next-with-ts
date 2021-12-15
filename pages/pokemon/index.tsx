import React, { useState } from "react";
import { useQuery } from "react-query";
import { NextPage } from "next";
import axios from "axios";
import { Box, Container, Grid, HStack } from "@chakra-ui/layout";
import Link from "next/link";
import { Button } from "@chakra-ui/button";

const fetchPokemon = (pageNumber: number) =>
  axios
    .get(`https://pokeapi.co/api/v2/pokemon?offset=${pageNumber * 20}&limit=20`)
    .then(({ data }) => data);

const Pokemon: NextPage = () => {
  const [pageNumber, setPageNumber] = useState(0);
  const {
    isLoading,
    isError,
    isSuccess,
    data: pokemons,
  } = useQuery(["searchPokemons", pageNumber], () => fetchPokemon(pageNumber));

  const renderResult = () => {
    if (isLoading) {
      return <div className="search-message"> Loading... </div>;
    }

    if (isError) {
      return <div className="search-message">Something went wrong</div>;
    }

    if (isSuccess) {
      return pokemons.results.map(
        (pokemon: { name: string; url: string }, index: number) => (
          <Box
            textAlign="center"
            borderWidth={1}
            borderRadius={8}
            padding="4"
            key={index}
          >
            <Link href={`/pokemon/${pokemon.name}`}>{pokemon.name}</Link>
          </Box>
        )
      );
    }

    return <></>;
  };

  return (
    <>
      <Container maxW="container.xl" mt="100px">
        <Grid templateColumns="repeat(5, 1fr)" gap={6}>
          {renderResult()}
        </Grid>

        {!isLoading && (
          <>
            <HStack mt="50px" justifyContent="center" spacing="20px">
              <Button
                colorScheme="blue"
                disabled={!pokemons.previous}
                onClick={() => setPageNumber((page) => page - 1)}
              >
                Prev
              </Button>
              <Button
                colorScheme="blue"
                disabled={!pokemons.next}
                onClick={() => setPageNumber((page) => page + 1)}
              >
                Next
              </Button>
            </HStack>
          </>
        )}
      </Container>
    </>
  );
};

export default Pokemon;
