'use client'

import ProfessionalsList from "@/components/ui/ProfecionalsList/ProfessionalsList"
import { ProfessionalContainer, ProfessionalContent } from "./professional.styles"


export default function Professional() {
  return (
    <ProfessionalContainer>
      <ProfessionalContent>
        <ProfessionalsList />
      </ProfessionalContent>
    </ProfessionalContainer>
  )
}
