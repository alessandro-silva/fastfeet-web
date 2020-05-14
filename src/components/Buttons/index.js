import React from 'react';

import { MdDoneAll, MdRotateLeft } from 'react-icons/md';

import { Actions, ButtonComeBack, ButtonDone } from './styles';

function Buttons({ onBack, onDone }) {
  return (
    <Actions>
      <ButtonComeBack onClick={onBack} type="button">
        <MdRotateLeft size={26} color="#fff" />
        VOLTAR
      </ButtonComeBack>
      <ButtonDone type="button" onClick={onDone}>
        <MdDoneAll size={26} color="#fff" />
        SALVAR
      </ButtonDone>
    </Actions>
  );
}

export default Buttons;
