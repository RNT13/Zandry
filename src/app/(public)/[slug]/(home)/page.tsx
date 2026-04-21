'use client'

import Enterprise from "@/components/ui/Enterprise/Enterprise";
import { enterpriseListMock } from "@/data/enterpriseMock";
import { HomeContainer, HomeContent } from "./home.styles";

export default function Home() {
  return (
    <HomeContainer>
      <HomeContent>
        <Enterprise enterprise={enterpriseListMock[2]} />
      </HomeContent>
    </HomeContainer>
  )
}
