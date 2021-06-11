import { Switch, Route, useRouteMatch } from "react-router-dom";
import styled from "styled-components";

import { CreateGame } from "./CreateGame";

const SwitchDiv = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
`;

export const CreateRouter = () => {
  let { path, url } = useRouteMatch();
  return (
    <SwitchDiv>
      <Switch>
        <Route path={`${path}/`}>
          <CreateGame></CreateGame>
        </Route>
      </Switch>
    </SwitchDiv>
  );
};
