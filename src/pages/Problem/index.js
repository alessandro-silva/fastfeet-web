import React, { useState, useEffect } from 'react';

import api from '~/services/api';

import Crud from './Crud';
import { Container, Problems } from './styles';

export default function Problem() {
  const [problems, setProblems] = useState([]);

  useEffect(() => {
    async function loadProblems() {
      const response = await api.get('problems');

      setProblems(response.data);
    }
    loadProblems();
  }, []);

  return (
    <Container>
      <h1>Problemas na entrega</h1>

      <Problems>
        <thead>
          <tr>
            <th>Encomenda</th>
            <th>Problema</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {problems.map((problem) => (
            <tr key={problem.id}>
              <td>#{problem.id}</td>
              <td>{problem.description}</td>
              <td>
                <Crud>{problem}</Crud>
              </td>
            </tr>
          ))}
        </tbody>
      </Problems>
    </Container>
  );
}
