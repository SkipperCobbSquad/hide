import styled from "styled-components";

export interface GameCardInterface {
  title: string;
  current: number;
  max: number;
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
  return (
    <GameCard>
      <TitleCard>{props.title}</TitleCard>
      <UsersIn>
        <i className="icofont-login"></i>
      </UsersIn>
    </GameCard>
  );
};
