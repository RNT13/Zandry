'use client'

import Loading from "@/app/loading";
import NotFound from "@/app/not-found";
import Company from "@/components/ui/Company/Company";
import { usePublicCompany } from "@/hooks/api/usePublicCompany";
import { useParams } from "next/navigation";
import { HomeContainer, HomeContent } from "./home.styles";

export default function Home() {
  const params = useParams();
  const slugParam = params.slug;
  const slug = Array.isArray(slugParam) ? slugParam[0] : slugParam;

  const { company, isLoading, isError } = usePublicCompany(slug)

  if (!slug) {
    return (
      <HomeContainer>
        <HomeContent>
          <NotFound />
        </HomeContent>
      </HomeContainer>
    );
  }

  if (isLoading) {
    return (
      <HomeContainer>
        <HomeContent>
          <Loading />
        </HomeContent>
      </HomeContainer>
    );
  }

  if (isError || !company) {
    return (
      <HomeContainer>
        <HomeContent>
          <NotFound />
        </HomeContent>
      </HomeContainer>
    );
  }

  return (
    <HomeContainer>
      <HomeContent>
        <Company company={company} />
      </HomeContent>
    </HomeContainer>
  );
}
