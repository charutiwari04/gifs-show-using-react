import React, { Component } from 'react';
import axios from 'axios';

class Gif extends Component {
  constructor(props){
    super(props);
    this.state = {
      isHovered: false
    }
    this.handleHover = this.handleHover.bind(this);
  }
  handleHover(e) {
    this.setState(function(){
      return {
        isHovered: !this.state.isHovered
      }
    })
  }
  render() {
    return(
      <div id={this.props.idval}>
        {this.state.isHovered ?
          <img src={this.props.playUrl} alt={this.props.altval} key={this.props.keyval} width="200" height="200" onMouseOver={this.handleHover} onMouseLeave={this.handleHover}/>
          :
          <img src={this.props.stillUrl} alt={this.props.altval} key={this.props.keyval} width="200" height="200" onMouseOver={this.handleHover} onMouseLeave={this.handleHover}/>
        }
      </div>
    )
  }
}
function Gifs(props) {
  var result = props.gifs;
  let gifsD = [];
  if(result.length>0){
    for(var i=0; i<6; i++){
      if(i===2){
        gifsD.push(
          <div className="gifs-block">
            <Gif idval="id1" altval="gif1" keyval={result[0].id} playUrl={result[0].images.fixed_height.url} stillUrl={result[0].images.fixed_height_still.url}/>
            <div id="twoblock">
              <Gif idval="id2" altval="gif2" keyval={result[1].id} playUrl={result[1].images.fixed_height.url} stillUrl={result[1].images.fixed_height_still.url}/>
              <Gif idval="id3" altval="gif3" keyval={result[2].id} playUrl={result[2].images.fixed_height.url} stillUrl={result[2].images.fixed_height_still.url}/>
            </div>
          </div>
        )
      }
     if(i===5){
        gifsD.push(
          <div className="gifs-block">
            <Gif idval="id4" altval="gif4" keyval={result[3].id} playUrl={result[3].images.fixed_height.url} stillUrl={result[3].images.fixed_height_still.url}/>
            <Gif idval="id5" altval="gif5" keyval={result[4].id} playUrl={result[4].images.fixed_height.url} stillUrl={result[4].images.fixed_height_still.url}/>
            <Gif idval="id6" altval="gif6" keyval={result[5].id} playUrl={result[5].images.fixed_height.url} stillUrl={result[5].images.fixed_height_still.url}/>
          </div>
        )
      }
    }
  }
  return(
    <div className="gifs-container">
      {gifsD}
    </div>
  )
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchKey: '',
      resultData: []
    }
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(e){
    var val = e.target.value;
    this.setState(function(){
      return {
        searchKey: val
      }
    })
    axios.get(`http://api.giphy.com/v1/gifs/search?q=${val}&limit=6&api_key=JfHGhTAPMFvvp8ClKHre5ubmmlrmWv0A`)
            .then(function(response){
              this.setState(function(){
                return {
                  resultData: response.data.data
                }
              })
            }.bind(this))
            .catch(
                error => {
                    console.log('Error fetching and parsing data', error.message);
            });

  }

  render() {
    var results = this.state.resultData;
    return (
      <div>
      <header>
        <h1>GIFS</h1>
      </header>
      <div className="container">
        <input
          type="text"
          placeholder="Search"
          value={this.state.searchKey}
          onChange={this.handleChange}
          autoComplete='off'
        />
        {results && results.length>0 ?
          <Gifs gifs={results} />
          :
          <p>Sorry, No GIFs match your search.</p>
        }
        
      </div>
      </div>
    );
  }
}

export default App;
