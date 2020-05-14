import React, { useState, useEffect } from 'react';
import { Input } from '@rocketseat/unform';
import { MdSearch, MdAdd } from 'react-icons/md';

import api from '~/services/api';
import history from '~/services/history';
import Crud from './Crud';

import { Container, Content, Search, Add, Couriers } from './styles';

export default function Courier() {
  const [couriers, setCouriers] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    async function loadCouriers() {
      const response = await api.get('couriers');

      setCouriers(response.data);
    }
    loadCouriers();
  }, []);

  function handleChange(e) {
    setSearch(e.target.value);
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const searchCourier = await api.get(`courier?name=${search}`);

    setCouriers(searchCourier.data);
    setSearch('');
  }

  function handleCreate() {
    history.push('couriercreate');
  }

  return (
    <Container>
      <h1>Gerenciando entregadores</h1>

      <Content>
        <Search onSubmit={handleSubmit}>
          <MdSearch size={26} color="#999" />
          <Input
            value={search}
            onChange={handleChange}
            name="search"
            type="text"
            placeholder="Buscar por entregadores"
          />
        </Search>
        <Add onClick={handleCreate} type="button">
          <MdAdd size={26} color="#FFF" />
          <strong>CADASTRAR</strong>
        </Add>
      </Content>

      <Couriers>
        <thead>
          <tr>
            <th>ID</th>
            <th>Foto</th>
            <th>Nome</th>
            <th>Email</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {couriers.map((courier) => (
            <tr key={courier.id}>
              <td>#{courier.id}</td>
              <td>
                <img src={courier.avatar.url} alt="profile" />
              </td>
              <td>{courier.name}</td>
              <td>{courier.email}</td>
              <td>
                <Crud setCouriers={setCouriers}>{courier}</Crud>
              </td>
            </tr>
          ))}
        </tbody>
      </Couriers>
    </Container>
  );
}
