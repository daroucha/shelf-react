import {
  ActionButton,
  Alert,
  Cover,
  IconButton,
  ListComponent,
  Paginator,
  SegmentedControl,
  SvgSpinner,
  TextInput,
} from 'remaster-ui'
import AddModalContent from '../../components/Collections/AddModalContent'
import {
  CaretRight,
  Check,
  FilmReel,
  FilmStrip,
  MagnifyingGlass,
  Plus,
  TrashSimple,
  Warning,
} from '@phosphor-icons/react'
import { useEffect, useState } from 'react'
import AddModalMovieList from '../../components/Collections/AddModalMovieList'
import { useAddTitleContext } from '../../contexts/Collections/AddTitleContext'
import AddModalMovieContainer from '../../components/Collections/AddModalMovieContainer'
import { getMovieData, updatePublicTitle } from '../../services/title'
import type MovieType from '../../types/Movie'
import { createDiscDraft } from '../../services/disc'
import DiscType from '../../types/Disc'

function SingleMovie() {
  const { setDisabled, titleData, setDiscData } = useAddTitleContext()

  const defaultPlaceholder = 'Selecione um filme para continuar'

  const [placeholder, setPlaceholder] = useState(defaultPlaceholder)
  const [loading, setLoading] = useState(false)
  const [inputValue, setInputValue] = useState('')
  const [searchQuery, setSearchQuery] = useState('')
  const [movieData, setMovieData] = useState([])
  const [selected, setSelected] = useState<MovieType | null>(null)

  useEffect(() => {
    const hasSelected = !selected ? true : false
    setDisabled(hasSelected)
  }, [selected, setDisabled])

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setInputValue(event.target.value)
  }

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setSearchQuery(inputValue)
    }, 500)
    return () => clearTimeout(timeoutId)
  }, [inputValue])

  const handleSearch = async () => {
    if (searchQuery === '') {
      setLoading(false)
      setMovieData([])
      return
    }

    setLoading(true)

    try {
      const movie = await getMovieData(searchQuery)
      setMovieData(movie)
    } catch (error) {
      const err = error as Error
      setPlaceholder(err.message)
    } finally {
      setPlaceholder(defaultPlaceholder)
      setLoading(false)
    }
  }

  useEffect(() => {
    handleSearch()
  }, [searchQuery])

  const handleMovie = (movie: MovieType) => {
    setInputValue('')
    setSearchQuery('')
    setPlaceholder(defaultPlaceholder)
    setSelected(movie)

    const title = titleData!.title._id as string

    setDiscData([
      {
        title,
        externalId: movie.imdbID,
        status: 'draft',
      },
    ])
  }

  return (
    <AddModalMovieContainer>
      <TextInput
        type="text"
        placeholder="Buscar filme"
        leading={<MagnifyingGlass />}
        value={inputValue}
        onChange={handleChange}
      />

      {(!selected || movieData.length > 0) && (
        <AddModalMovieList>
          {movieData.length < 1 && (
            <AddModalMovieList.Text>
              {loading ? <SvgSpinner /> : placeholder}
            </AddModalMovieList.Text>
          )}

          {movieData.length > 0 &&
            movieData.map((movie: MovieType, key) => (
              <ListComponent
                key={key}
                title={movie.Title}
                text={movie.Year}
                leading={
                  <Cover
                    alt={movie.Title}
                    type="dvd"
                    src={movie.Poster}
                  />
                }
              >
                <IconButton
                  size="small"
                  leading={<Check />}
                  onClick={() => handleMovie(movie)}
                />
              </ListComponent>
            ))}
        </AddModalMovieList>
      )}

      {selected && movieData.length < 1 && (
        <ListComponent
          title={selected.Title}
          text={selected.Year}
          leading={
            <Cover
              alt={selected.Title}
              type="dvd"
              src={selected.Poster}
            />
          }
        >
          <IconButton
            size="small"
            leading={<TrashSimple />}
            onClick={() => setSelected(null)}
          />
        </ListComponent>
      )}
    </AddModalMovieContainer>
  )
}

