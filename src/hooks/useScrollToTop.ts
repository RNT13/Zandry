import { useEffect } from 'react'

type Props = {
  trigger: unknown
}

export default function useScrollToTop({ trigger }: Props) {
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }, [trigger])
}
