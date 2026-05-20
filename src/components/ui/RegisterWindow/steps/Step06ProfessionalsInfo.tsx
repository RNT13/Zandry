import { useAppDispatch } from "@/hooks/useAppDispatch";
import {
  addProfessional,
  goToStep,
  nextStep,
  prevStep,
  removeProfessional,
  selectProfessionals,
  selectServices,
} from "@/redux/slices/registerSlice";
import { Column, MinorTextH4, Row, TitleH3 } from "@/styles/globalStyles";
import { MAnimation } from "@/styles/MaskedAnimations/MAnimation";
import { FormikProvider, useFormik } from "formik";
import toast from "react-hot-toast";
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

const validationSchema = yup.object({
  full_name: yup.string().min(3, 'Nome deve ter pelo menos 3 caracteres').required('Nome é obrigatório'),
  position: yup.string().required('Campo obrigatório')
})

export default function Step06ProfessionalsInfo() {
  const dispatch = useAppDispatch()

  const professionalsData = useSelector(selectProfessionals)
  const servicesData = useSelector(selectServices)

  const form = useFormik({
    initialValues: {
      full_name: '',
      position: '',
      service_uids: [] as string[]
    },
    validationSchema,
    onSubmit: (values, { resetForm }) => {
      const uid = crypto.randomUUID()
      dispatch(addProfessional({
        uid,
        full_name: form.values.full_name,
        position: form.values.position,
        services_ids: form.values.service_uids,
      }))
      toast.success('Profissionais cadastrados com sucesso!')
      resetForm()
    }
  })

  const handleNext = async () => {
    const hasPendingProfessional =
      form.values.full_name ||
      form.values.position ||
      form.values.service_uids.length > 0


    if (hasPendingProfessional) {
      const errors = await form.validateForm()
      if (Object.keys(errors).length > 0) {
        form.submitForm()
        return
      }
      await form.submitForm()
    }

    if (professionalsData.length === 0) {
      toast.error('Cadastre pelo menos um profissional')
      return
    }

    dispatch(nextStep())
  }

  return (
    <MAnimation variant="revealSoftRevealDown" trigger="mount">
      <RegisterWindowWrapper>
        <RegisterWindowHeader>
          <ProgressBar currentStep={6} totalSteps={7} onStepClick={(step) => dispatch(goToStep(step))} />
          <MinorTextH4>Navegue pelas etapas anterioes</MinorTextH4>
        </RegisterWindowHeader>

        <FormikProvider value={form}>
          <form onSubmit={form.handleSubmit}>

            <RegisterWindowBody>

              <RegisterColumn>
                <MAnimation variant="revealSoftRevealRight" trigger="mount" delay={0.1}>

                  <FormikMInput
                    required
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
                    required
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
                        const isSelected = form.values.service_uids.includes(service.uid)

                        return (
                          <SelectServicesDiv key={service.uid}>
                            <MButton
                              key={service.uid}
                              type="button"
                              $variant="toggle"
                              $toggleLabel={service.name}
                              $isActive={isSelected}
                              onClick={() => {
                                if (isSelected) {
                                  form.setFieldValue(
                                    'service_uids',
                                    form.values.service_uids.filter(id => id !== service.uid)
                                  )
                                } else {
                                  form.setFieldValue(
                                    'service_uids',
                                    [...form.values.service_uids, service.uid]
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
                  <MButton type="button" $variant="default" fullWidth leftIcon={<FaPlus />} onClick={() => form.submitForm()}>
                    Adicionar Profissional
                  </MButton>
                </MAnimation>

              </RegisterColumn>

              {professionalsData.map((professional) => (
                <MAnimation key={professional.uid} variant="revealSoftRevealRight" trigger="mount" delay={0.2}>
                  <RegisterRow key={professional.uid}>

                    <Column>
                      <Row><TitleH3>Nome:</TitleH3> <MinorTextH4>{professional.full_name}</MinorTextH4></Row>
                      <Row><TitleH3>Cargo:</TitleH3> <MinorTextH4>{professional.position}</MinorTextH4></Row>


                      <Row>
                        <TitleH3>Serviços:</TitleH3>
                        <MinorTextH4>
                          {servicesData
                            .filter(service => professional.services_ids?.includes(service.uid))
                            .map(service => service.name)
                            .join(', ')}
                        </MinorTextH4>
                      </Row>
                    </Column>

                    <MButton type="button" $variant="link" shapes="circle" leftIcon={<FaTimesCircle />} onClick={() => dispatch(removeProfessional(professional.uid))} />

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
            </RegisterWindowFooter>

          </form>
        </FormikProvider>

      </RegisterWindowWrapper>
    </MAnimation>
  )
}
