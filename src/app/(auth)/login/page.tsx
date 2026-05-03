'use client'

import LoginWindow from "@/components/ui/LoginWindow/LoginWindow"
import { LoginContainer, LoginContent } from "./login.styles"


export default function Login() {
  return (
    <LoginContainer>
      <LoginContent>
        <LoginWindow />
      </LoginContent>
    </LoginContainer>
  )
}
