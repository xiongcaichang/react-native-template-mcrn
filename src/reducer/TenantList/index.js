import { handleActions } from 'redux-actions';

const TenantList = handleActions({
  TENANT_LIST_UPDATE: (perData, action) => ({
    ...action.payload
  }),
  TENANT_LIST_SELECT_CHANGED: (perData, action) => {
    const newList = [];
    perData.listData.forEach(ele => {
      ele.default = ele.tenantName === action.payload.tenantName;
      newList.push(ele)
    });
  
    return  { listData: newList };

  }},{
  listData:[
    {
      tenantName: 'XXX商户',
      invitationCode: 'HBNKNN',
      default: true,
    },
    {
      tenantName: 'XXX商户222',
      invitationCode: 'HBNKNN',
      default: false,
    },
    {
      tenantName: 'XXX商户333',
      invitationCode: 'HBNKNN',
      default: false,
    }
  ]
});

export default TenantList;
