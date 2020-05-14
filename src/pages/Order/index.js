import React, { useState, useEffect } from 'react';
import { MdSearch, MdAdd } from 'react-icons/md';
import { Input } from '@rocketseat/unform';

import Crud from './Crud';

import api from '~/services/api';
import history from '~/services/history';

import {
  Container,
  Content,
  Search,
  Add,
  Orders,
  Deliveryman,
  Cancelada,
  Entrege,
  Retirada,
  Pendente,
} from './styles';

export default function Order() {
  const [orders, setOrders] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    async function loadOrders() {
      const response = await api.get('orders');

      setOrders(response.data);
    }

    loadOrders();
  }, []);

  function handleChange(e) {
    setSearch(e.target.value);
  }

  async function handleSubmit(e) {
    e.preventDefault(e);

    const orderFilter = await api.get(`order?product=${search}`);

    setSearch('');

    if (orderFilter.data.length !== 0) {
      setOrders(orderFilter.data);
    }
  }

  function handleStatus(order) {
    if (order.canceled_at !== null) {
      return (
        <Cancelada>
          <div />
          CANCELADA
        </Cancelada>
      );
    }

    if (order.end_date !== null) {
      return (
        <Entrege>
          <div />
          ENTREGE
        </Entrege>
      );
    }

    if (order.start_date !== null && order.end_date === null) {
      return (
        <Retirada>
          <div />
          RETIRADA
        </Retirada>
      );
    }

    if (order.start_date === null) {
      return (
        <Pendente>
          <div />
          PENDENTE
        </Pendente>
      );
    }
  }

  function handleCreate() {
    history.push('ordercreate');
  }

  return (
    <Container>
      <h1>Gerenciando encomendas</h1>

      <Content>
        <Search onSubmit={handleSubmit}>
          <MdSearch size={26} color="#999" />
          <Input
            value={search}
            onChange={handleChange}
            name="search"
            type="text"
            placeholder="Buscar por encomendas"
          />
        </Search>
        <Add onClick={handleCreate} type="button">
          <MdAdd size={26} color="#FFF" />
          <strong>CADASTRAR</strong>
        </Add>
      </Content>

      <Orders>
        <thead>
          <tr>
            <th>ID</th>
            <th>Destinatário</th>
            <th>Entregador</th>
            <th>Cidade</th>
            <th>Estado</th>
            <th>Status</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.id}>
              <td>#{order.id}</td>
              <td>{order.recipient.name}</td>
              <td>
                <Deliveryman>
                  <img src={order.deliveryman.avatar.url} alt="bobMarley" />
                  {order.deliveryman.name}
                </Deliveryman>
              </td>
              <td>{order.recipient.city}</td>
              <td>{order.recipient.state}</td>
              <td>{handleStatus(order)}</td>
              <td>
                <Crud setOrders={setOrders}>{order}</Crud>
              </td>
            </tr>
          ))}
        </tbody>
      </Orders>
    </Container>
  );
}
