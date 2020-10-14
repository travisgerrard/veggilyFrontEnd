import styled from 'styled-components';

const NavStyles = styled.ul`
  margin: 0;
  margin-right: 2rem;
  padding: 0;
  display: flex;
  justify-self: end;
  font-size: 2rem;
  a,
  button {
    padding: 1rem 1rem;
    display: flex;
    align-items: center;
    position: relative;
    font-weight: 900;
    font-size: 0.75em;
    background: none;
    border: 0;
    cursor: pointer;
    color: black;
    font-weight: 800;
    /* @media (max-width: 700px) {
      font-size: 10px;
      padding: 0 10px;
    } */
    &:before {
      content: '';
      width: 2px;
      /* background: black; */
      height: 100%;
      left: 0;
      position: absolute;
      /* transform: skew(-20deg); */
      top: 0;
      bottom: 0;
    }
    &:after {
      height: 2px;
      background: black;
      content: '';
      width: 0;
      position: absolute;
      transform: translateX(-50%);
      transition: width 0.4s;
      transition-timing-function: cubic-bezier(1, -0.65, 0, 2.31);
      left: 50%;
      margin-top: 2rem;
    }
    &:hover,
    &:focus {
      outline: none;
      &:after {
        width: calc(100% - 60px);
      }
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
      font-weight: 900;
      font-size: 1.25em;
      a,
      button {
        padding: 1rem 2rem;
      }
    }
    @media (min-width: 1025px) {
      /* big landscape tablets, laptops, and desktops */
      font-weight: 900;
      font-size: 1.25em;
      a,
      button {
        padding: 1rem 2rem;
      }
    }
    @media (min-width: 1281px) {
      /* hi-res laptops and desktops */
      font-weight: 900;
      font-size: 1.25em;
      a,
      button {
        padding: 1rem 2rem;
      }
    }
  }
`;

export default NavStyles;
