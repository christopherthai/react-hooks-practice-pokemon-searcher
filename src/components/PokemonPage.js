import React, { useState, useEffect } from "react";
import PokemonCollection from "./PokemonCollection";
import PokemonForm from "./PokemonForm";
import Search from "./Search";
import { Container } from "semantic-ui-react";
import { render } from "react-dom";

function PokemonPage() {
  const [pokemon, setPokemon] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetch("http://localhost:3001/pokemon")
      .then((response) => response.json())
      .then((data) => setPokemon(data));
  }, []);


  const handleAddPokemon = (newPokemon) => {
    setPokemon([...pokemon, newPokemon]);
  }

  const handleSearchChange = (event) => {
    setSearch(event.target.value);
  }

  const pokemonToDisplay = pokemon.filter((poke) => {
    return poke.name.toLowerCase().includes(search.toLowerCase());
  });


  return (
    <Container>
      <h1>Pokemon Searcher</h1>
      <br />
      <PokemonForm onAddPokemon={handleAddPokemon}/>
      <br />
      <Search search={search} onChangeSearch={handleSearchChange} />
      <br />
      <PokemonCollection pokemon={pokemonToDisplay} />
    </Container>
  );
}

export default PokemonPage;
