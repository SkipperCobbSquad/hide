import { useHistory, useParams, useRouteMatch } from "react-router-dom";
import QRCode from "qrcode.react";
import styled from "styled-components";
import { socket } from "../index";
import { useEffect, useState } from "react";

const PrivDiv = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const StartDiv: any = styled.div`
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

export const PrivWelcome = () => {
  const [disable, setDisable] = useState<boolean>(false);
  let { id }: { id: string } = useParams();
  let { path } = useRouteMatch();
  const history = useHistory();

  useEffect(() => {
    (async () => {
      socket.once("choice", async (data: string) => {
        console.log(data);
        history.push(`/game/choice/${data}`);
      });
    })();
    return () => {};
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const startGame = () => {
    socket.emit("startGame", id, (data: string) => {
      setDisable(true);
      console.log(data);
    });
  };
  console.log(id, path);
  return (
    <PrivDiv>
      <p>Zaproś Swoich znajomych :)</p>
      <QRCode value={`http://10.10.100.9:3000/game/joinGame/${id}`}></QRCode>
      <StartDiv onClick={disable ? null : startGame} dis={disable}>
        <p style={{ margin: 0 }}>Zacznij Grę!</p>
      </StartDiv>
    </PrivDiv>
  );
};
