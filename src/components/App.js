import { Principal } from "./Principal";
import { useState, useEffect } from "react";
import {
  GetDataFromApi,
  GetDataFromApiFiltered
} from "../service/GetDataFromApi";
import { HashRouter as Router, Switch, Route } from "react-router-dom";
import { CharacterDetail } from "./CharacterDetails";
import { Warning } from "./Warning";
import { GetLS, SetLS } from "../service/LocalStorage";
import "../styles/App.scss";

function App() {
  const [data, setData] = useState(GetLS("characterArray", []));
  const [fail, setFail] = useState(false);
  const [valueName, SetValueName] = useState(GetLS("filterName", ""));
  const [species, setSpecies] = useState(GetLS("filterSpecies", ""));

  useEffect( () => {
    console.log("Ha cambiado valueName o Species");

    GetDataFromApiFiltered( valueName, species )
    .then((characterArray) => {
      setData(characterArray);
    });

  },[valueName,species]);

  useEffect(() => {
    GetDataFromApi().then((characterArray) => {
      setData(characterArray);
      SetLS("characterArray", characterArray);
    });
  }, []); //con dependencia del valor del input

  return (
    <Router>
      <Switch>
        <Route
          path="/"
          exact
          children={
            <Principal
              data={data}
              valueName={valueName}
              onChangeName={(e) => {
                SetValueName(e.currentTarget.value);
                SetLS("filterName", e.currentTarget.value);
                /*
                                const newValue = e.currentTarget.value;
                if( myTimeout !== null ) {
                  clearTimeout(myTimeout);
                }
                myTimeout = setTimeout(() => {
                  SetValueName(newValue);
                  SetLS("filterName", newValue);
                }, 400);
                */
              }}
              onChangeSpecies={(e) => {
                setSpecies(e.currentTarget.value);
                SetLS("filterSpecies", e.currentTarget.value);
              }}
              species={species}
              fail={fail}
            />
          }
        />
        <Route
          path="/characterdetails/:id"
          children={<CharacterDetail data={data} />}
        />
        <Route path="" children={<Warning />} />
      </Switch>
    </Router>
  );
}

export { App };
