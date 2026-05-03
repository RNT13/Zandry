import { MinorTextH4 } from "@/styles/globalStyles";
import { ProgressBarContainer, ProgressBarContent, StepDiv, StepItem } from "./ProgressBar.styles";

interface ProgressBarProps {
  currentStep: number
  totalSteps: number
}

export default function ProgressBar({ currentStep, totalSteps }: ProgressBarProps) {
  return (
    <ProgressBarContainer>
      <ProgressBarContent>
        <MinorTextH4>
          Etapa {currentStep} de {totalSteps}
        </MinorTextH4>

        <StepDiv>
          {Array.from({ length: totalSteps }).map((_, index) => (
            <StepItem
              key={index}
              $active={index + 1 <= currentStep}
            />
          ))}
        </StepDiv>
      </ProgressBarContent>
    </ProgressBarContainer>
  )
}
