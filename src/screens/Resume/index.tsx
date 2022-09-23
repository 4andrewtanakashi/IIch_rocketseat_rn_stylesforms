import React, { useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'

import {
  Container,
  Header,
  Title,
  Content
 } from './styles'
import { HistoryCard } from '../../components/HistoryCard'
import { TransactionCardProps } from '../../components/TransactionCard'
import { categories } from '../../utils/categories'

interface CategoryData {
  key: string
  name: string
  total: string
  color: string
}

export function Resume() {
  const [time, setTime] = useState(2)
  const [totalCategories, setTotalByCategories] = useState<CategoryData[]>([])

  async function loadingData () {
    const dataKey = '@gofinances:transactions'
    const response = await AsyncStorage.getItem(dataKey)
    const responseFormatted = response? JSON.parse(response) : []

    const expensives = responseFormatted
      .filter( (expensive : TransactionCardProps) => expensive.type === 'negative')
    
    const totalByCategory : CategoryData[] = []
    
    categories.forEach( category => {
      let categorySum = 0
      
      expensives.forEach( (expensive : TransactionCardProps) => {
        if (expensive.category === category.key) {
          categorySum += Number(expensive.amount)
        }
      } )

      if (categorySum > 0) {
        const total = categorySum
          .toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL'
          } )

        totalByCategory.push( {
          key: category.key,
          name: category.name,
          color: category.color,
          total
        } )
      }
    } )
    setTotalByCategories(totalByCategory)
  }

  useEffect( () => {
    const t = setInterval(
      () => setTime(2),
      200,
    );
    loadingData()
    return () => clearInterval(t)
  }, [] )

  return (
    <Container>
      <Header>
        <Title>Resumo por categoria</Title>
      </Header>

      <Content>
        {
          totalCategories.map( item =>
            <HistoryCard
              key={item.key}
              title={item.name}
              amount={item.total}
              color={item.color}
            />
          )
        }
      </Content>
    </Container>
  )
}