import { GetIcon, GetIconDead } from "./GetIcon";
import PropTypes from "prop-types";
import "../styles/_characterCard.scss";

function CharacterCard({ card }) {
  return (
    <>
      <img className="img" src={card.image} alt={card.name} />
      <p className="text">Nombre: {card.name}</p>{" "}
      <p className="text">
        Especie: <GetIcon species={card.species} />
      </p>
      <p className="text">
        Status: <GetIconDead status={card.status} />{" "}
      </p>
    </>
  );
}
export { CharacterCard };

CharacterCard.propTypes = {
  name: PropTypes.string,
  status: PropTypes.object,
  species: PropTypes.object,
};
