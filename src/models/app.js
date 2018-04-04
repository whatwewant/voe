export default {
  namespace: 'app',

  state: {
    title: '深自缄默，如云漂泊',
    banner: 'http://statics.uberqd.com/image-saving/2017/11/26/fd80393fe090d34ca8c3da5061d80366.jpg!blogtop',

    author: {
      banner: 'http://statics.uberqd.com/image-saving/2017/11/26/5d91897b1f27f94a2a5543b9a47ed251.png',
      nickname: 'Viosey',
      avatar: 'http://statics.uberqd.com/image-saving/2017/11/26/7756f56a0748426e47f13f787ef7bfcd.png',
      email: 'i@viosey.com',
    },

    archieve: '2017/10',

    category: 'tech',

    post: 'p2',
  },

  reducers: {
    'set/archieve'(state, { payload: archieve }) {
      return {
        ...state,
        archieve,
      };
    },
    'set/category'(state, { payload: category }) {
      return {
        ...state,
        category,
      };
    },
    'set/post'(state, { payload: post }) {
      return {
        ...state,
        post,
      };
    },
  },
};