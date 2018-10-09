import { createAsyncAction } from 'redux-action-tools';
import loading from 'MCUtil/loading'
import 'MCUtil/md5';

const loginFunc = (data) => {
  const { account, password } = data;
  loading.show();
  return new Promise(function(resolve, reject) {
      // 这里是 mock 请求和数据处理
      const mockDataSuccess = {
        user_id: 123456,
        userName: '这是一个不正经的用户',
        account: account,
        token: (`${password}${+Date()}`).MD5(32)
      };

      const mockDataFailed = {
        user_id: '',
        userName: '这是一个不正经的用户',
        account: account,
        token: ''
      };

      setTimeout(()=> {
        loading.hide();
        (account !== '123456') ? resolve(mockDataSuccess) : reject(mockDataFailed)
      }, 1000)
    });
}

const testFunc = (data) => new Promise(function(resolve, reject) {
  setTimeout(()=> {
    resolve(data)
  }, 1000)
});

export default {
  login: createAsyncAction('USER_ACCOUNT_LOGIN',loginFunc),
  updateAccountInfo: createAsyncAction('USER_ACCOUNT_UPDATAE',testFunc),
};
