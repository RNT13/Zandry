import { MButton } from "@/components/ui/MaskedButton/MaskedButton";
import { FormikMInput } from "@/components/ui/MaskedInput/FormikMaskedInput";
import ProgressBar from "@/components/ui/ProgressBar/ProgressBar";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { goToStep, nextStep, prevStep, selectCompany, updateCompany } from "@/redux/slices/registerSlice";
import { Column, MinorTextH4, Row } from "@/styles/globalStyles";
import { MAnimation } from "@/styles/MaskedAnimations/MAnimation";
import { FormikProvider, useFormik } from "formik";
import { BiCategoryAlt } from "react-icons/bi";
import { CiMail } from "react-icons/ci";
import { FaPhoneAlt } from "react-icons/fa";
import { IoIosArrowBack, IoIosArrowForward, IoMdText } from "react-icons/io";
import { IoBusinessSharp } from "react-icons/io5";
import { useSelector } from "react-redux";
import * as yup from 'yup';
import { RegisterWindowBody, RegisterWindowFooter, RegisterWindowHeader, RegisterWindowWrapper } from "../RegisterWindow.styles";

const validationSchema = yup.object({
  company_name: yup.string().required('Campo obrigatório'),
  cnpj: yup.string()
    .required('Campo obrigatório')
    .test('cpf-ou-cnpj', '', function (value) {
      const { createError } = this;
      if (!value) return true;

      if (value.length <= 14) {
        // está sendo digitado como CPF
        if (value.length < 14) {
          return createError({ message: 'O CPF está incompleto' });
        }
        return true; // CPF completo
      } else {
        // está sendo digitado como CNPJ
        if (value.length < 18) {
          return createError({ message: 'O CNPJ está incompleto' });
        }
        return true; // CNPJ completo
      }
    }),
  category: yup.string().required('Campo obrigatório'),
  company_email: yup.string().email('E-mail inválido').required('Campo obrigatório'),
  company_phone: yup.string().min(11, 'O número de telefone está incompleto').required('Campo obrigatório'),
  description: yup.string(),
})

export default function Step02CompanyInfo() {
  const dispatch = useAppDispatch()

  const companyData = useSelector(selectCompany)

  const form = useFormik({
    enableReinitialize: true,
    initialValues: {
      company_name: companyData.company_name,
      cnpj: companyData.cnpj,
      category: companyData.category,
      company_email: companyData.email,
      company_phone: companyData.phone,
      description: companyData.description
    },
    validationSchema,
    onSubmit: (values) => {
      dispatch(updateCompany(
        {
          company_name: values.company_name,
          cnpj: values.cnpj,
          category: values.category,
          email: values.company_email,
          phone: values.company_phone,
          description: values.description,
        }
      ))
      dispatch(nextStep())
    }
  })

  return (
    <MAnimation variant="revealSoftRevealDown" trigger="mount">
      <RegisterWindowWrapper >

        <RegisterWindowHeader >
          <ProgressBar currentStep={2} totalSteps={7} onStepClick={(step) => dispatch(goToStep(step))} />
          <MinorTextH4>Navegue pelas etapas anteriores</MinorTextH4>
        </RegisterWindowHeader>

        <FormikProvider value={form}>
          <form onSubmit={form.handleSubmit} >

            <RegisterWindowBody>

              <MAnimation variant="revealSoftRevealRight" trigger="mount" delay={0.1}>
                <FormikMInput
                  required
                  variant="default"
                  name="company_name"
                  id="company_name"
                  label="Nome da Empresa"
                  icon={<IoBusinessSharp />}
                  placeholder="Empresa exemplo"
                />
              </MAnimation>

              <MAnimation variant="revealSoftRevealRight" trigger="mount" delay={0.2}>
                <FormikMInput
                  required
                  variant="masked"
                  mask={(value) => value.replace(/\D/g, "").length <= 11 ? "000.000.000-00" : "00.000.000/0000-00"}
                  name="cnpj"
                  id="cnpj"
                  label="CNPJ ou CPF"
                  icon={<IoBusinessSharp />}
                  placeholder="Digite o CNPJ ou CPF"
                />
              </MAnimation>

              <MAnimation variant="revealSoftRevealRight" trigger="mount" delay={0.3}>
                <FormikMInput
                  required
                  variant="select"
                  name="category"
                  id="category"
                  label="Categoria"
                  icon={<BiCategoryAlt />}
                  options={[
                    { value: 'Beleza e Estética', label: 'Beleza e Estética' },
                    { value: 'Saúde e Bem-estar', label: 'Saúde e Bem-estar' },
                    { value: 'Consultórios e Clínicas', label: 'Consultórios e Clínicas' },
                    { value: 'Serviços Automotivos', label: 'Serviços Automotivos' },
                    { value: 'Educação e Aulas', label: 'Educação e Aulas' },
                    { value: 'Eventos e Locações', label: 'Eventos e Locações' },
                    { value: 'Serviços Profissionais', label: 'Serviços Profissionais' },
                    { value: 'Fitness e Esportes', label: 'Fitness e Esportes' },
                    { value: 'Pet Care', label: 'Pet Care' },
                    { value: 'outros', label: 'Outros' },
                  ]}
                />
              </MAnimation>

              <MAnimation variant="revealSoftRevealRight" trigger="mount" delay={0.4}>
                <FormikMInput
                  required
                  variant="default"
                  name="company_email"
                  id="company_email"
                  label="E-mail da Empresa"
                  icon={<CiMail />}
                  placeholder="E-mail"
                />
              </MAnimation>

              <MAnimation variant="revealSoftRevealRight" trigger="mount" delay={0.5}>
                <FormikMInput
                  required
                  variant="masked"
                  mask="(00) 00000 0000"
                  name="company_phone"
                  id="company_phone"
                  label="Telefone da Empresa"
                  icon={<FaPhoneAlt />}
                  placeholder="(00) 00000-0000"
                />
              </MAnimation>

              <MAnimation variant="revealSoftRevealRight" trigger="mount" delay={0.6}>
                <FormikMInput
                  variant="textarea"
                  name="description"
                  id="description"
                  label="Descrição"
                  icon={<IoMdText />}
                  placeholder="Descreva sua empresa..."
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
            </RegisterWindowFooter>

          </form>
        </FormikProvider>

      </RegisterWindowWrapper>
    </MAnimation>
  )
}
