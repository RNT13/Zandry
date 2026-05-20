import { MinorTextH4 } from "@/styles/globalStyles";
import { ProgressBarContainer, ProgressBarContent, StepDiv, StepItem } from "./ProgressBar.styles";

interface ProgressBarProps {
  currentStep: number;
  totalSteps: number;
  onStepClick?: (step: number) => void;
  maxReachableStep?: number; // opcional (controle de avanço)
}

export default function ProgressBar({
  currentStep,
  totalSteps,
  onStepClick,
  maxReachableStep,
}: ProgressBarProps) {
  const canClickStep = (step: number) => {
    if (!onStepClick) return false;
    if (maxReachableStep) return step <= maxReachableStep;
    return step <= currentStep;
  };

  return (
    <ProgressBarContainer>
      <ProgressBarContent>
        <MinorTextH4>
          Etapa {currentStep} de {totalSteps}
        </MinorTextH4>

        <StepDiv>
          {Array.from({ length: totalSteps }).map((_, index) => {
            const step = index + 1;
            const clickable = canClickStep(step);

            return (
              <StepItem
                key={index}
                $active={step <= currentStep}
                as="button"
                type="button"
                onClick={() => clickable && onStepClick?.(step)}
                disabled={!clickable}
                aria-label={`Ir para etapa ${step}`}
                title={clickable ? `Ir para etapa ${step}` : "Etapa bloqueada"}
              />
            );
          })}
        </StepDiv>
      </ProgressBarContent>
    </ProgressBarContainer>
  );
}
