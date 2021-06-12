import React from "react";
import styled from "styled-components";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import { Home } from "./Home/Home";
import { Games } from "./OpenGames/Games";
import { CreateRouter } from "./CreateGame/router";
import { GameRouter } from "./Game/GameRouter";

import homesvg from "./home.svg";
import shuttle from "./shuttle.svg";
import plus from "./plus.svg";

const MainDiv = styled.div`
  display: flex;
  position: fixed;
  flex-direction: column;
  width: 100%;
  height: 100%;
  background: #fff
  32,;
`;

const NavDiv = styled.div`
  display: flex;
  background: #8cc4f2;
  height: 7vh;
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
            <Route path="/createGame" component={CreateRouter}></Route>
            <Route exact path="/openGames">
              <Games></Games>
            </Route>
            <Route path={"/game"} component={GameRouter}></Route>
          </SwitchDiv>
        </Switch>
        <NavDiv>
          <StyledLink to="/">
            <img
              style={{ display: "flex", width: '20px' }}
              src={homesvg}
              alt="home"
            ></img>
          </StyledLink>
          <StyledLink to="/openGames">
            <img src={shuttle} alt="shuttle" style={{ display: "flex", width: '20px' }}></img>
          </StyledLink>
          <StyledLink to="/createGame">
            <img src={plus} alt="Plus" style={{ display: "flex", width: '20px' }}></img>
          </StyledLink>
        </NavDiv>
      </MainDiv>
    </Router>
  );
};
