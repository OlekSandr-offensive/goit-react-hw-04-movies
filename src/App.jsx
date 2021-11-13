import { Switch, Route } from 'react-router-dom';
import Loader from 'react-loader-spinner';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import AppBar from './components/AppBar/AppBar';
import Container from './components/Container/Container';
import HomePage from './components/HomePage/HomePage';
import MoviesPage from './components/MoviesPage/MoviesPage';
import MovieDetailsPage from './components/MovieDetailsPage/MovieDetailsPage';

const loader = (
  <Loader type="Puff" color="#00BFFF" height={100} width={100} timeout={3000} />
);

function App() {
  return (
    <Container loader={loader}>
      <AppBar />
      <Switch>
        <Route path="/" exact>
          <HomePage loader={loader} />
        </Route>
        <Route path="/movies" exact>
          <MoviesPage loader={loader} />
        </Route>
        <Route path="/movies/:movieId">
          <MovieDetailsPage loader={loader} />
        </Route>
      </Switch>
    </Container>
  );
}

export default App;
