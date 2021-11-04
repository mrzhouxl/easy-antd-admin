
import { routes } from "../../router/index";
//根据路由格式化menu需要的内容
const toMenu = (v: any) => {
  return {
    key: v.path,
    title: v.meta?.title,
    pageUrl: v.path,
    icon: v.meta?.icon,
    children: v.children?.filter((vv: any) => vv.meta?.isMenu).map((vv: any) => toMenu(vv))
  }
}
export const menu = routes[1].children?.filter(v => v.meta?.isMenu).map(v => toMenu(v))
