import { handleActions } from 'redux-actions';

const AccountActions = handleActions({
  USER_ACCOUNT_LOGIN_COMPLETED(preData, action){
    return {
      ...action.payload,
    };
  },
  USER_ACCOUNT_LOGIN_FAILED(preData, action){
    return {
      ...action.payload,
    };
  },
}, {
  user_id: '',
  phone: '',
  token: ''
});

export default AccountActions;
