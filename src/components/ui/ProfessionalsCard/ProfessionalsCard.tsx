import { MinorTextH4, TitleH2 } from "@/styles/globalStyles";
import { FaStar } from "react-icons/fa";
import { IoPeopleOutline } from "react-icons/io5";
import { ProfessionalsCardAvatar, ProfessionalsCardContainer, ProfessionalsCardContent, ProfessionalsCardInfo } from "./ProfessionalsCard.styles";

interface ProfessionalsCardProps {
  id?: number
  full_name?: string
  position?: string
  rating?: number
  onClick?: () => void
}

export default function ProfessionalsCard(props: ProfessionalsCardProps) {
  return (
    <ProfessionalsCardContainer onClick={props.onClick}>
      <ProfessionalsCardContent>
        <ProfessionalsCardAvatar >
          {props.full_name ? (
            <TitleH2>{`${props.full_name?.split(' ')[0].slice(0, 1)} ${props.full_name?.split(' ')[1].slice(0, 1)}`}</TitleH2>
          ) : <IoPeopleOutline />}
        </ProfessionalsCardAvatar>

        <ProfessionalsCardInfo >
          <TitleH2>{props.full_name ? props.full_name : "Profissional disponível"}</TitleH2>
          <MinorTextH4>{props.position ? props.position : "Profissional disponível"}</MinorTextH4>
          {props.rating ? (
            <MinorTextH4><FaStar />{props.rating}</MinorTextH4>
          ) : null}
        </ProfessionalsCardInfo>
      </ProfessionalsCardContent>
    </ProfessionalsCardContainer>
  )
}
