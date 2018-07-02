import React from 'react'
import { Row, Input, Button } from 'react-materialize'
import 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import fbAuth from '../config/Firebase'

const userUrl = 'https://your-band-sucks.herokuapp.com/users'

class Auth extends React.Component {

    state = {
        showSignUp: false,
        email: '',
        password: '',
        error: false,
    }



    toggleAuth = () => {
        this.setState({ showSignUp: !this.state.showSignUp })
    }

    handleAuthForm = (event) => {
        this.setState({ [event.target.name]: event.target.value })
    }

    signUp = (event) => {
        let body = { username: this.state.email }
        event.preventDefault()
        fbAuth.auth().createUserWithEmailAndPassword(this.state.email, this.state.password)
            .then(() => {
                return fetch(userUrl, {
                    method: 'POST',
                    headers: new Headers({
                        'content-type': 'application/json',
                    }),
                    body: JSON.stringify(body),
                })
            })
            .then(response => response.json())
            .then(this.props.getUserId)
            .then(this.props.updateUserState())
            .catch(error => this.handleError(error))
    }

    signIn = (event) => {
        event.preventDefault()
        fbAuth.auth().signInWithEmailAndPassword(this.state.email, this.state.password)
            .then(this.props.getUserId)
            .then(this.props.updateUserState())
            .catch(error => this.handleError(error))
    }

    handleError = (error) => {
        if (error)
            this.setState({ error: true })
    }

    render() {
        const { error } = this.state
        let className = ''
        if (this.state.error === false) { className += 'modal-close' }
        return (
            <div>
                {this.state.showSignUp === false
                    ?
                    <React.Fragment>
                        <nav className="modal-links">
                            <a className="sign-up" onClick={this.toggleAuth}>Not A Member? Sign-Up</a>
                        </nav>
                        <form className="user-form">
                            <Row>
                                <Input
                                    name="email"
                                    label="Email"
                                    type="text"
                                    onChange={this.handleAuthForm} />
                                <Input
                                    name="password"
                                    label="Password"
                                    type="password"
                                    onChange={this.handleAuthForm} />
                                <Button waves='light'
                                    onClick={this.signIn}
                                    className={className}>Log In</Button>
                            </Row>
                            {error && <p className="error">Invalid Username/Password</p>}
                        </form>
                    </React.Fragment>
                    :
                    <React.Fragment>
                        <nav className="modal-links">
                            <a className="log-in" onClick={this.toggleAuth} >Back To Log-In</a>
                        </nav>
                        <form className="user-form">
                            <Row>
                                <Input
                                    name="email"
                                    label="Email"
                                    type="text"
                                    onChange={this.handleAuthForm} />
                                <Input
                                    name="password"
                                    label="Password"
                                    type="password"
                                    onChange={this.handleAuthForm} />
                                <Button waves='light'
                                    onClick={this.signUp}
                                    className={className}>Sign Up</Button>
                            </Row>
                            {error && <p>Invalid Username/Password</p>}
                        </form>
                    </React.Fragment>}
            </div>
        )
    }
}

export default Auth