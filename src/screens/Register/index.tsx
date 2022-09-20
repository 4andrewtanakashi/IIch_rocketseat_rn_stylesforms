import React, { useState } from 'react';

import { Input } from '../../components/Forms/Input';
import { Button } from '../../components/Forms/Button'
import { TransactionTypeButton } from '../../components/Forms/TransactionTypeButton';


import {
  Container,
  Header,
  Title,
  Form,
  Fields,
  TransactionTypes
} from './styles';
import { CategorySelectDropdown } from '../../components/Forms/CategorySelectDropdown';

export function Register() {
  const [transactionType, setTransactionType] = useState('')

  function handleTransactionSelected (type : 'up' | 'down') {
    setTransactionType(type)
  }
  return (
    <Container>
      <Header>
        <Title>Cadastro</Title>
      </Header>

      <Form>
        <Fields>
          <Input placeholder='Nome'/>
          <Input placeholder='Preço'/>

          <TransactionTypes>
            <TransactionTypeButton 
              type='up'
              title='Income'
              onPress={_ => handleTransactionSelected('up')}
              isActive={transactionType === 'up'}
            />
            <TransactionTypeButton
              type='down'
              title='Outcome'
              onPress={_ => handleTransactionSelected('down')}
              isActive={transactionType === 'down'}
            />
          </TransactionTypes>

          <CategorySelectDropdown title='Categoria'/>
        </Fields>

        <Button title='Enviar' />
      </Form>
    </Container>
  );
}