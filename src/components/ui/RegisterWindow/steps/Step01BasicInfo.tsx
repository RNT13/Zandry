
import { MButton } from "@/components/ui/MaskedButton/MaskedButton";
import { FormikMInput } from "@/components/ui/MaskedInput/FormikMaskedInput";
import ProgressBar from "@/components/ui/ProgressBar/ProgressBar";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { nextStep, selectBasicData, updateBasicData } from "@/redux/slices/registerSlice";
import { MAnimation } from "@/styles/MaskedAnimations/MAnimation";
import { FormikProvider, useFormik } from "formik";
import { useRouter } from "next/navigation";
import { BiCategoryAlt } from "react-icons/bi";
import { CiMail } from "react-icons/ci";
import { FaPhoneAlt } from "react-icons/fa";
import { IoIosArrowForward, IoMdText } from "react-icons/io";
import { IoBusinessSharp } from "react-icons/io5";
import { useSelector } from "react-redux";
import * as yup from 'yup';
import { RegisterWindowBody, RegisterWindowFooter, RegisterWindowHeader, RegisterWindowWrapper } from "../RegisterWindow.styles";

export default function Step01BasicInfo() {
  const basicData = useSelector(selectBasicData)

  const form = useFormik({
    enableReinitialize: true,
    initialValues: {
      enterprise_name: basicData.enterprise_name,
      cnpj: basicData.cnpj,
      category: basicData.category,
      email: basicData.email,
      phone: basicData.phone,
      description: basicData.description
    },
    validationSchema: yup.object({
      enterprise_name: yup.string().required('Campo obrigatório'),
      cnpj: yup.string().required('Campo obrigatório'),
      category: yup.string().required('Campo obrigatório'),
      email: yup.string().email('E-mail inválido').required('Campo obrigatório'),
      phone: yup.string().required('Campo obrigatório'),
      description: yup.string(),
    }),
    onSubmit: (values) => {
      dispatch(updateBasicData(values))
      dispatch(nextStep())
    }
  })

  const { push } = useRouter()

  const handleLogin = () => {
    push(`/login`)
  }

  const dispatch = useAppDispatch()

  return (
    <MAnimation variant="revealSoftRevealDown" trigger="mount">
      <RegisterWindowWrapper >

        <RegisterWindowHeader >
          <ProgressBar currentStep={1} totalSteps={6} />
        </RegisterWindowHeader>

        <FormikProvider value={form}>
          <form onSubmit={form.handleSubmit} >

            <RegisterWindowBody>

              <MAnimation variant="revealSoftRevealRight" trigger="mount" delay={0.1}>
                <FormikMInput
                  variant="default"
                  name="enterprise_name"
                  id="Nome da Empresa"
                  label="Nome da Empresa"
                  icon={<IoBusinessSharp />}
                  placeholder="Empresa exemplo"
                />
              </MAnimation>

              <MAnimation variant="revealSoftRevealRight" trigger="mount" delay={0.2}>
                <FormikMInput
                  variant="masked"
                  mask={(value) => value.replace(/\D/g, "").length <= 11 ? "000.000.000-00" : "00.000.000/0000-00"}
                  name="cnpj"
                  id="CNPJ"
                  label="CNPJ ou CPF"
                  icon={<IoBusinessSharp />}
                  placeholder="Digite o CNPJ ou CPF"
                />
              </MAnimation>

              <MAnimation variant="revealSoftRevealRight" trigger="mount" delay={0.3}>
                <FormikMInput
                  variant="select"
                  name="category"
                  id="Categoria"
                  label="Categoria"
                  icon={<BiCategoryAlt />}
                  options={[
                    { value: 'beleza-e-estetica', label: 'Beleza e Estética' },
                    { value: 'saude-e-bem-estar', label: 'Saúde e Bem-estar' },
                    { value: 'consultorios-e-clinicas', label: 'Consultórios e Clínicas' },
                    { value: 'servicos-automotivos', label: 'Serviços Automotivos' },
                    { value: 'educacao-e-aulas', label: 'Educação e Aulas' },
                    { value: 'eventos-e-locacoes', label: 'Eventos e Locações' },
                    { value: 'servicos-profissionais', label: 'Serviços Profissionais' },
                    { value: 'fitness-e-esportes', label: 'Fitness e Esportes' },
                    { value: 'pet-care', label: 'Pet Care' },
                    { value: 'outros', label: 'Outros' },
                  ]}
                />
              </MAnimation>

              <MAnimation variant="revealSoftRevealRight" trigger="mount" delay={0.4}>
                <FormikMInput
                  variant="default"
                  name="email"
                  id="E-mail"
                  label="E-mail"
                  icon={<CiMail />}
                  placeholder="E-mail"
                />
              </MAnimation>

              <MAnimation variant="revealSoftRevealRight" trigger="mount" delay={0.5}>
                <FormikMInput
                  variant="masked"
                  mask="(00) 00000 0000"
                  name="phone"
                  id="Telefone"
                  label="Telefone"
                  icon={<FaPhoneAlt />}
                  placeholder="Telefone"
                />
              </MAnimation>

              <MAnimation variant="revealSoftRevealRight" trigger="mount" delay={0.6}>
                <FormikMInput
                  variant="textarea"
                  name="description"
                  id="Descrição"
                  label="Descrição"
                  icon={<IoMdText />}
                  placeholder="Descreva sua empresa..."
                />
              </MAnimation>

            </RegisterWindowBody>


            <RegisterWindowFooter>
              <MAnimation variant="revealSoftRevealDown" trigger="mount" delay={0.1}>
                <MButton $variant="gradient" fullWidth type="submit" rightIcon={<IoIosArrowForward />}>Próximo</MButton>
              </MAnimation>

              <MAnimation variant="revealSoftRevealDown" trigger="mount" delay={0.2} >
                <MButton $variant="link" onClick={handleLogin} fullWidth>Já possui uma conta?</MButton>
              </MAnimation>
            </RegisterWindowFooter>

          </form>
        </FormikProvider>

      </RegisterWindowWrapper>
    </MAnimation>
  )
}
