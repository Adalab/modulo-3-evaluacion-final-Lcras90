const ENDPOINT = "https://rickandmortyapi.com/api/character";
const charactersList = [];

function fetchPage(response)  {
  const charactersOfThisPage = response.results.map((character) => {
    return {
      id: character.id,
      name: character.name,
      status: character.status,
      species: character.species,
      image: character.image,
      episode: character.episode.length,
      origin: character.origin.name,
    };
  });
  charactersList.push( ...charactersOfThisPage );

  if( response.info.next !== null ) {
    return fetch(response.info.next)
    .then((response) => response.json())
    .then( fetchPage );
  }
  else {
    return charactersList;
  }
  
}

function GetDataFromApi() {
  return fetch(ENDPOINT)
    .then((response) => response.json())
    .then( fetchPage );
}
function GetDataFromApibyName(name) {
  const ENDPOINT = "https://rickandmortyapi.com/api/character/?name=";
  return fetch(ENDPOINT + name)
    .then((response) => response.json())
    .then((response) =>
      response.results.map((character) => {
        return {
          id: character.id,
          name: character.name,
          status: character.status,
          species: character.species,
          image: character.image,
          episode: character.episode.length,
          origin: character.origin.name,
        };
      })
    );
}

export { GetDataFromApi, GetDataFromApibyName };
