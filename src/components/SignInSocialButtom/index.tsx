import React from 'react'
import { RectButtonProps } from 'react-native-gesture-handler'

import {
  Button,
  ImageContainer,
  Title
} from './styles'
import { SvgProps } from 'react-native-svg'

interface Props extends RectButtonProps {
  title: string
  svg: React.FC<SvgProps>
}

export function SignInSocialButtom({ title, svg: Svg, ...rest }: Props) {
  return (
    <Button {...rest}>
      <ImageContainer >
        <Svg />
      </ImageContainer>
      <Title>{title}</Title>
    </Button>
  )
}