import React from 'react'
import { Input, Row, Button } from 'react-materialize'

const editAlbumsUrl = 'https://your-band-sucks.herokuapp.com/albums/'

class EditAlbumForm extends React.Component {

    constructor(props) {
        super(props)
        this.state = { album: this.props.album }
    }

    handleUserForm = (event) => {
        let newAlbum = { ...this.state.album }
        newAlbum[event.target.name] = event.target.value
        this.setState({ album: newAlbum })
    }

    logState = (event) => {
        event.preventDefault()
        console.log(this.state.album)
    }

    editAlbum = (event) => {
        event.preventDefault()
        const body = {
            album: this.state.album.album,
            artist: this.state.album.artist,
            genre: this.state.album.genre,
            year: this.state.album.year,
            rlabel: this.state.album.label,
            imgUrl: this.state.album.imgUrl,
            users_id: this.state.album.users_id,
        }
        const fullUrl = editAlbumsUrl.concat(this.state.album.id)
        return fetch(fullUrl, {
            method: 'PUT',
            headers: new Headers({
                'content-type': 'application/json',
            }),
            body: JSON.stringify(body),
        })
            .then(response => response.json())
            .then(album => this.props.handleAlbumUpdate(album))
    }

    render() {
        return (
            <form className="user-form" onChange={this.handleUserForm}>
                <h4>Edit This Album</h4>
                <div className="modal-links">
                    <a onClick={this.props.toggleEditForm}>Back To Album</a>
                </div>
                <Row>
                    <Input name="album"
                        defaultValue={this.state.album.album}
                        type="text" />
                    <Input name="artist"
                        defaultValue={this.state.album.artist}
                        type="text" />
                    <Input name="genre"
                        defaultValue={this.state.album.genre}
                        type="text" />
                    <Input name="year"
                        defaultValue={this.state.album.year}
                        type="number" />
                    <Input name="label"
                        defaultValue={this.state.album.label}
                        type="text" />
                    <Input name="imgUrl"
                        defaultValue={this.state.album.imgUrl}
                        type="text" />
                    <Button onClick={this.editAlbum} waves='light'>Submit</Button>
                </Row>
            </form>
        )
    }
}

export default EditAlbumForm