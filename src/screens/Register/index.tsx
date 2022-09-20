import React, { useState } from 'react'
import { Modal } from 'react-native'

import { Input } from '../../components/Forms/Input'
import { Button } from '../../components/Forms/Button'
import { TransactionTypeButton } from '../../components/Forms/TransactionTypeButton'
import { CategorySelect } from '../CategorySelect'

import {
  Container,
  Header,
  Title,
  Form,
  Fields,
  TransactionTypes
} from './styles'
import { CategorySelectDropdown } from '../../components/Forms/CategorySelectDropdown'

export function Register () {
  const [category, setCategory] = useState( {
    key: 'category',
    name: 'Categoria'
  } )
  const [transactionType, setTransactionType] = useState('')
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false)

  function handleTransactionSelected (type : 'up' | 'down') {
    setTransactionType(type)
  }

  function handleOpenSelectCategoryModal () {
    setIsCategoryModalOpen(true)
  }

  function handleCloseSelectCategoryModal () {
    setIsCategoryModalOpen(false)
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

          <CategorySelectDropdown
            title={category.name}
            onPress={handleOpenSelectCategoryModal}
          />
        </Fields>

        <Button title='Enviar' />
      </Form>

      <Modal visible={isCategoryModalOpen}>
        <CategorySelect 
          category={category}
          setCategory={setCategory}
          closeSelectCategory={handleCloseSelectCategoryModal}
        />
      </Modal>
    </Container>
  )
}