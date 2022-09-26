import React, { useContext } from 'react'

import {
  Container,
  Header,
  TitleWrapper,
  Title,
  SignInTitle,
  Footer,
  FooterWrapper
} from './styles'

import AppleSvg from '../../assets/apple.svg'
import GoogleSvg from '../../assets/google.svg'
import LogoSvg from '../../assets/logo.svg'
import { RFValue } from 'react-native-responsive-fontsize';
import { SignInSocialButtom } from '../../components/SignInSocialButtom'
import { useAuth } from '../../hooks/auth'

export function SignIn() {
  const data = useAuth()

  return (
    <Container>
      <Header>
        <TitleWrapper>
          <LogoSvg
            width={RFValue(120)}
            height={RFValue(68)}
          />
        </TitleWrapper>

        <Title>
          Controle suas {'\n'}
          finanças de forma {'\n'}
          muito simples
        </Title>

        <SignInTitle>
          Faça seu login com {'\n'}
          uma das contas abaixo
        </SignInTitle>
      </Header>

      <Footer>
        <FooterWrapper>
          <SignInSocialButtom title={'Entrar com Google'} svg={GoogleSvg} />
          <SignInSocialButtom title={'Entrar com Apple'} svg={AppleSvg} />
        </FooterWrapper>
      </Footer>
    </Container>
  )
}