import styled from "styled-components";

import { Game, GameCardInterface } from "./Game";

const GamesDiv = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  background: inherit;
  
`;

export const Games = () => {
  const dummyData: GameCardInterface[] = [
    {
      title: "Siema byku",
      current: 2,
      max: 10,
    },
    {
      title: "Hide",
      current: 10,
      max: 20,
    },
    {
      title: "Hide Me",
      current: 10,
      max: 20,
    },
    {
      title: "Hide fuckers",
      current: 10,
      max: 20,
    },
    {
      title: "Hide",
      current: 10,
      max: 20,
    },
    {
      title: "Hide",
      current: 10,
      max: 20,
    },
    {
      title: "Hide",
      current: 10,
      max: 20,
    },
    {
      title: "Hide",
      current: 10,
      max: 20,
    },
    {
      title: "Hide",
      current: 10,
      max: 20,
    },
  ];

  return (
    <GamesDiv>
      {dummyData.map((g, i) => {
        return (
          <Game key={i} title={g.title} current={g.current} max={g.max}></Game>
        );
      })}
    </GamesDiv>
  );
};
