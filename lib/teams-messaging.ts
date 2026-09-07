'use client'

import {
  DEFAULT_FALLBACK_GROUP_ID,
  defaultRouting,
  getTeamsGroup,
  type TeamsGroup,
} from '@/lib/employees'
import type { AnalysisCategory } from '@/lib/records'

const KEY = 'rsd:teams-messaging-v2'

export type SentMessage = {
  id: string
  documentIndex: number
  docNo: string
  recipientId: string
  category: AnalysisCategory
  esd: string
  detectedError: string
  note: string
  sentAt: number
  auto?: boolean
}

type PersistedState = {
  routing: Record<string, string>
  log: SentMessage[]
}

function read(): PersistedState {
  if (typeof window === 'undefined') return { routing: {}, log: [] }
  try {
    const raw = window.localStorage.getItem(KEY)
    if (!raw) return { routing: {}, log: [] }
    const parsed = JSON.parse(raw) as Partial<PersistedState>
    return {
      routing: parsed.routing ?? {},
      log: parsed.log ?? [],
    }
  } catch {
    return { routing: {}, log: [] }
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

export function getRouting(): Record<string, string> {
  const stored = read().routing
  return { ...defaultRouting, ...stored }
}

export function setRoutingFor(esd: string, groupId: string) {
  const state = read()
  state.routing = { ...state.routing, [esd]: groupId }
  write(state)
}

export function resetRouting() {
  const state = read()
  state.routing = {}
  write(state)
}

export function resolveRecipient(esd: string): TeamsGroup | undefined {
  const routing = getRouting()
  return getTeamsGroup(routing[esd]) ?? getTeamsGroup(DEFAULT_FALLBACK_GROUP_ID)
}

export function getMessageLog(): SentMessage[] {
  return read().log
}

export function getMessagesForDocument(index: number): SentMessage[] {
  return read().log.filter(m => m.documentIndex === index)
}

export function logMessage(entry: Omit<SentMessage, 'id' | 'sentAt'>): SentMessage {
  const state = read()
  const sentMessage: SentMessage = {
    ...entry,
    id: `msg_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`,
    sentAt: Date.now(),
  }
  state.log = [sentMessage, ...state.log].slice(0, 200)
  write(state)
  return sentMessage
}
