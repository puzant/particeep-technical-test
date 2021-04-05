import React from 'react'
import styled from 'styled-components'
import ThumbUpAlt from '@material-ui/icons/ThumbUpAlt'
import ThumbDown from '@material-ui/icons/ThumbDown'
import Delete from '@material-ui/icons/Delete'
import { Block, BlockGroup } from './layout/block'

export const Movie = ({ movie, onDelete, onLike, liked }) => {

  const totalRating = movie.likes + movie.dislikes
  const totalLikes = movie.likes / totalRating * 100

  return (
    <Root>
      <img src='https://cinemaone.net/images/movie_placeholder.png' />
      
      <Block justify='space-between' gap={10}>
        <MovieTitle>{movie.title}</MovieTitle>
        <span>{movie.category}</span>

        <BlockGroup layout='vertical'>
          <Block layout='horizontal' justify='space-between' gap={30}>
            <LikesRatioContaienr layout='horizontal' align='center' gap={5}>
              <ThumbUpAlt />
              <span>{movie.likes}</span>
            </LikesRatioContaienr>
            <LikesRatioContaienr layout='horizontal' align='center' gap={5}>
              <span>{movie.dislikes}</span>
              <ThumbDown /> 
            </LikesRatioContaienr>
          </Block>
          <Ratio>
            <LikesBar totalLikes={totalLikes} />
          </Ratio>
        </BlockGroup>

        <Block layout='horizontal' justify='space-between'>
          
          <LikeButtonContainer onClick={() => onLike(movie.id)}>
            {liked ? <ThumbDown color='secondary' /> : <ThumbUpAlt color='primary' />}
          </LikeButtonContainer>

          <DeleteButtonContainer onClick={() => onDelete(movie.id)}>
            <Delete color='secondary' />
          </DeleteButtonContainer>
        </Block>
        
      </Block>
      
    </Root>
  )
}

const Root = styled(Block)`
  background: #dfd1d1;
  box-shadow: -2px 2px 20px -1px #000000;
  border-radius: 5px;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  padding: 10px;
  margin: 18px;
  height: auto;
  gap: 5px;
`

const MovieTitle = styled.div`
  font-weight: 500;
  font-size: 16px;
`

const DeleteButtonContainer = styled.div`
  &:hover {
    cursor: pointer;
  }
`

const LikeButtonContainer = styled.div`
  &:hover {
    cursor: pointer;
  }
`

const Ratio = styled.div`
  height: 2.5px;
	width: 100%;
	background: #606060;
	position: relative; 
  display: flex;
  flex-direction: row;
`

const LikesBar = styled.div`
  position: absolute;
	background: #53a7ff;
	height: inherit;
  width: ${props => props.totalLikes && props.totalLikes + "%"};
`

const LikesRatioContaienr = styled(Block)`
`