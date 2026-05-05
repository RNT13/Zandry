'use client'

import NotFound from "@/app/not-found";
import Company from "@/components/ui/Company/Company";
import { enterpriseListMock } from "@/data/enterpriseMock";
import { useParams } from "next/navigation";
import { HomeContainer, HomeContent } from "./home.styles";

export default function Home() {
  const params = useParams()
  const slug = params.slug

  const company = enterpriseListMock.find((item) => item.slug === slug)

  if (!company) {
    return (
      <HomeContainer>
        <HomeContent>
          <NotFound />
        </HomeContent>
      </HomeContainer>
    )
  }

  return (
    <HomeContainer>
      <HomeContent>
        <Company company={company} />
      </HomeContent>
    </HomeContainer>
  )
}
