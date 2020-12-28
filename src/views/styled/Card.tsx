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
import { CardState } from '../../store/GameState';

const predefinedSymbols = [
  'https://twemoji.maxcdn.com/svg/1f600.svg',  // 😀
  'https://twemoji.maxcdn.com/svg/1f60e.svg',  // 😎
  'https://twemoji.maxcdn.com/svg/1f480.svg',  // 💀
  'https://twemoji.maxcdn.com/svg/1f4a9.svg',  // 💩
  'https://twemoji.maxcdn.com/svg/1f48b.svg',  // 💋
  'https://twemoji.maxcdn.com/svg/1f46e.svg',  // 👮
  'https://twemoji.maxcdn.com/svg/1f451.svg',  // 👑
  'https://twemoji.maxcdn.com/svg/1f649.svg',  // 🙉
  'https://twemoji.maxcdn.com/svg/1f431.svg',  // 🐱
  'https://twemoji.maxcdn.com/svg/1f427.svg',  // 🐧
  'https://twemoji.maxcdn.com/svg/1f339.svg',  // 🌹
  'https://twemoji.maxcdn.com/svg/1f30e.svg',  // 🌎
  'https://twemoji.maxcdn.com/svg/1f355.svg',  // 🍕
  'https://twemoji.maxcdn.com/svg/1f37a.svg',  // 🍺
  'https://twemoji.maxcdn.com/svg/1f5fd.svg',  // 🗽
  'https://twemoji.maxcdn.com/svg/1f69c.svg',  // 🚜
  'https://twemoji.maxcdn.com/svg/1f4b0.svg',  // 💰
  'https://twemoji.maxcdn.com/svg/1f52a.svg',  // 🔪
];

export const Card = styled.div.attrs((props: CardState) => ({
  className: props.mode,
  style: {
    backgroundImage: `url(${predefinedSymbols[props.symbol]})`,
  },
}))<CardState>`
  width: 64px;
  height: 64px;
  position: relative;

  // Hide the background-image.
  //
  // We need background-image here so that
  // the :after pseudo-element could inherit it.
  //
  background-size: 0;

  &:before, &:after {
    content: '';
    display: block;

    transition-duration: 300ms;
    transition-property: transform, opacity, background-color;

    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;

    border-radius: 3px;
    border: 1px solid;
  }

  &:before {
    background-color: hsl(217, 25%, 80%);
    border-color: transparent;
  }

  &:after {
    background-color: hsl(217, 25%, 100%);
    background-position: center;
    background-size: 40px;
    background-repeat: no-repeat;
    background-image: inherit;
    border-color: hsl(217, 25%, 70%);
  }

  &:hover:before {
    background-color: hsl(217, 25%, 70%);
  }

  &.opened, &.hidden {
    &:before {
      opacity: 0;
      transform: rotateY(-180deg);
    }

    &:after {
      opacity: 1;
      transform: rotateY(0deg);
    }
  }

  &.opened {
    &:after {
      box-shadow: 0 0 0 1px hsl(217, 25%, 70%) inset;
    }
  }

  &.closed {
    &:before {
      opacity: 1;
      transform: rotateY(0deg);
    }

    &:after {
      opacity: 0;
      transform: rotateY(180deg);
      background-size: 0;
    }
  }

  &.hidden {
    &:after {
      background-size: 0;
      border-style: dashed;
    }
  }
`;
