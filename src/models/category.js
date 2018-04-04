export default {
  namespace: 'category',
  
  state: {
    'event': {
      id: 'event',
      name: 'event',
      label: '事件簿',
      posts: [
        'p1',
      ],
      url: '/category/event',
    },
    'share': {
      id: 'share',
      name: 'share',
      label: '分享镜',
      posts: [],
      url: '/category/share',
    },
    'create': {
      id: 'create',
      name: 'create',
      label: '创作集',
      posts: [
        'p1', 'p2', 'p3',
      ],
      url: '/category/create',
    },
    'tech': {
      id: 'tech',
      name: 'tech',
      label: '技术向',
      posts: [
        'p2', 'p3',
      ],
      url: '/category/tech',
    },
    'self': {
      id: 'self',
      name: 'self',
      label: '自言自语',
      posts: [
        'p3', 'p4'
      ],
      url: '/category/self',
    },
  },
};