import { MinorTextH4, TitleH2 } from "@/styles/globalStyles";
import { FaRegClock } from "react-icons/fa";
import { ServiceCardContainer, ServiceCardContent, ServiceCardFooter, ServiceCardHeader, ServiceCardWrapper } from "./ServiceCard.styles";

interface ServiceCardProps {
  id: number
  name: string
  description: string
  price: number
  duration: number
  onClick?: () => void
}

export default function ServiceCard(props: ServiceCardProps) {
  return (
    <ServiceCardContainer onClick={props.onClick}>
      <ServiceCardContent>
        <ServiceCardWrapper>
          <ServiceCardHeader>
            <TitleH2>{props.name}</TitleH2>
            <MinorTextH4>{props.description}</MinorTextH4>
          </ServiceCardHeader>

          <ServiceCardFooter>
            <MinorTextH4> <FaRegClock />{props.duration} min</MinorTextH4>
            <TitleH2>R$ {props.price}</TitleH2>
          </ServiceCardFooter>
        </ServiceCardWrapper>
      </ServiceCardContent>
    </ServiceCardContainer>
  )
}
