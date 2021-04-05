import React from 'react'
import styled from 'styled-components'
import { Movies } from './components/movies'
import 'react-toastify/dist/ReactToastify.css'

export const App = () => {
  return (
    <Root>
      <Movies />
    </Root>
  );
}

const Root = styled.div`
  padding: 10px;
  width: 90%;
  margin: auto;
`