import type { Employee } from '@/lib/employees'
import type { Analysis, Row } from '@/lib/records'

const entityGuids: Readonly<Record<string, string>> = {
  'Azərbaycan Avtomobil Yolları Dövlət Agentliyi': 'fe771b52-c529-4501-a2d1-180eb1e0cc55',
  'DİN-in Baş Dövlət Yol Polisi İdarəsi': '21a2c36d-b3d6-4011-9a5c-bef5442ec646',
  'Azərbaycan Respublikasının Daxili İşlər Nazirliyi': 'a4c3f829-1b5d-4b2e-8e91-9c7d3a2b5f6c',
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
  recipient: Employee
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
