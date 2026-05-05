import { MinorTextH4, TitleH2 } from "@/styles/globalStyles";
import { FaStar } from "react-icons/fa";
import { IoPeopleOutline } from "react-icons/io5";
import { ProfessionalsCardAvatar, ProfessionalsCardContainer, ProfessionalsCardContent, ProfessionalsCardInfo } from "./ProfessionalsCard.styles";

interface ProfessionalsCardProps {
  id?: string
  full_name?: string
  position?: string
  rating?: number
  onClick?: () => void
}

export default function ProfessionalsCard({ full_name, position, rating, onClick }: ProfessionalsCardProps) {
  return (
    <ProfessionalsCardContainer onClick={onClick}>
      <ProfessionalsCardContent>
        <ProfessionalsCardAvatar >
          {full_name ? (
            <TitleH2>{`${full_name?.split(' ')[0].slice(0, 1)} ${full_name?.split(' ')[1].slice(0, 1)}`}</TitleH2>
          ) : <IoPeopleOutline />}
        </ProfessionalsCardAvatar>

        <ProfessionalsCardInfo >
          <TitleH2>{full_name ? full_name : "Profissional disponível"}</TitleH2>
          <MinorTextH4>{position ? position : "Profissional disponível"}</MinorTextH4>
          {rating ? (
            <MinorTextH4><FaStar />{rating}</MinorTextH4>
          ) : null}
        </ProfessionalsCardInfo>
      </ProfessionalsCardContent>
    </ProfessionalsCardContainer>
  )
}
