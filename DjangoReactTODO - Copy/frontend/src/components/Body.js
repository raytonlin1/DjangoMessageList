import React, {useState, useEffect} from 'react'
import Todo from './Todo'

const Body = (props) => {
    const [navClicked, setNavClicked] = useState(false)
    
    return (
        <div className="Body">
            <button className="LeftNavBar" onMouseEnter={() => setNavClicked(true)} onMouseLeave={() => setNavClicked(false)}> 
                <p className="ButtonText"> Hover for Navbar </p>
                <div>
                {navClicked ? <div> 
                    <a href="https://raytonlin1.github.io"> {navClicked ? "My Website" : null} 
                    </a>
                    <hr></hr>
                    <a href="https://github.com/raytonlin1"> {navClicked ? "My Github" : null} </a>
                    <hr></hr> 
                    <a href="https://github.com/rak-shit/MERN-stack-Todo"> {navClicked ? "Code this is based on" : null} </a>
                </div> : null} 
                </div>
            </button>
            <div className="FullBody"> 
                <Todo />
            </div>
        </div>
    )
}


export default Body;