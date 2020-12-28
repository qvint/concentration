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

import {
  call, delay, put, race, select, take, takeEvery, takeLeading,
} from 'redux-saga/effects';
import {
  FEEDBACK_TIME_MS, MEMORIZING_TIME_MS, NUM_PAIRS,
} from './GameSettings';
import { gameSlice } from './GameSlice';
import { CardMode, CardState, GameState } from './GameState';

const {
  gameStartRequested, gameStarted,
  gameStopRequested, gameStopped,
  cardOpenRequested, cardModeChanged,
} = gameSlice.actions;

export function* rootSaga() {
  yield takeLeading(gameStartRequested.type, function* () {
    yield put(gameStarted({
      startedAt: Date.now(),
      cardStates: generateCardStates(),
    }));
    yield race([call(gameSaga), take(gameStopped.type)]);
  });

  yield takeEvery(gameStopRequested.type, function* () {
    yield put(gameStopped({
      stoppedAt: Date.now(),
      reason: 'cancelled',
    }));
  });
}

function* gameSaga() {
  while (true) {
    const firstAction: ReturnType<typeof cardOpenRequested> =
        yield take(cardOpenRequested.type);

    yield put(cardModeChanged({
      index: firstAction.payload.index,
      mode: 'opened',
    }));

    const { secondAction } = (yield race({
      secondAction: take(cardOpenRequested.type),
      cancel: delay(MEMORIZING_TIME_MS),
    })) as { secondAction?: ReturnType<typeof cardOpenRequested> };

    if (!secondAction) {
      yield put(cardModeChanged({
        index: firstAction.payload.index,
        mode: 'closed',
      }));

    } else {
      yield put(cardModeChanged({
        index: secondAction.payload.index,
        mode: 'opened',
      }));
      yield delay(FEEDBACK_TIME_MS);

      let state: GameState = yield select();
      const firstSymbol = state.cardStates[firstAction.payload.index].symbol;
      const secondSymbol = state.cardStates[secondAction.payload.index].symbol;

      const nextMode: CardMode =
          firstSymbol === secondSymbol ? 'hidden' : 'closed';
      yield put(cardModeChanged({
        index: firstAction.payload.index,
        mode: nextMode,
      }));
      yield put(cardModeChanged({
        index: secondAction.payload.index,
        mode: nextMode,
      }));

      state = yield select();
      const allCardsHidden =
          state.cardStates.every(({ mode }) => mode === 'hidden');
      if (allCardsHidden)
        yield put(gameStopped({
          reason: 'won',
          stoppedAt: Date.now(),
        }));
    }
  }
}

function generateCardStates(): Array<CardState> {
  return shuffleInPlace(
      new Array(NUM_PAIRS).fill(undefined)
          .map((_, index) => new Array(2).fill({
            mode: 'closed',
            symbol: index,
          })).flat());
}

function shuffleInPlace<T>(array: Array<T>): Array<T> {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * i);
    const tmp = array[i];
    array[i] = array[j];
    array[j] = tmp;
  }
  return array;
}
