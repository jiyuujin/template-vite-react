import React, { useEffect, useState } from 'react'
import liff from '@line/liff'
import { SignInButton } from '../components/SignInButton'
import { SignOutButton } from '../components/SignOutButton'
import { SendMessagesButton } from '../components/SendMessagesButton'

const Top = () => {
  const [liffObject, setLiffObject] = useState<any>(null)
  const [profileName, setProfileName] = useState('')
  const [pictureUrl, setPictureUrl] = useState('')

  useEffect(() => {
    liff
      .init({ liffId: import.meta.env.VITE_APP_LIFF_ID })
      .then(() => {
        setLiffObject(liff)
        if (liff.isLoggedIn()) {
          liff
            .getProfile()
            .then((profile: any) => {
              setProfileName(profile.displayName)
              setPictureUrl(profile.pictureUrl)
            })
            .catch((err: any) => {
              console.error({ err })
            })
        }
      })
      .catch((err: any) => {
        console.error({ err })
      })
  }, [])

  const login = () => {
    if (!liffObject.isLoggedIn()) {
      liffObject.login({})
    }
  }

  const logout = () => {
    liffObject.logout()
    setProfileName('')
  }

  const sendMessages = async () => {
    await liffObject.sendMessages([
      {
        type: 'text',
        text: 'Hello World',
      },
    ])
  }

  return (
    <>
      <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div>
            {liffObject?.isLoggedIn() && (
              <img
                className="mx-auto h-12 w-auto"
                src={pictureUrl}
                alt={`${profileName} logo`}
              />
            )}
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
              {!liffObject?.isLoggedIn() ? (
                <>
                  {'Sign in to your account'}
                  <SignInButton login={login} />
                </>
              ) : (
                <>
                  {'You are signed to your account'}
                  <SignOutButton logout={logout} />
                </>
              )}
            </h2>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
              {liffObject?.isLoggedIn() && (
                <SendMessagesButton sendMessages={sendMessages} />
              )}
            </h2>
          </div>
          <form className="mt-8 space-y-6" action="#" method="POST">
            <div>
              {liffObject?.isLoggedIn() && (
                <>{`${profileName} (${liffObject?.getVersion()})`}</>
              )}
            </div>
          </form>
        </div>
      </div>
    </>
  )
}

export default Top
