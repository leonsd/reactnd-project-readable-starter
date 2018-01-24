import React, { Component } from 'react'
import '../App.css'
import * as Api from '../utils/Api'

class App extends Component {
  componentDidMount() {
    Api.getCategories().then(data => {
      const categories = data
      console.log('Categories...', categories)
    })

    Api.getPosts('redux').then(data => {
      const posts = data
      console.log('Posts...', posts)

      Api.getPostDetails(posts[0]).then(data => {
        console.log('Post Details...', data)
      })
    })
  }

  render() {
    return (
      <div className="App">
        Readable
      </div>
    );
  }
}

export default App;
