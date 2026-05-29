
import { MButton } from "@/components/ui/MaskedButton/MaskedButton";
import ProgressBar from "@/components/ui/ProgressBar/ProgressBar";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import useScrollToTop from "@/hooks/useScrollToTop";
import { goToStep, nextStep, selectOwner, updateOwner, } from "@/redux/slices/registerSlice";
import { Column, MinorTextH4, TitleH2 } from "@/styles/globalStyles";
import { MAnimation } from "@/styles/MaskedAnimations/MAnimation";
import { FormikProvider, useFormik } from "formik";
import { FaPhoneAlt } from "react-icons/fa";
import { IoIosArrowForward } from "react-icons/io";
import { IoShieldCheckmarkSharp } from "react-icons/io5";
import { MdDriveFileRenameOutline, MdMarkEmailRead } from "react-icons/md";
import { useSelector } from "react-redux";
import * as yup from 'yup';
import { FormikMInput } from "../../MaskedInput/FormikMaskedInput";
import PasswordStrengthFillBar from "../../PasswordStrengthFill/PasswordStrengthFill";
import { RegisterColumn, RegisterWindowBody, RegisterWindowFooter, RegisterWindowHeader, RegisterWindowWrapper } from "../RegisterWindow.styles";

const validationSchema = yup.object({
  owner_full_name: yup.string().min(3, 'Nome deve ter pelo menos 3 caracteres').required('Nome é obrigatório'),
  owner_email: yup.string().required("Campo obrigatório").email("E-mail inválido"),
  owner_phone: yup.string().min(11, 'O número de telefone está incompleto').optional(),
  password: yup
    .string()
    .min(6, 'A senha deve ter no mínimo 6 caracteres')
    .matches(/[A-Za-z]/, 'A senha deve conter pelo menos 1 letra')
    .matches(/[0-9]/, 'A senha deve conter pelo menos 1 número')
    .required('Campo obrigatório'),

  confirm_password: yup
    .string()
    .oneOf([yup.ref('password')], 'As senhas não coincidem')
    .required('Campo obrigatório'),
})

export default function Step01OwnerInfo() {
  const dispatch = useAppDispatch()

  const ownerData = useSelector(selectOwner)

  const form = useFormik({
    enableReinitialize: true,
    initialValues: {
      owner_full_name: ownerData.full_name,
      owner_email: ownerData.email,
      owner_phone: ownerData.phone,
      password: ownerData.password,
      confirm_password: ownerData.confirm_password
    },
    validationSchema,
    onSubmit: (values) => {
      dispatch(updateOwner({
        full_name: values.owner_full_name,
        email: values.owner_email,
        phone: values.owner_phone,
        password: values.password,
        confirm_password: values.confirm_password
      }));
      dispatch(nextStep())
    }
  })

  const password = form.values.password
  const confirmPassword = form.values.confirm_password

  const hasMinLength = password.length >= 6
  const hasLetter = /[A-Za-z]/.test(password)
  const hasNumber = /[0-9]/.test(password)
  const passwordsMatch =
    password &&
    confirmPassword &&
    password === confirmPassword

  const isFormValid =
    hasMinLength &&
    hasLetter &&
    hasNumber &&
    passwordsMatch

  useScrollToTop({
    trigger: form.submitCount
  })

  return (
    <MAnimation variant="revealSoftRevealDown" trigger="mount">
      <RegisterWindowWrapper >

        <RegisterWindowHeader >
          <ProgressBar currentStep={1} totalSteps={7} onStepClick={(step) => dispatch(goToStep(step))} />
          <MinorTextH4>Navegue pelas etapas anteriores</MinorTextH4>
        </RegisterWindowHeader>

        <FormikProvider value={form}>
          <form onSubmit={form.handleSubmit} >

            <RegisterWindowBody>

              <MAnimation variant="revealSoftRevealRight" trigger="mount" delay={0.1}>
                <FormikMInput
                  required
                  variant="default"
                  name="owner_full_name"
                  id="owner_full_name"
                  label="Nome completo"
                  icon={<MdDriveFileRenameOutline />}
                  placeholder="Nome completo"
                />
              </MAnimation>

              <MAnimation variant="revealSoftRevealRight" trigger="mount" delay={0.2}>
                <FormikMInput
                  required
                  variant="default"
                  name="owner_email"
                  id="Lograowner_emaildouro"
                  label="E-mail"
                  icon={<MdMarkEmailRead />}
                  placeholder="E-mail"
                />
              </MAnimation>

              <MAnimation variant="revealSoftRevealRight" trigger="mount" delay={0.3}>
                <FormikMInput
                  variant="masked"
                  name="owner_phone"
                  id="owner_phone"
                  label="Telefone"
                  icon={<FaPhoneAlt />}
                  mask={"(00) 00000-0000"}
                  placeholder="(00) 00000-0000"
                />
              </MAnimation>

              <Column>


                <RegisterColumn>

                  <Column>
                    <TitleH2>Proteja o acesso da sua empresa</TitleH2>
                    <MinorTextH4>
                      Crie uma senha para acessar seu painel administrativo e gerenciar
                      agendamentos, clientes, serviços e profissionais.
                    </MinorTextH4>
                  </Column>

                  <MAnimation variant="revealSoftRevealRight" trigger="mount" delay={0.4}>
                    <FormikMInput
                      required
                      variant="password"
                      icon={<IoShieldCheckmarkSharp />}
                      name="password"
                      id="password"
                      label="Digite sua senha"
                      placeholder="Digite sua senha"
                    />
                  </MAnimation>

                  <MAnimation variant="revealSoftRevealRight" trigger="mount" delay={0.5}>
                    <FormikMInput
                      variant="password"
                      required
                      icon={<IoShieldCheckmarkSharp />}
                      name="confirm_password"
                      id="confirm_password"
                      label="Confirme sua senha"
                      placeholder="Confirme sua senha"
                    />
                  </MAnimation>
                </RegisterColumn>

              </Column>

              <MAnimation variant="revealSoftRevealRight" trigger="mount" delay={0.6}>
                <PasswordStrengthFillBar password={form.values.password} confirmPassword={form.values.confirm_password} />
              </MAnimation>

            </RegisterWindowBody>


            <RegisterWindowFooter>
              <MAnimation variant="revealSoftRevealDown" trigger="mount" delay={0.2}>
                <MButton
                  type="submit"
                  $variant="gradient"
                  fullWidth
                  state={isFormValid ? 'default' : 'disabled'}
                  rightIcon={<IoIosArrowForward />}
                >
                  Próximo
                </MButton>
              </MAnimation>

            </RegisterWindowFooter>

          </form>
        </FormikProvider>

      </RegisterWindowWrapper>
    </MAnimation>
  )
}
