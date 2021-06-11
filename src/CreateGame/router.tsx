import { Switch, Route, useRouteMatch } from "react-router-dom";
import styled from "styled-components";

import { CreateGame } from "./CreateGame";
import { PrivWelcome } from "./PrivWelcome";

const SwitchDiv = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
`;

export const CreateRouter = () => {
  let { path } = useRouteMatch();
  console.log(path)
  return (
    <SwitchDiv>
      <Switch>
        <Route exact path={`${path}/`}>
          <CreateGame></CreateGame>
        </Route>
        <Route exact path={`${path}/priv/:id`} component={PrivWelcome}>
        </Route>
      </Switch>
    </SwitchDiv>
  );
};
