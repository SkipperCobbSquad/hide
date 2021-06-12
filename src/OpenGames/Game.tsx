import { useHistory } from "react-router-dom";
import styled from "styled-components";

export interface GameCardInterface {
  title: string;
  link: string;
}

const GameCard = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 5vh;
  border: 1px solid #000;
  border-radius: 10px;
  margin: 5px 10px;
  padding: 10px;
`;

const TitleCard = styled.p`
  margin: 0;
  padding: 0;
`;

const UsersIn = styled.p`
  margin: 0;
  padding: 0;
  font-size: 20px;
`;

export const Game = (props: GameCardInterface) => {
  const history = useHistory();
  return (
    <GameCard>
      <TitleCard>{props.title}</TitleCard>
      <UsersIn onClick={()=>{
        history.push(`/game/joinGame/${props.link}`)
      }}>
        <i className="icofont-login"></i>
      </UsersIn>
    </GameCard>
  );
};
