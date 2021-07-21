import React, {useContext} from 'react'
import {VisitTrack} from '../../App'

import { FiPrinter } from 'react-icons/fi'


function Nav() {

    const captureNav = useContext(VisitTrack)
    
    return (
        <div>
            <nav> 
                <li><a onClick={()=>captureNav.countDispatch({type:'main', value:'Main'})}>Home</a></li>
                <li><a onClick={()=>captureNav.countDispatch({type:'main', value:'ClientList'})}>Clients</a></li>
                <li><a onClick={()=>captureNav.countDispatch({type:'main', value:'LoadingUnloading'})}>Loading/UnLoading</a></li>
                <li><a onClick={()=>captureNav.countDispatch({type:'main', value:'Status'})}>Schedules</a>  </li>
                <li><a onClick={()=>captureNav.countDispatch({type:'main', value:'Print'})}>Reports and Print <FiPrinter /></a>  </li>
            </nav>
            
            
        </div>
    )
}

export default Nav
