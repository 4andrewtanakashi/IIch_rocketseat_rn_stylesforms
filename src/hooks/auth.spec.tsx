import React from 'react'
import { renderHook, act } from '@testing-library/react-hooks'

import { AuthProvider, useAuth } from "./auth";

jest.mock('expo-auth-session', () => {
  return {
    startAsync: () => {
      return {
        type: 'success',
        params: {
          access_token: 'test-mock'
        }
      }
    }
  }
} )

describe('hook: Auth', () => {
  it('Should be able to sign in with Google account existing', async () => {
    global.fetch = jest.fn( () => Promise.resolve( { 
      json: () => Promise.resolve( {
        id: `userInfo.id`,
        email: `userInfo.email`,
        name: `userInfo.given_name`,
        photo: `userInfo.picture`,
        locale: `userInfo.locale`,
        verified_email: `userInfo.verief_email`
      } )
     } ) ) as jest.Mock
    const { result } = renderHook( () => useAuth(), {
      wrapper: AuthProvider
    } )
    await act(() => result.current.signInWithApple())
    expect(!!result.current.user.id).toBeTruthy()
  } )
} )