import { Principal } from "./Principal";
import { useState, useEffect } from "react";
import {
  GetDataFromApi,
  GetDataFromApibyName,
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
    async function dummy() {
      setFail(false);

        const characterArray = await GetDataFromApi();

        setData(characterArray);
        SetLS("characterArray", characterArray);

    }
    dummy();
  }, [valueName]); //con dependencia del valor del input

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
