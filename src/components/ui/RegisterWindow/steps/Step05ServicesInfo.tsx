import { useAppDispatch } from "@/hooks/useAppDispatch";
import {
  addService,
  goToStep,
  nextStep,
  prevStep,
  removeService,
  selectServices
} from "@/redux/slices/registerSlice";
import { Column, MinorTextH4, Row, TitleH3 } from "@/styles/globalStyles";
import { MAnimation } from "@/styles/MaskedAnimations/MAnimation";
import { FormikProvider, useFormik } from "formik";
import toast from "react-hot-toast";
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

const validationSchema = yup.object({
  name: yup.string().min(3, 'Nome deve ter pelo menos 3 caracteres').required('Nome é obrigatório'),
  description: yup.string(),
  price: yup.string().required('Campo obrigatório'),
  duration: yup.string()
    .required('Campo obrigatório')
    .test('minimo-15', 'Duração mínima é de 15 minutos', (value) => {
      if (!value) return false;
      return Number(value) >= 15;
    }),
})

export default function Step05ServicesInfo() {
  const dispatch = useAppDispatch()

  const servicesData = useSelector(selectServices)

  const form = useFormik({
    initialValues: {
      name: '',
      description: '',
      price: '',
      duration: ''
    },
    validationSchema,
    onSubmit: (values, { resetForm }) => {
      const uid = crypto.randomUUID()
      dispatch(addService({
        uid,
        name: values.name,
        description: values.description,
        price: values.price,
        duration: Number(values.duration)
      }))
      toast.success('Serviços cadastrados com sucesso!')
      resetForm()
    }
  })

  const handleNext = async () => {
    const hasPendingService =
      form.values.name ||
      form.values.description ||
      form.values.price ||
      form.values.duration

    // Se houver um serviço pendente, valida e envia
    if (hasPendingService) {
      const errors = await form.validateForm()
      if (Object.keys(errors).length > 0) {
        form.submitForm()
        return
      }
      await form.submitForm()
    }

    // Se nenhuma serviço estiver cadastrado retorna erro
    if (servicesData.length === 0) {
      toast.error('Cadastre pelo menos um serviço')
      return
    }

    dispatch(nextStep())
  }

  return (
    <MAnimation variant="revealSoftRevealDown" trigger="mount">
      <RegisterWindowWrapper>
        <RegisterWindowHeader>
          <ProgressBar currentStep={5} totalSteps={7} onStepClick={(step) => dispatch(goToStep(step))} />
          <MinorTextH4>Navegue pelas etapas anteriores</MinorTextH4>
        </RegisterWindowHeader>

        <FormikProvider value={form}>
          <form onSubmit={form.handleSubmit}>
            <RegisterWindowBody>

              <RegisterColumn>
                <MAnimation variant="revealSoftRevealRight" trigger="mount" delay={0.1}>
                  <FormikMInput
                    required
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
                      required
                      variant="currency"
                      name="price"
                      id="price"
                      label="Preço"
                      placeholder="R$ 0,00"
                    />
                  </MAnimation>

                  <MAnimation variant="revealSoftRevealRight" trigger="mount" delay={0.4}>
                    <FormikMInput
                      required
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
                  <MButton type="button" $variant="default" fullWidth leftIcon={<FaPlus />} onClick={() => form.submitForm()}>
                    Adicionar Serviço
                  </MButton>
                </MAnimation>
              </RegisterColumn>

              {servicesData.map((service) => (
                <MAnimation variant="revealSoftRevealRight" trigger="mount" delay={0.2} key={service.uid}>

                  <RegisterRow >
                    <Column>
                      <Row><TitleH3>Serviço:</TitleH3>{service.name}</Row>
                      <Row><TitleH3>Descrição:</TitleH3>{service.description}</Row>
                      <Row><TitleH3>R$:</TitleH3>{service.price} </Row>
                      <Row><TitleH3>Tempo:</TitleH3>{service.duration} Minutos</Row>
                    </Column>
                    <MButton type="button" $variant="link" shapes="circle" leftIcon={<FaTimesCircle />} onClick={() => dispatch(removeService(service.uid))} />
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
            </RegisterWindowFooter>

          </form>
        </FormikProvider>
      </RegisterWindowWrapper>
    </MAnimation>
  )
}
