import { daysMock } from "@/data/daysMock";
import { timeMock } from "@/data/timeMock";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { setDateTime } from "@/redux/slices/bookingSlice";
import { Row, TitleH2, TitleH3 } from "@/styles/globalStyles";
import { MAnimation } from "@/styles/MaskedAnimations/MAnimation";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { IoIosArrowBack } from "react-icons/io";
import { MButton } from "../MaskedButton/MaskedButton";
import { DataContainer, DataTimeContainer, DataTimeContent, DayItem, DaysContainer, TimeContainer, TimeItem } from "./DataTime.styles";


export default function DataTime() {
  const { push } = useRouter()
  const dispatch = useAppDispatch()
  const [selectedDay, setSelectedDay] = useState<(typeof daysMock[0]) | null>(null)
  const [selectedTime, setSelectedTime] = useState<(typeof timeMock[0]) | null>(null)

  const params = useParams()
  const slug = params.slug

  const handleBack = () => {
    push(`/${slug}/servicos/profissional`)
  }

  const handleNext = () => {
    if (!selectedDay || !selectedTime) return

    dispatch(setDateTime({
      day: selectedDay.day,
      month: selectedDay.month,
      year: selectedDay.year,
      label: selectedDay.label,
      data: selectedDay.data,
      time: selectedTime.time
    }))

    push(`/${slug}/servicos/profissional/horario/confirmar`)
  }


  return (
    <DataTimeContainer>
      <DataTimeContent>
        <MAnimation variant="revealFadeInRight" trigger="mount" delay={0.2}>
          <Row>
            <MButton
              $variant="default"
              shapes="circle"
              leftIcon={<IoIosArrowBack />}
              onClick={handleBack}
            >

            </MButton>
            <TitleH2>Selecione Data & Hora</TitleH2>
          </Row>
        </MAnimation>

        <DataContainer>
          <MAnimation variant="revealFadeInLeft" trigger="mount" delay={0.2}>
            <TitleH3>Escolha o dia </TitleH3>
          </MAnimation>

          <DaysContainer>
            {daysMock.map((day, index) => (
              <MAnimation key={day.day} variant="revealFadeInRight" trigger="mount" delay={index * 0.2} center>
                <DayItem
                  key={day.data}
                  $isActive={day.data === selectedDay?.data}
                  onClick={() => setSelectedDay(day)}
                >
                  <TitleH2>{day.label}</TitleH2>
                  <TitleH3>{day.day}</TitleH3>
                </DayItem>
              </MAnimation>
            ))}
          </DaysContainer>

          <MAnimation variant="revealFadeInLeft" trigger="mount" delay={0.2}>
            <TitleH3>Escolha o horário</TitleH3>
          </MAnimation>

          <TimeContainer>
            {timeMock.map((time, index) => (
              <MAnimation key={time.time} variant="revealFadeInRight" trigger="mount" delay={index * 0.05}>
                <TimeItem
                  key={time.id}
                  $isActive={time.id === selectedTime?.id}
                  onClick={() => setSelectedTime(time)}
                >
                  <TitleH3><p>{time.time}</p></TitleH3>
                </TimeItem>
              </MAnimation>
            ))}
          </TimeContainer>
        </DataContainer>

        <MAnimation variant="revealFadeInUp" trigger="mount" delay={0.2}>
          <MButton $variant="default" fullWidth state={!selectedDay || !selectedTime ? 'disabled' : 'default'} onClick={handleNext}>
            Confirmar
          </MButton>
        </MAnimation>

      </DataTimeContent>
    </DataTimeContainer>
  )
}
