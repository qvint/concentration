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

import React, { FunctionComponent, MouseEventHandler } from 'react';
import { CardState } from '../store/GameState';
import { BoardContainer } from './styled/Board';
import { Card } from './styled/Card';

export type BoardProps = {
  readonly cardStates: ReadonlyArray<CardState>;
  readonly numColumns: number;
  readonly onCardClick: (index: number) => void;
};

export const Board: FunctionComponent<BoardProps> = (
    { cardStates, numColumns, onCardClick },
) => {
  const onContainerClick: MouseEventHandler<HTMLDivElement> = ({ target }) => {
    if (target instanceof HTMLElement) {
      const index = target.dataset['index'];
      if (typeof index === 'string')
        onCardClick(parseInt(index, 10));
    }
  };

  return (
      <BoardContainer numColumns={numColumns} onClick={onContainerClick}>
        {cardStates.map((cardState, index) => (
            <Card key={index} {...cardState} data-index={index}/>
        ))}
      </BoardContainer>
  );
};
