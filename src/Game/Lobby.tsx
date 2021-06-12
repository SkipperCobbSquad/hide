import { useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import styled from "styled-components";
import { useDispatch } from 'react-redux'
import {setGame,GameState} from '../gameSlice'

import { socket } from "../index";

const MainLobby = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
export const Lobby = () => {
  let { id }: { id: string } = useParams();
  const dispatch = useDispatch()
  const history = useHistory();
  useEffect(() => {
    socket.emit("joinGame", id, (data: any) => {
      console.log(data)
      const pop :GameState = {
        name: data.name,
        closeZoneRadius: data.closeZoneRadius,
        fullZoneRadius: data.fullZoneRadius,
        gameIsPublic: data.gameIsPublic,
        joinPlayer: data.joinPlayer,
        maxGameTime: data.maxGameTime,
        maxPlayers: data.maxPlayers,
        position: data.position,
        timeToHide: data.timeToHide
      }
      console.log(pop)
      dispatch(setGame(pop))
    });
    (async () => {
      socket.once("choice", (data: string) => {
        console.log(data);
        history.push(`/game/choice/${data}`);
      });
    })();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <MainLobby>
      <p>Czekanie na rozpoczęcie...</p>
    </MainLobby>
  );
};
