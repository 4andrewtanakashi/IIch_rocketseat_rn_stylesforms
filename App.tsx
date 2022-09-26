import React from 'react'
import { ThemeProvider } from 'styled-components'
import AppLoading from 'expo-app-loading'
import { NavigationContainer } from '@react-navigation/native'
import { StatusBar } from 'react-native'

import {
  useFonts,
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_700Bold
} from '@expo-google-fonts/poppins'

import theme from './src/global/styles/theme'
import { AppRoutes } from './src/routes/app.routes'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import 'intl'
import 'intl/locale-data/jsonp/pt-BR'

import { SignIn } from './src/screens/SignIn'

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
        <NavigationContainer>
          <StatusBar barStyle={'light-content'}/>
          {/* <AppRoutes /> */}
          <SignIn />
        </NavigationContainer>
      </ThemeProvider>
    </GestureHandlerRootView>
  );
}


