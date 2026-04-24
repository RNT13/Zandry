'use client'

import NotFound from "@/app/not-found";
import Enterprise from "@/components/ui/Enterprise/Enterprise";
import { enterpriseListMock } from "@/data/enterpriseMock";
import { useParams } from "next/navigation";
import { HomeContainer, HomeContent } from "./home.styles";

export default function Home() {
  const params = useParams()
  const slug = params.slug

  const enterprise = enterpriseListMock.find((item) => item.slug === slug)

  if (!enterprise) {
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
        <Enterprise enterprise={enterprise} />
      </HomeContent>
    </HomeContainer>
  )
}
