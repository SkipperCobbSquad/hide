import React from "react";
import styled from "styled-components";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import { Home } from "./Home/Home";
import { Games } from "./OpenGames/Games";
import { CreateGame } from "./CreateGame/CreateGame";

const MainDiv = styled.div`
  display: flex;
  position: fixed;
  flex-direction: column;
  width: 100%;
  height: 100%;
  background: #dadada;
`;

const NavDiv = styled.div`
  display: flex;
  background: #4cc9f0;
  height: 5vh;
  justify-content: space-around;
  align-items: center;
  font-style: bold;
  margin: 0;
`;

const SwitchDiv = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  overflow-y: auto;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: #000;
`;

export const App = () => {
  return (
      <Router>
    <MainDiv>
        <Switch>
          <SwitchDiv>
            <Route exact path="/">
              <Home></Home>
            </Route>
            <Route exact path="/createGame" component={CreateGame}>
            </Route>
            <Route exact path="/openGames">
              <Games></Games>
            </Route>
          </SwitchDiv>
        </Switch>
        <NavDiv>
          <StyledLink to="/">
            <i className="icofont-ui-home icofont-2x"></i>
          </StyledLink>
          <StyledLink to="/createGame">
            <i className="icofont-ui-add icofont-2x"></i>
          </StyledLink>
          <StyledLink to="/openGames">
            <i className="icofont-navigation-menu icofont-2x"></i>
          </StyledLink>
        </NavDiv>
    </MainDiv>
      </Router>
  );
};
