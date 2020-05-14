import React, { useRef } from 'react';
import { Form } from '@unform/web';
import { toast } from 'react-toastify';

import { Input } from '~/components/Form';
import Buttons from '~/components/Buttons';
import history from '~/services/history';
import api from '~/services/api';

import { Container } from './styles';

function Update({ location }) {
  const formRef = useRef(null);

  const {
    id,
    city,
    complement,
    name,
    number,
    state,
    street,
    zip_code,
  } = location.state;

  function navigateBack() {
    history.push('/recipient');
  }

  function handleDone() {
    formRef.current.submitForm();
  }

  async function handleSubmit({
    cep,
    cidade,
    complemento,
    estado,
    nome,
    numero,
    rua,
  }) {
    await api.put('recipients', {
      id,
      name: nome,
      street: rua,
      number: numero,
      complement: complemento,
      state: estado,
      city: cidade,
      zip_code: cep,
    });

    toast.warn('Destinatário editado com sucesso!');
    history.push('recipient');
  }

  return (
    <Container>
      <div>
        <strong>Edição de destinatário</strong>

        <Buttons onBack={() => navigateBack()} onDone={() => handleDone()} />
      </div>

      <Form
        initialData={{
          cep: zip_code,
          cidade: city,
          complemento: complement,
          estado: state,
          nome: name,
          numero: number,
          rua: street,
        }}
        ref={formRef}
        onSubmit={handleSubmit}
      >
        <label htmlFor="">
          Nome
          <Input name="nome" />
        </label>
        <div>
          <label className="street" htmlFor="">
            Rua
            <Input name="rua" />
          </label>
          <label htmlFor="">
            Número
            <Input name="numero" />
          </label>
          <label htmlFor="">
            Complemento
            <Input name="complemento" />
          </label>
        </div>
        <div>
          <label htmlFor="">
            Cidade
            <Input name="cidade" />
          </label>
          <label htmlFor="">
            Estado
            <Input name="estado" />
          </label>
          <label htmlFor="">
            CEP
            <Input name="cep" />
          </label>
        </div>
      </Form>
    </Container>
  );
}

export default Update;
