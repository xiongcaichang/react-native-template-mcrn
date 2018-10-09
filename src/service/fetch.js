/**
 * fetch请求
 * @authors 杨景帅 (yangjingshuai@meicai.cn)
 * @date    2018-07-10 10:21:30
 * @version $Id$
 */
import Toast from 'react-native-root-toast'; // 引入类库

export function postMethod(url,body){
  body = appendParamers(body);
  return fetch(url,{
    method:'POST',
    headers:{
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body:JSON.stringify(body)
  }).then((response)=>response.json())
    .then((responseObj)=>{
      console.log('url,body,response=============================',url,JSON.stringify(body),responseObj);
      if (responseObj.ret != 1) {
        var msg = responseObj.error.msg;
        Toast.show(msg,{
          duration:2000,
          position: Toast.positions.TOP, // toast位置
        });
        return responseObj;
      }
      return responseObj.data;
    }).catch((error)=>{
      console.log('请求失败地址,请求失败报错=============================',url,JSON.stringify(body),error);
        Toast.show('请求失败',{
          duration:200,
          position: Toast.positions.TOP, // toast位置
        });
      return Promise.reject(error)
    })
}

appendParamers:(body) => {
	if(!body){body = {}}
		return body;
}
