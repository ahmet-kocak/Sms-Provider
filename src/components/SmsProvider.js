import React, { useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getSmsDatas, getTokens, updateSmsStatusDatas } from '../store';
import { Table,Icon,Button,Checkbox,Loader } from 'semantic-ui-react'
import { useNavigate } from 'react-router-dom';
import ModalDetail from './Modal';



const initialState={
  accountSID:"", apiKey:"", authToken:"", baseURL:"", createdBy:"", createdWhen:"", fromName:"", id:"", partnerID:"",
  password:"", providerID:"", secretKey:"", status:true, updatedBy:"", updatedWhen:"", username:"", vendorCode:""
};


export default function Institution() {
  
    const {getSms,updateSms,postSms} = useSelector((state) => state);
    const navigate = useNavigate();
    const dispatch=useDispatch();



    useEffect(() => {dispatch(getSmsDatas())},[updateSms.status,postSms.status]);
    //token güncelleme
    useEffect(() => { if(getSms.status!=="success"){
      dispatch(getTokens(JSON.parse(localStorage.getItem("userLogin"))))}
    },[getSms.status]);
    
    
    //checkbox
    const onChangeCheckbox=(item,e)=>{
      dispatch(updateSmsStatusDatas({id:item.id,stat:!item.status})); 
        dispatch(getSmsDatas());
    }

  return (
<>


  <div className='listcontainer' >
    <Button size="mini" color='red' onClick={() =>{localStorage.removeItem('jwtToken');localStorage.removeItem('userLogin');navigate("/");window.location.reload()}}>
      <Icon name='x' /> Exit
    </Button>
  </div> 



  <div className='userlistcontainer' style={{position:"relative"}}>
    <h2 className='userlisthead' >SMS PROVİDER &</h2>
    <div className='loading'>

      {
        getSms.status==="loading"
        ?<Loader active inline >Loading...</Loader>
        :(getSms.status==="failed"?<div className='failed'>Server 404!</div>:"")
      }

    </div>
      <div className='usertable' >

        <Table compact celled>
          <Table.Header fullWidth >
              <Table.Row>
                <Table.HeaderCell width="1" textAlign="center">No</Table.HeaderCell>
                <Table.HeaderCell>fromName</Table.HeaderCell>
                <Table.HeaderCell>UserName</Table.HeaderCell>
                <Table.HeaderCell>baseURL</Table.HeaderCell>
                <Table.HeaderCell>Status</Table.HeaderCell>
                <Table.HeaderCell width="2">
                <center><ModalDetail item={initialState}/></center> 
                </Table.HeaderCell>
              </Table.Row>
          </Table.Header>
    
          <Table.Body>
            {
            getSms.users.data?.map((item,i)=>{return(
              <Table.Row key={i}>
                <Table.Cell textAlign="center">{i+1}</Table.Cell>
                <Table.Cell>{item.fromName}</Table.Cell>
                <Table.Cell>{item.username}</Table.Cell>
                <Table.Cell>{item.baseURL}</Table.Cell>
                <Table.Cell>
                  <center> 
                    <Checkbox toggle size="mini"  type='checkbox'   onClick={onChangeCheckbox.bind(this,item)}   checked={item.status} />
                  </center>   
                </Table.Cell>
                <Table.Cell><center><ModalDetail  item={item}/></center></Table.Cell>
              </Table.Row>
              )})
            }
          </Table.Body>
        </Table>
      </div>
  </div>
</>
);
}
