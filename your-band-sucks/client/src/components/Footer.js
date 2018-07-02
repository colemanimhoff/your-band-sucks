import React from 'react'

class Footer extends React.Component {
    render() {
        return (
            <footer>
                <small>
                    {this.props.small}
                </small>
            </footer>
        )
    }
}

export default Footer