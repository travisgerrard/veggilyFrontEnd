import Link from 'next/link';
import styled from 'styled-components';
import NProgress from 'nprogress';
import Router from 'next/router';
import Nav from './Nav';

Router.onRouteChangeStart = () => {
  NProgress.start();
};
Router.onRouteChangeComplete = () => {
  NProgress.done();
};

Router.onRouteChangeError = () => {
  NProgress.done();
};

const Logo = styled.h1`
  margin-top: 0;
  margin-bottom: 0;
  position: relative;
  font-size: 2.5rem;
  z-index: 2;
  /* transform: skew(-10deg); */
  a {
    padding: 0.5rem 1rem;
    color: black;
    text-decoration: none;
  }

  @media (min-width: 320px) {
    /* smartphones, portrait iPhone, portrait 480x320 phones (Android) */
  }
  @media (min-width: 480px) {
    /* smartphones, Android phones, landscape iPhone */
  }
  @media (min-width: 600px) {
    /* portrait tablets, portrait iPad, e-readers (Nook/Kindle), landscape 800x480 phones (Android) */
  }
  @media (min-width: 801px) {
    /* tablet, landscape iPad, lo-res laptops ands desktops */
    font-size: 4rem;
    margin-left: 2rem;
  }
  @media (min-width: 1025px) {
    /* big landscape tablets, laptops, and desktops */
    font-size: 4rem;
    margin-left: 2rem;
  }
  @media (min-width: 1281px) {
    /* hi-res laptops and desktops */
    font-size: 4rem;
    margin-left: 2rem;
  }
`;

const StyledHeader = styled.header`
  display: grid;
  grid-template-columns: auto 1fr;
  justify-content: space-between;
  align-items: stretch;
`;

const Header = () => (
  <StyledHeader>
    <Logo>
      <Link href="/">
        <a>Veggily</a>
      </Link>
    </Logo>
    <Nav />
  </StyledHeader>
);

export default Header;
