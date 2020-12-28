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

import { configureStore, Store } from '@reduxjs/toolkit';
import createSagaMiddleware, { Saga } from 'redux-saga';
import { createGamePersistenceMiddleware } from './GamePersistence';
import { rootSaga } from './GameSaga';
import { gameSlice } from './GameSlice';
import { GameState, initialState } from './GameState';

export const createGameStore = (): Store<GameState> => {
  const sagaMiddleware = createSagaMiddleware();
  const persistenceMiddleware = createGamePersistenceMiddleware(localStorage);
  const store = configureStore({
    reducer: gameSlice.reducer,
    middleware: [sagaMiddleware, persistenceMiddleware],
    preloadedState: {
      ...initialState,
      ...persistenceMiddleware.preloadedState,
    },
  });
  sagaMiddleware.run(rootSaga as Saga<any>);
  return store;
};
