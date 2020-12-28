/*
 * Copyright 2020 qvint <https://github.com/qvint>
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { NUM_BEST_RESULTS } from './GameSettings';
import { CardMode, CardState, initialState } from './GameState';

export const gameSlice = createSlice({
  name: 'game',
  initialState,

  reducers: {
    /** The user requested a new game by clicking the button. */
    gameStartRequested() {
    },

    /** The saga entered the appropriate state and started the game. */
    gameStarted(state, action: PayloadAction<{
      startedAt: number;
      cardStates: Array<CardState>;
    }>) {
      state.mode = 'playing';
      state.startedAt = action.payload.startedAt;
      state.stoppedAt = -1;
      state.cardStates = action.payload.cardStates;
    },

    /** The user wants the game to stop. */
    gameStopRequested() {
    },

    /** The saga actually stopped the game. */
    gameStopped(state, action: PayloadAction<{
      stoppedAt: number;
      reason: 'cancelled' | 'won';
    }>) {
      switch (action.payload.reason) {
        case 'cancelled':
          state.mode = 'idle';
          state.startedAt = -1;
          state.stoppedAt = -1;
          state.cardStates = [];
          break;
        case 'won':
          state.mode = 'won';
          state.stoppedAt = action.payload.stoppedAt;
          state.cardStates = [];
          state.bestResults = [
            ...state.bestResults,
            state.stoppedAt - state.startedAt,
          ].sort((a, b) => a - b).slice(0, NUM_BEST_RESULTS);
          break;
      }
    },

    /** The user decided to open a card by clicking on it. */
    cardOpenRequested(state, action: PayloadAction<{
      index: number;
    }>) {
    },

    /** The saga changed the state of the card. */
    cardModeChanged(state, action: PayloadAction<{
      index: number;
      mode: CardMode;
    }>) {
      state.cardStates[action.payload.index].mode = action.payload.mode;
    },
  },
});
