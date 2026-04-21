import { daysMock } from "@/data/daysMock";
import { timeMock } from "@/data/timeMock";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { setDateTime } from "@/redux/slices/bookingSlice";
import { Row, TitleH2, TitleH3 } from "@/styles/globalStyles";
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
      period: selectedTime.period,
      time: selectedTime.time
    }))

    push(`/${slug}/servicos/profissional/horario/confirmar`)
  }


  return (
    <DataTimeContainer>
      <DataTimeContent>
        <Row>
          <MButton
            variant="default"
            shapes="circle"
            leftIcon={<IoIosArrowBack />}
            onClick={handleBack}
          >

          </MButton>
          <TitleH2>Selecione Data & Hora</TitleH2>
        </Row>

        <DataContainer>
          <TitleH3>Escolha o dia </TitleH3>

          <DaysContainer>
            {daysMock.map((day) => (
              <DayItem
                key={day.data}
                $isActive={day.data === selectedDay?.data}
                onClick={() => setSelectedDay(day)}
              >
                <TitleH2>{day.label}</TitleH2>
                <TitleH3>{day.day}</TitleH3>
              </DayItem>
            ))}
          </DaysContainer>

          <TitleH3>Escolha o horário</TitleH3>

          <TimeContainer>
            {timeMock.map((time) => (
              <TimeItem
                key={time.id}
                $isActive={time.id === selectedTime?.id}
                onClick={() => setSelectedTime(time)}
              >
                <TitleH3>{time.time} - {time.period}</TitleH3>
              </TimeItem>
            ))}
          </TimeContainer>
        </DataContainer>

        <MButton variant="default" fullWidth state={!selectedDay || !selectedTime ? 'disabled' : 'default'} onClick={handleNext}>
          Confirmar
        </MButton>

      </DataTimeContent>
    </DataTimeContainer>
  )
}
