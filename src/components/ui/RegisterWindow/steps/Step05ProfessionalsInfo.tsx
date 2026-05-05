import { useAppDispatch } from "@/hooks/useAppDispatch";
import {
  addProfessionalsData,
  nextStep,
  prevStep,
  removeProfessionalsData,
  selectProfessionalsData,
  selectServicesData
} from "@/redux/slices/registerSlice";
import { Column, MinorTextH4, Row, TitleH3 } from "@/styles/globalStyles";
import { MAnimation } from "@/styles/MaskedAnimations/MAnimation";
import { FormikProvider, useFormik } from "formik";
import { useRouter } from "next/navigation";
import { FaPlus, FaTimesCircle } from "react-icons/fa";
import { IoIosArrowBack, IoIosArrowForward, IoIosPeople } from "react-icons/io";
import { MdOutlineWorkspacePremium } from "react-icons/md";
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
  RegisterWindowWrapper,
  SelectServicesDiv
} from "../RegisterWindow.styles";

export default function Step05ProfessionalsInfo() {
  const professionalsData = useSelector(selectProfessionalsData)
  const servicesData = useSelector(selectServicesData)
  const dispatch = useAppDispatch()

  const form = useFormik({
    initialValues: {
      full_name: '',
      position: '',
      service_ids: [] as string[]
    },
    validationSchema: yup.object({
      full_name: yup.string().required('Campo obrigatório'),
      position: yup.string().required('Campo obrigatório')
    }),
    onSubmit: () => { }
  })

  const handleAddProfessional = () => {
    if (
      !form.values.full_name ||
      !form.values.position ||
      form.values.service_ids.length === 0
    ) return false

    dispatch(addProfessionalsData({
      id: String(Date.now()),
      full_name: form.values.full_name,
      position: form.values.position,
      service_ids: form.values.service_ids.map(Number)
    }))

    form.resetForm()
    return true
  }

  const handleNext = () => {
    const hasPendingProfessional =
      form.values.full_name ||
      form.values.position ||
      form.values.service_ids.length > 0

    let totalProfessionals = professionalsData.length

    if (hasPendingProfessional) {
      const added = handleAddProfessional()
      if (added) totalProfessionals += 1
    }

    if (totalProfessionals === 0) return

    dispatch(nextStep())
  }

  const { push } = useRouter()

  const handleLogin = () => {
    push(`/login`)
  }

  return (
    <MAnimation variant="revealSoftRevealDown" trigger="mount">
      <RegisterWindowWrapper>
        <RegisterWindowHeader>
          <ProgressBar currentStep={5} totalSteps={6} />
        </RegisterWindowHeader>

        <FormikProvider value={form}>
          <form onSubmit={form.handleSubmit}>

            <RegisterWindowBody>

              <RegisterColumn>
                <MAnimation variant="revealSoftRevealRight" trigger="mount" delay={0.1}>

                  <FormikMInput
                    variant="default"
                    icon={<IoIosPeople />}
                    name="full_name"
                    id="full_name"
                    label="Nome do profissional"
                    placeholder="Ex: João Silva"
                  />
                </MAnimation>

                <MAnimation variant="revealSoftRevealRight" trigger="mount" delay={0.2}>
                  <FormikMInput
                    variant="default"
                    icon={<MdOutlineWorkspacePremium />}
                    name="position"
                    id="position"
                    label="Função / Especialidade"
                    placeholder="Ex: Barbeiro"
                  />
                </MAnimation>

                <Column>
                  <TitleH3>Quais serviços este profissional atende?</TitleH3>
                  <MinorTextH4>
                    Selecione um ou mais serviços abaixo
                  </MinorTextH4>

                  <MAnimation variant="revealSoftRevealRight" trigger="mount" delay={0.3}>
                    <RegisterRow>
                      {servicesData.map((service) => {
                        const isSelected = form.values.service_ids.includes(service.id)

                        return (
                          <SelectServicesDiv key={service.id}>
                            <MButton
                              key={service.id}
                              type="button"
                              $variant="toggle"
                              $toggleLabel={service.name}
                              $isActive={isSelected}
                              onClick={() => {
                                if (isSelected) {
                                  form.setFieldValue(
                                    'service_ids',
                                    form.values.service_ids.filter(id => id !== service.id)
                                  )
                                } else {
                                  form.setFieldValue(
                                    'service_ids',
                                    [...form.values.service_ids, service.id]
                                  )
                                }
                              }}
                            />
                          </SelectServicesDiv>
                        )
                      })}
                    </RegisterRow>
                  </MAnimation>
                </Column>

                <MAnimation variant="revealSoftRevealDown" trigger="mount" delay={0.4}>
                  <MButton type="button" $variant="default" fullWidth leftIcon={<FaPlus />} onClick={handleAddProfessional}>
                    Adicionar Profissional
                  </MButton>
                </MAnimation>

              </RegisterColumn>

              {professionalsData.map((professional) => (
                <MAnimation key={professional.id} variant="revealSoftRevealRight" trigger="mount" delay={0.2}>
                  <RegisterRow key={professional.id}>

                    <Column>
                      <TitleH3>{professional.full_name}</TitleH3>
                      <Row><TitleH3>Cargo:</TitleH3> <MinorTextH4>{professional.position}</MinorTextH4></Row>


                      <Row>
                        <TitleH3>Serviços:</TitleH3>
                        <MinorTextH4>
                          {servicesData
                            .filter(service => professional.service_ids.includes(Number(service.id)))
                            .map(service => service.name)
                            .join(', ')}
                        </MinorTextH4>
                      </Row>
                    </Column>

                    <MButton type="button" $variant="link" shapes="circle" leftIcon={<FaTimesCircle />} onClick={() => dispatch(removeProfessionalsData(Number(professional.id)))} />

                  </RegisterRow>
                </MAnimation>
              ))}

            </RegisterWindowBody>

            <RegisterWindowFooter>

              <Row>

                <Column>
                  <MAnimation variant="revealSoftRevealDown" trigger="mount" delay={0.1}>
                    <MButton type="button" $variant="outline" fullWidth onClick={() => dispatch(prevStep())} leftIcon={<IoIosArrowBack />}>
                      Voltar
                    </MButton>
                  </MAnimation>
                </Column>

                <Column>
                  <MAnimation variant="revealSoftRevealDown" trigger="mount" delay={0.2}>
                    <MButton type="button" $variant="gradient" fullWidth onClick={handleNext} rightIcon={<IoIosArrowForward />}>
                      Próximo
                    </MButton>
                  </MAnimation>
                </Column>

              </Row>
              <MAnimation variant="revealSoftRevealDown" trigger="mount" delay={0.3}>
                <MButton $variant="link" fullWidth onClick={handleLogin}>já possui uma conta?</MButton>
              </MAnimation>
            </RegisterWindowFooter>

          </form>
        </FormikProvider>

      </RegisterWindowWrapper>
    </MAnimation>
  )
}
