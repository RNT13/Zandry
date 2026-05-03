'use client'

import Confirmation from "@/components/ui/Confirmation/Confirmation"
import { UserType } from "@/types/entities"
import { ConfirmContainer, ConfirmContent } from "./confirm.styles"

interface ConfirmProps {
  user: UserType
}

export default function Confirm(props: ConfirmProps) {
  return (
    <ConfirmContainer>
      <ConfirmContent>
        <Confirmation user={props.user} />
      </ConfirmContent>
    </ConfirmContainer>
  )
}
