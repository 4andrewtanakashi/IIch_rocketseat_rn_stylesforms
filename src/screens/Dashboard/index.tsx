import React, { useCallback, useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useFocusEffect } from '@react-navigation/native'

import { HighligthCard } from '../../components/HighlightCard'
import { TransactionCard, TransactionCardProps } from '../../components/TransactionCard'

import {
  Container,
  Header,
  UserWrapper,
  UserInfo,
  Photo,
  User,
  UserGreeting,
  UserName,
  Icon,
  HighligthCards,
  Transactions,
  Title,
  TransactionList,
  LogoutButton
} from './styles'

export interface DataListProps extends TransactionCardProps {
  id: string;
}

interface HighLightProps {
  amountTotal: string
}

interface HighLightData {
  entries: HighLightProps
  expensives: HighLightProps
  total: HighLightProps
}

export function Dashboard() {
  const [data, setData] = useState<DataListProps[]>([])
  const [highLightData, setHighLightData] = useState<HighLightData>({} as HighLightData)

  async function loadTransactions () {
    const dataKey = '@gofinances:transactions'
    const response = await AsyncStorage.getItem(dataKey)
    const transactions = response? JSON.parse(response) : []

    let entriesTotal = 0
    let expensiveTotal = 0

    const transactionsFormatted : DataListProps[] = transactions.map( 
      (item : DataListProps) => {
        const amount = Number(item.amount)
          .toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL'
          } )

        const date = Intl.DateTimeFormat('pt-BR', {
          day: '2-digit',
          month: '2-digit',
          year: '2-digit'
        } ).format(new Date(item.date))
      
        if (item.type === 'positive') {
          entriesTotal += Number(item.amount)
        } else {
          expensiveTotal += Number(item.amount)
        }

        return {
          id: item.id,
          name: item.name,
          amount,
          type: item.type,
          category: item.category,
          date
        }
      }
    )
    
    setData(transactionsFormatted)
    const total = entriesTotal - expensiveTotal
    setHighLightData( {
        entries: {
          amountTotal: entriesTotal.toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL'
          } )
        },
        expensives: {
          amountTotal: expensiveTotal.toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL'
          } )
        },
        total: {
          amountTotal: total.toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL'
          } )
        }
    } )
  }

  useEffect( () => {
    loadTransactions()
  } )

  useFocusEffect(useCallback( () => {
        loadTransactions()
      }, [] 
    )
  )

  return (
    <Container>
      <Header>
        <UserWrapper> 
          <UserInfo>
            <Photo 
              source={{ uri: 'https://avatars.githubusercontent.com/u/35871646?v=4' }} 
            />
            <User>
              <UserGreeting>Olá, </UserGreeting>
              <UserName>4SHI</UserName>
            </User>
          </UserInfo>
          <LogoutButton onPress={ () => {} }>
            <Icon name='power'/>
          </LogoutButton>
        </UserWrapper>
      </Header>

      <HighligthCards>
        <HighligthCard
          type={'up'}
          title={'Entradas'}
          amount={highLightData?.entries?.amountTotal}
          lastTransaction={'Última entrada dia 13 de abril'}
        />
        <HighligthCard
          type={'down'}
          title={'Saídas'}
          amount={highLightData?.expensives?.amountTotal}
          lastTransaction={'Última entrada dia 03 de abril'}
        />
        <HighligthCard
          type={'total'}
          title={'Total'}
          amount={highLightData?.total?.amountTotal}
          lastTransaction={'01 à 16 de abril'}
        />
      </HighligthCards>

      <Transactions>
        <Title>Listagem</Title>
        <TransactionList
          data={data}
          keyExtractor={ item => item.id }
          renderItem={ ({item}) => <TransactionCard data={item}/> }
        />
        
      </Transactions>
    </Container>
  )
}