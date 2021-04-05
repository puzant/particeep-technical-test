import React, { useEffect } from  'react'
import styled from 'styled-components'
import { Movie } from './movie'
import { Pagination } from './pagination'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import api from '../api/api'
import { Block, BlockGroup } from './layout/block'

export const Movies = () => {
  
  const [movies, setMovies] = React.useState([])

  useEffect(() => {
    const fetchMovies = async () => {
      const res = await api.getMovies()
      setMovies(res.data)
    }
    fetchMovies()
  }, [])

  const [likes, setLikes] = React.useState([])
  const [selectedCategories, setSelectedCategories] = React.useState([])
  const [currentPage, setCurrentPage] = React.useState(1)
  const [moviesPerPage, setMoviesPerPage] = React.useState(4)

  const indexOfLastMovie = currentPage * moviesPerPage
  const indexOfFirstMovie = indexOfLastMovie - moviesPerPage
  const currentMovies = movies.slice(indexOfFirstMovie, indexOfLastMovie)

  const moviesCategories = movies?.map(movie => movie.category)
  const movieCategoryFilters = [...new Set(moviesCategories)]

  const notifyDelete = (deletedMovie) => toast(`You deleted ${deletedMovie.title}!`);

  const handleDelete = (movieId) => {
    setMovies(
      movies.filter((movie) => movie.id !== movieId)
    )
    notifyDelete(movies.find(movie => movie.id === movieId))
  }

  const handleLike = (movieId) => {
    if (likes.includes(movieId)) {
      return setLikes(likes.filter((likedId) => likedId !== movieId))
    }
    setLikes((prevState) => [...prevState, movieId])
  }

  const handleFilterByCategory = (category) => {
    setSelectedCategories((prevState) => [...prevState, category])
    return setMovies(
      movies.filter(movie => movie.category === category)
    )
  }

  const handlePagination = (pageNumber) => setCurrentPage(pageNumber)

  const handleOnNextClick = () => {
    if (currentPage === Math.ceil(movies.length / moviesPerPage)) return 
    setCurrentPage(currentPage+1) 
  }

  const handleOnPreviousClick = () => {
    if (currentPage === 1) return
    setCurrentPage(currentPage-1) 
  }

  const handleSettingItemspersPgae = (e) => {
    setMoviesPerPage(e.target.value)
  }

  return (
    <Root>
      <Title>Featured Movies</Title>

      <BlockGroup layout='horizontal' justify='space-between' gap={10} marginTop={10}>

        <Block layout='horizontal' align='center'>
          <FilterTitle>Filter by Category</FilterTitle>
            <CategoriesContainer layout='horizontal'>
              {movieCategoryFilters.map((category, index) => (
                <Category
                  selectedCategory={selectedCategories.includes(category)}
                  key={index}
                  onClick={() => handleFilterByCategory(category)}
                >
                  {category}
                </Category>
              ))}
            </CategoriesContainer>
        </Block>

        <Block layout='horizontal' align='center' gap={5}>
          <SelectorTitle>Movies per page</SelectorTitle>
          <CustomSelect onChange={handleSettingItemspersPgae} name="movies per page">
            <option value="2">2</option>
            <option value="4">4</option>
            <option value="8">8</option>
            <option value="10">10</option>
          </CustomSelect>
        </Block>

      </BlockGroup>
        
      <Block layout='horizontal' justify='center' wrap>
        {currentMovies?.map((movie) => (
          <Movie
            liked={likes.includes(movie.id)}
            key={movie.id}
            movie={movie}
            onDelete={handleDelete}
            onLike={handleLike}
          />
        ))}
      </Block>
      <ToastContainer />
        
      <Pagination
        onNextClick={handleOnNextClick}
        onPreviousClick={handleOnPreviousClick}
        moviesPerPage={moviesPerPage}
        totalMovies={movies.length}
        onPaginate={handlePagination}
      />
    </Root>
  )

}

const Root = styled.div``

const Title = styled.div`
  font-size: 24px;
  text-align: center;
  font-weight: 500;
`

const FilterTitle = styled.div`
  font-size: 20px;
  font-weight: 500;
`

const CategoriesContainer = styled(Block)``

const Category = styled.div`
  border: 1px solid #0000003b;
  color: #000000de;
  background: ${props => props.selectedCategory && '#f5f0f0'};
  margin: 4px;
  padding: 8px;
  border-radius: 15px;
  transition: .5s;
  &:hover {
    cursor: pointer;
    background: #f5f0f0;
  }
`

const CustomSelect = styled.select`
  width: 100px;
  border: 1px solid #6d6d6d;
  border-radius: 0.25em;
  padding: 0.25em 0.5em;
  font-size: 1rem;
  cursor: pointer;
  line-height: 1.1;
  background-color: #e1e0e0;
`

const SelectorTitle = styled.div`
  font-weight: 500;
  font-size: 20px;
`