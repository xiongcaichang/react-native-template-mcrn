// 工具类中的这么导出
export { default as Loading } from './Loading';

// map 到 props 的通常这么导出
import UserAccount from './UserAccount';
import TenantList from './TenantList';

export default {
  UserAccount,
  TenantList
}