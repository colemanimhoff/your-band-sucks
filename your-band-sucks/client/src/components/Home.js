import React from 'react'
import Filter from './Filter'
import Discography from './Discography'

const Home = (props) => {
    const { isLoaded } = props
    return (
        <main>
            <section className="slogan">
                {props.isLoggedIn === false
                    ?
                    <React.Fragment>
                        <h2>Sharing Music Through Bad Album Covers</h2>
                        <ul>
                            <li>Sign Up Or Log-In To Add Your Own Albums</li>
                            <li>Click On An Album To Learn More</li>
                            <li>&darr; Filter Albums Below &darr;</li>
                        </ul>
                    </React.Fragment>
                    :
                    <React.Fragment>
                        <h2>Welcome Back!</h2>
                        <ul>
                            <li>Go To Your Profile To Submit Albums</li>
                            <li>Click On An Album To Learn More</li>
                            <li>&darr; Filter Albums Below &darr;</li>
                        </ul>
                    </React.Fragment>
                }

            </section>
            <Filter handleFilters={props.handleFilters} />
            {isLoaded
                ?
                <Discography className="discography"
                    albums={props.albums}
                    isLoggedIn={props.isLoggedIn} />
                :

                <h3 className="load-bar">
                    <span className="main-title2 main-title4">LOA</span>
                    <span className="main-title3">D</span>
                    <span className="main-title2">ING...</span>
                </h3>
            }
        </main>
    )
}

export default Home