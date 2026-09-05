'use client'

import { useEffect, useState } from 'react'
import { Check, ChevronDown, ChevronUp, RotateCcw, Send, Sparkles, X, XCircle } from 'lucide-react'

import { DismissDialog } from '@/components/dismiss-dialog'
import { SendTeamsDialog } from '@/components/send-teams-dialog'
import { cn } from '@/lib/utils'
import { type Analysis, difficultyMeta, formatAge, getAgeMinutes } from '@/lib/records'
import { getEmployee } from '@/lib/employees'
import {
  getMessagesForDocument,
  type SentMessage,
} from '@/lib/teams-messaging'
import { type Dismissal, getDismissal, restoreDoc } from '@/lib/dismissals'
import { useTickingNow } from '@/lib/useTickingNow'

export function AiAnalysisPanel({
  analysis,
  documentIndex,
  docNo,
}: {
  analysis: Analysis | undefined
  documentIndex: number
  docNo: string
}) {
  const [dialogOpen, setDialogOpen] = useState(false)
  const [dismissDialogOpen, setDismissDialogOpen] = useState(false)
  const [history, setHistory] = useState<SentMessage[]>([])
  const [dismissal, setDismissal] = useState<Dismissal | null>(null)
  const [feedback, setFeedback] = useState<'yes' | 'no' | null>(null)
  const [logsOpen, setLogsOpen] = useState(false)
  const now = useTickingNow()

  useEffect(() => {
    setHistory(getMessagesForDocument(documentIndex))
    setDismissal(getDismissal(documentIndex) ?? null)
  }, [documentIndex])

  const latestSend = history[0]
  const wasSent = !!latestSend

  const refreshHistory = () => {
    setHistory(getMessagesForDocument(documentIndex))
  }

  const refreshDismissal = () => {
    setDismissal(getDismissal(documentIndex) ?? null)
  }

  const handleRestore = () => {
    restoreDoc(documentIndex)
    refreshDismissal()
  }

  if (!analysis) return null

  const diff = difficultyMeta[analysis.difficulty]
  const latestRecipient = latestSend ? getEmployee(latestSend.recipientId) : undefined

  return (
    <section className="mb-6 rounded-md border border-[#c9ddf5] bg-[#f6faff] p-5">
      <header className="mb-4 flex items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-[#1683df] text-white">
            <Sparkles className="h-3.5 w-3.5" />
          </span>
          <h2 className="text-[14px] font-semibold text-[#1683df]">AI Analiz</h2>
        </div>
        <div className="flex items-center gap-2 text-[12px] text-[#4d5158]">
          <span>Etibarlılıq</span>
          <div className="relative h-1.5 w-24 overflow-hidden rounded-full bg-[#e0e8f2]">
            <div
              className="absolute inset-y-0 left-0 rounded-full bg-[#1683df]"
              style={{ width: `${analysis.confidence}%` }}
            />
          </div>
          <span className="font-medium text-[#1683df]">{analysis.confidence}%</span>
        </div>
      </header>

      <div className="mb-4 rounded-md border border-[#f4c2c2] bg-[#fdecec] px-3 py-2">
        <div className="text-[11px] font-medium uppercase tracking-wide text-[#c73030]">
          Aşkarlanmış xəta
        </div>
        <div className="mt-0.5 font-mono text-[12px] font-medium text-[#c73030]">
          {analysis.detectedError}
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Field label="Səbəb">
          <p className="text-[13px] leading-[1.5] text-[#30343b]">{analysis.rootCause}</p>
        </Field>
        <Field label="Kateqoriya">
          <span className="inline-flex items-center rounded-full border border-[#c9ddf5] bg-white px-2.5 py-1 text-[12px] font-medium text-[#1683df]">
            {analysis.category}
          </span>
        </Field>
        <Field label="Çətinlik">
          <span
            className={cn(
              'inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[12px] font-medium',
              diff.bgClass,
              diff.textClass,
              diff.borderClass,
            )}
          >
            <span className={cn('h-1.5 w-1.5 rounded-full', diff.dotClass)} />
            {diff.label}
          </span>
        </Field>
        <Field label="Təklif olunan məsul">
          <p className="text-[13px] font-medium text-[#30343b]">{analysis.suggestedAssignee.entity}</p>
          <p className="text-[12px] text-[#61656b]">{analysis.suggestedAssignee.team}</p>
        </Field>
      </div>

      <div className="mt-4 border-t border-[#c9ddf5] pt-3">
        <button
          type="button"
          onClick={() => setLogsOpen(!logsOpen)}
          className="flex w-full items-center justify-between text-[12px] font-medium text-[#4d5158] hover:text-[#30343b]"
        >
          <span>İstinad edilən loglar ({analysis.logRefs.length})</span>
          {logsOpen ? <ChevronUp className="h-3.5 w-3.5" /> : <ChevronDown className="h-3.5 w-3.5" />}
        </button>
        {logsOpen && (
          <pre className="mt-2 max-h-40 overflow-auto rounded border border-[#dfe6ef] bg-white p-3 font-mono text-[11px] leading-[1.5] text-[#30343b]">
            {analysis.logRefs.join('\n')}
          </pre>
        )}
      </div>

      <div className="mt-4 border-t border-[#c9ddf5] pt-4">
        {dismissal ? (
          <div className="flex flex-wrap items-start justify-between gap-3 rounded-md border border-[#e0e3e7] bg-[#f4f7fa] px-4 py-3">
            <div className="min-w-0 flex-1">
              <div className="inline-flex items-center gap-1.5 text-[12px] font-semibold text-[#4d5158]">
                <XCircle className="h-3.5 w-3.5" />
                Bağlanmış — həll oluna bilmir
              </div>
              {dismissal.reason && (
                <div className="mt-1 text-[12px] text-[#30343b]">
                  <span className="font-medium">Səbəb:</span> {dismissal.reason}
                </div>
              )}
              {now !== null && (
                <div className="mt-1 text-[11px] text-[#61656b]">
                  {formatAge(getAgeMinutes(new Date(dismissal.dismissedAt).toISOString(), now))} əvvəl bağlanıb
                </div>
              )}
            </div>
            <button
              type="button"
              onClick={handleRestore}
              className="inline-flex items-center gap-1.5 rounded-[3px] border border-[#c9d0d7] bg-white px-3 py-1.5 text-[12px] font-medium text-[#30343b] hover:bg-[#f4f7fa]"
            >
              <RotateCcw className="h-3.5 w-3.5" />
              Bərpa et
            </button>
          </div>
        ) : (
          <div className="flex flex-wrap items-center justify-between gap-3">
            {wasSent ? (
              <div className="flex flex-wrap items-center gap-3">
                <div className="inline-flex items-center gap-2 rounded-md bg-[#e8f5ed] px-3 py-2 text-[12px] font-medium text-[#178a4c]">
                  <Check className="h-3.5 w-3.5" />
                  {latestRecipient?.name ?? 'Alıcıya'} Teams-də göndərildi
                  {now !== null && (
                    <span className="text-[#61656b]">
                      · {formatAge(getAgeMinutes(new Date(latestSend.sentAt).toISOString(), now))} əvvəl
                    </span>
                  )}
                </div>
                <button
                  type="button"
                  onClick={() => setDialogOpen(true)}
                  className="text-[12px] font-medium text-[#1683df] hover:underline"
                >
                  Yenidən göndər
                </button>
              </div>
            ) : (
              <div className="flex flex-wrap items-center gap-2">
                <button
                  type="button"
                  onClick={() => setDialogOpen(true)}
                  className="inline-flex items-center gap-1.5 rounded-[3px] bg-[#1683df] px-4 py-2 text-[12px] font-medium text-white hover:bg-[#1274c5]"
                >
                  <Send className="h-3.5 w-3.5" />
                  Təsdiqlə və Teams-ə göndər
                </button>
                <button
                  type="button"
                  onClick={() => setDismissDialogOpen(true)}
                  className="inline-flex items-center gap-1.5 rounded-[3px] border border-[#c9d0d7] bg-white px-3 py-2 text-[12px] font-medium text-[#61656b] hover:border-[#c73030] hover:text-[#c73030]"
                >
                  <XCircle className="h-3.5 w-3.5" />
                  Həll edilməz olaraq bağla
                </button>
              </div>
            )}

            {wasSent && (
              feedback ? (
                <span className="text-[12px] text-[#61656b]">Rəy qeydə alındı. Təşəkkürlər.</span>
              ) : (
                <div className="flex items-center gap-2 text-[12px] text-[#61656b]">
                  <span>AI düz təxmin etdi?</span>
                  <button
                    type="button"
                    onClick={() => setFeedback('yes')}
                    aria-label="Bəli"
                    className="inline-flex h-6 w-6 items-center justify-center rounded-full border border-[#c9d0d7] bg-white text-[#178a4c] hover:bg-[#e8f5ed]"
                  >
                    <Check className="h-3 w-3" />
                  </button>
                  <button
                    type="button"
                    onClick={() => setFeedback('no')}
                    aria-label="Xeyr"
                    className="inline-flex h-6 w-6 items-center justify-center rounded-full border border-[#c9d0d7] bg-white text-[#c73030] hover:bg-[#fdecec]"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </div>
              )
            )}
          </div>
        )}
      </div>

      <SendTeamsDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        analysis={analysis}
        documentIndex={documentIndex}
        docNo={docNo}
        onSent={refreshHistory}
      />

      <DismissDialog
        open={dismissDialogOpen}
        onOpenChange={setDismissDialogOpen}
        documentIndex={documentIndex}
        docNo={docNo}
        detectedError={analysis.detectedError}
        onDismissed={refreshDismissal}
      />
    </section>
  )
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <div className="text-[11px] font-medium uppercase tracking-wide text-[#61656b]">{label}</div>
      <div className="mt-1">{children}</div>
    </div>
  )
}
