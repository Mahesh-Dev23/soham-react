import React, {useState, useContext, useEffect} from 'react'


import Nav from '../common/Nav'
import Modal from '../common/Modal'
import AddClient from '../client/AddClient'
import { Consignments } from '../../App'
import AddConsignment from '../consignment/AddConsignment'
import Top from '../common/Top'
import StockStatus from './StockStatus'
import PendingBills from './PendingBills'
import BIllCounter from './BIllCounter'
import ConsignmentStatus from './ConsignmentStatus'
import Counter from '../common/Counter'

import datefunctions from '../functions/datefunctions'
import addLoop from '../functions/add'

//Modal.setAppElement('#main')


function Main({ colorsStates, todayInSeconds}) {
    const captureConsignmentsFromData = useContext(Consignments)

    const [consignmentCaptured, setConsignmentCaptured] = useState([])
    const [totalAmt, setAmt] = useState([])
    const [perClient, setPerClient] = useState([])
    const [totalPkg, setPkg] = useState([])
    const [inStock, setinStock] = useState([])
    const [modal , setModal] = useState(false)
    const [modalInside, setModalInside] = useState()
    const [todayIs, setTodayIs] = useState()
    
    
    const modalContent = modalInside
    let bigBill5=[]
    let unpaidStock = []
    let paidStock = []
    let unpaidCons = []
    let unloadingToday = []
    let deliveryToday = []
    let openCons = []
    let closedCons = []

    datefunctions.then(function(value){setTodayIs(value)})
    
    
    const showModal = (modal, content) =>{
        setModal(modal) 
        setModalInside(content) 
    }
    

    const getTotal = (total, value) => {
        setConsignmentCaptured(
        captureConsignmentsFromData.map(res => res ?
            {   client: res.client,
                consigner: res.consigner,
                consignee: res.consignee, 
                PoD: res.Pod, 
                package: res.package,
                package1: res.package1,
                weight: res.weight,
                cWeight: res.cWeight,
                rate: res.rate,
                remark: res.remark,
                payment: res.payment,
                amount:res.amount,
                loading: res.loading,
                UnLoading: res.uloading,
                load: res.load,
                unload: res.unload,
                id: res.id
            } : '')
        )
        setAmt( captureConsignmentsFromData.map(resConsgn => resConsgn.payment != "Paid" ? resConsgn.rate * resConsgn.cWeight : 0 ))
        
        setPerClient( captureConsignmentsFromData.map(resConsgn => 
            resConsgn.payment != "Paid" ? 
                        {"client":resConsgn.client, "amount": resConsgn.rate * resConsgn.cWeight }
                     : '' ))

        setPkg( captureConsignmentsFromData.map(resConsgn => resConsgn.unload < todayInSeconds ? resConsgn.package * 1 : null ))
        setinStock(captureConsignmentsFromData.map(resConsgn => resConsgn.unload < todayInSeconds ? resConsgn.package1 * 1 : null))

        return total + value;
    }
    useEffect(()=>{ getTotal() },[])

    useEffect(()=>{ getTotal()},[captureConsignmentsFromData])

    const clientConcat = () =>{
        perClient.sort()
        

        for(let i = 0; i < consignmentCaptured.length; i++ ){
            if(consignmentCaptured[i].package1 > 0 && consignmentCaptured[i].payment != "Paid" && consignmentCaptured[i].amount > 10000){
                bigBill5.push( {client:consignmentCaptured[i].client , amount: consignmentCaptured[i].amount, package1:consignmentCaptured[i].package1} )
            }
            if( consignmentCaptured[i].unload < todayInSeconds && consignmentCaptured[i].package1 > 0 && consignmentCaptured[i].payment != "Paid"   ){
                unpaidStock.push(parseInt(consignmentCaptured[i].package1))
            }
            if( consignmentCaptured[i].unload < todayInSeconds && consignmentCaptured[i].package1 > 0 && consignmentCaptured[i].payment === "Paid" ){
                paidStock.push(parseInt(consignmentCaptured[i].package1))
            }
            if(consignmentCaptured[i].package1 <= 0 && consignmentCaptured[i].payment != "Paid"){
                unpaidCons.push( {client:consignmentCaptured[i].client , amount: consignmentCaptured[i].amount, package1:consignmentCaptured[i].package1} )
            }
            if(consignmentCaptured[i].package1 > 0 && consignmentCaptured[i].payment != "Paid" || consignmentCaptured[i].package1 > 0 && consignmentCaptured[i].payment === "Paid" || consignmentCaptured[i].package1 <= 0 && consignmentCaptured[i].payment != "Paid"){
                openCons.push(parseInt(consignmentCaptured[i].package1))
            }
            if(consignmentCaptured[i].package1 <= 0 && consignmentCaptured[i].payment === "Paid" ){
                closedCons.push(parseInt(consignmentCaptured[i].package1))
            }
            if( consignmentCaptured[i].unload === todayInSeconds ){
                unloadingToday.push(consignmentCaptured[i].client)
            }
            if( consignmentCaptured[i].delv === todayInSeconds){
                deliveryToday.push(consignmentCaptured[i].client)
            }
        }
        bigBill5.sort(function(a, b){
            for(let i = 0; i < 3; i++){
              return b.amount - a.amount  
            }
            
        })
         
       
    }
    clientConcat()
    //console.log(unloadingToday)
    
    //console.log(paidStock.length)

    
        
    
    return (
        <div id="main">
            <div className="main" >
                    
                <Top today={todayIs} stateColor={colorsStates.colorStateDBlue}/>
                    
                <div className="resultBox" style={{height:"480px", overflowY: "scroll"}}>
                   < PendingBills />
                </div>
                    <div className="resultBox" style={{borderRight: "1px solid #dcdcdc", borderLeft: "1px solid #dcdcdc", height: "495px" , backgroundColor: "white"}}>
                        <StockStatus total={addLoop(totalPkg)} 
                                    stock={addLoop(inStock)} 
                                    unpaid={addLoop(unpaidStock)} 
                                    paid={addLoop(paidStock)}
                                    paidColor={colorsStates.colorStateGreen}
                                    unpaidColor={colorsStates.colorStateOrange}
                                    />
                        <BIllCounter totalAmt={addLoop(totalAmt)}/>
                        
                        <div className="result">
                            <button type="button" style={{marginRight: "2px"}} className="button " onClick={() => showModal(true, 'Consignment')} > Add Consignment</button>
                            <button type="button"  className="button " onClick={() => showModal(true, 'Client') } fromClient={showModal}> Add Client </button>
                        </div>
                        
                    </div>
                    <div className="resultBox" style={{padding: "0px"}}>
                        <Counter cl={"result2"} content={bigBill5.length} label={"Undelevered consignments above Rs.10000"}/>
                        <Counter cl={"result2"} content={unpaidCons.length} label={"Unpaid consignments post delivery"}/>
                        <Counter cl={"result2"} content={unloadingToday.length} label={"Consignments unloading today"}/>
                        <Counter cl={"result2"} content={deliveryToday.length} label={"Consignments delivery today"}/>                       
                        <ConsignmentStatus closed={closedCons.length} paid={paidStock.length} unpaid={unpaidStock.length} opened={unpaidCons.length}/>
                        
                    </div>
			</div>
				
                 
                
                <Nav />
                
                <Modal modal={modal}> 
                   
                    { modalContent === "Client"?  <AddClient onclick= {() => showModal()}/> : 
                    modalContent === "Consignment"?  <AddConsignment onclick= {() => showModal()}/>:''}
                   
                
                    <button type="button"  className="roundButton" onClick={() => showModal(false, '')}> X </button>
                </Modal>
                
        </div>
    )
}

export default Main