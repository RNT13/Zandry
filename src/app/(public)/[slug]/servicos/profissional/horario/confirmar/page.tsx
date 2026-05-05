'use client'

import Confirmation from "@/components/ui/Confirmation/Confirmation"
import { UserType } from "@/types/user.types"
import { ConfirmContainer, ConfirmContent } from "./confirm.styles"

interface ConfirmProps {
  user: UserType
}

export default function Confirm({ user }: ConfirmProps) {
  return (
    <ConfirmContainer>
      <ConfirmContent>
        <Confirmation user={user} />
      </ConfirmContent>
    </ConfirmContainer>
  )
}
