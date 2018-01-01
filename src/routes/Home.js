import React from 'react';
import styled from 'styled-components';
import { connect } from 'dva';
import { createSelector } from 'reselect';
import { withStyles } from 'material-ui/styles';

import Button from 'material-ui/IconButton';
import Avatar from 'material-ui/Avatar';
import Card, { CardMedia, CardContent } from 'material-ui/Card';
import { FormControl } from 'material-ui/Form';
import Input, { InputLabel } from 'material-ui/Input';

import IconSearch from 'material-ui-icons/Search';
import IconMoreVert from 'material-ui-icons/MoreVert';
import IconCarousel from 'material-ui-icons/ViewCarousel';

import { Abstruct } from '../components/Article';
import DropMenu from '../components/DropMenu';

import { titleBannerSelector, authorSelector } from '../selectors/app';
import postSelector from '../selectors/post';

const Page = styled.div`
  position: relative;
  width: 100%;
  max-width: 900px;
  padding: 0;
  padding-top: 165px;
  margin: 0 auto;
  background-color: #E6E8E9;
  display: flex;
  flex-flow: row wrap;
  align-items: stretch;
  flex-shrink: 0;

  @media screen and (max-width: 480px) {
    padding-top: 0;
  }
`;

const VoeCard = styled(Card)`
  display: flex;
  min-height: 25pc;
  flex-direction: column;
  align-items: stretch;
  border-radius: 2px;
  margin-bottom: 47.59px;
  box-sizing: border-box;
  
  @media (min-width: 840px) {
    width: ${props => props.width || 'calc(66.6666667% - 1pc)'};
    margin: 8px;
    margin-bottom: 47.59px;
  }

  @media (max-width: 840px) and (min-width: 481px) {
    transition: 1s;
    min-height: 200px;
    width: ${props => props.width || 'calc(66.6666667% - 1pc)'};
    margin: 8px;
    margin-bottom: 47.59px;
  }

  @media (max-width: 480px) {
    height: 100%;
    transition: 1s;
    width: 100%;
    margin: 0;
    border-radius: 0;
  }
`;

const DailyCardMedia = styled(CardMedia)`
  box-sizing: border-box;
  padding: 24.72px;
  display: flex;
  flex-direction: row;
  flex-grow: 1;
  align-items: flex-end;
  background-size: cover;
`;

const DailyCardTitle = styled.p`
  font-size: 24px;
  line-height: 26px;
  font-weight: 600;
  letter-spacing: 0;
  text-shadow: 1px 1px 8px #444;
  color: rgba(250, 250, 250, 1);
  margin: 0;
`;

const DailyCardContent = styled(CardContent)`
  box-sizing: border-box;
  font-size: 13px;
  color: #757575;
  line-height: 18px;
  overflow: hidden;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  padding: 1pc !important;
  min-height: 4pc;
  width: 100%;

  @media screen and (max-width: 480px) {
    display: none;
  }
`;

const DailyCardAvatar = styled(Avatar)`
  width: 32px !important;
  height: 32px !important;
`;

const DailyCardName = styled.strong`
  margin-left: 16px;
`;

const DailyBanner = ({ title, banner, author = {} }) => (
  <VoeCard>
    <DailyCardMedia
      image={banner}
      title={title}
    >
      <DailyCardTitle>{title}</DailyCardTitle>
    </DailyCardMedia>
    <DailyCardContent>
      <DailyCardAvatar src={author.avatar} />
      <DailyCardName>{author.nickname}</DailyCardName>
    </DailyCardContent>
  </VoeCard>
);

const SearchWrapper = styled.div`
  position: relative;
  margin-top: -32px;
  height: 99px;
`;

const SearchText = styled(Input)`
  margin: 0;
  padding: 0;
  border: 0;
  position: absolute !important;
  right: 56px;

  &::before {
    height: 0 !important;
  }
`;

const SearchLabel = styled.label`
  position: absolute;
  top: 0;
  right: 28px;
  bottom: unset;
  left: unset;
`;

