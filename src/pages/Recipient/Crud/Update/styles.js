import styled from 'styled-components';

export const Container = styled.div`
  padding: 40px 120px;
  margin: auto;

  > div {
    display: flex;
    max-width: 800px;
    margin: 10px auto;
    justify-content: space-between;
    /* text-align: center; */
    /* align-items: center; */

    strong {
      color: #333;
      font-size: 24px;
      margin: 0 0 30px;
    }
  }

  form {
    display: flex;
    flex-direction: column;
    max-width: 800px;
    margin: 10px auto;
    background: #fff;
    padding: 20px;
    border-radius: 4px;

    div {
      display: flex;
      justify-content: space-between;
      width: 96%;
      .street {
        width: 990px;
      }

      > label {
        display: flex;
        flex-direction: column;
        width: 50%;
        color: #333;
        font-weight: bold;
        margin-bottom: 10px;
      }
    }

    label {
      display: flex;
      flex-direction: column;
      color: #333;
      font-weight: bold;
      margin: 10px 0;

      input {
        width: 95%;
        margin: 10px 0;
        border: 1px solid hsl(0, 0%, 80%);
        height: 38px;
        border-radius: 4px;
        color: #808080;
        font-weight: bold;
        padding-left: 10px;
      }
    }
  }
`;
