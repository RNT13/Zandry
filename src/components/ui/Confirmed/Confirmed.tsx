import { RootState } from "@/redux/store";
import { MinorTextH4, TitleH2, TitleH3 } from "@/styles/globalStyles";
import { MAnimation } from "@/styles/MaskedAnimations/MAnimation";
import { formatMonth } from "@/utils/formateMonth";
import { useParams, useRouter } from "next/navigation";
import { FaCalendarAlt, FaMapMarkerAlt, FaPhoneAlt, FaRegCheckCircle } from "react-icons/fa";
import { IoIosArrowBack, IoIosCalendar } from "react-icons/io";
import { useSelector } from "react-redux";
import { MButton } from "../MaskedButton/MaskedButton";
import { ConfirmationTotal, ConfirmedContainer, ConfirmedContent, ConfirmedDetails, ConfirmedDiv, ConfirmedDivHeader, ConfirmedDivItem, ConfirmedHeader, ConfirmedRow, ConfirmedServices, SvgDiv } from "./Confirmed.styles";

export default function Confirmed() {
  const { push } = useRouter()
  const params = useParams()
  const slug = params.slug

  const booking = useSelector((state: RootState) => state.booking)

  const handleBack = () => {
    push(`/${slug}`)
  }



  return (
    <ConfirmedContainer>
      <ConfirmedContent>
        <ConfirmedHeader>

          <MAnimation variant="popElastic" trigger="mount" delay={0.2} center>
            <SvgDiv>
              <FaRegCheckCircle />
            </SvgDiv>
          </MAnimation>

          <MAnimation variant="fadeInUp" trigger="mount" delay={0.2} center>
            <TitleH2>Agendamento Confirmado!</TitleH2>
          </MAnimation>
          <MAnimation variant="fadeInUp" trigger="mount" delay={0.4} center>
            <TitleH3>Enviaremos uma confirmação para o seu e-mail</TitleH3>
          </MAnimation>
        </ConfirmedHeader>

        <MAnimation variant="fadeInUp" trigger="mount">
          <ConfirmedDetails>
            <TitleH3>Detalhes do agendamento</TitleH3>

            <ConfirmedDiv>

              <ConfirmedDivHeader>
                <IoIosCalendar />
              </ConfirmedDivHeader>

              <ConfirmedDivItem>
                <TitleH3>Data e Hora</TitleH3>
                <MinorTextH4>{booking.dayTime.label}, {booking.dayTime.day} de {formatMonth(booking.dayTime.month)} {booking.dayTime.year} as {booking.dayTime.time} {booking.dayTime.period}</MinorTextH4>
              </ConfirmedDivItem>

            </ConfirmedDiv>

            <ConfirmedDiv>

              <ConfirmedDivHeader>
                <FaMapMarkerAlt />
              </ConfirmedDivHeader>

              <ConfirmedDivItem>
                <TitleH3>Local</TitleH3>
                <MinorTextH4>{booking.enterprise.name}</MinorTextH4>
                <MinorTextH4>{booking.enterprise.address}</MinorTextH4>
              </ConfirmedDivItem>

            </ConfirmedDiv>

            <ConfirmedDiv>

              <ConfirmedDivHeader>
                <FaPhoneAlt />
              </ConfirmedDivHeader>

              <ConfirmedDivItem>
                <TitleH3>Contato</TitleH3>
                <MinorTextH4>{booking.enterprise.phone}</MinorTextH4>
              </ConfirmedDivItem>

            </ConfirmedDiv>

            <ConfirmedServices>
              <ConfirmedRow>
                <TitleH3>Serviços</TitleH3>
                <MinorTextH4>{booking.services.name}</MinorTextH4>
              </ConfirmedRow>

              <ConfirmedRow>
                <TitleH3>Profissional</TitleH3>
                <MinorTextH4>{booking.professional.full_name}</MinorTextH4>
              </ConfirmedRow>

              <ConfirmedRow>
                <TitleH3>Duração</TitleH3>
                <MinorTextH4>{booking.services.duration} Minutos</MinorTextH4>
              </ConfirmedRow>
            </ConfirmedServices>

            <ConfirmationTotal>
              <ConfirmedRow>
                <TitleH3>Total</TitleH3>
                <MinorTextH4>R$ {booking.services.price}</MinorTextH4>
              </ConfirmedRow>
            </ConfirmationTotal>

          </ConfirmedDetails>
        </MAnimation>



        <MAnimation variant="fadeInUp" trigger="scroll" center>
          <MButton
            variant="default"
            leftIcon={<FaCalendarAlt />}
            onClick={handleBack}
            fullWidth
          >
            Adicionar ao Calendario
          </MButton>
        </MAnimation>

        <MAnimation variant="fadeInUp" trigger="scroll" center>
          <MButton
            variant="outline"
            leftIcon={<IoIosArrowBack />}
            onClick={handleBack}
            fullWidth
          >
            Voltar
          </MButton>
        </MAnimation>
      </ConfirmedContent>
    </ConfirmedContainer>
  )
}
