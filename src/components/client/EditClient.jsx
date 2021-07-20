import React, {useState, useContext, useEffect} from 'react'

import Input from '../common/Input'
import  { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css' 
import axios from 'axios'
import {VisitTrack} from '../../App'


function AddClient({onclick, id, noId}) {
    const [clientUpdate, setClientUpdate] = useState()
    const [consUpdate, setConsUpdate] = useState([])
    let addClientList 
    
    const getNames = async () => {
       return await axios.get(`http://localhost:5000/client/${id}`) 
    }
    
    const editClient =  () => getNames().then(res=> {
        setClientUpdate(res.data.clientName)
        setConsUpdate(res.data.consigner.map(res => res))
    })
    
    const captureModal = useContext(VisitTrack)
    const updateCons = (ev, index) => consUpdate[index]= ev
    const closeUpdates = (e) => noId(e)

    const clientResponce = (index, value) =>{
        const x = document.getElementById("getClient")
        
        let i
        consUpdate.push( x.elements[x.length -1].value)
           
            addClientList = { clientName: x.elements[0].value ? x.elements[0].value : clientUpdate, 
                consigner: consUpdate}
            
                const postNames = async () => {
                
                return await axios.put(`http://localhost:5000/client/${id}`, addClientList) 
            }
            postNames()
            
            toast.success(JSON.stringify(addClientList), {position: toast.POSITION.BOTTOM_CENTER})
            captureModal.countDispatch({type:'modal', value:'', modal: false})

    }

    useEffect(()=>{ 
        editClient() 
        updateCons()
    },[])

    return (
        <div className="clientUpdate">
            <h3 className="modalTitle">  Update Client </h3>  

            <form name="addclientform" id="getClient" >
                <div className="form-group" >
                    <label className="form-input-label" >Client's Name</label>
                    <input value={clientUpdate} onChange={e=>setClientUpdate(e.target.value)}/>
                </div>    
                {consUpdate.map((res, index) => 
                <div className="form-group" >
                    <label className="form-input-label" >{`Consigner${ index + 1 }`}</label>
                    <input  
                        placeholder={res} 
                    
                /> </div>)}  
                
                <Input label="Add more Consigner" /> 
            </form>
                  
            <button className="formButton" onClick={() => clientResponce()} >Submit</button>
            <button type="button"  className="roundButton" onClick={() => closeUpdates()}> X </button>
        </div>
    )
}

export default AddClient
