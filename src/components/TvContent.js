import React, { Component } from 'react';
import './MovieContent.css';
export class TvContent extends Component {
  render() {
    console.log(this.props);
    return (
      <div className='container'>
        <h1 className='title'>{this.props.name}</h1>
        <p className='overview'> {this.props.overview} </p>
        <div className='img'>
          <img
            src={'https://image.tmdb.org/t/p/w500/' + this.props.poster_path}
            alt={this.props.poster_path}
          />
        </div>

        <h2 className='vote_average'>Rating: {this.props.vote_average}</h2>
        <p className='first_air_date'>
          Premier date: {this.props.first_air_date}
        </p>
      </div>
    );
  }
}

export default TvContent;
