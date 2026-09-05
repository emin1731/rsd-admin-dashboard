'use client'

const KEY = 'rsd:notifications'

type PersistedState = {
  snoozed: Record<string, number>
  lastSeenAt: number
}

function read(): PersistedState {
  if (typeof window === 'undefined') return { snoozed: {}, lastSeenAt: 0 }
  try {
    const raw = window.localStorage.getItem(KEY)
    if (!raw) return { snoozed: {}, lastSeenAt: 0 }
    const parsed = JSON.parse(raw) as Partial<PersistedState>
    return {
      snoozed: parsed.snoozed ?? {},
      lastSeenAt: parsed.lastSeenAt ?? 0,
    }
  } catch {
    return { snoozed: {}, lastSeenAt: 0 }
  }
}

function write(state: PersistedState) {
  if (typeof window === 'undefined') return
  try {
    window.localStorage.setItem(KEY, JSON.stringify(state))
  } catch {
    /* ignore quota / private-mode errors */
  }
}

export function getSnoozed(): Record<number, number> {
  const state = read()
  const now = Date.now()
  const cleaned: Record<number, number> = {}
  let dirty = false
  for (const [key, until] of Object.entries(state.snoozed)) {
    if (until > now) cleaned[Number(key)] = until
    else dirty = true
  }
  if (dirty) write({ ...state, snoozed: Object.fromEntries(Object.entries(cleaned)) })
  return cleaned
}

export function snooze(index: number, durationMinutes: number) {
  const state = read()
  state.snoozed[String(index)] = Date.now() + durationMinutes * 60_000
  write(state)
}

export function unsnooze(index: number) {
  const state = read()
  delete state.snoozed[String(index)]
  write(state)
}

export function getLastSeenAt(): number {
  return read().lastSeenAt
}

export function setLastSeenAt(ts: number) {
  const state = read()
  state.lastSeenAt = ts
  write(state)
}
