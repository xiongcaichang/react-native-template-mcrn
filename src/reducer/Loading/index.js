import { handleActions } from 'redux-actions';

const Loading = handleActions({
  SHOW_LOADING: () => ({
    visible: true,
  }),
  HIDE_LOADING: () => ({
    visible: false,
  }),
}, {
  visible: false,
});

export default Loading;
