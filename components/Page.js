import React, { Component } from 'react';
import styled, { ThemeProvider, createGlobalStyle } from 'styled-components';
import Header from './Header';
import Meta from './Meta';

const theme = {
  yellow: '#FFE74C',
  red: '#FF5965',
  white: '#FFFFFF',
  darkBlue: '#38618C',
  lightBlue: '#35A7FF',
  halfBlack: 'rgba(0, 0, 0, 0.5)',
  maxWidth: '1000px',
  bs: '0 4px 40px 0 rgba(0, 0, 0, 0.25)',
  bsRaised: '0 10px 60px 0 rgba(0, 0, 0, 0.4)',
  bsTight: '4px 4px 4px 4px rgba(0, 0, 0, 0.1)',
};

const StyledPage = styled.div`
  background: white;
  color: ${(props) => props.theme.black};
`;

const Inner = styled.div`
  max-width: ${(props) => props.theme.maxWidth};
  margin: 0 auto;
  padding: 0rem;
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
    padding: 2rem;
  }
  @media (min-width: 1025px) {
    /* big landscape tablets, laptops, and desktops */
    padding: 2rem;
  }
  @media (min-width: 1281px) {
    /* hi-res laptops and desktops */
    padding: 2rem;
  }
`;

const GlobalStyles = createGlobalStyle`
    html {
      box-sizing: border-box;
      font-size: 10px;
    }
    *, *:before, *:after {
      box-sizing: inherit;
    }
    body {
      padding: 0;
      margin: 0;
      font-size: 1.5rem;
      line-height: 2;
      font-family: 'helvetica';
    }
    a {
      text-decoration: none;
      color: ${theme.red};
    }
    button {  font-family: 'helvetica'; }
  `;

class Page extends Component {
  render() {
    return (
      <ThemeProvider theme={theme}>
        <StyledPage>
          <GlobalStyles />
          <Meta />
          <Header />
          <Inner>{this.props.children}</Inner>
        </StyledPage>
      </ThemeProvider>
    );
  }
}

export default Page;
