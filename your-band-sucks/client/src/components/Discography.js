import React from 'react'
import { Card, Row, Col, Modal } from 'react-materialize'

class Discography extends React.Component {

    render() {
        return (
            <Row >
                {this.props.albums.map(album => {
                    return (
                        < Col s={12} m={6} l={4} key={album.album} >
                            <Card className="large">
                                <Modal trigger={<img className="album" src={album.imgUrl} alt={album.album}></img>}>
                                    <div className="album-modal-container">
                                        <img className="album-modal" src={album.imgUrl} alt={album.album}></img>
                                        <ul>
                                            <li>Album: {album.album}</li>
                                            <li>Artist: {album.artist}</li>
                                            <li>Genre: {album.genre}</li>
                                            <li>Release Date: {album.year}</li>
                                            <li>Label: {album.label}</li>
                                        </ul>
                                    </div>
                                </Modal>
                            </Card>
                        </Col>
                    )
                })}
            </Row >
        )
    }
}

export default Discography