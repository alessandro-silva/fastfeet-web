import React, { useState, useEffect, useRef } from 'react';
import { Form } from '@unform/web';
import { toast } from 'react-toastify';

import { Select, Input } from '~/components/Form/index';

import api from '~/services/api';
import history from '~/services/history';
import Buttons from '~/components/Buttons';

import { Container } from './styles';

export default function CreateOrder() {
  const [recipients, setRecipients] = useState([]);
  const [couriers, setCouriers] = useState([]);

  const formRef = useRef(null);

  useEffect(() => {
    async function loadRecipients() {
      const response = await api.get('recipients');

      setRecipients(response.data);
    }
    async function loadCouriers() {
      const response = await api.get('couriers');

      setCouriers(response.data);
    }

    loadRecipients();
    loadCouriers();
  }, []);

  const optionsCouriers = couriers.map((courier) => {
    return {
      id: courier.id,
      value: courier.id,
      label: courier.name,
    };
  });

  const optionsRecipients = recipients.map((recipient) => {
    return {
      id: recipient.id,
      value: recipient.id,
      label: recipient.name,
    };
  });

  function navigateBack() {
    history.push('/order');
  }

  async function handleSubmit({ recipient, courier, product }) {
    await api.post('orders', {
      recipient_id: recipient,
      deliveryman_id: courier,
      product,
    });

    toast.info('Encomenda cadastrada com sucesso!');
  }

  function handleDone() {
    formRef.current.submitForm();
  }

  return (
    <Container>
      <div>
        <strong>Cadastro de encomendas</strong>
        <Buttons onBack={() => navigateBack()} onDone={() => handleDone()} />
      </div>

      <Form ref={formRef} onSubmit={handleSubmit}>
        <div className="selects">
          <label htmlFor="recipientId">
            Destinatário
            <Select
              id="recipientId"
              name="recipient"
              options={optionsRecipients}
            />
          </label>
          <label htmlFor="">
            Entregador
            <Select name="courier" options={optionsCouriers} />
          </label>
        </div>
        <label htmlFor="">
          Nome do produto
          <Input name="product" placeholder="Livros autodesenvolvimento" />
        </label>
      </Form>
    </Container>
  );
}
