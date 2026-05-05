import { useAppDispatch } from "@/hooks/useAppDispatch";
import { setService } from "@/redux/slices/bookingSlice";
import { Row, TitleH2 } from "@/styles/globalStyles";
import { MAnimation } from "@/styles/MaskedAnimations/MAnimation";
import { ServiceType } from "@/types/service.types";
import { useParams, useRouter } from "next/navigation";
import { IoIosArrowBack } from "react-icons/io";
import { MButton } from "../MaskedButton/MaskedButton";
import ServiceCard from "../ServiceCard/ServiceCard";
import { ServiceListContainer, ServiceListContent } from "./ServiceList.styles";

interface ServiceListProps {
  services: ServiceType[]
}

export default function ServiceList({ services }: ServiceListProps) {
  const { push } = useRouter()
  const dispatch = useAppDispatch()

  const params = useParams()
  const slug = params.slug

  const handleBack = () => {
    push(`/${slug}`)
  }

  const handleNext = (service: ServiceType) => {
    if (!service) return

    dispatch(setService(service))

    push(`/${slug}/servicos/profissional`)
  }

  return (
    <ServiceListContainer>
      <ServiceListContent>
        <MAnimation variant="revealFadeInRight" trigger="mount" delay={0.2}>
          <Row>
            <MButton
              $variant="default"
              shapes="circle"
              leftIcon={<IoIosArrowBack />}
              onClick={handleBack}
            >

            </MButton>
            <TitleH2>Selecione o serviço</TitleH2>
          </Row>
        </MAnimation>

        {services.map((service, index) => (
          <MAnimation key={service.id} variant="revealFadeInUp" trigger="mount" delay={index * 0.2}>
            <ServiceCard
              key={service.id}
              id={service.id}
              name={service.name}
              description={service.description}
              price={service.price}
              duration={service.duration}
              onClick={() => handleNext(service)}
            />
          </MAnimation>
        ))}

      </ServiceListContent>
    </ServiceListContainer>
  )
}
