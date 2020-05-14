import styled from 'styled-components';

export const Container = styled.div`
  align-self: center;
  text-align: center;
  width: 120px;
  height: 120px;
  margin-bottom: 30px;
  border: 1px dashed #dddddd;
  border-radius: 50%;

  label {
    cursor: pointer;

    &:hover {
      opacity: 0.7;
    }

    img {
      width: 120px;
      height: 120px;
      border-radius: 50%;
      background: #eee;
    }

    svg {
      margin-top: 20px;
    }

    strong {
      display: flex;
      color: #dddddd;
      justify-content: center;
    }

    input {
      display: none;
    }
  }
`;
