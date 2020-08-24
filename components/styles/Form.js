import styled, { keyframes } from "styled-components";

const loading = keyframes`
  from {
    background-position: 0 0;
    /* rotate: 0; */
  }
  to {
    background-position: 100% 100%;
    /* rotate: 360deg; */
  }
`;

const Form = styled.form`
  /* box-shadow: ${(props) => props.theme.bs}; */
  /* border-radius: 22px; */

  /* padding: 24px 24px; */
  font-size: 1.5rem;
  line-height: 1.5;
  font-weight: 600;
  label {
    display: block;
    margin-bottom: 1rem;
  }
  input,
  textarea,
  select {
    padding-left: 10px;
    width: 100%;
    padding: 1rem;
    font-size: 1.75rem;
    margin-bottom: 10px;
    border-width: 0px;
    border-bottom-width: 1px;

    /* border-radius: 22px; */
    &:focus {
      outline: 0;
      border-width: 0px;
      border-bottom-width: 2px;
      border-bottom-color: black;
    }
  }
  button,
  input[type='submit'] {
    /* border-radius: 22px; */
    border-width: 0px;
    /* width: auto; */
    background: white;
    color: ${(props) => props.theme.lightBlue};
    /* box-shadow: ${(props) => props.theme.bs}; */
    float: right;
    /* border: 0; */
    font-size: 2rem;
    font-weight: 600;
    padding: 0.5rem 1.2rem;
    transition: box-shadow 0.5s;
    &:hover,
    &:focus {
         /* box-shadow: ${(props) => props.theme.bs}; */
         cursor: pointer;
    }
  }
  
  fieldset {
    border: 0;
    padding: 0;
    &[disabled] {
      opacity: 0.5;
    }
    &::before {
      /* height: 12px;
      content: '';
      display: block;
      background: ${(props) => props.theme.darkBlue} */
    }
    &[aria-busy='true']::before {
      background-size: 50% auto;
      animation: ${loading} 0.5s linear infinite;
    }
  }
`;

export default Form;
