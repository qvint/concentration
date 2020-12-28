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

export const Content = styled.div`
  line-height: 1.35;

  a {
    text-decoration: underline;

    &:hover {
      text-decoration: none;
    }
  }

  h2 {
    margin: 1ex 0;
  }

  p, ul {
    margin: .5ex 0;
  }

  li {
    margin: .3ex 0;
  }

  > :first-child {
    margin-top: 0;
  }

  > :last-child {
    margin-bottom: 0;
  }

  h2 {
    font-weight: bold;
    font-size: 120%;
  }
`;
