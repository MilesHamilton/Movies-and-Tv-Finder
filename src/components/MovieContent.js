import React, { Component } from 'react';
import './MovieContent.css';

export class MovieContent extends Component {
  render() {
    console.log(this.props);
    // console.log(this.props);

    return (
      <div className='container'>
        <h1 className='title'>{this.props.title}</h1>
        <p className='overview'> {this.props.overview} </p>
        <div className='img'>
          <img
            src={'https://image.tmdb.org/t/p/w500/' + this.props.poster_path}
            alt={this.props.poster_path}
          />
        </div>

        <h2 className='vote_average'>
          Voting average: {this.props.vote_average}
        </h2>
        <p className='release_date'>Release date: {this.props.release_date}</p>
      </div>
    );
  }
}

export default MovieContent;
