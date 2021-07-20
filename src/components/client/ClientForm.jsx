import React from 'react'

import Input from '../common/Input'


function ClientForm() {
    
    return (
        <form name="addclientform" id="getClient" >
            <Input label="Client's Name" />    
            
            <Input label="Consigner1"/>   
            <Input label="Consigner2"/>
            <Input label="Consigner3"/>
            <Input label="Consigner4"/> 
        </form>
    )
}

export default ClientForm
