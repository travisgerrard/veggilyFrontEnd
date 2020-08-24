import Link from "next/link";
import styled from "styled-components";
import NProgress from "nprogress";
import Router from "next/router";
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
  font-size: 4rem;
  margin-left: 2rem;
  margin-top: 0;
  margin-bottom: 0;
  position: relative;
  z-index: 2;
  /* transform: skew(-10deg); */
  a {
    padding: 0.5rem 1rem;
    color: black;
    text-decoration: none;
  }
  @media (max-width: 1300px) {
    margin: 0;
    text-align: center;
  }
`;

const TextButton = styled.h1`
  font-size: 3rem;
  position: relative;
  a {
    padding: 0.5rem 1rem;
    color: black;
    text-decoration: none;
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
