import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import styled from "styled-components";
import { transform } from "ol/proj";

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
  margin-top: 30px;
  color: #8ecae6;
  background: ${(props: any) => (props.dis ? "grey" : "#023047")};
  border-radius: 10px;
`;

export const Choice = () => {
  let { choice }: { choice: string } = useParams();
  const [disable, setDisable] = useState<boolean>(false);
  const history = useHistory();
  useEffect(() => {
    (async () => {
      socket.once("ready", (data: any) => {
        // history.push("/game");
      });
    })();
    return () => {};
  }, []);
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
          <HideDiv onClick={disable ? null : setHide} dis={disable}>
            <p>Schowałem się</p>
          </HideDiv>
        </>
      )}
    </MainChoice>
  );
};
