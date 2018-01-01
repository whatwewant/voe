import React, { PureComponent } from 'react';
import styled from 'styled-components';
import marked from 'marked';

import Card, { CardActions, CardContent, CardMedia, CardHeader } from 'material-ui/Card';
import Avatar from 'material-ui/Avatar';

import IconBookmark from 'material-ui-icons/Bookmark';
import IconShare from 'material-ui-icons/Share';

import DropMenu from '../DropMenu';

import '../../assets/markdown.less';

marked.setOptions({
  renderer: new marked.Renderer(),
  gfm: true,
  tables: true,
  breaks: false,
  pedantic: false,
  sanitize: false,
  smartLists: true,
  smartypants: false,
});

const Container = styled(Card)`
  font-size: 1pc;
  font-weight: 400;
  overflow: hidden;
  z-index: 1;
  position: relative;
  background: #fff;
  width: 100%;
  min-height: 25pc;
  max-width: 900px;
  margin: 8px;
  // margin-bottom: 47.59px;
  margin-top: 0;
  transition: all .2s linear;
  transform: translate3d(0, 0, 0);
  opacity: 1;
  box-sizing: border-box;

  display: flex;
  flex-direction: column;
  align-items: stretch;
  border-radius: 2px;
  box-shadow: 0 2px 2px 0 rgba(0,0,0,.14), 0 3px 1px -2px rgba(0,0,0,.2), 0 1px 5px 0 rgba(0,0,0,.12);

  @media (max-width: 839px) and (min-width: 480px) {
    // margin: 8px;
    width: calc(100% - 1pc);
  }

  @media (max-width: 480px) {
    margin: 0;
    width: 100%;
    // height: 800px;
  }
`;

const TitleWrap = styled.div`
  box-sizing: border-box;

  background-image: url(${props => props.banner});
  background-color: #607d8b;
  background-repeat: repeat;
  background-position: 50% 50%;
  background-size: cover;
  background-origin: padding-box;
  background-attachment: scroll;

  // height: 280px;
  height: 245.98px;

  display: flex;
  padding: 24.72px;
  cursor: pointer;
  flex-grow: 1;
  flex-direction: row;
  align-items: flex-end;

  color: #fafafa;
`;

const TitleName = styled.p`
  margin: 0;
  color: inherit;
  text-decoration: none;
  font-weight: 400;
  font-size: 34px;
  line-height: 40px;
  text-shadow: 1px 1px 8px #444;
  -webkit-tap-highlight-color: rgba(255, 255, 255, 0);
`;

const Title = ({ banner, url, title }) => (
  <TitleWrap banner={banner}>
    <TitleName>{title}</TitleName>
  </TitleWrap>
);

const AttributesWrap = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 1pc;
  border-top: 1px solid rgba(0, 0, 0, .1);
`;

const AuthorWrap = styled.div`
  display: flex;
`;

const AuthorAvatar = styled(Avatar)`
  margin-right: 1pc;
`;

const AuthorNPWrap = styled.div`
  color: #757575;
  font-size: 13px;
  line-height: 18px;
  font-weight: 400;
  overflow: hidden;

  display: flex;
  flex-direction: column;
`;

const AuthorName = styled.strong`

`;

const PostDate = styled.span`

`;

const AuthorNP = ({ name, date }) => (
  <AuthorNPWrap>
    <AuthorName>{name}</AuthorName>
    <PostDate>{date}</PostDate>
  </AuthorNPWrap>
);

const Author = ({ avatar, name, date }) => (
  <AuthorWrap>
    <AuthorAvatar src={avatar} />
    <AuthorNP name={name} date={date} />
  </AuthorWrap>
);

const Actions = styled.div`
  display: flex;
`;

const VoeDropMenu = styled(DropMenu)`
  margin-right: -8px;
`;

const Attributes = ({ author, actions = [] }) => (
  <AttributesWrap>
    <Author {...author} />
    <Actions>
      {actions.map((e, i) => (
        <VoeDropMenu key={i} {...e} />
      ))}
    </Actions>
  </AttributesWrap>
);

const ContentWrap = styled.div`
  max-width: 90%;
  margin: 1pc auto;
  padding-top: 0;
  border: 0;
  // padding: 20px 0 1pc;
  padding-bottom: 1pc;
`;

const Content = ({ content }) => (
  <ContentWrap className="markdown-body" dangerouslySetInnerHTML={{ __html: content }} />
);

export default class ArticleDetail extends PureComponent {
  static defaultProps = {
    banner: 'http://statics.uberqd.com/image-saving/2017/11/26/7e40ba5c1e73ce24f6006332eaadb15c.png',
    title: '手动编译 Nginx 并安装 VeryNginx',
    content: 'VeryNginx 是个非常有意思且便捷的 Nginx 扩展程序。最近新开了台 VPS，便想体验一下它带来的快感。',
    url: 'https://blog.viosey.com/2017/10/12/compile-nginx-and-install-verynginx/',
    author: {
      avatar: 'http://statics.uberqd.com/image-saving/2017/11/26/7756f56a0748426e47f13f787ef7bfcd.png',
      name: 'Viosey',
      date: '10月 12, 2017',
    },
    actions: [
      {
        icon: IconBookmark,
        menus: [
          { label: 'Linux' },
          { label: 'Nginx' },
          { label: 'VeryNginx' },
        ],
      },
      {
        icon: IconShare,
        menus: [
          { label: '分享到微博' },
          { label: '分享到Twitter' },
          { label: '分享到QQ' },
          { label: '分享到Telegram' },
        ],
      },
    ],

    content: '',
  };

  state = {
    content: '',
  };

  componentDidMount() {
    fetch('https://raw.githubusercontent.com/whatwewant/whatwewant.github.io/master/_posts/2016-01-29-nginx-prohibites-the-access-of-unbounded-domains.md')
      .then(e => e.text())
      .then(content => this.setState({ content }));
  }

  render() {
    const { banner, title, url, author, actions, style, className } = this.props;
    const { content } = this.state;
    const rest = { style, className };

    return (
      <Container {...rest}>
        <Title
          banner={banner}
          url={url}
          title={title}
        />
        <Attributes
          author={author}
          actions={actions}
        />
        <Content
          content={marked(content)}
        />
      </Container>
    );
  }
}