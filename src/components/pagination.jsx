import React from 'react'
import styled from 'styled-components'
import ChevronRight from '@material-ui/icons/ChevronRight'
import ChevronLeft from '@material-ui/icons/ChevronLeft'

export const Pagination = ({moviesPerPage, totalMovies, onPaginate, onNextClick, onPreviousClick}) => {
  
  const pageNumbers = []
  
  for (let i=1; i<=Math.ceil(totalMovies / moviesPerPage); i++) {
    pageNumbers.push(i)
  }

  return (
    <Root>
      <PagniatiedList>
        <NextPreviousButton onClick={() => onPreviousClick()}><ChevronLeft /></NextPreviousButton>
        {pageNumbers.map((number) => (
          <NavItem onClick={() => onPaginate(number)} key={number}>
            <NavLink href="#">{number}</NavLink>
          </NavItem>
        ))}
        <NextPreviousButton onClick={() => onNextClick()}><ChevronRight /></NextPreviousButton>
      </PagniatiedList>
    </Root>
  )

}

const Root = styled.div``

const PagniatiedList = styled.div`
  margin-top: 20px;
  display: flex;
  justify-content: center;
  list-style-type: none;
  gap: 20px;
`

const NavItem = styled.li`
  border: 2px solid #fff;
  border-radius: 50%;
  padding: 15px;
  box-shadow: 5px 5px 15px 0px #858282;
`

const NavLink = styled.a`
  text-decoration: none;
  color: #111;
`

const NextPreviousButton = styled.div`
  border: 2px solid #fff;
  border-radius: 50%;
  padding: 10px;
  box-shadow: 5px 5px 15px 0px #858282;
  &:hover {
    cursor: pointer;
  }
`