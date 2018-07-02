import React from 'react'
import Auth from './Auth'
import { Navbar, NavItem, Modal } from 'react-materialize'

class Header extends React.Component {
    render() {
        const { isLoggedIn } = this.props
        return (
            <Navbar brand={
                <h1>
                    <span className="main-title1">YOUR</span>
                    <span className="main-title1">BAND</span>
                    <span className="main-title2 main-title4">S</span>
                    <span className="main-title3">U</span>
                    <span className="main-title2">CKS</span>
                </h1>} fixed={true} right>
                {isLoggedIn === false &&
                    <Modal
                        fixedFooter
                        trigger={<NavItem>Log In</NavItem>}>
                        {<Auth updateUserState={this.props.updateUserState} getUserId={this.props.getUserId} />}
                    </Modal>}
                {isLoggedIn === true && <NavItem href="/" onClick={this.props.logOut}>Log Out</NavItem>}
                <NavItem href="/">Home</NavItem>
                {isLoggedIn === true && <NavItem href="/profile">Profile</NavItem>}
                <NavItem href="/about">About</NavItem>
            </Navbar>
        )
    }
}

export default Header