import { useAppDispatch } from "@/hooks/useAppDispatch";
import { setProfessional } from "@/redux/slices/bookingSlice";
import { Row, TitleH2 } from "@/styles/globalStyles";
import { MAnimation } from "@/styles/MaskedAnimations/MAnimation";
import { useParams, useRouter } from "next/navigation";
import { IoIosArrowBack } from "react-icons/io";
import { MButton } from "../MaskedButton/MaskedButton";
import ProfessionalsCard from "../ProfessionalsCard/ProfessionalsCard";
import { ProfessionalsListContainer, ProfessionalsListContent } from "./ProfessionalsList.styles";

interface ProfessionalsListProps {
  professionals: Professional[]
}

export default function ProfessionalsList(props: ProfessionalsListProps) {
  const { push } = useRouter()
  const dispatch = useAppDispatch()

  const params = useParams()
  const slug = params.slug
  // const booking = useSelector((state: RootState) => state.booking)

  const handleBack = () => {
    push(`/${slug}/servicos/`)
  }

  const handleNext = (professional: Professional) => {
    if (!professional) return

    dispatch(setProfessional(professional))

    push(`/${slug}/servicos/profissional/horario`)
  }

  return (
    <ProfessionalsListContainer>
      <ProfessionalsListContent>
        <MAnimation variant="fadeInRight" trigger="mount" delay={0.2}>

          <Row>
            <MButton
              variant="default"
              shapes="circle"
              leftIcon={<IoIosArrowBack />}
              onClick={handleBack}
            >

            </MButton>
            <TitleH2>Selecione os profissionais</TitleH2>
          </Row>

        </MAnimation>

        {props.professionals.map((professional, index) => (
          <MAnimation key={professional.id} variant="fadeInUp" trigger="mount" delay={index * 0.2}>
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
