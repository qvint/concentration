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

export type GameState = {
  mode: 'idle' | 'playing' | 'won';
  startedAt: number;
  stoppedAt: number;
  cardStates: Array<CardState>;
  bestResults: Array<number>;
};

export type CardState = {
  readonly mode: CardMode;
  readonly symbol: number;
};

export type CardMode = 'opened' | 'closed' | 'hidden';

export const initialState: GameState = {
  mode: 'idle',
  startedAt: -1,
  stoppedAt: -1,
  cardStates: [],
  bestResults: [],
};
