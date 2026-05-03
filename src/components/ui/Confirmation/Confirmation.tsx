import { useAppDispatch } from "@/hooks/useAppDispatch";
import { setUser } from "@/redux/slices/authSlice";
import { RootState } from "@/redux/store";
import { MinorTextH4, Row, TitleH2, TitleH3 } from "@/styles/globalStyles";
import { MAnimation } from "@/styles/MaskedAnimations/MAnimation";
import { UserType } from "@/types/entities";
import { formatMonth } from "@/utils/formateMonth";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { IoIosArrowBack } from "react-icons/io";
import { useSelector } from "react-redux";
import { MButton } from "../MaskedButton/MaskedButton";
import { MInput } from "../MaskedInput/MaskedInput";
import { ConfirmationContainer, ConfirmationContent, ConfirmationInfo, ConfirmationName, ConfirmationPhone, ConfirmationRow, TotalDiv } from "./Confirmation.styles";

interface ConfirmationProps {
  user: UserType
}

export default function Confirmation(props: ConfirmationProps) {
  const { push } = useRouter()
  const dispatch = useAppDispatch()
  const params = useParams()
  const slug = params.slug

  const booking = useSelector((state: RootState) => state.booking)

  const [nameValue, setNameValue] = useState('')
  const [numberValue, setNumberValue] = useState('')

  const handleBack = () => {
    push(`/${slug}/servicos/profissional/horario`)
  }

  const handleConfirm = (user: UserType) => {
    if (!nameValue || !numberValue) return

    dispatch(setUser(user))

    push(`/${slug}/servicos/profissional/horario/confirmar/confirmado`)
  }

  return (
    <ConfirmationContainer>
      <ConfirmationContent>
        <MAnimation variant="revealFadeInRight" trigger="mount" delay={0.2}>
          <Row>
            <MButton
              $variant="default"
              shapes="circle"
              leftIcon={<IoIosArrowBack />}
              onClick={handleBack}
            >

            </MButton>
            <TitleH2>Confirme seus dados</TitleH2>
          </Row>
        </MAnimation>

        <MAnimation variant="revealFadeInRight" trigger="mount" delay={0.4}>
          <ConfirmationName>
            <TitleH2>Nome Completo</TitleH2>
            <MInput variant="default" value={nameValue} onChange={value => setNameValue(value)} placeholder="Nome Completo" />
          </ConfirmationName>
        </MAnimation>

        <MAnimation variant="revealFadeInRight" trigger="mount" delay={0.6}>
          <ConfirmationPhone>
            <TitleH2>Telefone</TitleH2>
            <MInput variant="masked" mask="(00) 00000-0000" value={numberValue} onChange={value => setNumberValue(value)} placeholder="Telefone" />
          </ConfirmationPhone>
        </MAnimation>

        <MAnimation variant="revealFadeInRight" trigger="mount" delay={0.8}>
          <ConfirmationInfo>
            <TitleH2>Detalhes do agendamento</TitleH2>
            <ConfirmationRow><TitleH3>Serviço:</TitleH3><MinorTextH4> {booking.services.name}</MinorTextH4></ConfirmationRow>
            <ConfirmationRow><TitleH3>Profissional:</TitleH3><MinorTextH4> {booking.professional.full_name ? booking.professional.full_name : "Profissional disponível"}</MinorTextH4></ConfirmationRow>
            <ConfirmationRow><TitleH3>Data:</TitleH3><MinorTextH4> {booking.dayTime.day} de {formatMonth(booking.dayTime.month)}</MinorTextH4></ConfirmationRow>
            <ConfirmationRow><TitleH3>Horário:</TitleH3><MinorTextH4> {booking.dayTime.time}</MinorTextH4></ConfirmationRow>

            <TotalDiv>
              <TitleH2>Total:</TitleH2>
              <TitleH2>R$ {booking.services.price}</TitleH2>
            </TotalDiv>
          </ConfirmationInfo>
        </MAnimation>

        <MAnimation variant="revealFadeInUp" trigger="mount" delay={1}>
          <MButton $variant="default" label="Confirmar atendimento" state={!nameValue || !numberValue ? 'disabled' : 'default'} fullWidth onClick={() => handleConfirm(props.user)}>
            Confirmar
          </MButton>
        </MAnimation>
      </ConfirmationContent>
    </ConfirmationContainer>
  )
}
