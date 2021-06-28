function GetDataFromApi() {
  const ENDPOINT = "https://rickandmortyapi.com/api/character";
  return fetch(ENDPOINT)
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

function GetDataFromApiFiltered(name, species) {
  console.log(name, species);

  const ENDPOINT = "https://rickandmortyapi.com/api/character/"; //?name=&species=

  let url = ENDPOINT + "?";

  if( name !== "" ) {
    url += "name="+name;
  }

  if( name !== "" && species !== "" ) {
    url += "&";
  } 

  if( species !== "" ) {
    url += "species="+species;
  }

  console.log("URL:", url);

  return fetch(url)
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
    )
    .catch( (error) => {
      return [];
    })

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

export { GetDataFromApi, GetDataFromApiFiltered, GetDataFromApibyName };
