import React, { useState } from 'react'

import Modal from '../common/Modal'
import AddConsignment from '../consignment/AddConsignment'
import { FiTruck } from 'react-icons/fi'
import { FiEdit } from 'react-icons/fi'


function ClientListDisplay({resName, clickedId}) {
   
    const [modal , setModal] = useState(false)
    const [clientId, setClientId] = useState()
    const [clientName, setClientName] = useState()
    const [consigner, setConsigner] = useState()

    const getEditId = id =>  clickedId(id)

    const showModal = (modal) => setModal(modal)
    
    const addCons = (modal, id, name, cons) =>{
        setModal(modal)
        setClientId(id - 1)
        setClientName(name)
        setConsigner(cons)
    }

    return (
        <div className="clientList">
            <div className="clientName">
                <p>Client:</p>
                <h4>{resName.clientName}</h4> 
            </div>
            <div className="consigner">
                {resName.consigner.map(cons => <p>{cons}</p>)}
            </div>
            <div className="listButtons">
                <button type="button"  className="roundClick" onClick={()=> getEditId(resName.id)}> <FiEdit /> </button>
                <button type="button"  className="roundClick" onClick={()=> addCons(true, resName.id, resName.clientName, resName.consigner)}> <FiTruck /> </button>
            </div>

            <Modal modal={modal}> 
                <AddConsignment onclick= {() => showModal()} clientId ={clientId} clientName= {clientName}  seltectedConsignerFromClientr={consigner}/>
                <button type="button"  className="roundButton" onClick={() => showModal(false, '')}> X </button>
            </Modal>
        </div>
    )
}

export default ClientListDisplay
