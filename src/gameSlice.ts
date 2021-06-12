import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "./store";
export interface PlayerProp{
  name:string,
  role:string,
  isReady:boolean,
  pos:[number,number]
}

export interface GameState {
  name: string;
  closeZoneRadius: number;
  fullZoneRadius: number;
  gameIsPublic: boolean;
  joinPlayer: number;
  maxGameTime: number;
  maxPlayers: string;
  position: number[];
  timeToHide: number;
  playerAndStatus:Array<[string, PlayerProp]>
}

const initialState: GameState = {
  name: "",
  closeZoneRadius: 0,
  fullZoneRadius: 0,
  gameIsPublic: false,
  joinPlayer: 0,
  maxGameTime: 0,
  maxPlayers: "",
  position: [],
  timeToHide: 0,
  playerAndStatus: []
};

export const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    setGame: (state, action: PayloadAction<GameState>) => {
      state.name = action.payload.name;
      state.position = action.payload.position;
      state.timeToHide = action.payload.timeToHide;
      state.maxPlayers = action.payload.maxPlayers;
      state.maxGameTime = action.payload.maxGameTime;
      state.joinPlayer = action.payload.joinPlayer;
      state.gameIsPublic = action.payload.gameIsPublic;
      state.fullZoneRadius = action.payload.fullZoneRadius;
      state.closeZoneRadius = action.payload.closeZoneRadius
    },
  },
});

export const { setGame } = gameSlice.actions;
export const getGame = (state: RootState) => state.game;
export default gameSlice.reducer;
