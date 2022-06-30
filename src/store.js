import { configureStore,createSlice,createAsyncThunk} from '@reduxjs/toolkit'
import { token_API,get_API,post_API,update_API,updateStatus_API } from './helpers/API';
import { config } from './helpers/config';
import qs from 'qs';






// get acsess_token fetching action
export const getTokens = createAsyncThunk(
    "token/getTokens",
    async (data) => {
      localStorage.setItem("userLogin", JSON.stringify(data))
      return await fetch(token_API,
      {method: 'POST',
      headers: {'Content-Type':'application/x-www-form-urlencoded;charset=UTF-8'},
      body: qs.stringify({...config,...data})})
      .then((res) =>{return res.json()})
      .catch(err=>console.log(err));
    }
  );


// get acsess_token reducer
  export const tokenSlice = createSlice({
    name: "token",
    initialState: {token:{}, status: null,},
    extraReducers: {
      [getTokens.pending]: (state, action) => {state.status = "loading";},
      [getTokens.fulfilled]: (state, action) => {state.status = "success";state.token = action.payload;
        localStorage.setItem("jwtToken", JSON.stringify(action.payload))},
      [getTokens.rejected]: (state, action) => { state.status = "failed";},
    },
})









// get fetching data action
export const getSmsDatas = createAsyncThunk(
    "getsms/getSmsDatas",
    async (data) => {
      const accesstoken=JSON.parse(localStorage.getItem("jwtToken")).access_token
      return await fetch(get_API,
      {method: 'GET',
      headers: { Authorization: `Bearer ${accesstoken}`}})
      .then((res) =>{return res.json()})
      .catch(err=>console.log(err));
    }
  );


// get fetchind data reducer
export const getSmsSlice = createSlice({
    name: "getsms",
    initialState: {users:{info: {statusCode: "", message: ""} ,status:"", data:[]},status: null,},
    extraReducers: {
      [getSmsDatas.pending]: (state, action) => {state.status = "loading";},
      [getSmsDatas.fulfilled]: (state, action) => {state.status = "success"; 
        const {info,status,data}=action.payload;state.users={info,status,data:data.partnerProviders}},
      [getSmsDatas.rejected]: (state, action) => { state.status = "failed";},
    },
})









// post fetching newadd user action
export const postSmsDatas = createAsyncThunk(
    "postsms/postSmsDatas",
    async (data) => {
      const accesstoken=JSON.parse(localStorage.getItem("jwtToken")).access_token
      return await fetch(post_API,
      { method: "POST",
        headers: { Authorization: `Bearer ${accesstoken}`,"content-Type": "application/json"},
        body:JSON.stringify(data)})
      .then((res) =>{return res.json()})
      .catch(err=>console.log(err));
    }
  );




// post-put fetching reducer
export const postSmsSlice = createSlice({
    name: "postsms",
    initialState: { message: "" ,success:null,status:null},
    extraReducers: {
        [postSmsDatas.pending]: (state, action) => {state.status = "loading";},
        [postSmsDatas.fulfilled]: (state, action) => {state.status = "success";
          state.message= action.payload.message; state.success=action.payload.success},
        [postSmsDatas.rejected]: (state, action) => { state.status = "failed";},
    },
})











// put fetching  user action
export const updateSmsDatas = createAsyncThunk(
  "updatesms/updateSmsDatas",
  async (data) => {
    const accesstoken=JSON.parse(localStorage.getItem("jwtToken")).access_token
    return await fetch(update_API,
    { method: "POST",
      headers: { Authorization: `Bearer ${accesstoken}`, "content-Type": "application/json"},
      body:JSON.stringify(data)})
    .then((res) =>{ return res.json()})
    .catch(err=>console.log(err));
  }
);



// post-put fetching reducer
export const updateSmsSlice = createSlice({
  name: "updatesms",
  initialState: { message: "" ,success:null,status:null},
  extraReducers: {
      [updateSmsDatas.pending]: (state, action) => {state.status = "loading";},
      [updateSmsDatas.fulfilled]: (state, action) => {state.status = "success";
        state.message= action.payload.message; state.success=action.payload.success},
      [updateSmsDatas.rejected]: (state, action) => { state.status = "failed";},
  },
})







// status put actions
  export const updateSmsStatusDatas = createAsyncThunk(
    "status/updateSmsStatusDatas",
   async  (data) => {
    const accesstoken=JSON.parse(localStorage.getItem("jwtToken")).access_token;
      return await fetch(updateStatus_API+`?id=${data.id}&stat=${data.stat}`,
      { method: "POST",
        headers: { Authorization: `Bearer ${accesstoken}`,"content-Type": "application/json",
      }})
      .then((res) =>{return res.json()})
      .catch(err=>console.log(err));
    }
  );
  


// status put reducer
  export const updateSmsStatusSlice = createSlice({
    name: "status",
    initialState: {users:{ info: {statusCode: "", message: ""} ,status:""}, status: null},
    extraReducers: {
        [updateSmsStatusDatas.pending]: (state, action) => {state.status = "loading";},
        [updateSmsStatusDatas.fulfilled]: (state, action) => {state.status = "success";  state.users = action.payload;},
        [updateSmsStatusDatas.rejected]: (state, action) => { state.status = "failed";},
    },
})








// combine reducer

export const store = configureStore({
  reducer: {
    token:tokenSlice.reducer,
    getSms:getSmsSlice.reducer,
    postSms:postSmsSlice.reducer,
    updateSms:updateSmsSlice.reducer,
    statusSms:updateSmsStatusSlice.reducer,
  },middleware:(getDefaultMiddleware)=>getDefaultMiddleware()
})


//actions
export const {getToken} = tokenSlice.actions
export const {getSmsData} = getSmsSlice.actions 
export const {postSmsData} = postSmsSlice.actions 
export const {updateSmsData} = postSmsSlice.actions 
export const {updateSmsStatusData} = postSmsSlice.actions 







