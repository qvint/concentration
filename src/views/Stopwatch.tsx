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

import React, { FunctionComponent, useEffect, useReducer } from 'react';
import { formatElapsed, StopwatchContainer } from './styled/Stopwatch';

export const Stopwatch: FunctionComponent<{
  startedAt: number;
  stoppedAt: number;
}> = ({ startedAt, stoppedAt }) => {
  const [, forceUpdate] = useReducer(x => x + 1, 0);

  useEffect(() => {
    if (stoppedAt >= 0) {
      return;  // No need to auto-refresh the component.
    } else {
      const handle = setInterval(forceUpdate, 1000);
      return () => clearInterval(handle);
    }
  }, [stoppedAt]);

  const effectiveStoppedAt = stoppedAt >= 0 ? stoppedAt : Date.now();
  const elapsed = effectiveStoppedAt - startedAt;
  const formatted = formatElapsed(elapsed);

  return <StopwatchContainer>{formatted}</StopwatchContainer>;
};
