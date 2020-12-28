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

import styled from 'styled-components';
import { Content } from './Content';

export const GameLayout = styled.div`
  display: flex;
`;

export const GameArea = styled.div`
  position: relative;
`;

export const GameAreaOverlay = styled.div`
  font-size: 110%;

  border-radius: 3px;

  background-color: hsl(217, 0%, 100%);
  border: 1px solid hsl(217, 25%, 80%);
  box-shadow: 0 2px 3px 0 hsla(217, 20%, 40%, .2);

  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  display: flex;

  > ${Content} {
    margin: auto;
  }
`;

export const GameSidebar = styled.div`
  margin-left: 32px;
  width: 200px;

  display: flex;
  flex-direction: column;
`;

export type GameSidebarSectionProps = {
  expand?: boolean;
};

export const GameSidebarSection = styled.div.attrs((
    { expand }: GameSidebarSectionProps,
) => ({
  className: expand ? 'expand' : null,
}))<GameSidebarSectionProps>`
  & + & {
    margin-top: 16px;
  }

  &.expand {
    flex-grow: 1;
  }
`;
