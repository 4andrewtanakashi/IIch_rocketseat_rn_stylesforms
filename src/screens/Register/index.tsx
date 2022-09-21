import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import {
  Modal,
  Keyboard,
  Alert
} from 'react-native'
import { TouchableWithoutFeedback } from 'react-native-gesture-handler'
import * as Yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'

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
  amount: number
}

const schema = Yup.object().shape( {
  name: Yup
    .string()
    .required('Nome é obrigatório'),
  amount:  Yup
    .number()
    .typeError('Apenas números')
    .positive('O valor não pode ser negativo')
    .required('O valor é obrigatório')
} ).required()

export function Register () {

  const [category, setCategory] = useState( {
    key: 'category',
    name: 'Categoria'
  } )

  const [transactionType, setTransactionType] = useState('')
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false)

  const {
    control,
    handleSubmit,
    formState : { errors }
  } = useForm( {
    resolver: yupResolver(schema)
  } )

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
    if (!transactionType) {
      return Alert.alert('Selecione o tipo da transação')
    }

    if (category.key === 'category') {
      return Alert.alert('Selecione a categoria')
    }

    const data = {
      name: form.name,
      amount: form.amount,
      transactionType,
      category: category.key
    }
    console.log(data)
  }

  return (
    <TouchableWithoutFeedback 
      onPress={Keyboard.dismiss}
      containerStyle={ { flex: 1 } }
      style={ { flex: 1 } }
      >
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
                autoCapitalize={'sentences'}
                autoCorrect={false}
                error={errors.name && errors.name.message}
              />

              <InputForm
                name={'amount'}
                control={control}
                placeholder='Preço'
                keyboardType={'numeric'}
                error={errors.amount && errors.amount.message}
              />


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
    </TouchableWithoutFeedback>
  )
}