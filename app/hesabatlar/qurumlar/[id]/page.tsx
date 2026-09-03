import Link from 'next/link'
import { notFound } from 'next/navigation'

import { AiAnalysisPanel } from '@/components/ai-analysis-panel'
import { getAnalysis, records, REPORT_PATH } from '@/lib/records'

export default async function DocumentDetail({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const index = Number(id)
  const row = Number.isInteger(index) ? records[index] : undefined
  if (!row) notFound()

  const analysis = getAnalysis(index)
  const abroad = row[6] === '-' ? 'Bəli' : 'Xeyr'
  const content = `{"StatusCode":${row[5]},"Message":"${row[8] === 'Uğurlu' ? 'OK' : 'Internal Server Error'}","Data":null}`

  const fields: { label: string; value: React.ReactNode }[] = [
    { label: 'Sənəd nömrəsi', value: row[0] },
    { label: 'Göndərən Tərəf Esd Sistem Id-i', value: row[5] },
    { label: 'Göndərən qurum', value: row[1] },
    { label: 'Qəbul edən qurum', value: row[3] },
    { label: 'Status kodu', value: row[5] },
    { label: 'Məzmun', value: <code className="break-all font-mono text-[12px]">{content}</code> },
    { label: 'Fayl növü', value: 'MAIN (0.034 Mbayt)' },
    { label: 'Göndərilmiş məktub paketinin ölçüsü (ryps) (Mbaytla)', value: '0.12' },
    { label: 'Sorğu id-si', value: row[7] },
    { label: 'Xaricdə baş verən', value: abroad },
    { label: 'Tarix', value: <span className="whitespace-pre-line">{row[9]}</span> },
    { label: 'Status', value: row[8] },
  ]

  return (
    <section className="min-h-[calc(100vh-72px)] overflow-hidden rounded-[3px] border border-[#e0e3e7] bg-white">
      <div className="px-5 py-4">
        <h1 className="font-semibold text-[15px]">Qurumlar üzrə hesabat baxış</h1>
      </div>
      <div className="px-5 pb-8">
        <Link
          href={REPORT_PATH}
          className="mb-6 inline-flex items-center rounded-[3px] bg-[#1683df] px-4 py-2 text-[12px] font-medium text-white hover:bg-[#1274c5]"
        >
          Siyahıya qayıt
        </Link>

        <AiAnalysisPanel analysis={analysis} />

        <dl className="divide-y divide-transparent">
          {fields.map(({ label, value }) => (
            <div key={label} className="py-3">
              <dt className="text-[12px] font-medium text-[#61656b]">{label}</dt>
              <dd className="mt-1 text-[13px] text-[#30343b]">{value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}
