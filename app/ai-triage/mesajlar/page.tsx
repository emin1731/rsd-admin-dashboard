'use client'

import { useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import { ArrowRight, MessageSquareText, RotateCcw, Send, Zap } from 'lucide-react'

import { cn } from '@/lib/utils'
import { REPORT_PATH, formatAge, getAgeMinutes, records } from '@/lib/records'
import {
  DEFAULT_FALLBACK_GROUP_ID,
  getTeamsGroup,
  teamsGroups,
} from '@/lib/employees'
import {
  getMessageLog,
  getRouting,
  resetRouting,
  setRoutingFor,
  type SentMessage,
} from '@/lib/teams-messaging'
import { useTickingNow } from '@/lib/useTickingNow'

// Distinct incoming ESDs pulled from the dataset (row[4]).
const routableEsds: readonly string[] = Array.from(
  new Set(records.map(r => r[4]).filter(Boolean)),
).sort()

export default function TeamsMessagingPage() {
  const [routing, setRouting] = useState<Record<string, string>>({})
  const [log, setLog] = useState<SentMessage[]>([])
  const [ready, setReady] = useState(false)
  const now = useTickingNow()

  useEffect(() => {
    setRouting(getRouting())
    setLog(getMessageLog())
    setReady(true)
  }, [])

  const handleChange = (esd: string, groupId: string) => {
    setRoutingFor(esd, groupId)
    setRouting(getRouting())
  }

  const handleReset = () => {
    resetRouting()
    setRouting(getRouting())
  }

  const sortedGroups = useMemo(
    () => [...teamsGroups].sort((a, b) => a.name.localeCompare(b.name, 'az')),
    [],
  )

  if (!ready) return null

  return (
    <div className="space-y-4">
      <section className="overflow-hidden rounded-[3px] border border-[#e0e3e7] bg-white">
        <div className="flex items-center justify-between border-b border-[#e5e7ea] px-5 py-4">
          <div>
            <h1 className="text-[15px] font-semibold">AI mesajlarının marşrutlaşdırılması</h1>
            <p className="mt-1 text-[12px] text-[#61656b]">
              Xətanın baş verdiyi ESD üçün məsul Teams qrupunu seçin. Auto-göndəriş bu qrupa
              yönləndirilir.
            </p>
          </div>
          <button
            type="button"
            onClick={handleReset}
            className="inline-flex items-center gap-1.5 rounded-[3px] border border-[#c9d0d7] bg-white px-3 py-1.5 text-[12px] font-medium text-[#30343b] hover:bg-[#f4f7fa]"
          >
            <RotateCcw className="h-3.5 w-3.5" />
            Standarta qaytar
          </button>
        </div>
        <div className="divide-y divide-[#eef0f3]">
          {routableEsds.map(esd => {
            const groupId = routing[esd] ?? DEFAULT_FALLBACK_GROUP_ID
            const group = getTeamsGroup(groupId)
            return (
              <div
                key={esd}
                className="flex flex-wrap items-center justify-between gap-3 px-5 py-3"
              >
                <div className="flex min-w-0 flex-1 items-center gap-3">
                  <span className="inline-flex min-w-[180px] items-center rounded-full border border-[#c9ddf5] bg-[#f6faff] px-2.5 py-1 text-[12px] font-medium text-[#1683df]">
                    ESD: {esd}
                  </span>
                  {group && (
                    <div className="flex min-w-0 items-center gap-2">
                      <span
                        className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-[10px] font-semibold text-white"
                        style={{ backgroundColor: group.color }}
                      >
                        {group.initials}
                      </span>
                      <div className="min-w-0">
                        <div className="truncate text-[13px] font-medium text-[#30343b]">
                          {group.name}
                        </div>
                        <div className="truncate text-[11px] text-[#61656b]">
                          Teams qrupu
                        </div>
                      </div>
                    </div>
                  )}
                </div>
                <select
                  value={groupId}
                  onChange={e => handleChange(esd, e.target.value)}
                  aria-label={`${esd} ESD üçün Teams qrupunu seçin`}
                  className="max-w-[320px] rounded border border-[#e0e3e7] bg-white px-3 py-1.5 text-[12px] text-[#30343b]"
                >
                  {sortedGroups.map(g => (
                    <option key={g.id} value={g.id}>
                      {g.name}
                    </option>
                  ))}
                </select>
              </div>
            )
          })}
        </div>
      </section>

      <section className="overflow-hidden rounded-[3px] border border-[#e0e3e7] bg-white">
        <div className="flex items-center gap-2 border-b border-[#e5e7ea] px-5 py-4">
          <MessageSquareText className="h-4 w-4 text-[#61656b]" />
          <h2 className="text-[14px] font-semibold">Göndərilmiş mesajlar</h2>
          <span className="ml-1 rounded-full bg-[#f4f7fa] px-2 py-0.5 text-[11px] font-medium text-[#61656b]">
            {log.length}
          </span>
        </div>

        {log.length === 0 ? (
          <div className="px-5 py-12 text-center text-[12px] text-[#8a8f96]">
            Hələ heç bir mesaj göndərilməyib.
          </div>
        ) : (
          <ul className="divide-y divide-[#eef0f3]">
            {log.map(msg => {
              const group = getTeamsGroup(msg.recipientId)
              const minutes =
                now !== null
                  ? getAgeMinutes(new Date(msg.sentAt).toISOString(), now)
                  : 0
              return (
                <li key={msg.id} className="px-5 py-3">
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <span
                          className={cn(
                            'inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-[10px] font-semibold text-white',
                          )}
                          style={{ backgroundColor: group?.color ?? '#8a8f96' }}
                        >
                          {group?.initials ?? '??'}
                        </span>
                        <div className="min-w-0">
                          <div className="flex items-center gap-1.5">
                            <span className="text-[13px] font-medium text-[#30343b]">
                              {group?.name ?? 'Naməlum Teams qrupu'}
                            </span>
                            {msg.auto && (
                              <span className="inline-flex items-center gap-1 rounded-sm bg-[#5b5fc7] px-1.5 py-0.5 text-[9px] font-semibold text-white">
                                <Zap className="h-2.5 w-2.5" />
                                Avtomatik
                              </span>
                            )}
                          </div>
                          <div className="text-[11px] text-[#61656b]">
                            ESD: {msg.esd || '—'} · {msg.docNo}
                          </div>
                        </div>
                      </div>
                      <div className="mt-2 font-mono text-[11px] text-[#c73030]">
                        {msg.detectedError}
                      </div>
                      {msg.note && (
                        <div className="mt-1.5 max-w-[540px] whitespace-pre-line text-[11px] text-[#4d5158]">
                          {msg.note}
                        </div>
                      )}
                    </div>
                    <div className="flex flex-col items-end gap-1.5">
                      <span className="inline-flex items-center gap-1 text-[11px] text-[#61656b]">
                        <Send className="h-3 w-3" />
                        {now !== null ? `${formatAge(minutes)} əvvəl` : ''}
                      </span>
                      <Link
                        href={`${REPORT_PATH}/${msg.documentIndex}`}
                        className="inline-flex items-center gap-1 text-[11px] font-medium text-[#1683df] hover:underline"
                      >
                        Sənədə bax
                        <ArrowRight className="h-3 w-3" />
                      </Link>
                    </div>
                  </div>
                </li>
              )
            })}
          </ul>
        )}
      </section>
    </div>
  )
}
