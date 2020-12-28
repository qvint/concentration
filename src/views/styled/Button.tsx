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

type ButtonProps = {
  mode: 'normal' | 'destructive';
};

export const Button = styled.button.attrs((props: ButtonProps) => ({
  className: props.mode,
}))<ButtonProps>`
  font: inherit;

  &.normal {
    --button-hue: 217;
  }

  &.destructive {
    --button-hue: 0;
  }

  background-color: hsl(var(--button-hue), 0%, 100%);
  color: hsl(var(--button-hue), 85%, 40%);

  border: 2px solid hsl(var(--button-hue), 65%, 50%);
  box-shadow: 0 2px 3px 0 hsla(var(--button-hue), 20%, 40%, .2);

  padding: 1ex 1em;
  border-radius: 3px;

  &:focus {
    outline: unset;
  }

  &:hover {
    background-color: hsl(var(--button-hue), 65%, 50%);
    border-color: hsl(var(--button-hue), 65%, 50%);
    color: hsl(var(--button-hue), 0%, 100%);
  }

  &:active {
    background-color: hsl(var(--button-hue), 65%, 45%);
    border-color: hsl(var(--button-hue), 65%, 45%);
    color: hsl(var(--button-hue), 85%, 90%);
    box-shadow: 0 0 0 3px hsla(var(--button-hue), 80%, 45%, .3);
  }
`;
