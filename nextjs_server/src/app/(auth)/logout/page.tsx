'use client'
import { signOut, useSession } from 'next-auth/react'
import { useEffect } from 'react'

function Logout() {
  useEffect(() => {
    signOut({ redirect: true, callbackUrl: '/' })
  }, [])

  return (
    <div>
      <h3>Signing out...</h3>
    </div>
  )
}

export default Logout
