import { Loading } from 'MCAction'
import store from '@MCRN/store'


const show = ()=> {
    store.dispatch(Loading.showLoading());
}
const hide = ()=> {
    store.dispatch(Loading.hideLoading());
}

export default {
    show,
    hide
}