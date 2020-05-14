import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { MdMoreHoriz, MdRemoveRedEye, MdDoNotDisturbAlt } from 'react-icons/md';

import api from '~/services/api';
import history from '~/services/history';
import ReadProblem from './Read';
import { Container, ButtonActions, Content, ButtonView } from './styles';

function Crud({ children }) {
  const [visible, setVisible] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const { delivery_id } = children;

  function handleToggleVisible() {
    setVisible(!visible);
  }

  function openModal() {
    setIsOpen(!isOpen);
  }

  function closeModal() {
    setIsOpen(false);
    setVisible(false);
  }

  async function handleDelete() {
    // eslint-disable-next-line no-restricted-globals
    if (confirm('Tem certeza que deseja cancelar está encomenda!')) {
      await api.delete(`problems/${delivery_id}`);
      toast.error('Encomenda cancelada com sucesso!');

      history.push('/order');
    }
  }

  return (
    <Container>
      <ReadProblem problem={children} closeModal={closeModal} isOpen={isOpen} />

      <ButtonActions>
        <button type="button" onClick={handleToggleVisible}>
          <MdMoreHoriz size={20} color="#999" />
        </button>
      </ButtonActions>

      <Content visible={visible}>
        <ButtonView>
          <button type="button" onClick={openModal}>
            <MdRemoveRedEye size={20} color="#7159c1" />
            Visualizar
          </button>
        </ButtonView>
        <ButtonView>
          <button type="button" onClick={handleDelete}>
            <MdDoNotDisturbAlt size={20} color="#cb2304" />
            Cancelar
          </button>
        </ButtonView>
      </Content>
    </Container>
  );
}

export default Crud;