function MovieCollection() {
  const { setDisabled, setDiscData, titleData } = useAddTitleContext()

  const defaultPlaceholder = 'Selecione os filmes para continuar'

  const [placeholder, setPlaceholder] = useState(defaultPlaceholder)
  const [loading, setLoading] = useState(false)
  const [inputValue, setInputValue] = useState('')
  const [searchQuery, setSearchQuery] = useState('')
  const [movieData, setMovieData] = useState([])
  const [selected, setSelected] = useState<MovieType[]>([])

  useEffect(() => {
    const hasSelected = selected.length < 1 ? true : false
    setDisabled(hasSelected)
  }, [selected, setDisabled])

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setInputValue(event.target.value)
  }

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setSearchQuery(inputValue)
    }, 500)
    return () => clearTimeout(timeoutId)
  }, [inputValue])

  const handleSearch = async () => {
    if (searchQuery === '') {
      setLoading(false)
      setMovieData([])
      return
    }

    setLoading(true)

    try {
      const movie = await getMovieData(searchQuery)
      setMovieData(movie)
    } catch (error) {
      const err = error as Error
      setPlaceholder(err.message)
    } finally {
      setPlaceholder(defaultPlaceholder)
      setLoading(false)
    }
  }

  useEffect(() => {
    handleSearch()
  }, [searchQuery])

  const handleMovie = (movie: MovieType) => {
    setInputValue('')
    setSearchQuery('')
    setPlaceholder(defaultPlaceholder)

    const updateSelected = [...selected, movie]

    setSelected(updateSelected)

    const discs = updateSelected.map((movie) => ({
      title: titleData!.title._id,
      externalId: movie.imdbID,
      status: 'draft',
    }))

    setDiscData(discs as DiscType[])
  }

  const removeMovie = (movieId: string) => {
    const updatedSelected = selected.filter(
      (movie) => movie.imdbID !== movieId
    )

    setSelected(updatedSelected)
  }

  return (
    <AddModalMovieContainer>
      <TextInput
        type="text"
        placeholder="Buscar filme"
        leading={<MagnifyingGlass />}
        value={inputValue}
        onChange={handleChange}
      />

      {(selected.length < 1 || movieData.length > 0) && (
        <AddModalMovieList>
          {movieData.length < 1 && (
            <AddModalMovieList.Text>
              {loading ? <SvgSpinner /> : placeholder}
            </AddModalMovieList.Text>
          )}

          {movieData.length > 0 &&
            movieData.map((movie: MovieType, key) => (
              <ListComponent
                key={key}
                title={movie.Title}
                text={movie.Year}
                leading={
                  <Cover
                    alt={movie.Title}
                    type="dvd"
                    src={movie.Poster}
                  />
                }
              >
                <IconButton
                  size="small"
                  leading={<Plus />}
                  onClick={() => handleMovie(movie)}
                />
              </ListComponent>
            ))}
        </AddModalMovieList>
      )}

      {selected &&
        movieData.length < 1 &&
        selected.map((movie: MovieType, key) => (
          <ListComponent
            key={key}
            title={movie.Title}
            text={movie.Year}
            leading={
              <Cover
                alt={movie.Title}
                type="dvd"
                src={movie.Poster}
              />
            }
          >
            <IconButton
              size="small"
              leading={<TrashSimple />}
              onClick={() => removeMovie(movie.imdbID)}
            />
          </ListComponent>
        ))}
    </AddModalMovieContainer>
  )
}

function AddTitle2() {
  const errorFallback = {
    status: false,
    message: '',
  }

  const [error, setError] = useState(errorFallback)

  const handleError = (message: string) => {
    setError({
      status: true,
      message,
    })
  }

  const handleTimeout = () => {
    setError(errorFallback)
  }

  const [tabsList] = useState([
    { value: 'movie', text: 'Um filme', leading: <FilmReel /> },
    {
      value: 'collection',
      text: 'Vários filmes',
      leading: <FilmStrip />,
    },
  ])

  const [activeTab, setActiveTab] = useState<'movie' | 'collection'>(
    'movie'
  )

  const { cancelModal, disabled, titleData, discData, setPage } =
    useAddTitleContext()

  const [loading, setLoading] = useState(false)

  const handleSubmit = async () => {
    setLoading(true)

    if (!titleData || !discData) {
      return
    }

    try {
      const id = titleData.title._id as string

      await updatePublicTitle(id, {
        name: titleData.title.name,
        year: titleData.title.year,
        country: titleData.title.country,
        type: activeTab,
      })

      for (let i = 0; i < discData.length; i++) {
        const disc = discData[i]
        await createDiscDraft(disc)
      }

      setPage('page-3')
    } catch (error) {
      const err = error as Error
      handleError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <AddModalContent>
      <AddModalContent.Banner></AddModalContent.Banner>

      <AddModalContent.Content>
        <AddModalContent.Title>
          Adicione o(s) filme(s) da sua edição
        </AddModalContent.Title>

        {error.status && (
          <Alert
            leading={<Warning />}
            title="Algo deu errado"
            text={error.message}
            timer={4}
            onTimeout={handleTimeout}
          />
        )}

        <AddModalContent.Body>
          <AddModalContent.Text>
            Sua edição contém...
          </AddModalContent.Text>

          <div>
            <SegmentedControl
              defaultValue={activeTab}
              onChange={(tab: 'movie' | 'collection') =>
                setActiveTab(tab)
              }
            >
              {tabsList.map((tab, key) => (
                <SegmentedControl.Tab
                  key={key}
                  text={tab.text}
                  value={tab.value}
                  leading={tab.leading}
                />
              ))}
            </SegmentedControl>
          </div>

          {activeTab === 'movie' && <SingleMovie />}

          {activeTab === 'collection' && <MovieCollection />}

          <AddModalContent.Action>
            <ActionButton
              variant="tertiary"
              size="medium"
              text="Cancelar"
              onClick={cancelModal}
            />

            <Paginator page={2}>
              <Paginator.Indicator page={1} />
              <Paginator.Indicator page={2} />
              <Paginator.Indicator page={3} />
            </Paginator>

            <ActionButton
              variant="primary"
              size="medium"
              text="Continuar"
              trailing={<CaretRight />}
              onClick={handleSubmit}
              loading={loading}
              disabled={disabled}
            />
          </AddModalContent.Action>
        </AddModalContent.Body>
      </AddModalContent.Content>
    </AddModalContent>
  )
}

export default AddTitle2
