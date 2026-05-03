
import { MinorTextH4, Row, TitleH2 } from "@/styles/globalStyles";
import { FormikProvider, useFormik } from "formik";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { AiOutlineLock } from "react-icons/ai";
import { CiMail } from "react-icons/ci";
import { IoIosArrowBack } from "react-icons/io";
import * as yup from 'yup';
import { MButton } from "../MaskedButton/MaskedButton";
import { FormikMInput } from "../MaskedInput/FormikMaskedInput";
import { LoginWindowBody, LoginWindowContainer, LoginWindowContent, LoginWindowFooter, LoginWindowHeader, LoginWindowWrapper, SvgDiv } from "./LoginWindow.styles";

export default function LoginWindow() {
  const form = useFormik({
    initialValues: {
      email: '',
      password: ''
    },
    validationSchema: yup.object({
      email: yup.string().email('E-mail inválido').required('Campo obrigatório'),
      password: yup.string().min(6, 'Minimo de 6 caracteres').required('Campo obrigatório'),
    }),
    onSubmit: (values) => {
      console.log(values)
    }
  })

  const params = useParams()
  const slug = params.slug
  const router = useRouter()
  const { push } = router

  const [active, setActive] = useState(false)

  const handleBack = () => {
    push(`/${slug}`)
  }

  const handleRegister = () => {
    push('/cadastro')
  }

  return (
    <LoginWindowContainer>
      <LoginWindowContent>

        <LoginWindowWrapper >
          <LoginWindowHeader >
            <SvgDiv>
              <Image src="/Zendry.png" alt="Logo" width={100} height={100} priority loading="eager" />
            </SvgDiv>
            <div>
              <TitleH2>Acesso Empresarial</TitleH2>
              <MinorTextH4>Entre para gerenciar seus agendamentos</MinorTextH4>
            </div>
          </LoginWindowHeader>

          <FormikProvider value={form}>
            <form onSubmit={form.handleSubmit} >

              <LoginWindowBody>
                <FormikMInput
                  variant="default"
                  name="E-mail"
                  id="E-mail"
                  label="E-mail"
                  icon={<CiMail />}
                  placeholder="contato@seunegocio.com"
                />

                <FormikMInput
                  variant="password"
                  name="password"
                  id="password"
                  label="Senha"
                  icon={<AiOutlineLock />}
                  placeholder="Sua senha"
                />
              </LoginWindowBody>

            </form>
          </FormikProvider>

          <LoginWindowFooter>
            <Row>
              <Row>
                <MButton $variant="toggle" $toggleLabel="Lembrar" $isActive={active} onClick={() => setActive(!active)} size="sm" />
              </Row>
              <Row>
                <MButton $variant="link" size="sm">
                  Esqueci a senha
                </MButton>
              </Row>
            </Row>
            <MButton $variant="default" type="submit" fullWidth>Entrar</MButton>
            <MButton $variant="link" onClick={handleRegister} fullWidth> Cadastre sua empresa</MButton>
          </LoginWindowFooter>
        </LoginWindowWrapper>

        <MButton $variant="link" fullWidth leftIcon={<IoIosArrowBack />} onClick={handleBack}>Voltar para a página inicial</MButton>

      </LoginWindowContent>

    </LoginWindowContainer>
  )
}
