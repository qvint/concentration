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

import React, { FunctionComponent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import description from '../../res/description.md';
import { BOARD_SIZE, NUM_CARDS } from '../store/GameSettings';
import { gameSlice } from '../store/GameSlice';
import { CardState, GameState } from '../store/GameState';
import { Board, BoardProps } from './Board';
import { Stopwatch } from './Stopwatch';
import { Button } from './styled/Button';
import { Content } from './styled/Content';
import {
  GameArea, GameAreaOverlay, GameLayout, GameSidebar, GameSidebarSection,
} from './styled/Game';
import { Winner } from './Winner';

const dummyCardStates: ReadonlyArray<CardState> = new Array(NUM_CARDS).fill({
  mode: 'hidden',
  symbol: 0,
});

export const Game: FunctionComponent = () => {
  const { mode, startedAt, stoppedAt, cardStates, bestResults } =
      useSelector<GameState, GameState>(state => state);

  const dispatch = useDispatch();
  const gameStartRequested = () =>
      dispatch(gameSlice.actions.gameStartRequested());
  const gameStopRequested = () =>
      dispatch(gameSlice.actions.gameStopRequested());
  const cardOpenRequested = (index: number) =>
      dispatch(gameSlice.actions.cardOpenRequested({ index }));

  const effectiveCardStates = mode === 'playing' ? cardStates : dummyCardStates;

  const onCardClick: BoardProps['onCardClick'] = index => {
    if (effectiveCardStates[index].mode === 'closed')
      cardOpenRequested(index);
  };

  return (
      <GameLayout>
        <GameArea>
          <Board numColumns={BOARD_SIZE}
                 cardStates={effectiveCardStates}
                 onCardClick={onCardClick}/>
          {mode === 'won' && (
              <GameAreaOverlay>
                <Winner bestResults={bestResults}
                        currentResult={stoppedAt - startedAt}/>
              </GameAreaOverlay>
          )}
        </GameArea>

        <GameSidebar>
          <GameSidebarSection>
            {mode === 'playing' ? (
                <Button mode="destructive" onClick={gameStopRequested}>
                  Stop the game
                </Button>
            ) : (
                <Button mode="normal" onClick={gameStartRequested}>
                  {mode === 'won' ? 'Play again' : 'Start the game'}
                </Button>
            )}
          </GameSidebarSection>

          <GameSidebarSection expand>
            {mode !== 'idle' && (
                <Stopwatch startedAt={startedAt} stoppedAt={stoppedAt}/>
            )}
          </GameSidebarSection>

          <GameSidebarSection>
            <Content dangerouslySetInnerHTML={{ __html: description }}/>
          </GameSidebarSection>
        </GameSidebar>
      </GameLayout>
  );
};
