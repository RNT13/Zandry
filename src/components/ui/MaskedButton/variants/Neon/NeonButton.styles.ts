import { maskedTheme, neonTheme } from '@/styles/MaskedThemes/MaskedThemes'
import { css, styled } from 'styled-components'
import { BaseButton } from '../../Base/BaseButton'

type props = {
  $isActive?: boolean
  $isError?: boolean
}

const activeStyles = css`
  color: ${maskedTheme.colors.baseBlue.dark50};
  background-image: linear-gradient(70deg, ${neonTheme.colors.neonPink.base}, ${neonTheme.colors.neonBlue.base});
  border: 2px solid ${neonTheme.colors.neonBlue.base};

  box-shadow: 0 0 13px ${neonTheme.colors.neonBlue.base};

  svg {
    color: inherit;
  }

  &:hover {
    background-image: linear-gradient(380deg, ${neonTheme.colors.neonBlue.base}, ${neonTheme.colors.neonPink.base});
    color: ${maskedTheme.colors.baseBlue.dark50};
    border-color: ${neonTheme.colors.neonBlue.base};
    box-shadow: 0 0 10px ${neonTheme.colors.neonBlue.base};
  }
`

const errorStyles = css`
  background-image: linear-gradient(70deg, ${neonTheme.colors.neonBlue.base}, ${maskedTheme.colors.baseRed.dark});
  color: ${neonTheme.colors.neonRed.soft};
  border-color: ${neonTheme.colors.neonBlue.base};

  &:hover {
    background-image: linear-gradient(380deg, ${maskedTheme.colors.baseRed.dark}, ${neonTheme.colors.neonBlue.base});
    color: ${maskedTheme.colors.baseRed.light40};
    border-color: ${neonTheme.colors.neonRed.base};
    box-shadow: 0 0 15px ${neonTheme.colors.neonRed.base};
  }
`

export const NeonButtonContainer = styled(BaseButton)<props>`
  color: ${maskedTheme.colors.baseBlue.dark50};
  background-image: linear-gradient(70deg, ${neonTheme.colors.neonPink.base}, ${neonTheme.colors.neonBlue.base});
  border: 2px solid ${neonTheme.colors.neonBlue.base};

  &:hover {
    background-image: linear-gradient(380deg, ${neonTheme.colors.neonBlue.base}, ${neonTheme.colors.neonPink.base});
    color: ${maskedTheme.colors.baseBlue.dark50};
    border-color: ${neonTheme.colors.neonBlue.base};
    box-shadow: 0 0 10px ${neonTheme.colors.neonBlue.base};
  }

  ${({ $isActive }) => $isActive && activeStyles}

  ${({ $isError }) => $isError && errorStyles}
`
