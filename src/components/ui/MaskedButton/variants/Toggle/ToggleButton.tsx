'use client'

import { ButtonVariantMap } from '../../MaskedButton.types'
import { ToggleButtonContainer, ToggleWrapper } from './ToggleButton.styles'

type Props = { $variant: "toggle" } & ButtonVariantMap['toggle']

export default function ToggleButton(props: Props) {
  return (
    <ToggleWrapper>
      <ToggleButtonContainer $isActive={props.$isActive} {...props} />
      {props.$toggleLabel}
    </ToggleWrapper>
  )
}
