import React, { useState, useEffect, useRef } from 'react';
import { Form } from '@unform/web';
import { toast } from 'react-toastify';

import { Select, Input } from '~/components/Form';
import Buttons from '~/components/Buttons';
import api from '~/services/api';
import history from '~/services/history';

import { Container } from './styles';

export default function UpdateOrder({ location }) {
  const [recipients, setRecipients] = useState([]);
  const [couriers, setCouriers] = useState([]);
  const formRef = useRef(null);

  const { id, product, recipient, deliveryman } = location.state.children;

  useEffect(() => {
    async function loadRecipients() {
      const response = await api.get('/recipients');

      setRecipients(response.data);
    }
    async function loadCouriers() {
      const response = await api.get('/couriers');

      setCouriers(response.data);
    }

    loadRecipients();
    loadCouriers();
  }, []);

  const optionsRecipients = recipients.map((itemRecipient) => {
    return {
      id: itemRecipient.id,
      value: itemRecipient.id,
      label: itemRecipient.name,
    };
  });

  const optionsCouriers = couriers.map((courier) => {
    return {
      id: courier.id,
      value: courier.id,
      label: courier.name,
    };
  });

  async function handleSubmit({
    selectRecipient,
    selectCourier,
    inputProduct,
  }) {
    await api.put('/orders', {
      id,
      recipient_id: selectRecipient,
      deliveryman_id: selectCourier,
      product: inputProduct,
    });
    toast.warn('Encomenda editada com sucesso!');
  }

  function navigateBack() {
    history.push('/order');
  }

  function handleDone() {
    formRef.current.submitForm();
  }

  return (
    <Container>
      <div>
        <strong>Edição de encomendas</strong>
        <Buttons onBack={() => navigateBack()} onDone={() => handleDone()} />
      </div>

      <Form
        initialData={{
          inputProduct: product,
          selectRecipient: {
            id: recipient.id,
            value: recipient.id,
            label: recipient.name,
          },
          selectCourier: {
            id: deliveryman.id,
            value: deliveryman.id,
            label: deliveryman.name,
          },
        }}
        ref={formRef}
        onSubmit={handleSubmit}
      >
        <div className="selects">
          <label htmlFor="">
            Destinatário
            <Select name="selectRecipient" options={optionsRecipients} />
          </label>
          <label htmlFor="">
            Entregador
            <Select name="selectCourier" options={optionsCouriers} />
          </label>
        </div>
        <label htmlFor="">
          Nome do Produto
          <Input name="inputProduct" placeholder="produto" />
        </label>
      </Form>
    </Container>
  );
}
