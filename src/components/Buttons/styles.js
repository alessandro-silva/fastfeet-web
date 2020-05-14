import styled from 'styled-components';

export const Actions = styled.div`
  display: flex;
  width: 222px;
  height: 30px;
`;

export const ButtonComeBack = styled.button`
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: center;
  background: #cccccc;
  color: #fff;
  font-weight: bold;
  border: none;
  margin-right: 5px;
  border-radius: 4px;
  transition: background 0.9s;

  &:hover {
    background: #7159c1;
  }

  svg {
    margin-right: 5px;
  }
`;

export const ButtonDone = styled.button`
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: center;
  background: #7159c1;
  color: #fff;
  font-weight: bold;
  border: none;
  margin-right: 5px;
  border-radius: 4px;

  svg {
    margin-right: 5px;
  }
`;
