'use client'

import Loading from "@/app/loading";
import NotFound from "@/app/not-found";
import Company from "@/components/ui/Company/Company";
import { usePublicCompany } from "@/hooks/api/usePublicCompany";
import { useParams } from "next/navigation";

export default function HomePage() {
  const params = useParams();
  const slugParam = params.slug;
  const slug = Array.isArray(slugParam) ? slugParam[0] : slugParam;

  const { company, isLoading, isError } = usePublicCompany(slug)

  if (!slug) {
    return (
      <NotFound />
    );
  }

  if (isLoading) {
    return (
      <Loading />
    );
  }

  if (isError || !company) {
    return (
      <NotFound />
    );
  }

  return (
    <Company company={company} />
  );
}
