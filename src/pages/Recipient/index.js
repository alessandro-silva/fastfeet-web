import React, { useState, useEffect } from 'react';
import { Input } from '@rocketseat/unform';
import { MdSearch, MdAdd } from 'react-icons/md';

import api from '~/services/api';
import history from '~/services/history';
import Crud from './Crud';

import { Container, Content, Search, Add, Recipients } from './styles';

export default function Recipient() {
  const [recipients, setRecipients] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    async function loadRecipients() {
      const response = await api.get('recipients');

      setRecipients(response.data);
    }
    loadRecipients();
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();

    const response = await api.get(`recipient?name=${search}`);

    setRecipients(response.data);
    setSearch('');
  }

  function handleChange(e) {
    setSearch(e.target.value);
  }

  function handleCreate() {
    history.push('/recipientcreate');
  }

  return (
    <Container>
      <h1>Gerenciando destinatários </h1>

      <Content>
        <Search onSubmit={handleSubmit}>
          <MdSearch size={26} color="#999" />
          <Input
            value={search}
            onChange={handleChange}
            name="search"
            type="text"
            placeholder="Buscar por destinatários"
          />
        </Search>
        <Add onClick={handleCreate} type="button">
          <MdAdd size={26} color="#FFF" />
          <strong>CADASTRAR</strong>
        </Add>
      </Content>

      <Recipients>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nome</th>
            <th>Endereço</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {recipients.map((recipient) => (
            <tr key={recipient.id}>
              <td>#{recipient.id}</td>
              <td>{recipient.name}</td>
              <td>
                {recipient.street}, {recipient.number}, {recipient.city} -{' '}
                {recipient.state}
              </td>
              <td>
                <Crud setRecipients={setRecipients}>{recipient}</Crud>
              </td>
            </tr>
          ))}
        </tbody>
      </Recipients>
    </Container>
  );
}
