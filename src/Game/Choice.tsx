import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import styled from "styled-components";
import { transform } from "ol/proj";
import Map from "../Map/MapWrapper";
import { Feature } from "ol";
import Circle from "ol/geom/Circle";
import LineString from 'ol/geom/LineString'

import { useAppSelector, useAppDispatch } from "../hooks";

import { socket } from "../index";

const MainChoice = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const HideDiv: any = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: 10px 30px 10px 30px;
  margin: 10px;
  color: #8ecae6;
  background: ${(props: any) => (props.dis ? "grey" : "#023047")};
  border-radius: 10px;
`;

export const Choice = () => {
  let { choice }: { choice: string } = useParams();
  const game = useAppSelector((state) => state.game);
  const [disable, setDisable] = useState<boolean>(false);
  const [futures, setFutures] = useState<Feature[]>([]);
  useEffect(() => {
    (async () => {
      socket.once("ready", (data: any) => {
        // history.push("/game");
      });
    })();
    return () => {};
  }, []);
  useEffect(() => {
    const circle = new Feature({
      geometry: new Circle(
        game.position,
        game.fullZoneRadius
      ),
    });
    setFutures([circle]);
  }, []);
  const distanceBetweenPoints = (pos1: number[], pos2: number[])=>{
    const line = new LineString([pos1, pos2])
    return Math.round(line.getLength() * 100) / 100;
  }
  const setHide = () => {
    navigator.geolocation.getCurrentPosition((pos) => {
      setDisable(true);
      socket.emit(
        "hideReady",
        transform(
          [pos.coords.longitude, pos.coords.latitude],
          "EPSG:4326",
          "EPSG:3857"
        )
      );
    });
  };
  return (
    <MainChoice>
      <p>Ty {choice === "seeker" ? "szukasz" : "się chowasz"}</p>
      {choice === "seeker" ? null : (
        <>
          <div style={{ display: "flex", flex: 1, width: "100%" }}>
            <Map
              features={futures}
            ></Map>
          </div>
          <HideDiv onClick={disable ? null : setHide} dis={disable}>
            <p>Schowałem się</p>
          </HideDiv>
        </>
      )}
    </MainChoice>
  );
};
