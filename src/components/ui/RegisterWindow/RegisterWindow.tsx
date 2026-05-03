'use client'

import { RootState } from '@/redux/store'
import { useSelector } from 'react-redux'


import { MinorTextH4, TitleH2 } from '@/styles/globalStyles'
import { IoIosArrowBack } from 'react-icons/io'
import { IoBusinessSharp } from 'react-icons/io5'
import { MButton } from '../MaskedButton/MaskedButton'
import { RegisterWindowContainer, RegisterWindowContent, SvgDiv } from './RegisterWindow.styles'
import Step01BasicInfo from './steps/Step01BasicInfo'
import Step02AddressInfo from './steps/Step02AddressInfo'
import Step03AdvantagesInfo from './steps/Step03AdvantagesInfo'
import Step04ServicesInfo from './steps/Step04ServicesInfo'
import Step05ProfessionalsInfo from './steps/Step05ProfessionalsInfo'
import Step06SetPassword from './steps/Step06SetPassword'
import Step07SecurityPlan from './steps/Step07SecurityPlan'

export default function RegisterWindow() {
  const currentStep = useSelector((state: RootState) => state.register.currentStep)

  return (
    <RegisterWindowContainer>
      <RegisterWindowContent>
        {currentStep < 7 ? (
          <>
            <SvgDiv>
              <span><IoBusinessSharp /></span>
            </SvgDiv>
            <TitleH2>Cadastre sua empresa</TitleH2>
          </>
        ) : (
          <>
            <SvgDiv>
              <TitleH2>Escolha seu Plano</TitleH2>
              <MinorTextH4>Comece com o trial gratuito ou escolha o plano que melhor atende seu negócio</MinorTextH4>
            </SvgDiv>
          </>
        )}

        {currentStep === 1 && <Step01BasicInfo />}
        {currentStep === 2 && <Step02AddressInfo />}
        {currentStep === 3 && <Step03AdvantagesInfo />}
        {currentStep === 4 && <Step04ServicesInfo />}
        {currentStep === 5 && <Step05ProfessionalsInfo />}
        {currentStep === 6 && <Step06SetPassword />}
        {currentStep === 7 && <Step07SecurityPlan />}

        <MButton $variant="link" fullWidth leftIcon={<IoIosArrowBack />} >Voltar para a página inicial</MButton>

      </RegisterWindowContent>
    </RegisterWindowContainer>
  )
}
