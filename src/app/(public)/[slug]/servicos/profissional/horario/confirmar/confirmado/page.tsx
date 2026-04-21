'use client'

import Confirmed from "@/components/ui/Confirmed/Confirmed"
import { ConfirmedContainer, ConfirmedContent } from "./confirmed.styles"


export default function confirmed() {
  return (
    <ConfirmedContainer>
      <ConfirmedContent>
        <Confirmed />
      </ConfirmedContent>
    </ConfirmedContainer>
  )
}
