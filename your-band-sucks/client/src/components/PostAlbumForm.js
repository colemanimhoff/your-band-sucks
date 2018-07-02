import React from 'react'
import { Row, Input, Button } from 'react-materialize'

const postAlbumsUrl = 'https://your-band-sucks.herokuapp.com/albums/'

class PostAlbumForm extends React.Component {

    state = {
        error: false,
        album: '',
        artist: '',
        genre: '',
        year: '',
        label: '',
        imgUrl: '',
        users_id: '',
    }

    handleUserForm = (event) => {
        this.setState({
            [event.target.name]: event.target.value,
            users_id: parseInt(localStorage.id, 10),
        })
    }

    postAlbum = (event) => {
        event.preventDefault()

        const body = {
            album: this.state.album,
            artist: this.state.artist,
            genre: this.state.genre,
            year: this.state.year,
            label: this.state.label,
            imgUrl: this.state.imgUrl,
            users_id: this.state.users_id,
        }

        return fetch(postAlbumsUrl, {
            method: 'POST',
            headers: new Headers({
                'content-type': 'application/json',
            }),
            body: JSON.stringify(body),
        })
            .then(response => response.json())
            .then(response => {
                return response.error
                    ? this.setState({ error: true })
                    : this.props.handleAlbumUpdate(response)
            })
    }

    render() {
        return (
            <form className="user-form">
                <Row>
                    <Input name="album"
                        label="Album Name (Required)"
                        type="text"
                        onChange={this.handleUserForm} />
                    <Input name="artist"
                        label="Artist Name (Required)"
                        type="text"
                        onChange={this.handleUserForm} />
                    <Input name="genre"
                        label="Genre"
                        type="text"
                        onChange={this.handleUserForm} />
                    <Input name="year"
                        label="Album Release Date (Required)"
                        type="number"
                        onChange={this.handleUserForm} />
                    <Input name="label"
                        label="Record Label"
                        type="text"
                        onChange={this.handleUserForm} />
                    <Input name="imgUrl"
                        label="Link to Image (Required)"
                        type="text"
                        onChange={this.handleUserForm} />
                    <Button onClick={this.postAlbum} waves='light'>Share</Button>
                    {
                        this.state.error === true
                            ? <p className="error">Please Complete All Required Fields</p>
                            : ''
                    }
                </Row>
            </form>
        )
    }
}

export default PostAlbumForm