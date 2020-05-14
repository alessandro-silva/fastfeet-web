import React, { useRef } from 'react';
import { Form } from '@unform/web';
import { toast } from 'react-toastify';

import { Input } from '~/components/Form';
import Buttons from '~/components/Buttons';
import AvatarInput from './AvatarInput';
import api from '~/services/api';
import history from '~/services/history';

import { Container } from './styles';

export default function CreateCourier() {
  const formRef = useRef(null);

  async function handleSubmit({ avatar_id, name, email }) {
    await api.post('couriers', {
      name,
      avatar_id,
      email,
    });

    toast.success('Entregador cadastrado com sucesso!');
    avatar_id = '';
    name = '';
    email = '';
  }

  function navigateBack() {
    history.push('/courier');
  }

  function handleDone() {
    formRef.current.submitForm();
  }

  return (
    <Container>
      <div>
        <strong>Cadastro de entregadores</strong>
        <Buttons onBack={() => navigateBack()} onDone={() => handleDone()} />
      </div>

      <Form ref={formRef} onSubmit={handleSubmit}>
        <AvatarInput name="avatar_id" />

        <label htmlFor="">
          Nome
          <Input name="name" placeholder="Exemplo Silva" />
        </label>
        <label htmlFor="">
          Email
          <Input name="email" type="email" placeholder="exemplo@midas.com" />
        </label>
      </Form>
    </Container>
  );
}
