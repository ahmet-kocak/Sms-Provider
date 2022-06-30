import React,{useState,useEffect} from 'react'
import { useDispatch,useSelector } from 'react-redux';
import { Header, Icon, Modal,Button,Form,Input,Select} from 'semantic-ui-react';
import { postSmsDatas,updateSmsDatas,getSmsDatas} from '../store';


const providerOptions = [
    {key:1, value: 1, text: 'PostaGuvercini'},
    {key:2, value: 2, text: 'MobilDev' },
    {key:3, value: 3, text: 'JetSMS' },
    {key:4, value: 4, text: 'MailJet' },
    {key:5, value: 5, text: 'Twilio' },
    {key:6, value: 6, text: 'InfoBip' },
    {key:7, value: 7, text: 'Vonage' }
];





export default function ModalDetail ({item}) {
    const dispatch = useDispatch();
    const [state, setState] = useState(item);  
    const [show, setShow] = useState()
    const [showupdate, setShowupdate] = useState(false)
    const [showpost, setShowpost] = useState(false)
    const [open, setOpen] = useState(false);
    const [updatedWhenFormat, setUupdatedWhenFormat] = useState("");  
    
    const {getSms,updateSms,postSms} = useSelector((state) => state);


    //dropdawn map
    const providermap = providerOptions.map(item => {return { key: item.key, value: item.value, text: item.text };});

    //onchange
    const handleChangeSelect = (e,{value}) => {e.preventDefault();setState({...state,providerID:value})};
    const handleChange = (e) => {e.preventDefault(); setState({...state,[e.target.name]:e.target.value})};


    //date format
    const formatDate=()=> {
        const date=new Date()
        const padTo2Digits=(num)=>{return num.toString().padStart(2, '0');}
        return (
            [date.getFullYear(),padTo2Digits(date.getMonth() + 1),padTo2Digits(date.getDate())].join('-')+'T'+
            [padTo2Digits(date.getHours()),padTo2Digits(date.getMinutes()),padTo2Digits(date.getSeconds())].join(':')+"."+date.getMilliseconds()
        );
}



useEffect(() => {
        
    if(!item.id){
        const myId=getSms.users.data.length+1
        setShow(true);
        setState({...state,createdWhen:formatDate(),id:myId,updatedWhen:formatDate(),createdBy:myId,updatedBy:myId})
    }
    else{
        setShow(false);
        setUupdatedWhenFormat(item.updatedWhen)
        const yearsformat=item.updatedWhen.split("T");
        const hoursformat=yearsformat[1].slice(0,5)
        const dateformat=yearsformat[0]+" "+hoursformat;
        setState({...state,updatedWhen:dateformat})
    }

}, [item])



//update-post success ve modal kapatma 
useEffect(() => {
    if(updateSms.success){
        setShowupdate(true);
        setTimeout(() =>{setShowupdate(false)},2000);
        setTimeout(() =>{setOpen(false)},3000);
    }
    if(postSms.success){
        setShowpost(true);
        setTimeout(() => {setShowpost(false)},2000);
        setTimeout(() => {setOpen(false)}, 3000);
    }
}, [updateSms.success,postSms.success])







    return (

  <Modal
        className='modalstyle'
        open={open} 
        trigger={item.id?<Button size="mini" color="brown">Detail</Button>:<center><Button size="mini" color="blue">Add User</Button></center>}  
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}>


    <Header icon='archive' content='SMS Provider' />

    <Modal.Content>
        <Form>
            <Form.Group widths='equal'>
                <Form.Field size="large" control={Input} label='baseURL' name='baseURL' type='text'  value={state.baseURL}  onChange={handleChange}  disabled={!show}/>
                <Form.Field size="large" control={Input} label='fromName' name='fromName' type='text' value={state.fromName}  onChange={handleChange} disabled={!show}/>   
                <Form.Field size="large" control={Select} label='provider' name="providerID" options={providermap} value={state.providerID}   onChange={handleChangeSelect} disabled={!show}/>
            </Form.Group>
    
            <Form.Group widths='equal'>
                <Form.Field size="large" control={Input} label='username' name='username' type='text' value={state.username}  onChange={handleChange} disabled={!show}/> 
                <Form.Field size="large" control={Input} label='password' name='password' type='password' value={state.password}  onChange={handleChange} disabled={!show}/>
                <Form.Field size="large" control={Input} label='vendorCode' name='vendorCode' type='text' value={state.vendorCode} onChange={handleChange} disabled={!show}/> 
            </Form.Group>

    
            <Form.Group widths='equal'>
                <Form.Field size="large" control={Input} label='apiKey' name='apiKey' type='text' value={state.apiKey}  onChange={handleChange} disabled={!show}/>
                <Form.Field size="large" control={Input} label='secretKey' name='secretKey' type='text' value={state.secretKey} onChange={handleChange} disabled={!show}/>
                <Form.Field size="large" control={Input} label='accountSID' name='accountSID' type='text' value={state.accountSID} onChange={handleChange} disabled={!show}/> 
            </Form.Group>
    
            <Form.Group widths='equal'>
                {(item.id&&!show)
                ?<Form.Field size="large"  control={Input} label='updatedWhen' name='updatedWhen' type='text' value={state.updatedWhen} onChange={handleChange} disabled={!show}/>
                :(!item.id&&show?<Form.Field size="large" control={Input} label='partnerID *' name='partnerID' placeholder="requred" required type='text' value={state.partnerID} onChange={handleChange} disabled={!show}/>:"")}
            </Form.Group>

        </Form>
    </Modal.Content>

    <Modal.Actions>
            {postSms.success?<div style={{display:`${showpost?"inline-block":"none"}`}} className='updatestyle'>submit success</div>:""} 
            {updateSms.success?<div style={{display:`${showupdate?"inline-block":"none"}`}} className='updatestyle'>update success</div>:""}
            {item.id&&show?<Button size="mini" color='green'  onClick={()=>{dispatch(updateSmsDatas({...state,updatedWhen:updatedWhenFormat}))}}><Icon name='checkmark' /> Update</Button>:""}
            {!item.id?<Button size="mini" color='blue' disabled={((state.partnerID==="")||(state.providerID===""))?true:false} onClick={() => dispatch(postSmsDatas(state))}><Icon name='checkmark' />Submit</Button>:""}
            {(item.id&&!show&&item.status&&item.partnerID!==0)?<Button size="mini" color='green' onClick={() =>setShow(true)}><Icon name='checkmark'/> Edit</Button>:""}
            <Button size="mini" color='red' onClick={() => {setShow(true);setOpen(false);dispatch(getSmsDatas())}}><Icon name='checkmark'/>Cancel</Button>
        </Modal.Actions>
  </Modal>

)
}

