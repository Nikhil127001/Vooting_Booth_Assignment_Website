
import { createSlice } from "@reduxjs/toolkit";

const loadUserDataFromSessionStorage = () => (dispatch) => {
    const userData = sessionStorage.getItem('userData');
    if (userData) {
      dispatch(setReduxData(JSON.parse(userData)));
    }
  };


const userReducer = createSlice({
    name: "userData",
    initialState: { data: null},
    reducers: {
        setReduxData: (state,action) => {
            state.data = action.payload;
        },
        unsetReduxData: (state) =>{
          state.data = {}
        }
    },
});

export const {setReduxData,unsetReduxData} = userReducer.actions;

export const loadUserData = loadUserDataFromSessionStorage;

export default userReducer.reducer;