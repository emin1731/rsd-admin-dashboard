'use client'

import { useEffect, useState } from 'react'

export function useTickingNow(intervalMs = 30_000): number | null {
  const [now, setNow] = useState<number | null>(null)

  useEffect(() => {
    let id: ReturnType<typeof setInterval> | null = null
    const start = () => {
      setNow(Date.now())
      id = setInterval(() => setNow(Date.now()), intervalMs)
    }
    const stop = () => {
      if (id !== null) clearInterval(id)
      id = null
    }
    const onVisibility = () => {
      if (document.visibilityState === 'visible') start()
      else stop()
    }
    start()
    document.addEventListener('visibilitychange', onVisibility)
    return () => {
      stop()
      document.removeEventListener('visibilitychange', onVisibility)
    }
  }, [intervalMs])

  return now
}
