import { MinorTextH4, TitleH2 } from "@/styles/globalStyles";
import { FaRegClock } from "react-icons/fa";
import { ServiceCardContainer, ServiceCardContent, ServiceCardFooter, ServiceCardHeader, ServiceCardWrapper } from "./ServiceCard.styles";

interface ServiceCardProps {
  id: string
  name: string
  description: string
  price: number
  duration: number
  onClick?: () => void
}

export default function ServiceCard({ name, description, price, duration, onClick }: ServiceCardProps) {
  return (
    <ServiceCardContainer onClick={onClick}>
      <ServiceCardContent>
        <ServiceCardWrapper>
          <ServiceCardHeader>
            <TitleH2>{name}</TitleH2>
            <MinorTextH4>{description}</MinorTextH4>
          </ServiceCardHeader>

          <ServiceCardFooter>
            <MinorTextH4> <FaRegClock />{duration} min</MinorTextH4>
            <TitleH2>R$ {price}</TitleH2>
          </ServiceCardFooter>
        </ServiceCardWrapper>
      </ServiceCardContent>
    </ServiceCardContainer>
  )
}
