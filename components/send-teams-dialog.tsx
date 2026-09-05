'use client'

import { useEffect, useMemo, useState } from 'react'
import { Send, Sparkles } from 'lucide-react'

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { records, type Analysis } from '@/lib/records'
import { employees, getEmployee } from '@/lib/employees'
import { logMessage, resolveRecipient } from '@/lib/teams-messaging'
import { buildTeamsMessage } from '@/lib/teams-message'

export function SendTeamsDialog({
  open,
  onOpenChange,
  analysis,
  documentIndex,
  docNo,
  onSent,
}: {
  open: boolean
  onOpenChange: (v: boolean) => void
  analysis: Analysis
  documentIndex: number
  docNo: string
  onSent?: () => void
}) {
  const initialRecipientId = useMemo(
    () => resolveRecipient(analysis.category)?.id ?? employees[0].id,
    [analysis.category],
  )
  const [recipientId, setRecipientId] = useState(initialRecipientId)
  const [note, setNote] = useState('')

  const row = records[documentIndex]
  const recipient = getEmployee(recipientId) ?? employees[0]

  const draftMessage = useMemo(
    () => buildTeamsMessage({ recipient, row, analysis, docNo }),
    [recipient, row, analysis, docNo],
  )

  useEffect(() => {
    if (open) setRecipientId(initialRecipientId)
  }, [open, initialRecipientId])

  useEffect(() => {
    if (open) setNote(draftMessage)
  }, [open, draftMessage])

  const handleSend = () => {
    logMessage({
      documentIndex,
      docNo,
      recipientId: recipient.id,
      category: analysis.category,
      detectedError: analysis.detectedError,
      note: note.trim(),
    })
    onOpenChange(false)
    onSent?.()
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[85vh] w-[calc(100%-2rem)] overflow-y-auto bg-white text-[#30343b] sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-[15px]">
            <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-[#5b5fc7] text-white">
              <Send className="h-3.5 w-3.5" />
            </span>
            Teams-ə göndər
          </DialogTitle>
          <DialogDescription className="text-[12px] text-[#61656b]">
            Standart formatlanmış mesaj hazırdır. Göndərməzdən əvvəl alıcı və
            mətn dəyişdirilə bilər.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 pt-2">
          <div>
            <label className="text-[11px] font-medium uppercase tracking-wide text-[#61656b]">
              Alıcı
            </label>
            <div className="mt-1 flex items-center gap-3 rounded-md border border-[#e0e3e7] bg-white p-2.5">
              <span
                className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-[11px] font-semibold text-white"
                style={{ backgroundColor: recipient.color }}
              >
                {recipient.initials}
              </span>
              <div className="min-w-0 flex-1">
                <div className="truncate text-[13px] font-medium">{recipient.name}</div>
                <div className="truncate text-[11px] text-[#61656b]">
                  {recipient.title} · {recipient.email}
                </div>
              </div>
              <select
                value={recipientId}
                onChange={e => setRecipientId(e.target.value)}
                aria-label="Alıcını dəyişdir"
                className="rounded border border-[#e0e3e7] bg-white px-2 py-1 text-[12px] text-[#30343b]"
              >
                {employees.map(e => (
                  <option key={e.id} value={e.id}>
                    {e.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label
              htmlFor="teams-message"
              className="text-[11px] font-medium uppercase tracking-wide text-[#61656b]"
            >
              Mesaj mətni
            </label>
            <textarea
              id="teams-message"
              value={note}
              onChange={e => setNote(e.target.value)}
              rows={16}
              spellCheck={false}
              className="mt-1 w-full resize-y rounded border border-[#e0e3e7] bg-white px-3 py-2 font-mono text-[12px] leading-[1.5] text-[#30343b] placeholder:text-[#8a8f96] focus:border-[#1683df] focus:outline-none"
            />
          </div>

          <div>
            <label className="text-[11px] font-medium uppercase tracking-wide text-[#61656b]">
              Teams-də bu şəkildə görsənəcək
            </label>
            <div className="mt-1 overflow-hidden rounded-md border border-[#dfe6ef] bg-white">
              <div className="flex items-center gap-2 border-b border-[#dfe6ef] bg-[#f5f6fb] px-3 py-2">
                <span className="inline-flex h-5 w-5 items-center justify-center rounded-sm bg-[#5b5fc7] text-white">
                  <Sparkles className="h-3 w-3" />
                </span>
                <span className="text-[12px] font-semibold text-[#30343b]">
                  RSD Admin — Xəta bildirişi
                </span>
              </div>
              <pre className="max-h-[240px] overflow-auto whitespace-pre-wrap break-words px-3 py-3 font-sans text-[12px] leading-[1.5] text-[#30343b]">
                {note}
              </pre>
            </div>
          </div>
        </div>

        <DialogFooter>
          <button
            type="button"
            onClick={() => onOpenChange(false)}
            className="rounded-[3px] border border-[#c9d0d7] bg-white px-4 py-2 text-[12px] font-medium text-[#30343b] hover:bg-[#f4f7fa]"
          >
            Ləğv et
          </button>
          <button
            type="button"
            onClick={handleSend}
            className="inline-flex items-center gap-1.5 rounded-[3px] bg-[#5b5fc7] px-4 py-2 text-[12px] font-medium text-white hover:bg-[#4f52b3]"
          >
            <Send className="h-3.5 w-3.5" />
            Göndər
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
