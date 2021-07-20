import React, { useContext} from 'react'
import ClientForm from './ClientForm'
import { ClientNames } from '../../App'


import  { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css' 
import axios from 'axios'

import {VisitTrack} from '../../App'


function AddClient({onclick}) {
    const captureNamesFromData = useContext(ClientNames)
    let clientNameSelect = captureNamesFromData.map(name => name.clientName)
    
    let oneClient
    let addClientList 
    
    const captureModal = useContext(VisitTrack)
    
        //console.log("clientNameSelect " + clientNameSelect)
            

    const clientResponce = () =>{
        const x = document.getElementById("getClient")
        clientNameSelect.filter(value =>{ if(value === x.elements[0].value){
            oneClient = value }
            }
        )
        console.log( oneClient)
        const personNames = []
        let i
        
            if(oneClient){
                toast.warn(
                    `Client name '${oneClient}' already exits!`,
                    {position: toast.POSITION.BOTTOM_CENTER}
                )
                x.elements[0].value = ''
                onclick(false)
            }else{
                let i
                for (i = 1; i < x.length ; i++) {
                    if(x.elements[i].value){
                        personNames.push(x.elements[i].value)
                    }   
                }

                addClientList = { clientName: x.elements[0].value, consigner: personNames}
                    const postNames = async () => {
                    return await axios.post('http://localhost:5000/client', addClientList) 
                }

                postNames()
                
                toast.success(JSON.stringify(addClientList), {position: toast.POSITION.BOTTOM_CENTER})
                captureModal.countDispatch({type:'modal', value:'', modal: false})

                onclick(false)
            }
           
    }

    return (
        <div>
            <h3 className="modalTitle">  Add Client </h3>  

            <ClientForm />
                  
            <button className="formButton" onClick={() => clientResponce()} >Submit</button>
        </div>
    )
}

export default AddClient
