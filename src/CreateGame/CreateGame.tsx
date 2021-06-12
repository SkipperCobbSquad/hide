import { useState, useEffect } from "react";
import styled from "styled-components";
import { socket } from "../index";
import { transform } from "ol/proj";

import Map from "../Map/MapWrapper";
import { Feature } from "ol";
import Circle from "ol/geom/Circle";
import { useHistory } from "react-router-dom";

const CreateDiv = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
`;

const InputHolder = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  background: transparent;
  padding: 15px 20px 15px 20px;
`;

const InputTitle = styled.p`
  margin: 5px 0;
  font-weight: bold;
`;

const StyleSVG = styled.svg`
    position: fixed;
    top: 30vh;
    right: -45vw;
    transform: rotate(-90deg);
    z-index: -1;
`

const TextInput = styled.input`
  font-weight: bold;
  font-size: 20px;
  outline: none;
  padding: 10px;
  background: rgba(243, 242, 242, 0.781);
  border: 1px solid #4895ef;
  border-radius: 10px;
`;

const CreateGameButt = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 10px;
  border-radius: 10px;
  background: #8cc4f2;
`;

export const CreateGame = () => {
  const [name, setName] = useState<string>("");
  const [userCount, setUserCount] = useState<number>(2);
  const [gameTime, setgameTime] = useState<number>(5);
  const [baseRadius, setbaseRadius] = useState<number>(5);
  const [gameRadius, setgameRadius] = useState<number>(10);
  const [cord, setcord] = useState<number[]>([0, 0]);
  const [features, setFeatures] = useState<Feature[]>([]);
  const history = useHistory();
  const createGame = () => {
    socket.emit(
      "createGame",
      {
        name: name,
        maxPlayers: userCount,
        maxGameTime: gameTime, //in sec
        closeZoneRadius: baseRadius,
        fullZoneRadius: gameRadius,
        gameIsPublic: true,
        position: transform(cord, "EPSG:4326", "EPSG:3857"),
      },
      (data: any) => {
        console.log(data);
        history.push(`/createGame/priv/${data}`);
      }
    );
  };
  useEffect(() => {
    navigator.geolocation.getCurrentPosition((pos) =>
      setcord([pos.coords.longitude, pos.coords.latitude])
    );
    return () => {};
  }, []);

  function updateCircle() {
    console.log(gameRadius);
    const circle = new Feature({
      geometry: new Circle(
        transform(cord, "EPSG:4326", "EPSG:3857"),
        gameRadius
      ),
    });
    setFeatures([circle]);
  }
  useEffect(() => {
    updateCircle();
    return () => {};
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gameRadius, cord]);

  return (
    <CreateDiv>
      <InputHolder>
        <StyleSVG
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 320"
        >
          <path
            fill="#8cc4f2"
            fill-opacity="1"
            d="M0,288L48,250.7C96,213,192,139,288,133.3C384,128,480,192,576,192C672,192,768,128,864,96C960,64,1056,64,1152,101.3C1248,139,1344,213,1392,250.7L1440,288L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          ></path>
        </StyleSVG>
        <InputTitle>Nazwa Gry: </InputTitle>
        <TextInput
          onChange={(e) => {
            setName(e.target.value);
          }}
          value={name}
        ></TextInput>
        <InputTitle>Maksymalna ilość osób: {userCount}</InputTitle>
        <input
          type="range"
          onChange={(e) => {
            setUserCount(+e.target.value);
          }}
          value={userCount}
          min={2}
          max={10}
        ></input>
        <InputTitle>Czas gry: {gameTime} min</InputTitle>
        <input
          type="range"
          onChange={(e) => {
            e.preventDefault();
            setgameTime(+e.target.value);
          }}
          value={gameTime}
          min={5}
          max={30}
        ></input>
        <InputTitle>Promień Gry: {gameRadius} metrów</InputTitle>
        <input
          type="range"
          onChange={(e) => {
            setgameRadius(+e.target.value);
          }}
          value={gameRadius}
          min={5}
          max={100}
          step={5}
        ></input>
        <InputTitle>Promień Bazy: {baseRadius} metrów</InputTitle>
        <input
          type="range"
          onChange={(e) => {
            setbaseRadius(+e.target.value);
          }}
          value={baseRadius}
          min={5}
          max={gameRadius - baseRadius > 0 ? gameRadius - 1 : baseRadius}
          step={5}
        ></input>
        <CreateGameButt onClick={createGame}>
          <p>Stwórz</p>
        </CreateGameButt>
      </InputHolder>
      <Map features={features}></Map>
    </CreateDiv>
  );
};

//TODO: {nazwa, maxGraczy, czasgry, promieńBazy, promieńZabawy, publiczna?}
