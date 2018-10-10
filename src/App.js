import React, { Component } from 'react';
import './App.css';
import Movie from './Movie';

class App extends Component{

  // 컴포넌트가 '존재'하기 시작하면, 리액트 세계는 wiil mount -> did render -> did mount를 할 거다.

  state = {}

  // 아래를 해석해 보자면,
  // did mount 하고 나면, get movies를 할꺼다.
  // 그리고 이건 asynchronous function 인데, movies라는 variable을 갖고 있다.
  // 그리고 이 const는 value를 갖고 있다. 무엇이냐면, callApi라는 function을 awai 모드 에서!
  // await로 하는 것은, call api기능이 끝나는 것을 기다리고('끝나기를'기다리는 것. '성공적 수행'이 아니라.)
  // call api의 return value를 moives에 set할 것이다.
  // 즉, await 구문 다음에 나오는 구문은 await 함수의 작업이 끝나기 전까지는 실행되지 않을 것.
  componentDidMount(){
    this._getMovies(); 
  }

  
  // 아래에서 poster 값은 poster={movie.poster}였다. 그런데 poster를 medium_cover_image 로 바꿔야 하는 이유는,
  // 그 전에는 movie의 title값과 poster값을 직접 작성했지만
  // 지금은 _callApi에서 fetch로 api값을 가져오고,
  // 그것을 async와 await를 통해 가져오며,
  // 그것을 다시 _renderMovies에서 출력하게 된다.
  // 결국 poster의 소스는 우리가 작성한 props가 아니라 api의 정보이다.
  // 그러므로 poster의 값으로 api에 정의된 명칭을 써야한다.
  // 그것은 _renderMovies 에서 const movies 문장 아래에 console.log(movie)를 통해 나오는 정보에서 알 수 있다.
  // 그 결과 이미지 값으로 다양한 명칭이 나오고, 그 중에서 알맞는 사이즈의 명칭으로 적으면 된다.
  // console.log() 의 값으로 movies 가 아니라 movie 인 이유는
  // title={moive.title} 이나 poster={movie.poster}에서 와 같이 그 요소들의 뿌리 혹은 그 전 폴더가
  // movie 이기 때문이다.
  // 확실하지는 않다.

  _renderMovies = () => {
    const movies = this.state.movies.map(movie => {
      return <Movie 
      title={movie.title_english} 
      poster={movie.medium_cover_image} 
      key={movie.id} 
      genres={movie.genres}
      synopsis={movie.synopsis}
      />
    })
    return movies
  }

  // await는 async 함수 일 때 사용 가능하다. async를 지우면 await는 쓸 수 없다.
  _getMovies = async () => {
    const movies = await this._callApi()
    this.setState({
      movies
    })
  }

  _callApi = () => {
    return fetch('https://yts.am/api/v2/list_movies.json?sort_by=rating')
      .then(potato => potato.json())
      .then(json => json.data.movies)
      .catch(err => console.log(err))
  }

  render() {
    const { movies } = this.state
    return (
      <div className={movies ? "App" : "App--loading"}>
      {movies ? this._renderMovies() : 'Loading'}
      {/* 아래에서 movies는 array이다. 그 다음 map 기능을 통해서 새로운 array를 만드는 것이다. */}
          {/* // 여기에 새로운 array 정보를 입력. */}
        {/* 결과적으로 위의 작업은, 'movie'array를 가져다가, 맵핑을 해서(map) 새로운 array를 만드는 것. 해당 movies array 안의 엘리먼트를 활용해서!
      map을 통해 만든 Movie는 컴포넌트이다. 가져온 array의 엘리먼트를 토대로 만든 컴포넌트이다. */}
      </div>
    );
  }
}

// 위의 맵 기능에서 엘리멘트가 많아지므로 key 값을 추가해줘야 한다.
// 리액트에서는 엘리먼트가 많을 경우 key라는 것을 줘야한다.
// 위에서 map기능을 실행해서 1개의 argument "movie"를 얻게 되었다. movie는 현 싸이클의 현재 엘리먼트를 의미한다. 그리고 그 외의 다른것들은 index 라고 지정한 것. index는 우리가 현재 제공하는 리스트의 숫자를 의미한다. 그래서 key prop으로 index를 작성한 것.



export default App;
