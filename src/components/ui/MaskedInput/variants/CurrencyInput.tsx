'use client'

import { useEffect, useRef, useState } from 'react'
import {
  CurrencyWrapper,
  ErrorDiv,
  InputLabel,
  MaskedInputContainer
} from '../MaskedInput.styles'
import { InputVariantMap } from '../MaskedInput.types'

type Props = { variant: 'currency' } & InputVariantMap['currency']

export function CurrencyInput(props: Props) {
  const hasError = props.touched && Boolean(props.error)
  const inputRef = useRef<HTMLInputElement>(null)

  const {
    currencyConfig: {
      symbol = 'R$',
      locale = 'pt-BR'
    } = {}
  } = props

  /* ============================================================
   * ESTADO INTERNO EM CENTAVOS
   * ============================================================ */
  const [cents, setCents] = useState(() => {
    const initial = Number(props.value ?? 0)
    return !isNaN(initial) ? Math.round(initial * 100) : 0
  })

  /* ============================================================
   * SYNC EXTERNO (Formik reset/setFieldValue)
   * ============================================================ */
  useEffect(() => {
    const external = Number(props.value ?? 0)
    const externalCents = !isNaN(external) ? Math.round(external * 100) : 0

    if (externalCents !== cents) {
      const sync = requestAnimationFrame(() => {
        setCents(externalCents)
      })

      return () => cancelAnimationFrame(sync)
    }
  }, [props.value, cents])

  /* ============================================================
   * FORMATADOR VISUAL
   * ============================================================ */
  function formatCurrencyFromCents(value: number) {
    return new Intl.NumberFormat(locale, {
      style: 'decimal',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(value / 100)
  }

  /* ============================================================
   * EMITE PARA FORMIK
   * ============================================================ */
  function emitValue(valueInCents: number) {
    props.onChange?.((valueInCents / 100).toFixed(2))
  }

  /* ============================================================
   * ADICIONA DIGITO (DIREITA -> ESQUERDA)
   * ============================================================ */
  function appendDigit(digit: number) {
    setCents(prev => {
      const updated = prev * 10 + digit
      emitValue(updated)
      return updated
    })
  }

  /* ============================================================
   * REMOVE DIGITO
   * ============================================================ */
  function removeDigit() {
    setCents(prev => {
      const updated = Math.floor(prev / 10)
      emitValue(updated)
      return updated
    })
  }

  /* ============================================================
   * KEYBOARD DESKTOP
   * ============================================================ */
  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.ctrlKey || e.metaKey || e.altKey) return

    if (/^[0-9]$/.test(e.key)) {
      e.preventDefault()
      appendDigit(Number(e.key))
      return
    }

    if (e.key === 'Backspace') {
      e.preventDefault()
      removeDigit()
      return
    }

    if (
      e.key !== 'Tab' &&
      e.key !== 'ArrowLeft' &&
      e.key !== 'ArrowRight'
    ) {
      e.preventDefault()
    }
  }

  /* ============================================================
   * MOBILE / COLAR / INPUT VIRTUAL
   * ============================================================ */
  function handleInput(e: React.FormEvent<HTMLInputElement>) {
    const native = e.nativeEvent as InputEvent

    if (native.inputType === 'insertText' && native.data && /^[0-9]$/.test(native.data)) {
      appendDigit(Number(native.data))
    }

    if (native.inputType === 'deleteContentBackward') {
      removeDigit()
    }

    if (inputRef.current) {
      inputRef.current.value = formatCurrencyFromCents(cents)
    }
  }

  /* ============================================================
   * TRAVA CURSOR SEMPRE NO FINAL
   * ============================================================ */
  function lockCaret() {
    requestAnimationFrame(() => {
      const input = inputRef.current
      if (!input) return

      const end = input.value.length
      input.setSelectionRange(end, end)
    })
  }

  return (
    <MaskedInputContainer
      $variant="currency"
      $radius={props.radius}
      data-error={hasError}
      $icon={!props.symbol}
    >
      {props.label && (
        <InputLabel htmlFor={props.id}>
          <span>{props.label}</span>
        </InputLabel>
      )}

      <CurrencyWrapper>
        <span>{symbol}</span>

        <input
          ref={inputRef}
          id={props.id}
          name={props.name}
          type="tel"
          inputMode="numeric"
          pattern="[0-9]*"
          autoComplete="off"
          value={formatCurrencyFromCents(cents)}
          placeholder="0,00"
          onKeyDown={handleKeyDown}
          onInput={handleInput}
          onClick={lockCaret}
          onFocus={lockCaret}
          onSelect={lockCaret}
          readOnly={false}
          className={hasError ? 'error' : ''}
          aria-invalid={hasError ? 'true' : undefined}
          aria-describedby={hasError ? `${props.id}-error` : undefined}
          disabled={props.disabled}
        />
      </CurrencyWrapper>

      {hasError && <ErrorDiv id={`${props.id}-error`}>{props.error}</ErrorDiv>}
    </MaskedInputContainer>
  )
}
