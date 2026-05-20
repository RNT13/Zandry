'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { useSelector } from 'react-redux'

import useScrollToTop from '@/hooks/useScrollToTop'

import { MinorTextH4, TitleH2 } from '@/styles/globalStyles'
import { BsBuildingFillGear } from 'react-icons/bs'
import { FaUsersGear } from 'react-icons/fa6'
import { IoIosArrowBack } from 'react-icons/io'
import { IoBusinessSharp } from 'react-icons/io5'
import { MdDesignServices, MdPlace } from 'react-icons/md'
import { TbCardsFilled } from 'react-icons/tb'

import { MButton } from '../MaskedButton/MaskedButton'
import { RegisterWindowContainer, RegisterWindowContent, SvgDiv } from './RegisterWindow.styles'

import { selectCurrentStep } from '@/redux/slices/registerSlice'
import Step01OwnerInfo from './steps/Step01OwnerInfo'
import Step02BasicInfo from './steps/Step02CompanyInfo'
import Step03AddressInfo from './steps/Step03AddressInfo'
import Step04AdvantagesInfo from './steps/Step04AdvantagesInfo'
import Step05ServicesInfo from './steps/Step05ServicesInfo'
import Step06ProfessionalsInfo from './steps/Step06ProfessionalsInfo'
import Step07PlanInfo from './steps/Step07PlanInfo'

export default function RegisterWindow() {
  const currentStep = useSelector(selectCurrentStep)

  const router = useRouter()
  const searchParams = useSearchParams()
  const returnTo = searchParams.get('returnTo')

  useScrollToTop({
    trigger: currentStep
  })

  const buildUrl = (path: string) =>
    returnTo ? `${path}?returnTo=${encodeURIComponent(returnTo)}` : path;

  const handleBackToStart = () => {
    if (returnTo) return router.replace(returnTo);
    if (typeof window !== "undefined" && window.history.length > 1) return router.back();
    return router.replace("/login");
  };

  const handleGoToLogin = () => router.replace(buildUrl("/login"));

  return (
    <RegisterWindowContainer>
      <RegisterWindowContent>
        {currentStep === 1 && (
          <>
            <SvgDiv>
              <span><FaUsersGear /></span>
            </SvgDiv>
            <TitleH2>Cadastro administrativo</TitleH2>
            <MinorTextH4>Este será o acesso principal da sua empresa dentro da plataforma.</MinorTextH4>
          </>
        )}

        {currentStep === 2 && (
          <>
            <SvgDiv>
              <span><IoBusinessSharp /></span>
            </SvgDiv>
            <TitleH2>Cadastre sua empresa</TitleH2>
            <MinorTextH4>Agora fale um pouco sobre seu negócio.</MinorTextH4>
          </>
        )}

        {currentStep === 3 && (
          <>
            <SvgDiv>
              <span><MdPlace /></span>
            </SvgDiv>
            <TitleH2>Onde fica sua empresa?</TitleH2>
            <MinorTextH4>Nos conte onde sua empresa fica.</MinorTextH4>
          </>
        )}

        {currentStep === 4 && (
          <>
            <SvgDiv>
              <span><BsBuildingFillGear /></span>
            </SvgDiv>
            <TitleH2>Horários e Diferenciais</TitleH2>
            <MinorTextH4>Defina os horários e diferenciais da sua empresa.</MinorTextH4>
          </>
        )}

        {currentStep === 5 && (
          <>
            <SvgDiv>
              <span><MdDesignServices /></span>
            </SvgDiv>
            <TitleH2>Serviços</TitleH2>
            <MinorTextH4>Quais serviços sua empresa oferece?</MinorTextH4>
          </>
        )}

        {currentStep === 6 && (
          <>
            <SvgDiv>
              <span><FaUsersGear /></span>
            </SvgDiv>
            <TitleH2>Profissionais</TitleH2>
            <MinorTextH4>Quem realizará esses serviços?</MinorTextH4>
          </>
        )}

        {currentStep === 7 && (
          <>
            <SvgDiv>
              <span><TbCardsFilled /></span>
            </SvgDiv>
            <TitleH2>Escolha seu Plano</TitleH2>
            <MinorTextH4>Comece com o trial gratuito ou escolha o plano que melhor atende seu negócio</MinorTextH4>
          </>
        )}

        {currentStep === 1 && <Step01OwnerInfo />}
        {currentStep === 2 && <Step02BasicInfo />}
        {currentStep === 3 && <Step03AddressInfo />}
        {currentStep === 4 && <Step04AdvantagesInfo />}
        {currentStep === 5 && <Step05ServicesInfo />}
        {currentStep === 6 && <Step06ProfessionalsInfo />}
        {currentStep === 7 && <Step07PlanInfo />}

        <MButton
          type="button"
          $variant="link"
          fullWidth
          leftIcon={<IoIosArrowBack />}
          onClick={handleBackToStart}
        >
          Voltar para a página inicial
        </MButton>

        <MButton
          type="button"
          $variant="link"
          fullWidth
          onClick={handleGoToLogin}
        >
          Já possui conta? Ir para login
        </MButton>
      </RegisterWindowContent>
    </RegisterWindowContainer>
  )
}
