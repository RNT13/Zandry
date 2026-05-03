import { useAppDispatch } from "@/hooks/useAppDispatch";
import {
  nextStep,
  prevStep,
  selectSecurityData,
  updateSecurityData
} from "@/redux/slices/registerSlice";
import { Column, MinorTextH4, Row, TitleH2 } from "@/styles/globalStyles";
import { MAnimation } from "@/styles/MaskedAnimations/MAnimation";
import { FormikProvider, useFormik } from "formik";
import { useRouter } from "next/navigation";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { IoShieldCheckmarkSharp } from "react-icons/io5";
import { useSelector } from "react-redux";
import * as yup from 'yup';
import { MButton } from "../../MaskedButton/MaskedButton";
import { FormikMInput } from "../../MaskedInput/FormikMaskedInput";
import PasswordStrengthFillBar from "../../PasswordStrengthFill/PasswordStrengthFill";
import ProgressBar from "../../ProgressBar/ProgressBar";
import {
  RegisterColumn,
  RegisterWindowBody,
  RegisterWindowFooter,
  RegisterWindowHeader,
  RegisterWindowWrapper
} from "../RegisterWindow.styles";

export default function Step06SetPassword() {
  const securityData = useSelector(selectSecurityData)
  const dispatch = useAppDispatch()
  const { push } = useRouter()

  const form = useFormik({
    enableReinitialize: true,
    initialValues: {
      password: securityData.password,
      confirm_password: securityData.confirm_password,
    },
    validationSchema: yup.object({
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
    }),
    onSubmit: (values) => {
      dispatch(updateSecurityData(values))
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

  const handleLogin = () => {
    push('/login')
  }

  const handleNext = async () => {
    const errors = await form.validateForm()

    form.setTouched({
      password: true,
      confirm_password: true
    })

    if (Object.keys(errors).length > 0) return

    form.handleSubmit()
  }

  return (
    <MAnimation variant="revealSoftRevealDown" trigger="mount">
      <RegisterWindowWrapper>
        <RegisterWindowHeader>
          <ProgressBar currentStep={6} totalSteps={6} />
        </RegisterWindowHeader>

        <FormikProvider value={form}>
          <form onSubmit={form.handleSubmit}>

            <RegisterWindowBody>

              <Column>
                <TitleH2>Proteja o acesso da sua empresa</TitleH2>
                <MinorTextH4>
                  Crie uma senha para acessar seu painel administrativo e gerenciar
                  agendamentos, clientes, serviços e profissionais.
                </MinorTextH4>
              </Column>

              <RegisterColumn>

                <MAnimation variant="revealSoftRevealRight" trigger="mount" delay={0.1}>
                  <FormikMInput
                    variant="password"
                    icon={<IoShieldCheckmarkSharp />}
                    name="password"
                    id="password"
                    label="Digite sua senha"
                    placeholder="Digite sua senha"
                  />
                </MAnimation>

                <MAnimation variant="revealSoftRevealRight" trigger="mount" delay={0.2}>
                  <FormikMInput
                    variant="password"
                    icon={<IoShieldCheckmarkSharp />}
                    name="confirm_password"
                    id="confirm_password"
                    label="Confirme sua senha"
                    placeholder="Confirme sua senha"
                  />
                </MAnimation>

                <MAnimation variant="revealSoftRevealRight" trigger="mount" delay={0.3}>
                  <PasswordStrengthFillBar password={form.values.password} confirmPassword={form.values.confirm_password} />
                </MAnimation>

              </RegisterColumn>

            </RegisterWindowBody>

            <RegisterWindowFooter>
              <Row>

                <Column>
                  <MAnimation variant="revealSoftRevealDown" trigger="mount" delay={0.1}>
                    <MButton
                      type="button"
                      $variant="outline"
                      fullWidth
                      onClick={() => dispatch(prevStep())}
                      leftIcon={<IoIosArrowBack />}
                    >
                      Voltar
                    </MButton>
                  </MAnimation>
                </Column>

                <Column>
                  <MAnimation variant="revealSoftRevealDown" trigger="mount" delay={0.2}>
                    <MButton
                      type="button"
                      $variant="gradient"
                      fullWidth
                      state={isFormValid ? 'default' : 'disabled'}
                      onClick={handleNext}
                      rightIcon={<IoIosArrowForward />}
                    >
                      Próximo
                    </MButton>
                  </MAnimation>
                </Column>

              </Row>

              <MAnimation variant="revealSoftRevealDown" trigger="mount" delay={0.3}>
                <MButton $variant="link" fullWidth onClick={handleLogin}>
                  já possui uma conta?
                </MButton>
              </MAnimation>
            </RegisterWindowFooter>

          </form>
        </FormikProvider>
      </RegisterWindowWrapper>
    </MAnimation>
  )
}
