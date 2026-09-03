'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import {
  CalendarDays,
  CheckCircle2,
  ChevronDown,
  Eye,
  Search,
  X,
} from 'lucide-react'

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'
import {
  difficultyMeta,
  getAnalysis,
  hasAnalysis,
  records,
  REPORT_PATH,
  type Difficulty,
} from '@/lib/records'

const dropdownCols = {
  sender: { index: 1, label: 'Göndərən qurum' },
  senderEsd: { index: 2, label: 'Göndərən ESD' },
  receiver: { index: 3, label: 'Qəbul edən qurum' },
  incomingEsd: { index: 4, label: 'Gələn ESD' },
  status: { index: 8, label: 'Status' },
} as const
type DropdownKey = keyof typeof dropdownCols

const distinctValues = (idx: number) =>
  Array.from(new Set(records.map(r => r[idx]))).sort()

export default function QurumlarHesabat() {
  const [dropdowns, setDropdowns] = useState<Record<DropdownKey, Set<string>>>({
    sender: new Set(),
    senderEsd: new Set(),
    receiver: new Set(),
    incomingEsd: new Set(),
    status: new Set(),
  })
  const [docNoSearch, setDocNoSearch] = useState('11-1/')
  const [reqIdSearch, setReqIdSearch] = useState('')
  const [onlyAi, setOnlyAi] = useState(false)

  const toggleValue = (key: DropdownKey, value: string) =>
    setDropdowns(prev => {
      const next = new Set(prev[key])
      if (next.has(value)) next.delete(value)
      else next.add(value)
      return { ...prev, [key]: next }
    })

  const clearDropdown = (key: DropdownKey) =>
    setDropdowns(prev => ({ ...prev, [key]: new Set() }))

  const filtered = useMemo(() => {
    const docNeedle = docNoSearch.trim().toLowerCase()
    const reqNeedle = reqIdSearch.trim().toLowerCase()
    return records
      .map((row, index) => ({ row, index }))
      .filter(({ row, index }) => {
        if (onlyAi && !hasAnalysis(index)) return false
        if (docNeedle && !row[0].toLowerCase().includes(docNeedle)) return false
        if (reqNeedle && !row[7].toLowerCase().includes(reqNeedle)) return false
        for (const key of Object.keys(dropdownCols) as DropdownKey[]) {
          const selected = dropdowns[key]
          if (selected.size > 0 && !selected.has(row[dropdownCols[key].index])) return false
        }
        return true
      })
  }, [dropdowns, docNoSearch, reqIdSearch, onlyAi])

  return (
    <section className="min-h-[calc(100vh-72px)] overflow-hidden rounded-[3px] border border-[#e0e3e7] bg-white">
      <div className="flex items-center justify-between px-5 py-4">
        <h1 className="font-semibold text-[15px]">Qurumlar üzrə hesabat</h1>
      </div>
      <div className="px-5">
        <div className="mb-3 flex items-center justify-between">
          <div className="flex items-center gap-5">
            <p className="font-medium">Say: {filtered.length}</p>
            <label className="flex cursor-pointer select-none items-center gap-2 text-[12px] text-[#61656b]">
              <input
                type="checkbox"
                checked={onlyAi}
                onChange={e => setOnlyAi(e.target.checked)}
                className="h-3.5 w-3.5 accent-[#1683df]"
              />
              Yalnız AI təhlili olanlar
            </label>
          </div>
          <button className="rounded-[3px] bg-[#078d69] px-4 py-2 text-[12px] font-medium text-white hover:bg-[#06795c]">
            Excel Hesabat
          </button>
        </div>

        <Table className="text-center text-[12px]">
          <TableHeader>
            <TableRow className="border-b border-[#dfe2e6] hover:bg-transparent">
              <TableHead className="align-middle px-2 py-3 text-center font-semibold text-[#30343b]">
                <span className="inline-flex h-8 items-center justify-center">№</span>
              </TableHead>
              <TableHead className="align-middle px-2 py-3 text-center font-semibold text-[#30343b]">
                <SearchFilter value={docNoSearch} onChange={setDocNoSearch} placeholder="11-1/" />
              </TableHead>
              <TableHead className="align-middle px-2 py-3 text-center font-semibold text-[#30343b]">
                <FilterDropdown
                  label={dropdownCols.sender.label}
                  options={distinctValues(dropdownCols.sender.index)}
                  selected={dropdowns.sender}
                  onToggle={v => toggleValue('sender', v)}
                  onClear={() => clearDropdown('sender')}
                />
              </TableHead>
              <TableHead className="align-middle px-2 py-3 text-center font-semibold text-[#30343b]">
                <FilterDropdown
                  label={dropdownCols.senderEsd.label}
                  options={distinctValues(dropdownCols.senderEsd.index)}
                  selected={dropdowns.senderEsd}
                  onToggle={v => toggleValue('senderEsd', v)}
                  onClear={() => clearDropdown('senderEsd')}
                />
              </TableHead>
              <TableHead className="align-middle px-2 py-3 text-center font-semibold text-[#30343b]">
                <FilterDropdown
                  label={dropdownCols.receiver.label}
                  options={distinctValues(dropdownCols.receiver.index)}
                  selected={dropdowns.receiver}
                  onToggle={v => toggleValue('receiver', v)}
                  onClear={() => clearDropdown('receiver')}
                />
              </TableHead>
              <TableHead className="align-middle px-2 py-3 text-center font-semibold text-[#30343b]">
                <FilterDropdown
                  label={dropdownCols.incomingEsd.label}
                  options={distinctValues(dropdownCols.incomingEsd.index)}
                  selected={dropdowns.incomingEsd}
                  onToggle={v => toggleValue('incomingEsd', v)}
                  onClear={() => clearDropdown('incomingEsd')}
                />
              </TableHead>
              <TableHead className="align-middle px-2 py-3 text-center font-semibold text-[#30343b]">
                <PlainHeader label="Status Kod" />
              </TableHead>
              <TableHead className="align-middle px-2 py-3 text-center font-semibold text-[#30343b]">
                <PlainHeader label="Məbləğ" />
              </TableHead>
              <TableHead className="align-middle px-2 py-3 text-center font-semibold text-[#30343b]">
                <SearchFilter value={reqIdSearch} onChange={setReqIdSearch} placeholder="Sorğu Id-si" />
              </TableHead>
              <TableHead className="align-middle px-2 py-3 text-center font-semibold text-[#30343b]">
                <PlainHeader label="Xaricdə baş verən" />
              </TableHead>
              <TableHead className="align-middle px-2 py-3 text-center font-semibold text-[#30343b]">
                <FilterDropdown
                  label={dropdownCols.status.label}
                  options={distinctValues(dropdownCols.status.index)}
                  selected={dropdowns.status}
                  onToggle={v => toggleValue('status', v)}
                  onClear={() => clearDropdown('status')}
                />
              </TableHead>
              <TableHead className="align-middle px-2 py-3 text-center font-semibold text-[#30343b]">
                <PlainHeader label="Nais paketidirmi?" />
              </TableHead>
              <TableHead className="align-middle px-2 py-3 text-center font-semibold text-[#30343b]">
                <div className="flex h-8 min-w-[140px] items-center justify-center gap-1.5 rounded border border-[#e1e4e8] px-2.5 font-normal text-[#777d84]">
                  <CalendarDays className="h-3.5 w-3.5" />
                  Tarix
                </div>
              </TableHead>
              <TableHead className="align-middle px-2 py-3 text-center font-semibold text-[#30343b]">
                <PlainHeader label="Paket versiyası" />
              </TableHead>
              <TableHead className="align-middle px-2 py-3 text-center font-semibold text-[#30343b]">
                <span className="inline-block h-8" />
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.length === 0 ? (
              <TableRow>
                <TableCell colSpan={15} className="py-10 text-center text-[#8a8f96]">
                  Heç bir nəticə tapılmadı
                </TableCell>
              </TableRow>
            ) : (
              filtered.map(({ row, index }, displayIndex) => (
                <TableRow key={index} className="border-b border-[#e0e3e6] hover:bg-[#fafcff]">
                  <TableCell className="px-3 py-5 text-center">{displayIndex + 1}</TableCell>
                  <TableCell className="whitespace-nowrap px-3 py-5 text-center">{row[0]}</TableCell>
                  <TableCell className="whitespace-nowrap px-3 py-5 text-center">{row[1]}</TableCell>
                  <TableCell className="whitespace-nowrap px-3 py-5 text-center">{row[2]}</TableCell>
                  <TableCell className="whitespace-nowrap px-3 py-5 text-center">{row[3]}</TableCell>
                  <TableCell className="whitespace-nowrap px-3 py-5 text-center">{row[4]}</TableCell>
                  <TableCell className="px-3 py-5 text-center">{row[5]}</TableCell>
                  <TableCell className="px-3 py-5 text-center">{row[6]}</TableCell>
                  <TableCell className="whitespace-nowrap px-3 py-5 text-center">{row[7]}</TableCell>
                  <TableCell className="px-3 py-5 text-center">
                    <CheckCircle2 className="mx-auto h-4 w-4 text-[#64a873]" />
                  </TableCell>
                  <TableCell className="px-3 py-5 text-center">
                    <div className="inline-flex items-center gap-2">
                      <span>{row[8]}</span>
                      {(() => {
                        const analysis = getAnalysis(index)
                        return analysis ? (
                          <AiPill
                            difficulty={analysis.difficulty}
                            detectedError={analysis.detectedError}
                          />
                        ) : null
                      })()}
                    </div>
                  </TableCell>
                  <TableCell className="px-3 py-5 text-center">Xeyr</TableCell>
                  <TableCell className="whitespace-pre-line px-3 py-5 text-center leading-[1.4]">{row[9]}</TableCell>
                  <TableCell className="px-3 py-5 text-center">2.1</TableCell>
                  <TableCell className="px-3 py-5 text-center">
                    <Link
                      href={`${REPORT_PATH}/${index}`}
                      aria-label="Sənədə bax"
                      className="inline-flex items-center justify-center rounded p-1 text-[#2879d7] hover:bg-[#eef4fc]"
                    >
                      <Eye className="h-4 w-4" />
                    </Link>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </section>
  )
}

function AiPill({ difficulty, detectedError }: { difficulty: Difficulty; detectedError: string }) {
  const meta = difficultyMeta[difficulty]
  return (
    <span
      title={`AI (${meta.label}): ${detectedError}`}
      className={cn(
        'inline-flex items-center gap-1 rounded-sm border px-1.5 py-0.5 text-[10px] font-semibold',
        meta.bgClass,
        meta.textClass,
        meta.borderClass,
      )}
    >
      <span className={cn('h-1.5 w-1.5 rounded-full', meta.dotClass)} />
      AI
    </span>
  )
}

function PlainHeader({ label }: { label: string }) {
  return (
    <div className="flex h-8 min-w-[90px] items-center justify-center rounded border border-[#e0e3e7] px-2.5 font-normal text-[#30343b]">
      {label}
    </div>
  )
}

function SearchFilter({
  value,
  onChange,
  placeholder,
}: {
  value: string
  onChange: (v: string) => void
  placeholder: string
}) {
  return (
    <div className="relative">
      <Search className="pointer-events-none absolute left-2 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-[#8a8f96]" />
      <Input
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        className="h-8 min-w-[130px] rounded border-[#e0e3e7] bg-white pl-7 text-center text-[12px] font-normal text-[#30343b] placeholder:text-[#777d84]"
      />
    </div>
  )
}

function FilterDropdown({
  label,
  options,
  selected,
  onToggle,
  onClear,
}: {
  label: string
  options: readonly string[]
  selected: Set<string>
  onToggle: (v: string) => void
  onClear: () => void
}) {
  const activeCount = selected.size
  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger
        render={
          <button
            type="button"
            className={cn(
              'flex h-8 w-full min-w-[130px] items-center justify-between rounded border border-[#e0e3e7] bg-white px-2.5 font-normal text-[#777d84] hover:bg-[#f7f8fa] data-[popup-open]:border-[#c9d0d7] data-[popup-open]:bg-white',
              activeCount > 0 && 'border-[#1683df] text-[#1683df]',
            )}
          >
            <span className="truncate">
              {label}
              {activeCount > 0 && (
                <span className="ml-1 rounded-sm bg-[#e6f1ff] px-1 text-[10px] text-[#1683df]">
                  {activeCount}
                </span>
              )}
            </span>
            <ChevronDown className="h-3.5 w-3.5 shrink-0" />
          </button>
        }
      />
      <DropdownMenuContent
        align="start"
        className="max-h-[320px] min-w-[240px] overflow-y-auto bg-white text-[#30343b] ring-[#e0e3e7]"
      >
        {activeCount > 0 && (
          <button
            type="button"
            onClick={onClear}
            className="mb-1 flex w-full items-center gap-1.5 rounded px-2 py-1 text-[12px] text-[#61656b] hover:bg-[#f4f7fa]"
          >
            <X className="h-3 w-3" />
            Təmizlə
          </button>
        )}
        {options.map(value => (
          <DropdownMenuCheckboxItem
            key={value}
            checked={selected.has(value)}
            onCheckedChange={() => onToggle(value)}
            closeOnClick={false}
            className="text-[12px] text-[#30343b] focus:bg-[#f4f7fa] focus:text-[#30343b]"
          >
            <span className="truncate pr-4 text-left">{value}</span>
          </DropdownMenuCheckboxItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
