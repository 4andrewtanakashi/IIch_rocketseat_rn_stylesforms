import React, { useState } from 'react'
import { Modal } from 'react-native'
import { useForm } from 'react-hook-form'

import { Input } from '../../components/Forms/Input'
import { InputForm } from '../../components/Forms/InputForm'
import { Button } from '../../components/Forms/Button'
import { TransactionTypeButton } from '../../components/Forms/TransactionTypeButton'
import { CategorySelectDropdown } from '../../components/Forms/CategorySelectDropdown'
import { CategorySelect } from '../CategorySelect'

import {
  Container,
  Header,
  Title,
  Form,
  Fields,
  TransactionTypes
} from './styles'

interface FormData {
  name: string
  amount: string
}

export function Register () {

  const [category, setCategory] = useState( {
    key: 'category',
    name: 'Categoria'
  } )

  const [transactionType, setTransactionType] = useState('')
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false)

  const {
    control,
    handleSubmit
  } = useForm()

  function handleTransactionSelected (type : 'up' | 'down') {
    setTransactionType(type)
  }

  function handleOpenSelectCategoryModal () {
    setIsCategoryModalOpen(true)
  }

  function handleCloseSelectCategoryModal () {
    setIsCategoryModalOpen(false)
  }

  function handleRegister (form : FormData) {
    const data = {
      name: form.name,
      amount: form.amount,
      transactionType,
      category: category.key
    }
    console.log(data)
  }

  return (
    <Container>
      <Header>
        <Title>Cadastro</Title>
      </Header>

      <Form>
        <Fields>
          <InputForm
            name={'name'}
            control={control}
            placeholder='Nome'
          />

          <InputForm
            name={'amount'}
            control={control}
            placeholder='Preço
          '/>


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

        <Button 
          title='Enviar'
          onPress={handleSubmit(handleRegister)}
        />
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