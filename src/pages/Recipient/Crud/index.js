import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { MdMoreHoriz, MdEdit, MdDeleteForever } from 'react-icons/md';

import history from '~/services/history';
import api from '~/services/api';

import { Container, ButtonActions, Content, ButtonView } from './styles';

function Crud({ children, setRecipients }) {
  const [visible, setVisible] = useState(false);

  const { id } = children;

  function handleUpdate() {
    history.push({
      pathname: '/recipientupdate',
      state: children,
    });
  }

  async function handleDelete() {
    // eslint-disable-next-line no-alert
    // eslint-disable-next-line no-restricted-globals
    if (confirm('Tem certeza que deseja excluir esse destinatário!')) {
      try {
        await api.delete(`recipients/${id}`);
        toast.warn('Destinatário excluído com sucesso!');

        const recipients = await api.get('recipients');
        setRecipients(recipients.data);
      } catch (err) {
        alert(
          'Este destinatário não pode ser excluído, pois está vinculado a alguma encomenda!'
        );
      }
    }
  }

  function handleToggleVisible() {
    setVisible(!visible);
  }

  return (
    <Container>
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
