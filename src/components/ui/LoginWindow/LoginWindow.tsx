/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import { FormikProvider, useFormik } from 'formik'
import { useRouter, useSearchParams } from 'next/navigation'
import { useState } from 'react'
import toast from 'react-hot-toast'
import { AiOutlineLock } from 'react-icons/ai'
import { CiMail } from 'react-icons/ci'
import { IoIosArrowBack } from 'react-icons/io'
import * as yup from 'yup'

import { useAuth } from '@/hooks/api/useAuth'
import { useAppDispatch } from '@/hooks/useAppDispatch'
import { setCredentials } from '@/redux/slices/authSlice'
import { MinorTextH4, Row, TitleH2 } from '@/styles/globalStyles'
import Image from 'next/image'
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

  const buildUrl = (path: string) =>
    returnTo ? `${path}?returnTo=${encodeURIComponent(returnTo)}` : path

  const goBackSafe = () => {
    if (returnTo) return router.replace(returnTo)
    if (typeof window !== 'undefined' && window.history.length > 1) return router.back()
    return router.replace('/')
  }

  const form = useFormik({
    initialValues: { email: '', password: '' },
    validationSchema,
    onSubmit: async (values) => {
      const loadingId = toast.loading('Entrando...')

      try {
        const data = await login({
          loginRequestRequest: {
            email: values.email,
            password: values.password,
            remember_me: rememberMe,
          },
        }).unwrap()

        dispatch(setCredentials({
          token: data.access,
          user: data.user,
        }))

        toast.dismiss(loadingId)
        toast.success('Login realizado com sucesso!')

        const next = returnTo ?? (data.user.company_slug ? `/${data.user.company_slug}/dashboard` : '/dashboard')
        router.replace(next)
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
    <LoginWindowContainer>
      <LoginWindowContent>
        <LoginWindowWrapper>
          <LoginWindowHeader>
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
            <TitleH2>Acesso Empresarial</TitleH2>
            <MinorTextH4>Entre para gerenciar seus agendamentos</MinorTextH4>
          </LoginWindowHeader>

          <FormikProvider value={form}>
            <form onSubmit={form.handleSubmit} noValidate>
              <LoginWindowBody>
                <FormikMInput
                  required
                  variant="default"
                  name="email"
                  id="email"
                  label="E-mail"
                  icon={<CiMail />}
                  placeholder="contato@seunegocio.com"
                />
                <FormikMInput
                  required
                  variant="password"
                  name="password"
                  id="password"
                  label="Senha"
                  icon={<AiOutlineLock />}
                  placeholder="Sua senha"
                />
              </LoginWindowBody>

              <LoginWindowFooter>
                <Row>
                  <MButton
                    type="button"
                    $variant="toggle"
                    $toggleLabel="Lembrar"
                    $isActive={rememberMe}
                    onClick={() => setRememberMe((p) => !p)}
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

                <MButton
                  $variant="default"
                  type="submit"
                  fullWidth
                  state={loginState.isLoading ? 'disabled' : 'default'}
                >
                  {loginState.isLoading ? 'Entrando...' : 'Entrar'}
                </MButton>
              </LoginWindowFooter>
            </form>
          </FormikProvider>
        </LoginWindowWrapper>

        <MButton
          type="button"
          $variant="link"
          fullWidth
          onClick={() => router.replace(buildUrl('/cadastro'))}
        >
          Cadastre sua empresa
        </MButton>

        <MButton
          type="button"
          $variant="link"
          fullWidth
          leftIcon={<IoIosArrowBack />}
          onClick={goBackSafe}
        >
          Voltar para a página inicial
        </MButton>
      </LoginWindowContent>
    </LoginWindowContainer>
  )
}
