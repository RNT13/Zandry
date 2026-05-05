import { useAppDispatch } from "@/hooks/useAppDispatch";
import { setEnterprise } from "@/redux/slices/bookingSlice";
import { MinorTextH4, Row, TitleH2, TitleH3 } from "@/styles/globalStyles";
import { MAnimation } from "@/styles/MaskedAnimations/MAnimation";
import { CompanyType } from "@/types/company.types";
import { getInitials } from "@/utils/initials";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { BsChatRightText } from "react-icons/bs";
import { FaMapMarkedAlt, FaMapMarkerAlt, FaRegClock } from "react-icons/fa";
import { GoDotFill } from "react-icons/go";
import { MdStoreMallDirectory } from "react-icons/md";
import { MButton } from "../MaskedButton/MaskedButton";
import { AbsoluteDiv, ButtonDiv, EnterpriseAvatar, EnterpriseBanner, EnterpriseContainer, EnterpriseContent, EnterpriseInfo, EnterpriseInfoDiv, EnterpriseTag, EnterpriseTime, LoginButtonDiv } from "./Company.styles";

interface CompanyProps {
  company: CompanyType
}

export default function Enterprise({ company }: CompanyProps) {
  const { push } = useRouter()
  const dispatch = useAppDispatch()

  // const params = useParams()
  // const slug = params.slug

  const handleNext = (enterprise: CompanyType) => {
    if (!enterprise) return

    dispatch(setEnterprise(enterprise))

    push(`/${company.slug}/servicos`)
  }

  const handleLogin = () => {
    push(`/login`)
  }

  return (
    <EnterpriseContainer >
      <LoginButtonDiv>
        <MButton $variant="link" size="sm" leftIcon={<MdStoreMallDirectory />} onClick={() => handleLogin()}>Serviço empresarial</MButton>
      </LoginButtonDiv>
      <EnterpriseContent>

        <MAnimation variant="revealFadeInUp" trigger="mount">
          <EnterpriseBanner >

          </EnterpriseBanner>
        </MAnimation>

        <AbsoluteDiv>

          <MAnimation variant="revealFadeInUp" trigger="mount">
            <EnterpriseAvatar >
              {company.logo ? (
                <Image
                  src={company.logo}
                  alt={company.name}
                  width={100}
                  height={100}
                />
              ) : (
                <div >
                  {getInitials(company.name)}
                </div>
              )}
            </EnterpriseAvatar>
          </MAnimation>

          <EnterpriseInfo>
            <MAnimation variant="revealFadeInLeft" trigger="mount" delay={0.2}>
              <TitleH2>{company.name}</TitleH2>
            </MAnimation>

            <MAnimation variant="revealFadeInLeft" trigger="mount" delay={0.4}>
              <Row>
                <EnterpriseTag>
                  <TitleH3>{company.category}</TitleH3>
                  <TitleH3>{company.state} - {company.city}</TitleH3>
                </EnterpriseTag>
              </Row>
            </MAnimation>

            <ButtonDiv>
              <MAnimation variant="revealZoomFromDeep" trigger="mount">
                <MButton $variant="default" size="lg" fullWidth>Contato</MButton>
              </MAnimation>

              <MAnimation variant="revealZoomFromDeep" trigger="mount">
                <MButton $variant="default" size="lg" fullWidth onClick={() => handleNext(company)}>Serviços</MButton>
              </MAnimation>
            </ButtonDiv>

            <MAnimation variant="revealFadeInUp" trigger="mount" delay={0.2}>
              <EnterpriseTime>
                <span className="openDot" />
                <TitleH2>Hoje </TitleH2>
                <span className="openTag">Aberto</span>
              </EnterpriseTime>
            </MAnimation>

            <MAnimation variant="revealFadeInUp" trigger="mount" delay={0.4}>
              <EnterpriseInfoDiv>
                <TitleH2><FaRegClock /> Horários</TitleH2>
                <MinorTextH4>{company.schedules}</MinorTextH4>
              </EnterpriseInfoDiv>
            </MAnimation>

            <MAnimation variant="revealFadeInUp" trigger="mount" delay={0.6}>
              <EnterpriseInfoDiv>
                <TitleH2><FaMapMarkerAlt /> Endereço </TitleH2>
                <MinorTextH4>{company.address}</MinorTextH4>
                <MButton $variant="link" leftIcon={<FaMapMarkedAlt />}>Ver no mapa</MButton>
              </EnterpriseInfoDiv>
            </MAnimation>

            <MAnimation variant="revealFadeInUp" trigger="mount" delay={0.8}>
              <EnterpriseInfoDiv>
                <TitleH2><BsChatRightText /> Sobre nós</TitleH2>
                <MinorTextH4>{company.description}</MinorTextH4>
                <MinorTextH4> <GoDotFill />{company.advantage1}</MinorTextH4>
                <MinorTextH4> <GoDotFill />{company.advantage2}</MinorTextH4>
                <MinorTextH4> <GoDotFill />{company.advantage3}</MinorTextH4>
              </EnterpriseInfoDiv>
            </MAnimation>

          </EnterpriseInfo>
        </AbsoluteDiv>
      </EnterpriseContent>
    </EnterpriseContainer>
  )
}
