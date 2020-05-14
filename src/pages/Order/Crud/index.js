import React, { useState } from 'react';
import { format, parseISO, isValid } from 'date-fns';
import pt from 'date-fns/locale/pt';
import { toast } from 'react-toastify';

import {
  MdRemoveRedEye,
  MdEdit,
  MdDeleteForever,
  MdMoreHoriz,
} from 'react-icons/md';

import api from '~/services/api';
import history from '~/services/history';
import ReadOrder from './Read';

import { Container, Content, ButtonActions, ButtonView } from './styles';

export default function Crud({ setOrders, children }) {
  const [visible, setVisible] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const { id, recipient, start_date, end_date, signature } = children;

  function openModal() {
    setIsOpen(true);

    const startDateParse = parseISO(start_date);
    if (isValid(startDateParse)) {
      setStartDate(format(startDateParse, "dd'/'MM'/'yyyy", { locale: pt }));
    }

    const endDateParse = parseISO(end_date);
    if (isValid(endDateParse)) {
      setEndDate(format(endDateParse, "dd'/'MM'/'yyyy", { locale: pt }));
    }
  }

  function closeModal() {
    setIsOpen(false);
    setVisible(false);
  }

  function handleToggleVisible() {
    setVisible(!visible);
  }

  function handleUpdate() {
    history.push({
      pathname: '/orderupdate',
      state: { children },
    });
  }

  async function handleDelete() {
    // eslint-disable-next-line no-restricted-globals
    if (confirm('Tem certeza que deseja excluir está encomenda?')) {
      await api.delete(`/orders/${id}`);
      toast.error('Encomenda excluída com sucesso!');

      const response = await api.get('orders');

      setOrders(response.data);
    }
  }

  return (
    <Container>
      <ReadOrder
        recipient={recipient}
        startDate={startDate}
        endDate={endDate}
        signature={signature}
        closeModal={() => closeModal()}
        isOpen={isOpen}
      />

      <ButtonActions>
        <button type="button" onClick={handleToggleVisible}>
          <MdMoreHoriz size={20} color="#666" />
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
