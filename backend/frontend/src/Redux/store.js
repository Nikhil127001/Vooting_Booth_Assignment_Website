import { configureStore} from '@reduxjs/toolkit';
import userReducers , {loadUserData} from './reducers/userReducers';


const store = configureStore({
    reducer : {
        userRegisterlogin : userReducers,
    }
});

store.dispatch(loadUserData());

export default store;