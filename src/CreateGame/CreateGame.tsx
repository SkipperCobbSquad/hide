import { useState, useEffect } from "react";
import styled from "styled-components";
import { transform } from "ol/proj";

import Map from "../Map/MapWrapper";
import { Feature } from "ol";
import Circle from "ol/geom/Circle";

const CreateDiv = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
`;

const InputHolder = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  background: inherit;
  padding: 15px 20px 15px 20px;
`;

const InputTitle = styled.p`
  margin: 5px 0;
  font-weight: bold;
`;

const TextInput = styled.input`
  font-weight: bold;
  font-size: 20px;
  outline: none;
  padding: 10px;
  border: 1px dashed #4895ef;
  border-radius: 10px;
`;

export const CreateGame = () => {
  const [userCount, setUserCount] = useState<number>(2);
  const [gameTime, setgameTime] = useState<number>(5);
  const [baseRadius, setbaseRadius] = useState<number>(5);
  const [gameRadius, setgameRadius] = useState<number>(10);
  const [cord, setcord] = useState<number[]>([0,0]);
  const [features, setFeatures] = useState<Feature[]>([]);
  navigator.geolocation.getCurrentPosition((pos) =>(setcord([pos.coords.longitude, pos.coords.latitude])))
  // const updateCircle = async () => {
  //   try {
  //     await navigator.geolocation.getCurrentPosition((pos) => {
  //       // setcord([pos.coords.longitude, pos.coords.latitude]);
  //       console.log(gameRadius);
  //       const circle = new Feature({
  //         geometry: new Circle(
  //           transform(
  //             [pos.coords.longitude, pos.coords.latitude],
  //             "EPSG:4326",
  //             "EPSG:3857"
  //           ),
  //           gameRadius
  //         ),
  //       });
  //       setFeatures((state)=>{const a = state; a.push(circle); return a});
        
  //     });
  //   } catch {}
  // };

  function updateCircle(){
    console.log(gameRadius);
        const circle = new Feature({
          geometry: new Circle(
            transform(
              cord,
              "EPSG:4326",
              "EPSG:3857"
            ),
            gameRadius
          )})
          setFeatures([circle])
  }
  useEffect(() => {
    updateCircle();
    return () => {};
  }, [gameRadius]);

  //   useEffect(() => {
  //     try {
  //       navigator.geolocation.getCurrentPosition((pos) => {
  //         setcord([pos.coords.longitude, pos.coords.latitude]);
  //         console.log(gameRadius);
  //         const circle = new Feature({
  //           geometry: new Circle(
  //             transform(
  //               [pos.coords.longitude, pos.coords.latitude],
  //               "EPSG:4326",
  //               "EPSG:3857"
  //             ),
  //             gameRadius
  //           ),
  //         });
  //         setFeatures([circle]);
  //       });
  //     } catch {}
  //     //   return ()=>{ setFeatures([])}
  //   }, [gameRadius]);

  return (
    <CreateDiv>
      <InputHolder>
        <InputTitle>Nazwa Gry: </InputTitle>
        <TextInput></TextInput>
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
      </InputHolder>
      <Map features={features}></Map>
    </CreateDiv>
  );
};

//TODO: {nazwa, maxGraczy, czasgry, promieńBazy, promieńZabawy, publiczna?}
