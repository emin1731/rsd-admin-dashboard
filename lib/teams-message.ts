import type { TeamsGroup } from '@/lib/employees'
import type { Analysis, Row } from '@/lib/records'

const entityGuids: Readonly<Record<string, string>> = {
  'Azərbaycan Avtomobil Yolları Dövlət Agentliyi': 'fe771b52-c529-4501-a2d1-180eb1e0cc55',
  'DİN-in Baş Dövlət Yol Polisi İdarəsi': '3c8f2e15-9a4b-4d67-b891-8f5a2c1d4e07',
  'Azərbaycan Respublikasının Daxili İşlər Nazirliyi': 'a4c3f829-1b5d-4b2e-8e91-9c7d3a2b5f6c',
  'Avtomobil Yollarının Mühafizə Xidməti MMC': '21a2c36d-b3d6-4011-9a5c-bef5442ec646',
  'Bakı Şəhər Nəqliyyat Agentliyi': 'b7e2f831-2c5d-4a2f-9b23-6e8d3a1c4f5b',
  'Sabunçu rayon icra şöbəsi': 'fcba3ebe-9783-4364-b0df-e9d6b4eef6f6',
  '"Kapital Bank" Açıq Səhmdar Cəmiyyəti': '1802ab8a-d4a9-4de1-ac6e-6044cba1ff0a',
  'Azərbaycan Respublikasının Maliyyə Nazirliyi yanında Maliyyə Elm-Tədris Mərkəzi': '721948b3-03b8-11ef-872f-871407d0ebb5',
  'Azərbaycan Respublikasının Prezidenti yanında Antiinhisar və İstehlak Bazarına Nəzarət Dövlət Agentliyi': 'ae96eaf3-d34e-4ad4-b945-f1cec27e0603',
  'Binəqədi Rayon İcra Hakimiyyəti': '275b32dc-94a7-11ec-ab11-ad789546bb84',
  'Azərbaycan Respublikası Ekologiya və Təbii Sərvətlər Nazirliyi': '9ee910c8-f664-428b-8e38-f8dc6132e157',
  'Bakı Dövlət Layihə İnstitutu': '8c15a012-21b4-11ec-bb9d-e7963956720b',
  'Azərbaycan Respublikası Qida Təhlükəsizliyi Agentliyi': '634b8fd2-b204-4bed-a2dc-88c6d6a297e8',
  '"Daşkəsən Dəmir Filiz" MMC': 'a50601d3-d9d0-4b20-9e41-ece0001de4d8',
  'Miqrasiya proseslərinin tənzimləmə baş idarəsi': '8551d626-ea46-4660-8bbc-1e770890908c',
  'Azərbaycan Respublikasının İqtisadiyyat Nazirliyi': '99bcb06b-48ab-4a5e-a4e5-9fa174d117e9',
  'Azərbaycan Respublikası Elm və Təhsil Nazirliyi': 'c28142e1-8084-4bdf-a3dd-61f894268117',
}

export function guidFor(entity: string): string {
  return entityGuids[entity] ?? '00000000-0000-0000-0000-000000000000'
}

const httpStatusMessages: Readonly<Record<string, string>> = {
  '400': 'Bad Request',
  '401': 'Unauthorized',
  '413': 'Request Entity Too Large',
  '500': 'Internal Server Error',
  '502': 'Bad Gateway',
  '503': 'Service Unavailable',
  '504': 'Gateway Timeout',
  '526': 'Invalid SSL Certificate',
}

export function statusMessage(code: string): string {
  return httpStatusMessages[code] ?? 'Unknown Error'
}

function isExternalError(category: Analysis['category']): boolean {
  return (
    category === 'Şəbəkə' ||
    category === 'Qəbul edən sistem' ||
    category === 'Vaxt aşımı'
  )
}

export function buildTeamsMessage({
  recipient,
  row,
  analysis,
  docNo,
}: {
  recipient: TeamsGroup
  row: Row
  analysis: Analysis
  docNo: string
}): string {
  const sender = row[1]
  const senderEsd = row[2]
  const receiver = row[3]
  const incomingEsd = row[4]
  const statusCode = row[5]
  const requestId = row[7]
  const dateStr = row[9].replace('\n', ' ')

  const errorPayload = `{"StatusCode":${statusCode},"Message":"${statusMessage(statusCode)}","Data":null}`

  return [
    `Salam, zəhmət olmasa baxardınız — ${recipient.name}`,
    ``,
    `Vaxt: ${dateStr}`,
    `Xətanın baş verdiyi servis: PAKET SERVİSİ`,
    `Sənəd nömrəsi: ${docNo}`,
    `Göndərən tərəf: ${sender} (${guidFor(sender)})`,
    `Göndərən tərəf sistemi: ${senderEsd}`,
    `Göndərilən tərəflər: ${receiver} (${guidFor(receiver)})`,
    `Göndərilən tərəf sistemi: ${incomingEsd}`,
    `Sorğu nömrəsi: ${requestId}`,
    `Xaricdən qayıdan xəta: ${isExternalError(analysis.category) ? 'True' : 'False'}`,
    `Səbəb: ${analysis.rootCause}`,
    ``,
    `Xəta mesajı:`,
    errorPayload,
  ].join('\n')
}
