'use client'

const KEY = 'rsd:dismissed'

export type Dismissal = {
  reason: string
  dismissedAt: number
}

type PersistedMap = Record<string, Dismissal>

function read(): PersistedMap {
  if (typeof window === 'undefined') return {}
  try {
    const raw = window.localStorage.getItem(KEY)
    if (!raw) return {}
    return JSON.parse(raw) as PersistedMap
  } catch {
    return {}
  }
}

function write(state: PersistedMap) {
  if (typeof window === 'undefined') return
  try {
    window.localStorage.setItem(KEY, JSON.stringify(state))
  } catch {
    /* ignore quota / private-mode errors */
  }
}

export function getDismissed(): Record<number, Dismissal> {
  const state = read()
  const out: Record<number, Dismissal> = {}
  for (const [key, val] of Object.entries(state)) {
    out[Number(key)] = val
  }
  return out
}

export function getDismissal(index: number): Dismissal | undefined {
  return read()[String(index)]
}

export function isDismissed(index: number): boolean {
  return String(index) in read()
}

export function dismissDoc(index: number, reason: string) {
  const state = read()
  state[String(index)] = { reason: reason.trim(), dismissedAt: Date.now() }
  write(state)
}

export function restoreDoc(index: number) {
  const state = read()
  delete state[String(index)]
  write(state)
}
