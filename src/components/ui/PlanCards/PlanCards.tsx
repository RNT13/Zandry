import { plansMock } from "@/data/plansMock";
import { MinorTextH4, Row, TitleH2, TitleH3 } from "@/styles/globalStyles";
import { MAnimation } from "@/styles/MaskedAnimations/MAnimation";
import { AiOutlineThunderbolt } from "react-icons/ai";
import { FaCheckCircle, FaRegStar } from "react-icons/fa";
import { FaArrowTrendUp } from "react-icons/fa6";
import { IoBusinessOutline } from "react-icons/io5";
import {
  ComingSoon,
  PlanBadge, PlanCardBusiness, PlanCardFree, PlanCardHeader,
  PlanCardPro, PlanCardsContainer, PlanCardsContent, PlanCardStarter, PlanFeatures, PlanGrid,
  PlanIconBusiness,
  PlanIconFree,
  PlanIconPro,
  PlanIconStarter
} from "./PlanCards.styles";

interface PlanCardsProps {
  selectedPlan: string
  onSelectPlan: (planId: 'trial' | 'start' | 'pro' | 'business') => void
}

export default function PlanCards({ selectedPlan, onSelectPlan }: PlanCardsProps) {

  const trialPlan = plansMock.find(plan => plan.id === 'trial')!
  const startPlan = plansMock.find(plan => plan.id === 'start')!
  const proPlan = plansMock.find(plan => plan.id === 'pro')!
  const businessPlan = plansMock.find(plan => plan.id === 'business')!

  return (
    <PlanCardsContainer>
      <PlanCardsContent>

        <PlanGrid>

          {/* FREE */}
          <MAnimation variant="revealSoftRevealRight" trigger="mount" delay={0.1}>
            <PlanCardFree $active={selectedPlan === 'trial'} onClick={() => onSelectPlan('trial')}>
              <PlanBadge>FREE</PlanBadge>

              <PlanCardHeader>
                <PlanIconFree><FaRegStar /></PlanIconFree>
                <TitleH3>{trialPlan.title}</TitleH3>
                <MinorTextH4>{trialPlan.subtitle}</MinorTextH4>
              </PlanCardHeader>

              <PlanFeatures>
                <Row>
                  <TitleH2>{trialPlan.price}</TitleH2>
                  <MinorTextH4>{trialPlan.trial_days} dias</MinorTextH4>
                </Row>

                {trialPlan.features.map((item: string, index: number) => (
                  <MinorTextH4 key={index}><FaCheckCircle /> {item}</MinorTextH4>
                ))}
              </PlanFeatures>
            </PlanCardFree>
          </MAnimation>

          {/* START */}
          <MAnimation variant="revealSoftRevealRight" trigger="mount" delay={0.2}>
            <PlanCardStarter $active={selectedPlan === 'start'} onClick={() => onSelectPlan('start')}>
              <PlanCardHeader>
                <PlanIconStarter><AiOutlineThunderbolt /></PlanIconStarter>
                <TitleH3>{startPlan.title}</TitleH3>
                <MinorTextH4>{startPlan.subtitle}</MinorTextH4>
              </PlanCardHeader>

              <PlanFeatures>
                <Row>
                  <TitleH2>{startPlan.price}</TitleH2>
                </Row>

                {startPlan.features.map((item: string, index: number) => (
                  <MinorTextH4 key={index}><FaCheckCircle /> {item}</MinorTextH4>
                ))}
              </PlanFeatures>
            </PlanCardStarter>
          </MAnimation>

          {/* PRO */}
          <MAnimation variant="revealSoftRevealRight" trigger="mount" delay={0.3}>
            <PlanCardPro $active={selectedPlan === 'pro'} onClick={() => onSelectPlan('pro')}>
              <PlanBadge>RECOMENDADO</PlanBadge>

              <PlanCardHeader>
                <PlanIconPro><FaArrowTrendUp /></PlanIconPro>
                <TitleH3>{proPlan.title}</TitleH3>
                <MinorTextH4>{proPlan.subtitle}</MinorTextH4>
              </PlanCardHeader>

              <PlanFeatures>
                <Row>
                  <TitleH2>{proPlan.price}</TitleH2>
                </Row>

                {proPlan.features.map((item: string, index: number) => (
                  <MinorTextH4 key={index}><FaCheckCircle /> {item}</MinorTextH4>
                ))}
              </PlanFeatures>
            </PlanCardPro>
          </MAnimation>

          {/* BUSINESS */}
          <MAnimation variant="revealSoftRevealRight" trigger="mount" delay={0.4}>
            <PlanCardBusiness $active={selectedPlan === 'business'} onClick={() => onSelectPlan('business')}>
              <PlanCardHeader>
                <PlanIconBusiness><IoBusinessOutline /></PlanIconBusiness>
                <TitleH3>{businessPlan.title}</TitleH3>
                <MinorTextH4>{businessPlan.subtitle}</MinorTextH4>
              </PlanCardHeader>

              <PlanFeatures>
                <Row>
                  <TitleH2>{businessPlan.price}</TitleH2>
                </Row>

                {businessPlan.features.map((item: string, index: number) => (
                  <MinorTextH4 key={index}><FaCheckCircle /> {item}</MinorTextH4>
                ))}
              </PlanFeatures>

              <ComingSoon><TitleH3>Em breve</TitleH3></ComingSoon>
            </PlanCardBusiness>
          </MAnimation>

        </PlanGrid>

      </PlanCardsContent>
    </PlanCardsContainer>
  )
}
