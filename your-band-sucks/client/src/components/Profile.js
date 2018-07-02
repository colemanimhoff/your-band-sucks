import React from 'react'
import PostAlbumForm from './PostAlbumForm'
import { Modal, Button, Icon } from 'react-materialize'
import UserDiscography from './UserDiscography'

class Profile extends React.Component {

    render() {
        const { isLoaded } = this.props
        return (
            <main>
                <div className="slogan">
                    <h2>Your Profile</h2>
                    <h3>Share Your Bad Album Covers</h3>
                    <ul>
                        <li>Post new albums</li>
                        <li>Edit albums you posted</li>
                        <li>Delete Albums You Posted</li>
                        <li>All Entries Must Be Real Album Covers</li>
                    </ul>
                </div>
                <Modal
                    header='Add Albums'
                    trigger={<Button className="add-albums-button"><Icon>album</Icon>Add Albums Now!</Button>}>
                    <PostAlbumForm handleAlbumUpdate={this.props.handleAlbumUpdate}
                        userId={this.props.userId} />
                </Modal>
                <div className="slogan">
                    <h3>Your Albums:</h3>
                    {isLoaded
                        ?
                        <UserDiscography userAlbums={this.props.userAlbums}
                            handleAlbumUpdate={this.props.handleAlbumUpdate} />
                        :
                        <h3 className="load-bar">
                            <span className="main-title2 main-title4">LOA</span>
                            <span className="main-title3">D</span>
                            <span className="main-title2">ING...</span>
                        </h3>
                    }
                </div>
            </main>
        )
    }
}

export default Profile