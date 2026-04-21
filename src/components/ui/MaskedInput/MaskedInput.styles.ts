import { transitions } from '@/styles/MaskedAnimations/animations/transitions'
import { maskedTheme } from '@/styles/MaskedThemes/MaskedThemes'
import styled from 'styled-components'

type props = {
  $variant?: string
  $hasToggle?: boolean
  $radius?: number
}

/* ============================================================
 * CONTAINER
 * ============================================================ */

export const MaskedInputContainer = styled.div<props>`
  position: relative;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 6px;

  input,
  textarea,
  select,
  button {
    width: 100%;
    padding: 12px;
    border-radius: ${({ $radius }) => ($radius ? `${$radius}px` : '18px')};
    border: 2px solid ${maskedTheme.colors.baseBlue.light08};
    font-size: ${maskedTheme.fontSize.md};
    font-weight: 800;
    line-height: 1.4;
    color: ${maskedTheme.colors.baseBlue.base};
    background-color: ${maskedTheme.colors.baseBlue.light02};
    z-index: 2;
    text-align: left;

    ${transitions.slow}

    ${({ $hasToggle }) => $hasToggle && `padding-right: 44px;`}

    input.input-hidden {
      position: absolute;
      inset: 0;
      opacity: 0;
      cursor: pointer;
    }

    /* Hover */
    &:hover {
      border-color: ${maskedTheme.colors.baseBlue.base};
    }

    /* Focus */
    &:focus {
      outline: none;
      background-color: ${maskedTheme.colors.baseBlue.light04};
      border-color: ${maskedTheme.colors.baseBlue.light};
      box-shadow: 0px 0px 10px 2px ${maskedTheme.colors.baseBlue.light};
      color: ${maskedTheme.colors.baseBlue.base};

      &::placeholder {
        color: ${maskedTheme.colors.baseBlue.light40};
      }
    }

    /* Disabled */
    &:disabled {
      background-color: ${maskedTheme.colors.baseBlue.light20};
      cursor: not-allowed;
      opacity: 0.7;
    }

    /* Error */
    &.error {
      border-color: ${maskedTheme.colors.baseRed.base};
      background-color: ${maskedTheme.colors.baseRed.light02};
      color: ${maskedTheme.colors.baseRed.light20};

      &:focus {
        box-shadow: 0 0 0 3px ${maskedTheme.colors.baseRed.light20};
      }

      &.error::placeholder {
        color: ${maskedTheme.colors.baseRed.light20};
      }
    }

    &::placeholder {
      color: ${maskedTheme.colors.baseBlue.light40};
    }
  }

  input,
  textarea,
  select {
    min-height: 44px;
    padding: 0 12px;
    line-height: 40px;
  }

  /* ===================== TEXTAREA ===================== */

  textarea {
    min-height: 96px;
    width: 100%;
    resize: none;
    scrollbar-width: thin;
    scrollbar-color: ${maskedTheme.colors.baseBlue.base} ${maskedTheme.colors.baseBlue.light20};
  }
`

/* ============================================================
 * SEARCH ICON
 * ============================================================ */

export const SearchIcon = styled.div`
  position: absolute;
  left: 12px;
  top: 42px;
  font-size: 1.3rem;
  color: ${maskedTheme.colors.baseBlue.light30};
  pointer-events: none;
  z-index: 3;
`

/* ============================================================
 * PASSWORD TOGGLE
 * ============================================================ */

export const PasswordToggle = styled.div`
  position: absolute;
  right: 12px;
  top: 43px;
  background: none;
  border: none;
  cursor: pointer;
  z-index: 2;
  color: ${maskedTheme.colors.baseBlue.light};

  svg {
    font-size: 1.5rem;
  }
`

/* ============================================================
 * FILE PREVIEW
 * ============================================================ */

export const PreviewImageDiv = styled.div`
  margin-top: 10px;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(88px, 1fr));
  gap: 10px;

  img {
    border-radius: 10px;
    object-fit: cover;
    border: 2px solid ${maskedTheme.colors.baseBlue.light20};
    background: ${maskedTheme.colors.baseBlue.light02};
  }
`

/* ============================================================
 * FILE BUTTON
 * ============================================================ */

export const FileTrigger = styled.button`
  width: 100%;
  height: 40px;

  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;

  border-radius: 16px;
  border: 2px solid ${maskedTheme.colors.baseBlue.light20};
  color: ${maskedTheme.colors.baseBlue.light40};
  background-color: ${maskedTheme.colors.baseBlue.light02};
  font-size: 0.95rem;
  font-weight: 500;

  cursor: pointer;

  transition:
    border-color 0.2s ease,
    background-color 0.2s ease,
    color 0.2s ease;

  &:hover {
    border-color: ${maskedTheme.colors.baseBlue.base};
    background: ${maskedTheme.colors.baseBlue.light};
  }

  &:focus-visible {
    outline: none;
    box-shadow: 0 0 0 3px ${maskedTheme.colors.baseBlue.light20};
  }
`

/* ============================================================
 * ERROR
 * ============================================================ */

export const ErrorDiv = styled.div`
  color: ${maskedTheme.colors.baseRed.light30};
  font-size: 0.85rem;
  font-weight: 500;
  background-color: ${maskedTheme.colors.baseRed.light04};
  padding: 6px 12px;
  border-radius: 10px;
`

/* ============================================================
 * LABEL
 * ============================================================ */
export const InputLabel = styled.label`
  color: ${maskedTheme.colors.baseBlue.light30};
  font-size: 18px;
  font-weight: 500;
  margin-bottom: 6px;
  display: flex;
  align-items: center;
  gap: 4px;

  svg {
    font-size: 20px;
  }
`

/* ============================================================
 * SELECT
 * ============================================================ */
export const SelectTrigger = styled.button`
  width: 100%;
  padding: 12px 14px;
  border-radius: 16px;
  color: ${maskedTheme.colors.baseBlue.light40};
  background-color: ${maskedTheme.colors.baseBlue.light02};
  border: 2px solid ${maskedTheme.colors.baseBlue.light20};
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
`

export const SelectDropdown = styled.div`
  position: absolute;
  top: 100%;
  padding: 4px 4px 0px 4px;
  left: 0;
  width: 100%;
  border-radius: 14px;
  overflow: hidden;
  background: ${maskedTheme.colors.baseBlue.base};
  z-index: 5;
`

export const SelectOption = styled.div`
  width: 100%;
  padding: 8px;
  border-radius: 14px;
  margin-bottom: 4px;
  background: ${maskedTheme.colors.baseBlue.dark20};
  color: ${maskedTheme.colors.baseBlue.light50};
  border: 2px solid ${maskedTheme.colors.baseBlue.light20};
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  font-weight: 800;

  &:hover {
    background: ${maskedTheme.colors.baseBlue.light20};
    color: ${maskedTheme.colors.baseBlue.base};
    border-color: ${maskedTheme.colors.baseBlue.dark20};
  }
`

/* ============================================================
 * CURRENCY
 * ============================================================ */
export const CurrencyWrapper = styled.div`
  position: relative;

  span {
    position: absolute;
    left: 14px;
    top: 50%;
    transform: translateY(-50%);
    font-weight: 600;
    color: ${maskedTheme.colors.baseBlue.light30};
    pointer-events: none;
  }

  input {
    padding-left: 44px;
  }
`
