import React from "react";
import { NextPage } from "next";
import axios from "axios";
import { useQuery } from "react-query";
import { useRouter } from "next/router";

const fetchPokemon = (id: string) =>
  axios
    .get(`https://pokeapi.co/api/v2/pokemon/${id}/`)
    .then(({ data }) => data);

const Pokemon: NextPage = () => {
  const router = useRouter();
  const pokemonID = typeof router.query?.id === "string" ? router.query.id : "";

  const {
    isSuccess,
    data: pokemon,
    isLoading,
    isError,
  } = useQuery(["getPokemon", pokemonID], () => fetchPokemon(pokemonID), {
    enabled: pokemonID.length > 0,
  });

  if (isSuccess) {
    return <div className="container">{pokemon.name}</div>;
  }

  if (isLoading) {
    return <div className="center">Loading...</div>;
  }

  if (isError) {
    return (
      <div className="center">
        We couldnt find your pokemon{" "}
        <span role="img" aria-label="sad">
          😢
        </span>
      </div>
    );
  }

  return <></>;
};

export default Pokemon;
