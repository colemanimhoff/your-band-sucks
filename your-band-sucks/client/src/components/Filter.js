import React from 'react'
import { Row, Input } from 'react-materialize'

const Filter = ({ handleFilters }) => {
    return (
        <Row className="filter">
            <Input inline={false} icon='search' s={12} type='select' value='' onChange={handleFilters}>
                <option type="select" disabled></option>
                <option type="select" name="all" value='all'>All</option>
                <option type="select" name="1950s" value='1950-1959'>1950s</option>
                <option type="select" name="1960s" value='1960-1969'>1960s</option>
                <option type="select" name="1970s" value='1970-1979'>1970s</option>
                <option type="select" name="1980s" value='1980-1989'>1980s</option>
                <option type="select" name="1990s" value='1990-1999'>1990s</option>
                <option type="select" name="2000s" value='2000-2999'>2000s</option>
            </Input>
        </Row>
    )
}

export default Filter