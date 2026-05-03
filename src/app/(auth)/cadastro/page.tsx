'use client'

import RegisterWindow from "@/components/ui/RegisterWindow/RegisterWindow"
import { RegisterContainer, RegisterContent } from "./register.styles"


export default function Register() {
  return (
    <RegisterContainer>
      <RegisterContent>
        <RegisterWindow />
      </RegisterContent>
    </RegisterContainer>
  )
}
