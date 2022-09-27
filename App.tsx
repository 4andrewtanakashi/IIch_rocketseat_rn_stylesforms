import React from 'react'
import { ThemeProvider } from 'styled-components'
import AppLoading from 'expo-app-loading'
import { StatusBar } from 'react-native'

import {
  useFonts,
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_700Bold
} from '@expo-google-fonts/poppins'

import { Routes } from './src/routes'
import theme from './src/global/styles/theme'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import 'intl'
import 'intl/locale-data/jsonp/pt-BR'

import { AuthProvider } from './src/hooks/auth'

export default function App() {
  const [fontsLoader] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_700Bold
  });

  if (!fontsLoader) {
    return <AppLoading />
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ThemeProvider theme={theme}>
        <StatusBar barStyle={'light-content'}/>
        <AuthProvider>
          <Routes />
        </AuthProvider>
      </ThemeProvider>
    </GestureHandlerRootView>
  );
}


