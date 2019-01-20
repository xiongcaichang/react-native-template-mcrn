import { handleActions } from 'redux-actions';

const AccountActions = handleActions({
  USER_ACCOUNT_LOGIN(preData, action){
    return {
      ...action.payload,
    };
  },
}, {
});

export default AccountActions;
