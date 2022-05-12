import {HeaderMenu} from '~/@types/common';
const HEADER_MENUS: Array<HeaderMenu> = [
  {
    text: 'TodoList',
    icon: 'icon-todolist',
    path: '/todo',
  },
  {
    text: '番茄计时',
    icon: 'icon-jishi',
    path: '/timing',
  },
  {
    text: '学习小组',
    icon: 'icon-xiaozu',
    path: '/group',
  },
  {
    text: '数据统计',
    icon: 'icon-changguishujutongji',
    path: '/statistics',
  },
  {
    text: '个人信息',
    icon: 'icon-gerenxinxi',
    path: '/user',
  },
];
export default HEADER_MENUS;
