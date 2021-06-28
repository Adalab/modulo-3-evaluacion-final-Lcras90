const ENDPOINT = "https://rickandmortyapi.com/api/character";
const charactersList = [];

async function fetchPage(response)  {
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
    const nextResponse = await fetch(response.info.next);
    const nextResponseJson = await nextResponse.json();
    const newResults = await fetchPage( nextResponseJson );
    return newResults;

    /*
    .then((response) => response.json())
    .then( fetchPage );
    */
  }
  else {
    return charactersList;
  }
  
}

async function GetDataFromApi() {
/*
  return fetch(ENDPOINT)
    .then((response) => response.json())
    .then( fetchPage );
*/
  const response = await fetch(ENDPOINT);
  const responseJson = await response.json();
  return await fetchPage( responseJson );
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

/*
  EJEMPLO Clousure
*/

function functionClousure() {
  const dataPrivate = "Hola Lucia y Maria";

  return function() {
    console.log("Estoy dentro de la clousure");
    console.log("Este es mi mensaje secreto: ", dataPrivate);
  }
}

const retorno = functionClousure();

retorno();

/* ---- */

export { GetDataFromApi, GetDataFromApibyName };
