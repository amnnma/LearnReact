import useDropdown from "./userDropdown"
import React, { useState, useEffect} from "react";
import pet,{ ANIMALS } from "@frontendmasters/pet";
import Results from "./Results"
const SearchParams = () => {
  const [location, updateLocation] = useState("Seattle, WA");
  const [breeds, updateBreeds] = useState([]);
  const [animal, AnimalDropdown] = useDropdown("Animal","dog",ANIMALS);
  const [breed, BreedDropdown, updateBreed] = useDropdown("Breed","",breeds);
  const [pets, setPets] = useState([]);
  async function requestPets() {
      const { animals } =await pet.animal({
          location,
          breed,
          type: animal
      });
      setPets(animal || [])
  }
  useEffect(() => {
    updateBreeds([]);
    updateBreed("");
    pet.breeds(animal).then(({ breeds }) => {
      const breedStrings = breeds.map(({ name }) => name);
      updateBreeds(breedStrings);
    }, console.error);
  }, [animal]);
  return (
    <div className="search-params">
      <form onSubmit={e => {e.preventDefault();requestPets()}}>
        <label htmlFor="location">
          location
          <input
            id="location"
            value={location}
            placeholder="location"
            onChange={e => updateLocation(e.target.value)}
          />
        </label>
       <AnimalDropdown />
       <BreedDropdown />
        <button>Submit</button>
      </form>
      <Results pets={pets} />
    </div>
  );
};

export default SearchParams;
