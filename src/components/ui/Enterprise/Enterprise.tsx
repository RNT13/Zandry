
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { setEnterprise } from "@/redux/slices/bookingSlice";
import { MinorTextH4, Row, TitleH2, TitleH3 } from "@/styles/globalStyles";
import { useRouter } from "next/navigation";
import { BsChatRightText } from "react-icons/bs";
import { FaMapMarkedAlt, FaMapMarkerAlt, FaRegClock } from "react-icons/fa";
import { GoDotFill } from "react-icons/go";
import { MButton } from "../MaskedButton/MaskedButton";
import { AbsoluteDiv, ButtonDiv, EnterpriseAvatar, EnterpriseBanner, EnterpriseContainer, EnterpriseContent, EnterpriseInfo, EnterpriseInfoDiv, EnterpriseTag, EnterpriseTime } from "./Enterprise.styles";

interface EnterpriseProps {
  enterprise: Enterprise
}

export default function Enterprise(props: EnterpriseProps) {
  const { push } = useRouter()
  const dispatch = useAppDispatch()

  // const params = useParams()
  // const slug = params.slug

  const handleNext = (enterprise: Enterprise) => {
    if (!enterprise) return

    dispatch(setEnterprise(enterprise))

    push(`/${props.enterprise.slug}/servicos`)
  }

  return (
    <EnterpriseContainer >
      <EnterpriseContent>
        <EnterpriseBanner >

        </EnterpriseBanner>
        <AbsoluteDiv>
          <EnterpriseAvatar />
          <EnterpriseInfo>
            <TitleH2>{props.enterprise.name}</TitleH2>

            <Row>
              <EnterpriseTag>
                <TitleH3>{props.enterprise.category}</TitleH3>
                <TitleH3>{props.enterprise.state} - {props.enterprise.city}</TitleH3>
              </EnterpriseTag>
              {/* <TitleH3>Descrição</TitleH3> */}
            </Row>

            <ButtonDiv>
              <MButton variant="default" size="lg" fullWidth>Entrar em contato</MButton>
              <MButton variant="default" size="lg" fullWidth onClick={() => handleNext(props.enterprise)}>Serviços</MButton>
            </ButtonDiv>

            <EnterpriseTime>
              <span className="openDot" />
              <TitleH2>Hoje </TitleH2>
              <span className="openTag">Aberto</span>
            </EnterpriseTime>

            <EnterpriseInfoDiv>
              <TitleH2><FaRegClock /> Horários</TitleH2>
              <MinorTextH4>{props.enterprise.schedules}</MinorTextH4>
            </EnterpriseInfoDiv>

            <EnterpriseInfoDiv>
              <TitleH2><FaMapMarkerAlt /> Endereço </TitleH2>
              <MinorTextH4>{props.enterprise.address}</MinorTextH4>
              <MButton variant="link" leftIcon={<FaMapMarkedAlt />}>Ver no mapa</MButton>
            </EnterpriseInfoDiv>

            <EnterpriseInfoDiv>
              <TitleH2><BsChatRightText /> Sobre nós</TitleH2>
              <MinorTextH4>{props.enterprise.description}</MinorTextH4>
              <MinorTextH4> <GoDotFill />{props.enterprise.advantage1}</MinorTextH4>
              <MinorTextH4> <GoDotFill />{props.enterprise.advantage2}</MinorTextH4>
              <MinorTextH4> <GoDotFill />{props.enterprise.advantage3}</MinorTextH4>
            </EnterpriseInfoDiv>

          </EnterpriseInfo>
        </AbsoluteDiv>
      </EnterpriseContent>
    </EnterpriseContainer>
  )
}
