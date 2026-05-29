/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import { useAuth } from '@/hooks/api/useAuth'
import { useAppDispatch } from '@/hooks/useAppDispatch'
import { setCredentials } from '@/redux/slices/authSlice'
import { MinorTextH4, Row, TitleH2 } from '@/styles/globalStyles'
import { MAnimation } from '@/styles/MaskedAnimations/MAnimation'
import { FormikProvider, useFormik } from 'formik'
import Image from 'next/image'
import { useRouter, useSearchParams } from 'next/navigation'
import { useState } from 'react'
import toast from 'react-hot-toast'
import { AiOutlineLock } from 'react-icons/ai'
import { CiMail } from 'react-icons/ci'
import { IoIosArrowBack } from 'react-icons/io'
import * as yup from 'yup'
import { MButton } from '../MaskedButton/MaskedButton'
import { FormikMInput } from '../MaskedInput/FormikMaskedInput'
import {
  LoginWindowBody,
  LoginWindowContainer,
  LoginWindowContent,
  LoginWindowFooter,
  LoginWindowHeader,
  LoginWindowWrapper,
  SvgDiv,
} from './LoginWindow.styles'

const validationSchema = yup.object({
  email: yup.string().email('E-mail inválido').required('Campo obrigatório'),
  password: yup.string().min(6, 'Mínimo de 6 caracteres').required('Campo obrigatório'),
})

const safeReturn = (raw: string | null) =>
  raw && raw.startsWith('/') && !raw.startsWith('//') ? raw : null

export default function LoginWindow() {
  const dispatch = useAppDispatch()
  const router = useRouter()
  const searchParams = useSearchParams()
  const returnTo = safeReturn(searchParams.get('returnTo'))

  const [rememberMe, setRememberMe] = useState(false)
  const { login, loginState } = useAuth()

  const goBackSafe = () => {
    if (returnTo) return router.replace(returnTo)
    if (typeof window !== 'undefined' && window.history.length > 1) return router.back()
    return router.replace('/')
  }

  const form = useFormik({
    initialValues: { email: '', password: '' },
    validationSchema,
    onSubmit: async values => {
      const loadingId = toast.loading('Entrando...')

      try {
        const data = await login({
          loginRequestRequest: {
            email: values.email,
            password: values.password,
            remember_me: rememberMe,
          },
        }).unwrap()

        dispatch(
          setCredentials({
            token: data.access,
            user: data.user,
          })
        )

        toast.dismiss(loadingId)
        toast.success('Login realizado com sucesso!')

        router.replace(returnTo ?? `/${data.user.company_slug}/dashboard`)
      } catch (error: any) {
        toast.dismiss(loadingId)
        toast.error(
          error?.data?.message ||
          error?.data?.detail ||
          'Falha ao fazer login. Verifique suas credenciais.'
        )
      }
    },
  })

  return (
    <MAnimation variant="revealSoftRevealDown" trigger="mount">
      <LoginWindowContainer>
        <LoginWindowContent>
          <LoginWindowWrapper>
            <LoginWindowHeader>
              <MAnimation variant="revealZoomFromDeep" trigger="mount">
                <SvgDiv>
                  <Image
                    src="/Zendry.png"
                    alt="Logo"
                    width={100}
                    height={100}
                    priority
                    loading="eager"
                  />
                </SvgDiv>
              </MAnimation>

              <MAnimation variant="revealSoftRevealDown" trigger="mount" delay={0.1} center>
                <TitleH2>Acesso Empresarial</TitleH2>
              </MAnimation>

              <MAnimation variant="revealSoftRevealDown" trigger="mount" delay={0.2} center>
                <MinorTextH4>Entre para gerenciar seus agendamentos</MinorTextH4>
              </MAnimation>
            </LoginWindowHeader>

            <FormikProvider value={form}>
              <form onSubmit={form.handleSubmit} noValidate>
                <LoginWindowBody>
                  <MAnimation variant="revealSoftRevealRight" trigger="mount" delay={0.1}>
                    <FormikMInput
                      required
                      variant="default"
                      name="email"
                      id="email"
                      label="E-mail"
                      icon={<CiMail />}
                      placeholder="contato@seunegocio.com"
                    />
                  </MAnimation>

                  <MAnimation variant="revealSoftRevealRight" trigger="mount" delay={0.2}>
                    <FormikMInput
                      required
                      variant="password"
                      name="password"
                      id="password"
                      label="Senha"
                      icon={<AiOutlineLock />}
                      placeholder="Sua senha"
                    />
                  </MAnimation>
                </LoginWindowBody>

                <LoginWindowFooter>
                  <MAnimation variant="revealSoftRevealDown" trigger="mount" delay={0.3}>
                    <Row>
                      <MButton
                        type="button"
                        $variant="toggle"
                        $toggleLabel="Lembrar"
                        $isActive={rememberMe}
                        onClick={() => setRememberMe(p => !p)}
                        size="sm"
                      />

                      <MButton
                        type="button"
                        $variant="link"
                        size="sm"
                        onClick={() => router.push('/esqueci-senha')}
                      >
                        Esqueci a senha
                      </MButton>
                    </Row>
                  </MAnimation>

                  <MAnimation variant="revealSoftRevealDown" trigger="mount" delay={0.4}>
                    <MButton
                      $variant="default"
                      type="submit"
                      fullWidth
                      state={loginState.isLoading ? 'disabled' : 'default'}
                    >
                      {loginState.isLoading ? 'Entrando...' : 'Entrar'}
                    </MButton>
                  </MAnimation>
                </LoginWindowFooter>
              </form>
            </FormikProvider>
          </LoginWindowWrapper>

          <MAnimation variant="revealSoftRevealDown" trigger="mount" delay={0.5}>
            <MButton
              type="button"
              $variant="link"
              fullWidth
              onClick={() => router.push('/cadastro')}
            >
              Cadastre sua empresa
            </MButton>
          </MAnimation>

          <MAnimation variant="revealSoftRevealDown" trigger="mount" delay={0.6}>
            <MButton
              type="button"
              $variant="link"
              fullWidth
              leftIcon={<IoIosArrowBack />}
              onClick={goBackSafe}
            >
              Voltar para a página inicial
            </MButton>
          </MAnimation>
        </LoginWindowContent>
      </LoginWindowContainer>
    </MAnimation>
  )
}
