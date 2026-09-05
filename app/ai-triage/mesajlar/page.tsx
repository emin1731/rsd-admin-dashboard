'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { ArrowRight, MessageSquareText, RotateCcw, Send } from 'lucide-react'

import { cn } from '@/lib/utils'
import { REPORT_PATH, type AnalysisCategory, formatAge, getAgeMinutes } from '@/lib/records'
import { employees, getEmployee } from '@/lib/employees'
import {
  getMessageLog,
  getRouting,
  resetRouting,
  setRoutingFor,
  type SentMessage,
} from '@/lib/teams-messaging'
import { useTickingNow } from '@/lib/useTickingNow'

const CATEGORIES: readonly AnalysisCategory[] = [
  'Şəbəkə',
  'Sertifikat',
  'Qəbul edən sistem',
  'Format',
  'Vaxt aşımı',
  'Avtorizasiya',
]

export default function TeamsMessagingPage() {
  const [routing, setRouting] = useState<Record<AnalysisCategory, string>>(
    {} as Record<AnalysisCategory, string>,
  )
  const [log, setLog] = useState<SentMessage[]>([])
  const [ready, setReady] = useState(false)
  const now = useTickingNow()

  useEffect(() => {
    setRouting(getRouting())
    setLog(getMessageLog())
    setReady(true)
  }, [])

  const handleChange = (category: AnalysisCategory, employeeId: string) => {
    setRoutingFor(category, employeeId)
    setRouting(getRouting())
  }

  const handleReset = () => {
    resetRouting()
    setRouting(getRouting())
  }

  if (!ready) return null

  return (
    <div className="space-y-4">
      <section className="overflow-hidden rounded-[3px] border border-[#e0e3e7] bg-white">
        <div className="flex items-center justify-between border-b border-[#e5e7ea] px-5 py-4">
          <div>
            <h1 className="text-[15px] font-semibold">AI mesajlarının marşrutlaşdırılması</h1>
            <p className="mt-1 text-[12px] text-[#61656b]">
              Hər xəta kateqoriyası üçün Teams-də məsul olan işçini seçin.
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
          {CATEGORIES.map(category => {
            const employeeId = routing[category] ?? ''
            const employee = getEmployee(employeeId)
            return (
              <div
                key={category}
                className="flex flex-wrap items-center justify-between gap-3 px-5 py-3"
              >
                <div className="flex min-w-0 flex-1 items-center gap-3">
                  <span className="inline-flex min-w-[160px] items-center rounded-full border border-[#c9ddf5] bg-[#f6faff] px-2.5 py-1 text-[12px] font-medium text-[#1683df]">
                    {category}
                  </span>
                  {employee && (
                    <div className="flex min-w-0 items-center gap-2">
                      <span
                        className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-[10px] font-semibold text-white"
                        style={{ backgroundColor: employee.color }}
                      >
                        {employee.initials}
                      </span>
                      <div className="min-w-0">
                        <div className="truncate text-[13px] font-medium text-[#30343b]">
                          {employee.name}
                        </div>
                        <div className="truncate text-[11px] text-[#61656b]">
                          {employee.title}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
                <select
                  value={employeeId}
                  onChange={e => handleChange(category, e.target.value)}
                  aria-label={`${category} kateqoriyası üçün məsulu seçin`}
                  className="rounded border border-[#e0e3e7] bg-white px-3 py-1.5 text-[12px] text-[#30343b]"
                >
                  {employees.map(e => (
                    <option key={e.id} value={e.id}>
                      {e.name}
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
              const recipient = getEmployee(msg.recipientId)
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
                          style={{ backgroundColor: recipient?.color ?? '#8a8f96' }}
                        >
                          {recipient?.initials ?? '??'}
                        </span>
                        <div className="min-w-0">
                          <div className="text-[13px] font-medium text-[#30343b]">
                            {recipient?.name ?? 'Naməlum alıcı'}
                          </div>
                          <div className="text-[11px] text-[#61656b]">
                            {msg.category} · {msg.docNo}
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
