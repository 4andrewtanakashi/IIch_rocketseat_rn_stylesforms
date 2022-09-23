import React, { useState, useEffect } from 'react'
import {
  Modal,
  Keyboard,
  Alert
} from 'react-native'
import { useForm } from 'react-hook-form'
import { useNavigation } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import uuid from 'react-native-uuid'
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
  const dataKey = '@gofinances:transactions'
  const navigation = useNavigation()

  const [category, setCategory] = useState( {
    key: 'category',
    name: 'Categoria'
  } )

  const [transactionType, setTransactionType] = useState('')
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false)

  const {
    control,
    handleSubmit,
    reset,
    formState : { errors }
  } = useForm( {
    resolver: yupResolver(schema)
  } )

  // useEffect( () => {
  //   async function loadData () {
  //     const data = await AsyncStorage.getItem(dataKey)
  //     console.log(JSON.parse(data!))
  //   }
  //   loadData()
  //   async function removeAll () {
  //     await AsyncStorage.clear()
  //   }
  //   removeAll()
  // } )

  function handleTransactionSelected (type : 'positive' | 'negative') {
    setTransactionType(type)
  }

  function handleOpenSelectCategoryModal () {
    setIsCategoryModalOpen(true)
  }

  function handleCloseSelectCategoryModal () {
    setIsCategoryModalOpen(false)
  }

  async function handleRegister (form : FormData) {
    if (!transactionType) {
      return Alert.alert('Selecione o tipo da transação')
    }

    if (category.key === 'category') {
      return Alert.alert('Selecione a categoria')
    }

    const newTransaction = {
      id: String(uuid.v4()),
      name: form.name,
      amount: form.amount,
      type: transactionType,
      category: category.key,
      date: new Date()
    }

    try {
      const data = await AsyncStorage.getItem(dataKey)
      const currentData = data? JSON.parse(data) : []

      const dataFormatted = [
        ...currentData,
        newTransaction
      ]

      await AsyncStorage.setItem(dataKey, JSON.stringify(dataFormatted))

      reset()
      setTransactionType('')
      setCategory( {
        key: 'category',
        name: 'Categoria'
      } )

      navigation.navigate('Listagem')
    } catch (error) {
      //console.log(error)
      Alert.alert('Não foi possivel salvar')
    }
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
                  onPress={_ => handleTransactionSelected('positive')}
                  isActive={transactionType === 'positive'}
                />
                <TransactionTypeButton
                  type='down'
                  title='Outcome'
                  onPress={_ => handleTransactionSelected('negative')}
                  isActive={transactionType === 'negative'}
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