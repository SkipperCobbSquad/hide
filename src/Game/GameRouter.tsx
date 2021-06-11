import { Switch, Route, useRouteMatch} from "react-router-dom";
import styled from "styled-components";

import {Lobby} from './Lobby'
import {Choice} from './Choice'
const SwitchDiv = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
`;
export const GameRouter = () => {
    let { path } = useRouteMatch();
  return (
    <SwitchDiv>
      <Switch>
          <Route exact path={`${path}/joinGame/:id`} component={Lobby}></Route>
          <Route exact path={`${path}/choice/:choice`} component={Choice}></Route>
      </Switch>
    </SwitchDiv>
  );
};
