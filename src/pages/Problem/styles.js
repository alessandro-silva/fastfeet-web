import styled from 'styled-components';

export const Container = styled.div`
  padding: 40px 120px;
  margin: auto;

  h1 {
    color: #333;
    font-size: 24px;
    margin: 0 0 30px;
  }
`;

export const Content = styled.div`
  display: flex;
  justify-content: space-between;
  align-content: center;
  align-items: center;
  margin-bottom: 20px;
`;

export const Search = styled.form`
  display: flex;
  background: #fff;
  border: 1px solid #eee;
  padding: 2px 10px;
  align-items: center;
  border-radius: 4px;

  input {
    border: none;
    margin-left: 2px;
    color: #999;
    font-weight: bold;
    opacity: 0.8;
  }
`;

export const Add = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  padding: 2px 10px;
  background: #7159c1;
  border-radius: 4px;

  strong {
    color: #fff;
    margin-left: 4px;
  }
`;

export const Problems = styled.table`
  width: 100%;
  border-collapse: collapse;

  thead th {
    text-align: left;
    padding: 20px;
    color: #333;
    height: 50px;
  }

  tbody {
    td {
      border-bottom: 20px solid #f5f5f5;
      background: #fff;
      color: #666;
      padding: 0 30px;
      height: 66px;

      img {
        height: 30px;
        width: 30px;
        border-radius: 15px;
        margin-right: 10px;
      }

      span {
        display: flex;
        align-items: center;
        justify-content: center;

        button {
          border: 0;
          background: none;
        }
      }
    }
  }
`;
