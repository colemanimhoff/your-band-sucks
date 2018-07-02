import React from 'react'
import { Row, Col, Card, Modal, Icon } from 'react-materialize'
import EditAlbumForm from './EditAlbumForm'

const deleteUrl = 'https://your-band-sucks.herokuapp.com/albums/'

class UserDicograpy extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            userAlbums: [],
            edit: false,
            error: false,
        }
    }

    componentDidMount() {
        this.setState({ userAlbums: this.props.userAlbums })
    }

    toggleEditForm = () => {
        this.setState({ edit: !this.state.edit })
    }

    deleteAlbum = (id) => {
        if (window.confirm('Are you sure you wish to delete this album?')) {
            let fullDeteleUrl = deleteUrl.concat(id)
            return fetch(fullDeteleUrl, {
                method: 'DELETE',
            })
                .then(response => response.json())
                .then(album => this.props.handleAlbumUpdate(album))
                .catch(error => {
                    error
                        ? this.setState({ error: true })
                        : this.setState({ error: false })
                })
        }
    }

    render() {
        return (
            <Row>
                {this.state.userAlbums.filter(album => album.users_id === parseInt(localStorage.id, 10))
                    .map((album => {
                        return (
                            < Col s={12} m={6} l={4} key={album.album} >
                                <Card className="large" onClick={this.getAlbumInfo}>
                                    <Modal fixedFooter trigger={
                                        <img className="album" src={album.imgUrl} alt={album.album}></img>}>
                                        {this.state.edit === false
                                            ?
                                            <div>
                                                <div className="button-row modal-links">
                                                    <div className="album-links">
                                                        <Icon className="edit">edit</Icon>
                                                        <a onClick={this.toggleEditForm} className="edit">Edit Album</a>
                                                    </div>
                                                    <div className="album-links">
                                                        <Icon className="delete">delete_forever</Icon>
                                                        <a onClick={() => this.deleteAlbum(album.id)}
                                                            className="delete">Delete Album</a>
                                                    </div>
                                                </div>
                                                <div className="album-modal-container">
                                                    <img className="album-modal"
                                                        src={album.imgUrl} alt={album.album}></img>
                                                    <ul>
                                                        <li>Album: {album.album}</li>
                                                        <li>Artist: {album.artist}</li>
                                                        <li>Genre: {album.genre}</li>
                                                        <li>Release Date: {album.year}</li>
                                                        <li>Label: {album.label}</li>
                                                    </ul>
                                                </div>
                                            </div>
                                            :
                                            <EditAlbumForm toggleEditForm={this.toggleEditForm} album={album} handleAlbumUpdate={this.props.handleAlbumUpdate} />}
                                    </Modal>
                                </Card>
                            </Col>
                        )
                    }))}
            </Row>
        )
    }
}

export default UserDicograpy