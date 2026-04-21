'use client'

import ProfessionalsList from "@/components/ui/ProfecionalsList/ProfessionalsList"
import { professionalsListMock } from "@/data/professionalsMock"
import { ProfessionalContainer, ProfessionalContent } from "./professional.styles"


export default function Professional() {
  return (
    <ProfessionalContainer>
      <ProfessionalContent>
        <ProfessionalsList professionals={professionalsListMock} />
      </ProfessionalContent>
    </ProfessionalContainer>
  )
}
