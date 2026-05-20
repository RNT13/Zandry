'use client'

import Loading from '@/app/loading'
import { usePlanByCode, useSubscriptionPlans } from '@/hooks/api/useSubscriptionPlans'
import type { CodeEnum, SubscriptionPlanReadRead } from '@/redux/slices/api/generatedApi'
import { MinorTextH4, Row, TitleH2, TitleH3 } from '@/styles/globalStyles'
import { MAnimation } from '@/styles/MaskedAnimations/MAnimation'
import { AiOutlineThunderbolt } from 'react-icons/ai'
import { FaCheckCircle, FaRegStar } from 'react-icons/fa'
import { FaArrowTrendUp } from 'react-icons/fa6'
import { IoBusinessOutline } from 'react-icons/io5'
import {
  ComingSoon, PlanBadge,
  PlanCardBusiness, PlanCardFree, PlanCardHeader,
  PlanCardPro, PlanCardsContainer, PlanCardsContent,
  PlanCardStarter, PlanFeatures, PlanGrid,
  PlanIconBusiness, PlanIconFree, PlanIconPro, PlanIconStarter
} from './PlanCards.styles'

interface PlanCardsProps {
  selectedPlan: string
  onSelectPlan: (planId: CodeEnum) => void
}

function FeatureList({ features }: { features: unknown[] }) {
  const items = (features ?? []).filter((f): f is string => typeof f === 'string')
  return (
    <>
      {items.map((item, i) => (
        <MinorTextH4 key={i}><FaCheckCircle /> {item}</MinorTextH4>
      ))}
    </>
  )
}

function CardHeader({ plan, icon }: { plan?: SubscriptionPlanReadRead; icon: React.ReactNode }) {
  return (
    <PlanCardHeader>
      {icon}
      <TitleH3>{plan?.title ?? plan?.name}</TitleH3>
      {plan?.subtitle && <MinorTextH4>{plan.subtitle}</MinorTextH4>}
      {plan?.description && <MinorTextH4>{plan.description}</MinorTextH4>}
    </PlanCardHeader>
  )
}

export default function PlanCards({ selectedPlan, onSelectPlan }: PlanCardsProps) {
  const { plans, isLoading } = useSubscriptionPlans()

  // ← aqui estavam faltando essas 4 linhas
  const trial = usePlanByCode(plans, 'trial')
  const start = usePlanByCode(plans, 'start')
  const pro = usePlanByCode(plans, 'pro')
  const business = usePlanByCode(plans, 'business')

  if (isLoading) {
    return (
      <PlanCardsContainer>
        <PlanCardsContent><Loading /></PlanCardsContent>
      </PlanCardsContainer>
    )
  }

  return (
    <PlanCardsContainer>
      <PlanCardsContent>
        <PlanGrid>

          {/* TRIAL */}
          <MAnimation variant="revealSoftRevealRight" trigger="mount" delay={0.1}>
            <PlanCardFree $active={selectedPlan === 'trial'} onClick={() => onSelectPlan('trial' as CodeEnum)}>
              <PlanBadge>GRATUITO</PlanBadge>
              <CardHeader plan={trial} icon={<PlanIconFree><FaRegStar /></PlanIconFree>} />
              <PlanFeatures>
                <Row>
                  <TitleH2>{trial?.price ?? 'Grátis'}</TitleH2>
                  {trial?.trial_days ? <MinorTextH4>{trial.trial_days} dias</MinorTextH4> : null}
                </Row>
                <FeatureList features={trial?.features ?? []} />
              </PlanFeatures>
            </PlanCardFree>
          </MAnimation>

          {/* START */}
          <MAnimation variant="revealSoftRevealRight" trigger="mount" delay={0.2}>
            <PlanCardStarter $active={selectedPlan === 'start'} onClick={() => onSelectPlan('start' as CodeEnum)}>
              <CardHeader plan={start} icon={<PlanIconStarter><AiOutlineThunderbolt /></PlanIconStarter>} />
              <PlanFeatures>
                <TitleH2>{start?.price ?? '--'}</TitleH2>
                <FeatureList features={start?.features ?? []} />
              </PlanFeatures>
            </PlanCardStarter>
          </MAnimation>

          {/* PRO */}
          <MAnimation variant="revealSoftRevealRight" trigger="mount" delay={0.3}>
            <PlanCardPro $active={selectedPlan === 'pro'} onClick={() => onSelectPlan('pro' as CodeEnum)}>
              <PlanBadge>RECOMENDADO</PlanBadge>
              <CardHeader plan={pro} icon={<PlanIconPro><FaArrowTrendUp /></PlanIconPro>} />
              <PlanFeatures>
                <TitleH2>{pro?.price ?? '--'}</TitleH2>
                <FeatureList features={pro?.features ?? []} />
              </PlanFeatures>
            </PlanCardPro>
          </MAnimation>

          {/* BUSINESS */}
          <MAnimation variant="revealSoftRevealRight" trigger="mount" delay={0.4}>
            <PlanCardBusiness $active={selectedPlan === 'business'} onClick={() => onSelectPlan('business' as CodeEnum)}>
              <CardHeader plan={business} icon={<PlanIconBusiness><IoBusinessOutline /></PlanIconBusiness>} />
              <PlanFeatures>
                <TitleH2>{business?.price ?? '--'}</TitleH2>
                <FeatureList features={business?.features ?? []} />
              </PlanFeatures>
              <ComingSoon><TitleH3>Em breve</TitleH3></ComingSoon>
            </PlanCardBusiness>
          </MAnimation>

        </PlanGrid>
      </PlanCardsContent>
    </PlanCardsContainer>
  )
}
