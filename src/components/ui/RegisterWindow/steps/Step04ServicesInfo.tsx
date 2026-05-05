import { useAppDispatch } from "@/hooks/useAppDispatch";
import {
  addServicesData,
  nextStep,
  prevStep,
  removeServicesData,
  selectServicesData
} from "@/redux/slices/registerSlice";
import { Column, Row, TitleH3 } from "@/styles/globalStyles";
import { MAnimation } from "@/styles/MaskedAnimations/MAnimation";
import { FormikProvider, useFormik } from "formik";
import { useRouter } from "next/navigation";
import { FaPlus, FaTimesCircle } from "react-icons/fa";
import { IoIosArrowBack, IoIosArrowForward, IoMdText, IoMdTime } from "react-icons/io";
import { MdOutlineWorkOutline } from "react-icons/md";
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

export default function Step04ServicesInfo() {
  const servicesData = useSelector(selectServicesData)
  const dispatch = useAppDispatch()

  const form = useFormik({
    initialValues: {
      name: '',
      description: '',
      price: '',
      duration: ''
    },
    validationSchema: yup.object({
      name: yup.string().required(),
      description: yup.string().required(),
      price: yup.string().required(),
      duration: yup.string().required()
    }),
    onSubmit: () => { }
  })

  const handleAddService = () => {
    if (!form.values.name || !form.values.description || !form.values.price || !form.values.duration) {
      return false
    }

    dispatch(addServicesData({
      id: String(Date.now()),
      name: form.values.name,
      description: form.values.description,
      price: Number(form.values.price),
      duration: Number(form.values.duration)
    }))

    form.resetForm()
    return true
  }

  const handleNext = () => {
    const hasPendingService =
      form.values.name ||
      form.values.description ||
      form.values.price ||
      form.values.duration

    let totalServices = servicesData.length

    if (hasPendingService) {
      const added = handleAddService()
      if (added) totalServices += 1
    }

    if (totalServices === 0) return

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
          <ProgressBar currentStep={4} totalSteps={6} />
        </RegisterWindowHeader>

        <FormikProvider value={form}>
          <form onSubmit={handleAddService}>
            <RegisterWindowBody>

              <RegisterColumn>
                <MAnimation variant="revealSoftRevealRight" trigger="mount" delay={0.1}>
                  <FormikMInput
                    variant="default"
                    icon={<MdOutlineWorkOutline />}
                    name="name"
                    id="name"
                    label="Nome do serviço"
                    placeholder="Ex: Corte Masculino"
                  />
                </MAnimation>

                <MAnimation variant="revealSoftRevealRight" trigger="mount" delay={0.2}>
                  <FormikMInput
                    variant="textarea"
                    icon={<IoMdText />}
                    name="description"
                    id="description"
                    label="Descrição"
                    placeholder="Descreva o serviço"
                  />
                </MAnimation>

                <Row>
                  <MAnimation variant="revealSoftRevealRight" trigger="mount" delay={0.3}>
                    <FormikMInput
                      variant="currency"
                      name="price"
                      id="price"
                      label="Preço"
                      placeholder="R$ 0,00"
                    />
                  </MAnimation>

                  <MAnimation variant="revealSoftRevealRight" trigger="mount" delay={0.4}>
                    <FormikMInput
                      variant="masked"
                      icon={<IoMdTime />}
                      mask="000"
                      name="duration"
                      id="duration"
                      label="Minutos"
                      placeholder="30"
                    />
                  </MAnimation>
                </Row>

                <MAnimation variant="revealSoftRevealDown" trigger="mount" delay={0.5}>
                  <MButton type="button" $variant="default" fullWidth leftIcon={<FaPlus />} onClick={handleAddService}>
                    Adicionar Serviço
                  </MButton>
                </MAnimation>
              </RegisterColumn>

              {servicesData.map((service) => (
                <MAnimation variant="revealSoftRevealRight" trigger="mount" delay={0.2} key={service.id}>

                  <RegisterRow >
                    <Column>
                      <Row><TitleH3>Serviço:</TitleH3>{service.name}</Row>
                      <Row><TitleH3>Descrição:</TitleH3>{service.description}</Row>
                      <Row><TitleH3>R$:</TitleH3>{service.price} </Row>
                      <Row><TitleH3>Tempo:</TitleH3>{service.duration} Minutos</Row>
                    </Column>
                    <MButton type="button" $variant="link" shapes="circle" leftIcon={<FaTimesCircle />} onClick={() => dispatch(removeServicesData(Number(service.id)))} />
                  </RegisterRow>
                </MAnimation>
              ))}

            </RegisterWindowBody>

            <RegisterWindowFooter>
              <Row>
                <Column>
                  <MAnimation variant="revealSoftRevealDown" trigger="mount" delay={0.1}>
                    <MButton $variant="outline" fullWidth onClick={() => dispatch(prevStep())} type="button" leftIcon={<IoIosArrowBack />}>Voltar</MButton>
                  </MAnimation>
                </Column>
                <Column>
                  <MAnimation variant="revealSoftRevealDown" trigger="mount" delay={0.2}>
                    <MButton $variant="gradient" fullWidth onClick={handleNext} type="button" rightIcon={<IoIosArrowForward />}>Próximo</MButton>
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
