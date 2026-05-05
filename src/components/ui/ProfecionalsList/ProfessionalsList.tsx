import { useAppDispatch } from "@/hooks/useAppDispatch";
import { setProfessional } from "@/redux/slices/bookingSlice";
import { Row, TitleH2 } from "@/styles/globalStyles";
import { MAnimation } from "@/styles/MaskedAnimations/MAnimation";
import { ProfessionalType } from "@/types/professional.types";
import { useParams, useRouter } from "next/navigation";
import { IoIosArrowBack } from "react-icons/io";
import { MButton } from "../MaskedButton/MaskedButton";
import ProfessionalsCard from "../ProfessionalsCard/ProfessionalsCard";
import { ProfessionalsListContainer, ProfessionalsListContent } from "./ProfessionalsList.styles";

interface ProfessionalsListProps {
  professionals: ProfessionalType[]
}

export default function ProfessionalsList({ professionals }: ProfessionalsListProps) {
  const { push } = useRouter()
  const dispatch = useAppDispatch()

  const params = useParams()
  const slug = params.slug
  // const booking = useSelector((state: RootState) => state.booking)

  const handleBack = () => {
    push(`/${slug}/servicos/`)
  }

  const handleNext = (professional: ProfessionalType) => {
    if (!professional) return

    dispatch(setProfessional(professional))

    push(`/${slug}/servicos/profissional/horario`)
  }

  return (
    <ProfessionalsListContainer>
      <ProfessionalsListContent>
        <MAnimation variant="revealFadeInRight" trigger="mount" delay={0.2}>

          <Row>
            <MButton
              $variant="default"
              shapes="circle"
              leftIcon={<IoIosArrowBack />}
              onClick={handleBack}
            >

            </MButton>
            <TitleH2>Selecione os profissionais</TitleH2>
          </Row>

        </MAnimation>

        {professionals.map((professional, index) => (
          <MAnimation key={professional.id} variant="revealFadeInUp" trigger="mount" delay={index * 0.2}>
            <ProfessionalsCard
              key={professional.id}
              id={professional.id}
              full_name={professional.full_name}
              position={professional.position}
              rating={professional.rating}
              onClick={() => handleNext(professional)}
            /></MAnimation>
        ))}
      </ProfessionalsListContent>
    </ProfessionalsListContainer>
  )
}
