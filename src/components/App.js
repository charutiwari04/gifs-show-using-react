import React, { Component } from 'react';
import axios from 'axios';

function Gifs(props) {
  var result = props.gifs;
  let gifsD = [];
  if(result.length>0){
    for(var i=0; i<6; i++){
      if(i===2){
        gifsD.push(
          <div className="gifs-block">
            <div id='id1'><img src={result[0].images.fixed_height.url} key={result[0].id} alt="gif1" width="200" height="200"/></div>
            <div id="twoblock">
              <div id='id2'><img src={result[1].images.fixed_height.url} key={result[1].id} alt="gif2" width="200" height="200"/></div>
              <div id='id3'><img src={result[2].images.fixed_height.url} key={result[2].id} alt="gif3" width="200" height="200"/></div>
            </div>
          </div>
        )
      }
     if(i===5){
        gifsD.push(
          <div className="gifs-block">
            <div id='id4'><img src={result[3].images.fixed_height.url} key={result[3].id} alt="gif4" width="200" height="200"/></div>
            <div id='id5'><img src={result[4].images.fixed_height.url} key={result[4].id} alt="gif5" width="200" height="200"/></div>
            <div id='id6'><img src={result[5].images.fixed_height.url} key={result[5].id} alt="gif6" width="200" height="200"/></div>
          </div>
        )
      }
    }
    console.log(gifsD);
    //gifsD = result.map(function(gif){
      //return <Gif url={gif.images.fixed_height.url} key={gif.id} />
    //});
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
