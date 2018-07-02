import React from 'react'
import { Bar } from 'react-chartjs-2'

class About extends React.Component {

    state = {
        'fifties': 0,
        'sixties': 0,
        'seventies': 0,
        'eighties': 0,
        'nineties': 0,
        'twoThousands': 0,
    }

    componentDidMount() {
        this.setState({
            'fifties': this.countDates(1950, 1959),
            'sixties': this.countDates(1960, 1969),
            'seventies': this.countDates(1970, 1979),
            'eighties': this.countDates(1980, 1989),
            'nineties': this.countDates(1990, 1999),
            'twoThousands': this.countDates(2000, 2099),
        })
    }

    countDates = (date1, date2) => {
        const dates = this.props.albums.map(album => album.year)
        return dates.filter(date => date >= date1 && date <= date2).length
    }

    render() {
        const { fifties } = this.state
        const { sixties } = this.state
        const { seventies } = this.state
        const { eighties } = this.state
        const { nineties } = this.state
        const { twoThousands } = this.state
        const chartData = {
            labels: ['1950s', '1960s', '1970s', '1980s', '1990s', '2000s'],
            datasets: [{
                label: 'Bad Album Covers Over The Years',
                backgroundColor: 'rgb(232, 188, 238, .8)',
                borderColor: 'rgb(141, 214, 255)',
                borderWidth: 3,
                responsive: true,

                data: [fifties, sixties, seventies, eighties, nineties, twoThousands],
            }],
            options: {
                legend: { display: false },
                scales: {
                    yAxes: [{ ticks: { beginAtZero: true } }],
                    xAxes: [{ ticks: { beginAtZero: true } }],
                },
            },
        }

        return (
            <React.Fragment>
                <main className="about" onClick={this.countDates}>
                    <h2>Sharing Music Through Bad Album Covers</h2>
                    <h3>Bad Album Covers Over the Years</h3>
                    <div className="chart">
                        <Bar data={chartData} options={chartData.options} />
                    </div>
                    <h3>About Your Band Sucks</h3>
                    <p>Your Band Sucks is an API of real album covers.
                        Whether falling victim to failed trends or simply as a result of poor taste,
                        all of these album covers are...pretty terrible. Keep in mind, this is not a reflection
                        of the musical talents of bands and artists listed, but simply just for fun.
                        If you have not heard of these musicians before, I encourage you to look them up.
                        You may be surprised by how great their music is!</p>
                    <p>If you want to contribute to our API, please sign-up,
                        and upload albums. Fill out all required fields
                        and keep the album information as accurate as possible.  Anything innaccruate will
                        be changed or taken down. Sign up is free and you can cancel at any time.</p>
                    <h3>About the Developer</h3>
                    <p>My name is Coleman Imhoff and I'm a full-stack web developer.
                        I’m originally from Pennsylvania, but have lived in Denver, CO
                        for ten years.</p>
                    <p>When I’m not coding, I'm exploring the Colorado mountains.
                        I'm also a musician who writes, performs, and produces music.
                        Music is one of my passions in life, but I believe, sometimes, it’s
                        something we shouldn’t take too seriously.</p>
                </main>
            </React.Fragment>
        )
    }
}

export default About