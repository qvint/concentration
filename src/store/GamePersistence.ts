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

import { DeepPartial, Middleware } from 'redux';
import { GameState } from './GameState';

const storageKey = 'concentration.000';

type GamePersistenceMiddleware = Middleware<{}, GameState> & {
  preloadedState: DeepPartial<GameState>;
};

export function createGamePersistenceMiddleware(
    storage: Storage,
): GamePersistenceMiddleware {
  const middleware: GamePersistenceMiddleware = api => next => action => {
    const prevBestResults = api.getState().bestResults;
    next(action);
    const nextBestResults = api.getState().bestResults;

    if (prevBestResults !== nextBestResults) {
      writeToStorage(storage, storageKey, nextBestResults);
    }
  };

  middleware.preloadedState = {
    bestResults: readFromStorage(storage, storageKey, []),
  };

  return middleware;
}

function readFromStorage<T>(storage: Storage, key: string, defaultValue: T): T {
  try {
    const rawValue = storage.getItem(key);
    if (rawValue === null)
      return defaultValue;
    return JSON.parse(rawValue);
  } catch (error) {
    return defaultValue;
  }
}

function writeToStorage<T>(storage: Storage, key: string, value: T): void {
  storage.setItem(storageKey, JSON.stringify(value));
}
