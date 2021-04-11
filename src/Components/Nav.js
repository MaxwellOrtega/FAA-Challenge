import React from 'react'
import { Link } from 'react-router-dom'

function Nav(){
    const navStyle = {
        color: 'white'
    }
    return(
        <nav>
            <Link to='/' style={navStyle}><h1>TTU FAA Challenge</h1></Link>
        </nav>
    )
}

export default Nav