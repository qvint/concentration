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
import { Game } from './Game';
import { ApplicationArea, ApplicationLayout } from './styled/Application';
import { GlobalStyle } from './styled/GlobalStyle';

export const Application: FunctionComponent = () => (
    <ApplicationLayout>
      <GlobalStyle/>
      <ApplicationArea>
        <Game/>
      </ApplicationArea>
    </ApplicationLayout>
);
