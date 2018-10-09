import { createAction } from 'redux-actions';

export default {
  // 显示 ToolTip
  showLoading: createAction('SHOW_LOADING'),
  // 关闭 ToolTip
  hideLoading: createAction('HIDE_LOADING'),
};
