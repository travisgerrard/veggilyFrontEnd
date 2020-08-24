import styled from 'styled-components';

const Meal = styled.div`
  /* background: ${props => props.theme.lightBlue}; */
  /* border: 1px solid ${props => props.theme.lightBlue}; */
  /* width: 300px; */
  border-radius: 22px;
  border-style: solid;
  border-width: 1px;
  border-color: transparent;
  box-shadow: ${props => props.theme.bs};
  position: relative;
  display: flex;
  flex-direction: column;
  padding: 12px 12px;
  /* transition: box-shadow 0.5s ease-in-out; */
  transition: border-color  0.25s ease-in-out;
  &:hover,
    &:focus {
         /* box-shadow: ${(props) => props.theme.bsRaised}; */
         border-color: ${(props) => props.theme.lightBlue};
         cursor: pointer;
    }
  img {
    width: 143px;
    height: 143px;
    object-fit: cover;
    align-self: center;
  }
  p {
    font-size: 15px;
    /* line-height: 2; */
    font-weight: 300;
    flex-grow: 1;
    /* padding: 0 3rem; */
    align-self: flex-start;
    margin: 0;
  }
  .buttonList {
    display: grid;
    width: 100%;
    border-top: 1px solid ${props => props.theme.lightgrey};
    grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
    grid-gap: 1px;
    background: ${props => props.theme.lightgrey};
    & > * {
      background: white;
      border-bottom-left-radius: 22px; 
      border-bottom-right-radius: 22px;
      border: 0;
      font-family: 'radnika_next';
      font-size: 1rem;
      padding: 1rem;
    }
    
  }
`;

export default Meal;