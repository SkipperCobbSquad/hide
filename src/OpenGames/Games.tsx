import { useEffect, useState } from "react";
import styled from "styled-components";
import {socket} from '../index'

import { Game } from "./Game";

const GamesDiv = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  background: inherit;
  
`;

export const Games = () => {
  const [data, setData] = useState<any[]>([])


  useEffect(() => {
    socket.emit('public', (data: any)=>{
      console.log(data)
      setData(data)
    })
  }, [])

  return (
    <GamesDiv>
      {data.length? data.map((g:any) => {
        return (
          <Game key={g[1]} title={g[0]} link={g[1]}></Game>
        );
      }): <Game key={1} title="No Data" link='none'></Game>}
    </GamesDiv>
  );
};
