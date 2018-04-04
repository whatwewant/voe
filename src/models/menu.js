export default {
  namespace: 'menu',

  state: [
    { key: 'home', label: '主页', path: '/' },
    {
      key: 'inbox',
      iconLeft: 'inbox',
      iconRight: 'dropdown',
      label: '归档',
      // selected: true,
      submenus: [
        { path: '/archieve/2017/10', key: 'Oct 2017', label: '十月 2017', badge: 1 },
        { path: '/archieve/2017/09', key: 'Sep 2017', label: '九月 2017', badge: 1 },
        { path: '/archieve/2017/08', key: 'Aug 2017', label: '八月 2017', badge: 2 },
        { path: '/archieve/2017/06', key: 'Jan 2017', label: '六月 2017', badge: 4 },
        { path: '/archieve/2017/04', key: 'Aus 2017', label: '四月 2017', badge: 1 },
      ],
    },
    {
      key: 'category',
      iconLeft: 'chromeReadMode',
      iconRight: 'dropdown',
      label: '分类',
      hasSubMenu: true,
      submenus: [
        { path: '/category/event', key: 'event', label: '事件簿', badge: 3 },
        { path: '/category/share', key: 'share', label: '分享镜', badge: 11 },
        { path: '/category/create', key: 'create', label: '创作集', badge: 6 },
        { path: '/category/tech', key: 'tech', label: '技术向', badge: 12 },
        { path: '/category/self', key: 'self-talk', label: '自言语', badge: 3 },
      ],
    },
    { key: 'c-divide', divide: true },
    { path: '/about', key: 'about-me', label: '关于我' },
    { path: '/tag', key: 'tag-cloud', label: '标签云' },
    { path: '/friends', key: 'friend-link', label: '友情链接' },
    { key: 'f-divide', divide: true },
    { path: '/themes', key: 'theme', label: '主题 - Material', iconRight: 'info' },
  ],
};