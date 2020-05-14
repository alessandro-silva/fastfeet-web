import React, { useRef } from 'react';
import { Form } from '@unform/web';
import { toast } from 'react-toastify';

import { Input } from '~/components/Form';
import Buttons from '~/components/Buttons';
import AvatarInput from './AvatarInput';
import history from '~/services/history';
import api from '~/services/api';

import { Container } from './styles';

function Update({ location }) {
  const formRef = useRef(null);

  const { avatar, email, id, name } = location.state;

  async function handleSubmit({ avatar_id, emailInput, nameInput }) {
    await api.put('couriers', {
      id,
      name: nameInput,
      avatar_id,
      email: emailInput,
    });

    toast.info('Entregador editado com sucesso!');

    console.log(location.state);
  }

  function navigateBack() {
    history.push('courier');
  }

  function handleDone() {
    formRef.current.submitForm();
  }

  return (
    <Container>
      <div>
        <strong>Edição de entregadores</strong>

        <Buttons onBack={() => navigateBack()} onDone={() => handleDone()} />
      </div>
      <Form
        initialData={{
          emailInput: email,
          nameInput: name,
        }}
        ref={formRef}
        onSubmit={handleSubmit}
      >
        <AvatarInput avatar={avatar} />

        <label htmlFor="">
          Nome
          <Input name="nameInput" />
        </label>
        <label htmlFor="">
          Email
          <Input name="emailInput" />
        </label>
      </Form>
    </Container>
  );
}

export default Update;
