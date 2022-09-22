import React from "react"

import { categories } from '../../utils/categories'
import { 
  Container,
  Title,
  Amount,
  Footer,
  Category,
  Icon,
  CategoryDescription,
  DateAction
} from './styles'



export interface TransactionCardProps {
  type: 'positive' | 'negative',
  name: string
  amount: string
  category: string
  date: string

}

interface Props {
  data: TransactionCardProps
}

export function TransactionCard( {data} : Props) {
  const [ category ] = categories.filter(
    item => item.key === data.category
  )
  return (
    <Container>
      <Title>{data.name}</Title>
      <Amount type={data.type}>
        { data.type === 'negative' && '- ' }
        R$ {data.amount}
      </Amount>
      <Footer>
        <Category>
          <Icon name={category.icon}/>
          <CategoryDescription>{category.name}</CategoryDescription>
        </Category>
        <DateAction>{data.date}</DateAction>
      </Footer>
    </Container>
  )
}