import styled from 'styled-components';

const Meal = styled.div`
  border-radius: 22px;
  box-shadow: ${(props) => props.theme.bs};
  position: relative;
  display: flex;
  flex-direction: column;
  transition: border-color 0.25s ease-in-out;
  &:hover,
  &:focus {
    /* box-shadow: ${(props) => props.theme.bsRaised}; */
    border-color: ${(props) => props.theme.lightBlue};
    cursor: pointer;
  }
  img {
    display: block;
    width: 100%;
    height: auto;
    border-radius: 22px;
  }
  .overlay {
    position: absolute;
    bottom: 0;
    background: rgb(0, 0, 0);
    background: rgba(255, 255, 255, 0.85); /* Black see-through */
    color: #f1f1f1;
    width: 100%;
    transition: 0.5s ease;
    color: black;
    font-size: 20px;
    padding: 0px;
    text-align: left;
    border-bottom-left-radius: 22px;
    border-bottom-right-radius: 22px;
  }
  .title {
    font-size: 26px;
    line-height: 1.6;
    font-weight: bold;
    padding: 0px;
    padding-left: 10px;
    padding-top: 5px;
    margin: 0px;
  }
  .subtitle {
    line-height: 1.6;
    font-size: 18px;
    padding: 0px;
    padding-left: 10px;
    padding-bottom: 10px;
    margin: 0px;
  }

  .buttonList {
    display: grid;
    width: 100%;
    border-top: 1px solid ${(props) => props.theme.lightgrey};
    grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
    grid-gap: 1px;
    background: ${(props) => props.theme.lightgrey};
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
