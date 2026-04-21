import { maskedTheme } from '@/styles/MaskedThemes/MaskedThemes'
import { css, styled } from 'styled-components'
import { BaseButton } from '../../Base/BaseButton'

type props = {
  $isActive?: boolean
  $isError?: boolean
}

const activeStyles = css`
  color: ${maskedTheme.colors.baseBlue.light20};
  text-decoration: underline;

  svg {
    color: inherit;
  }

  &:hover {
    color: ${maskedTheme.colors.baseBlue.light30};
  }
`

const errorStyles = css`
  color: ${maskedTheme.colors.baseRed.light30};

  &:hover {
    color: ${maskedTheme.colors.baseRed.light20};
    text-decoration: underline;
  }
`

export const LinkButtonContainer = styled(BaseButton)<props>`
  display: flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;

  color: ${maskedTheme.colors.baseBlue.base};
  background-color: transparent;
  border: none;

  &:hover {
    color: ${maskedTheme.colors.baseBlue.base};
    background-color: transparent;
    border: none;

    text-decoration: underline;
    color: ${maskedTheme.colors.baseBlue.light30};
    transition: all 0.3s ease;
  }

  ${({ $isActive }) => $isActive && activeStyles}

  ${({ $isError }) => $isError && errorStyles}
`
