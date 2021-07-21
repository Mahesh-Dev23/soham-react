import React from 'react'


function Select2({label, option, id, selected, selectedId }) {

    const handleChange = (ev) => selected(ev) 
    
    return (
        <div className="form-group" >
            
            {
                label ? 
                (<label className="form-input-label"
                    >
                    {label}
                </label>)
                : null }
            <select   name="select"  id={id} onChange={e=>handleChange(e.target.value)}>
                <option key={selectedId} value={selectedId} className="selectName" selected>{selectedId}</option>
                {option.map(data => <option key={data} value={data} className="selectName">{data}</option> )}
                
            </select>    
        </div>
    )
}

export default Select2
