import './App.css';
import './components/MovieContent.css';
import MovieContent from './components/MovieContent';
import React, { Component } from 'react';
import TvContent from './components/TvContent';
import Tabs from './components/Tabs';

export class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movie: '',
      tv: '',
      randomMovie: '',
      randomTv: '',
      active: 'movieTab',
    };
  }

  componentDidMount = () => {
    this.handleMovieData();
    this.handleTvData();
    this.handleRandomMovie();
    this.handleRandomTv();
  };

  async handleTvData() {
    let random = Math.floor(Math.random() * (2 - 1 + 1)) + 1;
    let tvUrl = `https://api.themoviedb.org/3/discover/tv?api_key=d99ca085dcabfdf79d02b94e61ac56c4&language=en-US&timezone=America%2FNew_York&vote_average.gte=0&include_null_first_air_dates=false&page=${random}`;
    const res = await fetch(tvUrl);
    const data = await res.json();
    console.log(data);
    this.setState({
      tv: data.results,
    });
  }

  async handleRandomTv() {
    let random = Math.floor(Math.random() * (500 - 1 + 1)) + 1;
    let tvUrl = `https://api.themoviedb.org/3/discover/tv?api_key=d99ca085dcabfdf79d02b94e61ac56c4&language=en-US&timezone=America%2FNew_York&vote_average.gte=0&include_null_first_air_dates=false&page=${random}`;
    const res = await fetch(tvUrl);
    const data = await res.json();
    // console.log(data);
    this.setState({
      randomTv: data.results,
    });
  }

  async handleMovieData() {
    let random = Math.floor(Math.random() * (2 - 1 + 1)) + 1;
    let moviesUrl = `https://api.themoviedb.org/3/discover/movie?api_key=d99ca085dcabfdf79d02b94e61ac56c4&language=en-US&include_adult=false&include_video=false&vote_average.gte=0&page=${random}`;
    const res = await fetch(moviesUrl);
    const data = await res.json();
    // console.log(data);
    this.setState({
      movie: data.results,
    });
  }

  async handleRandomMovie() {
    let random = Math.floor(Math.random() * (500 - 1 + 1)) + 1;
    let moviesUrl = `https://api.themoviedb.org/3/discover/movie?api_key=d99ca085dcabfdf79d02b94e61ac56c4&language=en-US&include_adult=false&include_video=false&vote_average.gte=0&page=${random}`;
    const res = await fetch(moviesUrl);
    const data = await res.json();
    // console.log(data);
    this.setState({
      randomMovie: data.results,
    });
  }

  render() {
    console.log(this.state);
    let random = Math.floor(Math.random() * (20 - 1 + 1)) + 1;
    const content = {
      movieTab: (
        <div className='trendingMovie'>
          <MovieContent {...this.state.movie[random]} />
        </div>
      ),
      randomMovieTab: (
        <div className='randomMovie'>
          <MovieContent {...this.state.randomMovie[random]} />
        </div>
      ),
      tvTab: (
        <div className='trendingTv'>
          <TvContent {...this.state.tv[random]} />
        </div>
      ),
      randomTvTab: (
        <div className='randomTv'>
          <TvContent {...this.state.randomTv[random]} />
        </div>
      ),
    };
    console.log(content);
    return (
      <div className='App'>
        <header>
          <h1>Movie and Tv finder</h1>
          <p>
            Click on a tab to discover a new movie or tv show. The trending tabs
            contain the most popular titles of both old and new film. The random
            tabs contain over 10,000 tv and movie titles from all over the
            world. Enjoy!
          </p>
        </header>
        <main className='wrapper'>
          <Tabs
            active={this.state.active}
            onChange={(active) => this.setState({ active })}
          >
            <button className='movieTab' key='movieTab'>
              Trending Movies
            </button>
            <button className='randomMovieTab' key='randomMovieTab'>
              Random Movies
            </button>
            <button className='tvTab' key='tvTab'>
              Trending Series
            </button>
            <button className='randomTvTab' key='randomTvTab'>
              Random Series
            </button>
          </Tabs>
          <div>{content[this.state.active]}</div>
          <footer></footer>
        </main>
      </div>
    );
  }
}

export default App;
