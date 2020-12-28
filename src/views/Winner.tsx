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
import { Content } from './styled/Content';
import { formatElapsed } from './styled/Stopwatch';

export const Winner: FunctionComponent<{
  bestResults: Array<number>;
  currentResult: number;
}> = ({ bestResults, currentResult }) => (
    <Content>
      <h2>Congratulations, you did it!</h2>

      {bestResults.length > 1 && <>
        <p>Your best results so far:</p>
        <ul>
          {bestResults.map((bestResult, index) => (
              <li key={index}>
                {formatElapsed(bestResult)}
                {bestResult === currentResult && <>
                  {' '}
                  <em>(the latest one)</em>
                </>}
              </li>
          ))}
        </ul>
      </>}
    </Content>
);
