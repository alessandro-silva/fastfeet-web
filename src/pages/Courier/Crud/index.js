import React, { useState } from 'react';
import { MdMoreHoriz, MdEdit, MdDeleteForever } from 'react-icons/md';
import { toast } from 'react-toastify';

import api from '~/services/api';
import history from '~/services/history';

import { Container, ButtonActions, Content, ButtonView } from './styles';

function Crud({ children, setCouriers }) {
  const [visible, setVisible] = useState(false);

  const { id } = children;

  function handleToggleVisible() {
    setVisible(!visible);
    // console.log(children);
  }

  function handleUpdate() {
    history.push({
      pathname: '/courierupdate',
      state: children,
    });
  }

  async function handleDelete() {
    try {
      // eslint-disable-next-line no-restricted-globals
      if (confirm('Tem certeza que deseja excluir este entregador')) {
        await api.delete(`couriers/${id}`);
        toast.error('Entregador excluído com sucesso!');

        const couriers = await api.get('couriers');
        setCouriers(couriers.data);
      }
    } catch (err) {
      toast.warn('Este entregador não pode ser excluído!');
    }
  }

  return (
    <Container>
      <div />
      <ButtonActions>
        <button type="button" onClick={handleToggleVisible}>
          <MdMoreHoriz size={20} color="#999" />
        </button>
      </ButtonActions>

      <Content visible={visible}>
        <ButtonView>
          <button type="button" onClick={handleUpdate}>
            <MdEdit size={20} color="#4D85EE" />
            Editar
          </button>
        </ButtonView>
        <ButtonView>
          <button type="button" onClick={handleDelete}>
            <MdDeleteForever size={20} color="#cb2304" />
            Excluir
          </button>
        </ButtonView>
      </Content>
    </Container>
  );
}

export default Crud;
