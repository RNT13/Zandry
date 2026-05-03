import { useAppDispatch } from "@/hooks/useAppDispatch";
import {
  nextStep,
  prevStep,
  selectAdvantagesData,
  updateAdvantagesData
} from "@/redux/slices/registerSlice";
import { Column, MinorTextH4, Row, TitleH2 } from "@/styles/globalStyles";
import { MAnimation } from "@/styles/MaskedAnimations/MAnimation";
import { FormikProvider, useFormik } from "formik";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { useSelector } from "react-redux";
import * as yup from 'yup';
import { MButton } from "../../MaskedButton/MaskedButton";
import { FormikMInput } from "../../MaskedInput/FormikMaskedInput";
import ProgressBar from "../../ProgressBar/ProgressBar";
import {
  RegisterColumn,
  RegisterRow,
  RegisterWindowBody,
  RegisterWindowFooter,
  RegisterWindowHeader,
  RegisterWindowWrapper
} from "../RegisterWindow.styles";

export default function Step03AdvantagesInfo() {
  const dispatch = useAppDispatch()
  const advantagesData = useSelector(selectAdvantagesData)

  const [showCustom, setShowCustom] = useState(false)
  const [mandayToday, setMandayToady] = useState(false)
  const [allDays, setAllDays] = useState(false)

  const form = useFormik({
    enableReinitialize: true,
    initialValues: {
      opening_hours: advantagesData.opening_hours,
      advantage1: advantagesData.advantage1,
      advantage2: advantagesData.advantage2,
      advantage3: advantagesData.advantage3,
      default_start: '',
      default_end: ''
    },
    validationSchema: yup.object({}),
    onSubmit: (values) => {
      dispatch(updateAdvantagesData({
        opening_hours: values.opening_hours,
        advantage1: values.advantage1,
        advantage2: values.advantage2,
        advantage3: values.advantage3
      }))

      dispatch(nextStep())
    }
  })

  // SEGUNDA A SEXTA
  const handleApplyWeekDays = () => {
    if (!form.values.default_start || !form.values.default_end) return

    const updated = form.values.opening_hours.map((day, index) => ({
      ...day,
      start: index <= 4 ? form.values.default_start : '',
      end: index <= 4 ? form.values.default_end : '',
      is_open: index <= 4
    }))

    form.setFieldValue('opening_hours', updated)
    setShowCustom(false)
    setMandayToady(true)
    setAllDays(false)
  }

  // TODOS OS DIAS
  const handleApplyAllDays = () => {
    if (!form.values.default_start || !form.values.default_end) return

    const updated = form.values.opening_hours.map((day) => ({
      ...day,
      start: form.values.default_start,
      end: form.values.default_end,
      is_open: true
    }))

    form.setFieldValue('opening_hours', updated)
    setShowCustom(false)
    setAllDays(true)
    setMandayToady(false)
  }

  // PERSONALIZAR
  const handleCustom = () => {
    if (!form.values.default_start || !form.values.default_end) return

    const updated = form.values.opening_hours.map((day) => ({
      ...day,
      start: form.values.default_start,
      end: form.values.default_end
    }))

    form.setFieldValue('opening_hours', updated)
    setAllDays(false)
    setMandayToady(false)
    setShowCustom(true)
  }

  // TOGGLE INDIVIDUAL
  const handleToggleDay = (index: number) => {
    const updated = [...form.values.opening_hours]

    updated[index].is_open = !updated[index].is_open

    if (!updated[index].is_open) {
      updated[index].start = ''
      updated[index].end = ''
    } else {
      updated[index].start = form.values.default_start
      updated[index].end = form.values.default_end
    }

    form.setFieldValue('opening_hours', updated)
  }

  const { push } = useRouter()

  const handleLogin = () => {
    push(`/login`)
  }

  return (
    <MAnimation variant="revealSoftRevealDown" trigger="mount">
      <RegisterWindowWrapper>
        <RegisterWindowHeader>
          <ProgressBar currentStep={3} totalSteps={6} />
        </RegisterWindowHeader>

        <FormikProvider value={form}>
          <form onSubmit={form.handleSubmit}>
            <RegisterWindowBody>

              <TitleH2>Horário de Funcionamento</TitleH2>
              <MinorTextH4>
                Defina o horário principal do seu negócio. Depois você poderá ajustar se necessário.
              </MinorTextH4>

              <RegisterRow>
                <Column>
                  <MAnimation variant="revealSoftRevealDown" trigger="mount" delay={0.1}>
                    <FormikMInput
                      variant="masked"
                      mask="00:00"
                      name="default_start"
                      id="default_start"
                      label="Abre às"
                      placeholder="08:00"
                    />
                  </MAnimation>
                </Column>

                <Column>
                  <MAnimation variant="revealSoftRevealDown" trigger="mount" delay={0.2}>
                    <FormikMInput
                      variant="masked"
                      mask="00:00"
                      name="default_end"
                      id="default_end"
                      label="Fecha às"
                      placeholder="18:00"
                    />
                  </MAnimation>
                </Column>
              </RegisterRow>

              <Row>
                <MAnimation variant="revealSoftRevealDown" trigger="mount" delay={0.3}>
                  <MButton type="button" $variant="default" fullWidth $isActive={mandayToday} onClick={handleApplyWeekDays}>
                    Meu negócio atende de Segunda a Sexta
                  </MButton>
                </MAnimation>

                <MAnimation variant="revealSoftRevealDown" trigger="mount" delay={0.4}>
                  <MButton type="button" $variant="default" fullWidth $isActive={allDays} onClick={handleApplyAllDays}>
                    Meu negócio atende Todos os Dias
                  </MButton>
                </MAnimation>
              </Row>

              <MAnimation variant="revealSoftRevealDown" trigger="mount" delay={0.5}>
                <MButton type="button" $variant="default" fullWidth onClick={handleCustom} $isActive={showCustom}>
                  Quero personalizar dia por dia
                </MButton>
              </MAnimation>

              <MAnimation variant="controlledDrawer" trigger="controlled" isOn={showCustom} >
                {form.values.opening_hours.map((day, index) => (
                  <RegisterColumn key={index}>
                    <RegisterRow style={{ justifyContent: 'space-between', alignItems: 'center' }}>
                      <TitleH2>{day.week_day}</TitleH2>

                      <MButton
                        type="button"
                        $variant="toggle"
                        $isActive={day.is_open}
                        onClick={() => handleToggleDay(index)}
                        $toggleLabel={day.is_open ? 'Aberto' : 'Fechado'}
                      />
                    </RegisterRow>

                    <Row>
                      <FormikMInput
                        disabled={!day.is_open}
                        variant="masked"
                        mask="00:00"
                        name={`opening_hours[${index}].start`}
                        id={`start-${index}`}
                        label="Abre"
                        placeholder={!day.is_open ? 'Fechado' : `${day.start || '08:00'}`}
                      />

                      <FormikMInput
                        disabled={!day.is_open}
                        variant="masked"
                        mask="00:00"
                        name={`opening_hours[${index}].end`}
                        id={`end-${index}`}
                        label="Fecha"
                        placeholder={!day.is_open ? 'Fechado' : `${day.end || '18:00'}`}
                      />
                    </Row>
                  </RegisterColumn>
                ))}
              </MAnimation>

              <TitleH2>Diferenciais do seu negócio</TitleH2>

              <MAnimation variant="revealSoftRevealRight" trigger="mount" delay={0.1}>
                <FormikMInput
                  variant="default"
                  name="advantage1"
                  id="advantage1"
                  label="Diferencial 1"
                  placeholder="Ex: Atendimento rápido"
                />
              </MAnimation>

              <MAnimation variant="revealSoftRevealRight" trigger="mount" delay={0.2}>
                <FormikMInput
                  variant="default"
                  name="advantage2"
                  id="advantage2"
                  label="Diferencial 2"
                  placeholder="Ex: Profissionais certificados"
                />
              </MAnimation>

              <MAnimation variant="revealSoftRevealRight" trigger="mount" delay={0.3}>
                <FormikMInput
                  variant="default"
                  name="advantage3"
                  id="advantage3"
                  label="Diferencial 3"
                  placeholder="Ex: Ambiente climatizado"
                />
              </MAnimation>

            </RegisterWindowBody>

            <RegisterWindowFooter>
              <Row>
                <Column>
                  <MAnimation variant="revealSoftRevealDown" trigger="mount" delay={0.1}>
                    <MButton $variant="outline" fullWidth onClick={() => dispatch(prevStep())} leftIcon={<IoIosArrowBack />}>Voltar</MButton>
                  </MAnimation>
                </Column>
                <Column>
                  <MAnimation variant="revealSoftRevealDown" trigger="mount" delay={0.2}>
                    <MButton $variant="gradient" fullWidth type="submit" rightIcon={<IoIosArrowForward />}>Próximo</MButton>
                  </MAnimation>
                </Column>
              </Row>
              <MAnimation variant="revealSoftRevealDown" trigger="mount" delay={0.3}>
                <MButton $variant="link" fullWidth onClick={handleLogin}>Já possui uma conta?</MButton>
              </MAnimation>
            </RegisterWindowFooter>
          </form>
        </FormikProvider>
      </RegisterWindowWrapper>
    </MAnimation>
  )
}
