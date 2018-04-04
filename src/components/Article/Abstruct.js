import React, { PureComponent } from 'react';
import styled from 'styled-components';
import { Link } from 'dva/router';

import Card, { CardActions, CardContent, CardMedia, CardHeader } from 'material-ui/Card';
import Avatar from 'material-ui/Avatar';

const Container = styled(Card)`
  font-size: 1pc;
  font-weight: 400;
  overflow: hidden;
  z-index: 1;
  position: relative;
  background: #fff;
  width: 100%;
  min-height: 25pc;
  margin: 8px;
  margin-bottom: 47.59px;
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

  display: flex;
  padding: 24.72px;
  cursor: pointer;
  flex-grow: 1;
  flex-direction: row;
  align-items: flex-end;

  color: #fafafa;
`;

const TitleName = styled(Link)`
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
    <TitleName to={url}>{title}</TitleName>
  </TitleWrap>
);

const AbstructWrap = styled.div`
  // color: #757575;
  color: #2f2f2f;
  font-size: 13px;
  line-height: 18px;
  font-weight: 400;
  text-align: justify;
  overflow: hidden;
  min-height: 76px;
  padding: 1pc;
  padding-top: 29.03px;

  display: inline;
  align-items: center;
`;

const AbstructLink = styled(Link)`
  font-size: 13px;
  color: #607d8b;
  -webkit-tap-highlight-color: rgba(255,255,255,0);
  margin-left: 18px;
`;

const Abstruct = ({ url, content }) => (
  <AbstructWrap>
    {content}
    <AbstructLink to={url}>阅读原文</AbstructLink>
  </AbstructWrap>
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

const CategoryWrap = styled.div`
  font-size: 13px;
  margin-right: 20px;
  display: flex;
  align-items: center;
`;

const CategoryLink = styled(Link)`
  color: #607d8b;
  font-weight: 400;
  text-decoration: none;
  -webkit-tap-highlight-color: rgba(255,255,255,0);
`;

const Category = ({ url, label }) => (
  <CategoryWrap>
    <CategoryLink to={url}>{label}</CategoryLink>
  </CategoryWrap>
);

const Attributes = ({ author, category, date }) => (
  <AttributesWrap>
    <Author {...author} date={date} />
    <Category {...category} />
  </AttributesWrap>
);

export default class ArticleAbstruct extends PureComponent {
  static defaultProps = {
    // banner: 'http://statics.uberqd.com/image-saving/2017/11/26/7e40ba5c1e73ce24f6006332eaadb15c.png',
    // title: '手动编译 Nginx 并安装 VeryNginx',
    // content: 'VeryNginx 是个非常有意思且便捷的 Nginx 扩展程序。最近新开了台 VPS，便想体验一下它带来的快感。',
    // url: 'https://blog.viosey.com/2017/10/12/compile-nginx-and-install-verynginx/',
    // author: {
    //   avatar: 'http://statics.uberqd.com/image-saving/2017/11/26/7756f56a0748426e47f13f787ef7bfcd.png',
    //   name: 'Viosey',
    // },
    // category: {
    //   label: '技术向',
    //   url: 'https://cdn.viosey.com/img/avatar/blog_avatar.png',
    // },
    // createdAt: '10月 12, 2017',
  };

  render() {
    const { banner, title, content, url, author, category, createdAt, className, style } = this.props;
    const props = { className, style };

    return (
      <Container {...props}>
        <Title
          banner={banner}
          url={url}
          title={title}
        />
        <Abstruct
          url={url}
          content={content}
        />
        <Attributes
          author={author}
          category={category}
          date={createdAt}
        />
      </Container>
    );
  }
}