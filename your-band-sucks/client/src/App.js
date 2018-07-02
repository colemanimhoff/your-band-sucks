import React, { Component } from 'react'
import './App.css'
import { BrowserRouter, Route } from 'react-router-dom'
import fbAuth from './config/Firebase'
import Header from './components/Header'
import Home from './components/Home'
import Profile from './components/Profile'
import About from './components/About'
import Footer from './components/Footer'

const albumsUrl = 'https://your-band-sucks.herokuapp.com/albums'
const userUrl = 'https://your-band-sucks.herokuapp.com/users'

class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      albums: [],
      filteredAlbums: [],
      isLoaded: false,
      loggedIn: '',
      user: '',
      id: '',
    }
  }

  getData = (url) => {
    return fetch(url)
      .then(response => response.json())
  }

  componentDidMount() {
    this._mounted = true
    if (localStorage.loggedIn === 'true') {
      this.setState(() => {
        return {
          loggedIn: true,
          user: localStorage.user,
          id: parseInt(localStorage.id, 10),
        }
      })
    } else {
      this.setState(() => {
        return {
          loggedIn: false,
          user: '',
        }
      })
    }
    return this.getData(albumsUrl)
      .then(albums => this.setState({
        albums: albums,
        filteredAlbums: albums,
        isLoaded: true,
      }))
  }
  componentWillUnmount() {
    this._mounted = false
  }

  handleFilters = (event) => {
    const filter = event.target.value
    let [date1, date2] = filter.split('-')
    let filteredAlbums = filter !== 'all'
      ? this.state.albums.filter(album => album.year >= date1 && album.year <= date2)
      : this.state.albums
    setTimeout(() => this.setState({ filteredAlbums }), 10)
  }

  updateUserState = () => {
    fbAuth.auth().onAuthStateChanged((user) => {
      if (user) {
        localStorage.setItem('loggedIn', 'true')
        localStorage.setItem('user', user.email)
        localStorage.setItem('id', this.state.id)
        this.setState({
          loggedIn: true,
          user: localStorage.user,
          id: localStorage.id,
        })
      } else {
        localStorage.setItem('loggedIn', 'false')
        localStorage.setItem('user', '')
        localStorage.setItem('id', '')
        this.setState({
          loggedIn: false,
          user: '',
          id: '',
        })
      }
    })
  }

  getUserId = () => {
    this.getData(userUrl)
      .then(users => users.filter(user => user.username === this.state.user))
      .then(user => {
        localStorage.setItem('id', user[0].id)
        this.setState({
          id: user[0].id,
          user: user[0].username,
        })
      })
      .catch(error => console.log(error))
  }


  logOut = (event) => {
    event.preventDefault()
    localStorage.removeItem('loggedIn')
    localStorage.removeItem('user')
    localStorage.removeItem('id')
    fbAuth.auth().signOut()
    this.setState({
      loggedIn: false,
      user: '',
      id: '',
    })
  }

  handleAlbumUpdate = (album) => {
    return this.getData(albumsUrl)
      .then(albums => this.setState({
        albums: albums,
        filteredAlbums: albums,
        isLoaded: true,
      }))
  }

  render() {
    return (
      <div className="App">
        <Header updateUserState={this.updateUserState}
          isLoggedIn={this.state.loggedIn}
          getUserId={this.getUserId}
          logOut={this.logOut} />
        <BrowserRouter>
          <React.Fragment>
            <Route path="/" component={() => <Home albums={this.state.filteredAlbums}
              handleFilters={this.handleFilters}
              isLoggedIn={this.state.loggedIn}
              isLoaded={this.state.isLoaded} />}
              exact />
            <Route path="/about" component={() => <About albums={this.state.albums} />} />
            <Route path="/profile"
              component={() => <Profile
                handleAlbumUpdate={this.handleAlbumUpdate}
                isLoaded={this.state.isLoaded}
                userAlbums={this.state.albums}
                userId={this.state.id} />} />
          </React.Fragment>
        </BrowserRouter>
        <Footer small="A Project By Coleman Imhoff" className="footer" />
      </div>
    )
  }
}

export default App
