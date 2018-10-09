import { createAction } from 'redux-actions';

export default {
  tenantListUpdate: createAction('TENANT_LIST_UPDATE'),
  changeSelectedItem: createAction('TENANT_LIST_SELECT_CHANGED'),
};
