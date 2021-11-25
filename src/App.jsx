import { Switch, Route } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import Loader from 'react-loader-spinner';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import AppBar from './components/AppBar/AppBar';
import Container from './components/Container/Container';

const HomePage = lazy(() =>
  import('./pages/HomePage/HomePage.jsx' /*webpackChunkName: "HomePageLazy"*/),
);

const MoviesPage = lazy(() =>
  import(
    './pages/MoviesPage/MoviesPage.jsx' /*webpackChunkName: "MoviesPageLazy"*/
  ),
);

const MovieDetailsPage = lazy(() =>
  import(
    './pages/MovieDetailsPage/MovieDetailsPage.jsx' /*webpackChunkName: "MovieDetailsPageLazy"*/
  ),
);

const loader = (
  <Loader
    type="Puff"
    color="#00BFFF"
    height={100}
    width={100}
    timeout={3000}
    style={{ textAlign: 'center', marginTop: '100px' }}
  />
);

function App() {
  return (
    <Suspense
      fallback={
        <>
          <h1>loader ... </h1>
        </>
      }
    >
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
    </Suspense>
  );
}

export default App;