const Search = () => (
  <SearchWrapper>
    <SearchText
      id="search"
      type="search"
    />
    <SearchLabel htmlFor="search">
      <Button
        style={{
          backgroundColor: '#607d8b',
          width: 56,
          height: 56,
          boxShadow: '0 4px 5px 0 rgba(0,0,0,.14), 0 1px 10px 0 rgba(0,0,0,.12), 0 2px 4px -1px rgba(0,0,0,.2)',
        }}
      >
        <IconSearch style={{ color: '#fff' }} />
      </Button>
    </SearchLabel>
  </SearchWrapper>
);

const SomethingElseLogoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-top-right-radius: 2px;
  border-top-left-radius: 2px;
  font-size: 13px;
  flex-grow: 1;
  box-sizing: border-box;
  padding: 24px;
  background-size: cover;
  background-color: #fff;
  color: #757575;
`;

const SomethingElseLogoLink = styled.a`
  color: #607d8b;
  font-weight: 300;
`;

const SomethingElseLogoImg = styled.img`
  margin-bottom: 10px;
  width: 10pc;
  height: 10pc;
`;

const SomethingElseLogo = ({ href = 'https://www.viosey.com', logo = 'data:image/png;base64,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' }) => (
  <SomethingElseLogoWrapper>
    <SomethingElseLogoLink href={href}>
      <SomethingElseLogoImg src={logo} />
    </SomethingElseLogoLink>
  </SomethingElseLogoWrapper>
);

const SomethingElseMetaWrap = styled.div`
  font-size: 13px;
  color: #757575;
  line-height: 18px;
  font-weight: bold;

  height: 64px;
  padding: 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const SomethingElseMetaName = styled.div`

`;

const SomethingElseMentaActions = styled.div`
  display: flex;
  margin-right: 8px;
`;

const VoeDropMenu = styled(DropMenu)`
  margin-right: -16px;
`;

class SomethingElseMeta extends React.PureComponent {
  render() {
    const { name = 'Viosey\'s Blog' } = this.props;

    return (
      <SomethingElseMetaWrap>
        <SomethingElseMetaName>{name}' Blog</SomethingElseMetaName>
        <SomethingElseMentaActions>
          <VoeDropMenu
            icon={IconCarousel}
            menus={[
              { label: '关于我' },
              { label: '标签云' },
              { label: '友情链接' },
            ]}
          />
          <VoeDropMenu
            icon={IconMoreVert}
            menus={[
              { label: '文章 RSS' },
              { label: '分享到微博' },
              { label: '分享到Twitter' },
              { label: '分享到QQ' },
            ]}
          />
        </SomethingElseMentaActions>
      </SomethingElseMetaWrap>
    );
  }
}

const SomethingElseWrap = styled(VoeCard)`
  @media screen and (max-width: 480px) {
    width: 100%;
    margin-bottom: 30px;
    transition: 1s;
    border-radius: 0 !important;
  }
`;

const SomethingElse = ({ author }) => (
  <SomethingElseWrap width="calc(33.333% - 1pc)">
    <Search />
    <SomethingElseLogo />
    <SomethingElseMeta name={author.nickname} />
  </SomethingElseWrap>
);

// const mapState = ({ app, post, category }) => {
//   return {
//     title: app.title,
//     banner: app.banner,
//     author: app.author,
//     posts: Object.values(post).slice(0, 5).map(e => ({
//       ...e,
//       category: category[e.category], 
//     })),
//   };
// };

function limit(data = [], offset = 0, limit = 5) {
  return limit.slice(offset, limit);
}

const mapState = createSelector(
  [titleBannerSelector, authorSelector, postSelector],
  ({ title, banner }, author, posts = []) => ({
    title, banner, author, posts,
  }),
);

@connect(mapState)
@withStyles(styles)
class Home extends React.PureComponent {
  render() {
    const { title, banner, author, posts } = this.props;
    return (
      <Page>
        <DailyBanner title={title} banner={banner} author={author} />
        <SomethingElse author={author} />
        {posts.map(e => (
          <Abstruct key={e.id} {...e} />
        ))}
      </Page>
    );
  }
}

const styles = {
  root: {
    textAlign: 'center',
    paddingTop: 200,
  },
};

export default Home;
