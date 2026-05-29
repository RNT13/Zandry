'use client'

import Confirmation from "@/components/ui/Confirmation/Confirmation"
import { ConfirmContainer, ConfirmContent } from "./confirm.styles"


export default function Confirm() {
  return (
    <ConfirmContainer>
      <ConfirmContent>
        <Confirmation />
      </ConfirmContent>
    </ConfirmContainer>
  )
}
