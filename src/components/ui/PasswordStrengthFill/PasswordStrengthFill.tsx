import { Column, MinorTextH4 } from "@/styles/globalStyles";
import { maskedTheme } from "@/styles/MaskedThemes/MaskedThemes";
import {
  PasswordRulesBox,
  PasswordStrengthFill,
  PasswordStrengthFillContainer,
  PasswordStrengthFillContent,
  PasswordStrengthText,
  PasswordStrengthWrapper,
  SecurityInfoBox
} from "./PasswordStrengthFill.styles";

interface PasswordStrengthFillProps {
  password: string
  confirmPassword: string
}

export default function PasswordStrengthFillBar({ password, confirmPassword }: PasswordStrengthFillProps) {

  const hasMinLength = password.length >= 6
  const hasLetter = /[A-Za-z]/.test(password)
  const hasNumber = /[0-9]/.test(password)
  const hasSpecial = /[^A-Za-z0-9]/.test(password)

  const passwordsMatch =
    password &&
    confirmPassword &&
    password === confirmPassword

  const strength = [hasMinLength, hasLetter, hasNumber, hasSpecial].filter(Boolean).length

  const getPasswordStrength = () => {
    if (strength <= 1) {
      return {
        label: 'Senha fraca',
        color: maskedTheme.colors.baseRed.base,
        textColor: maskedTheme.colors.baseBlue.light50
      }
    }

    if (strength <= 2) {
      return {
        label: 'Senha média',
        color: maskedTheme.colors.baseYellow.base,
        textColor: maskedTheme.colors.baseBlue.dark20
      }
    }

    return {
      label: 'Senha forte',
      color: maskedTheme.colors.baseBlue.base,
      textColor: maskedTheme.colors.baseBlue.light50
    }
  }

  const passwordStrength = getPasswordStrength()

  const getStrengthWidth = () => {
    if (strength <= 1) return 33
    if (strength <= 3) return 66
    return 100
  }

  const strengthWidth = getStrengthWidth()

  const renderRequirement = (valid: boolean, text: string) => (
    <MinorTextH4 style={{ opacity: valid ? 1 : 0.55 }}>
      {valid ? '✅' : '⭕'} {text}
    </MinorTextH4>
  )

  return (
    <PasswordStrengthFillContainer>
      <PasswordStrengthFillContent>

        <Column>
          <PasswordStrengthWrapper>
            <PasswordStrengthFill
              $width={password ? strengthWidth : 0}
              $color={passwordStrength.color}
            />

            <PasswordStrengthText $color={passwordStrength.textColor}>
              {password ? passwordStrength.label : 'Digite uma senha segura'}
            </PasswordStrengthText>
          </PasswordStrengthWrapper>
        </Column>

        <PasswordRulesBox>
          {renderRequirement(hasMinLength, 'Mínimo de 6 caracteres')}
          {renderRequirement(hasLetter, 'Pelo menos 1 letra')}
          {renderRequirement(hasNumber, 'Pelo menos 1 número')}
          {renderRequirement(!!passwordsMatch, 'As senhas coincidem')}
        </PasswordRulesBox>

        <SecurityInfoBox>
          <MinorTextH4>
            🔒 Seus dados ficam protegidos e essa senha poderá ser alterada futuramente dentro do painel.
          </MinorTextH4>
        </SecurityInfoBox>

      </PasswordStrengthFillContent>
    </PasswordStrengthFillContainer>
  )
}
