import axios from 'axios';
export default {
	//getSearchResult: function(searchItem){
        getSearchResult : function(query) {
            var data = axios.get(`http://api.giphy.com/v1/gifs/search?q=${query}&limit=24&api_key=dc6zaTOxFJmzC`)
            .then(function(response){
                console.log(response.data.data)
                    return response.data.data
            })
            .catch(
                error => {
                    console.log('Error fetching and parsing data', error.message);
            });
            return data;
        }
    }