import React, { useRef } from 'react';
import { Form } from '@unform/web';
import { toast } from 'react-toastify';

import api from '~/services/api';
import history from '~/services/history';
import { Input } from '~/components/Form';
import Buttons from '~/components/Buttons';
import { Container } from './styles';

export default function Create() {
  const formRef = useRef(null);

  async function handleSubmit({
    cep,
    cidade,
    complemento,
    estado,
    nome,
    numero,
    rua,
  }) {
    await api.post('recipients', {
      name: nome,
      street: rua,
      number: numero,
      complement: complemento,
      state: estado,
      city: cidade,
      zip_code: cep,
    });

    toast.success('Destinatário cadastrado com sucesso!');
    history.push('recipient');
  }

  function navigateBack() {
    history.push('/recipient');
  }

  function handleDone() {
    formRef.current.submitForm();
  }

  return (
    <Container>
      <div>
        <strong>Cadastro de destinatário</strong>

        <Buttons onBack={() => navigateBack()} onDone={() => handleDone()} />
      </div>

      <Form ref={formRef} onSubmit={handleSubmit}>
        <label htmlFor="">
          Nome
          <Input name="nome" placeholder="Exemplo Silva" />
        </label>
        <div>
          <label className="street" htmlFor="">
            Rua
            <Input name="rua" placeholder="Mercúrio" />
          </label>
          <label htmlFor="">
            Número
            <Input name="numero" placeholder="1997" />
          </label>
          <label htmlFor="">
            Complemento
            <Input name="complemento" placeholder="apartamento 13" />
          </label>
        </div>
        <div>
          <label htmlFor="">
            Cidade
            <Input name="cidade" placeholder="Florianópolis" />
          </label>
          <label htmlFor="">
            Estado
            <Input name="estado" placeholder="Santa Catarina" />
          </label>
          <label htmlFor="">
            CEP
            <Input name="cep" placeholder="06535-110" />
          </label>
        </div>
      </Form>
    </Container>
  );
}
