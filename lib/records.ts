export type Row = readonly [
  docNo: string,
  sender: string,
  senderEsd: string,
  receiver: string,
  incomingEsd: string,
  statusCode: string,
  amount: string,
  requestId: string,
  status: string,
  date: string,
]

export const records: readonly Row[] = [
  ['11-1/4-2/2-3545/2026', 'Azərbaycan Avtomobil Yolları Dövlət Agentliyi', 'Azərbaycan Avtomobil Yolları Dövlət Agentliyi', 'DİN-in Baş Dövlət Yol Polisi İdarəsi', 'Azərbaycan Respublikasının Daxili İşlər Nazirliyi', '204', '-', '34F3D81A46A64553BF99C92D6A9E6C0B', 'Uğurlu', '01.09.2026\n14:52:33'],
  ['11-1/4-2/2-3545/2026', 'Azərbaycan Avtomobil Yolları Dövlət Agentliyi', 'Azərbaycan Avtomobil Yolları Dövlət Agentliyi', 'DİN-in Baş Dövlət Yol Polisi İdarəsi', 'Azərbaycan Respublikasının Daxili İşlər Nazirliyi', '413', '-', '2CB5A941D74E477F8CE4C8BBA713F409', 'Uğursuz', '01.09.2026\n14:49:02'],
  ['11-1/4-2/2-3545/2026', 'Azərbaycan Avtomobil Yolları Dövlət Agentliyi', 'Azərbaycan Avtomobil Yolları Dövlət Agentliyi', 'DİN-in Baş Dövlət Yol Polisi İdarəsi', 'Azərbaycan Respublikasının Daxili İşlər Nazirliyi', '502', '-', '84E07A9CBBA74431AAFE8C367F337CFB', 'Uğursuz', '01.09.2026\n14:48:44'],
  ['11-1/4-2/2-3545/2026', 'Azərbaycan Avtomobil Yolları Dövlət Agentliyi', 'Azərbaycan Avtomobil Yolları Dövlət Agentliyi', 'DİN-in Baş Dövlət Yol Polisi İdarəsi', 'Azərbaycan Respublikasının Daxili İşlər Nazirliyi', '503', '-', '24FA2C6B4278458089AB:26AFB61BD9AC', 'Uğursuz', '01.09.2026\n14:46:04'],
  ['11-1/4-2/2-3545/2026', 'Azərbaycan Avtomobil Yolları Dövlət Agentliyi', 'Azərbaycan Avtomobil Yolları Dövlət Agentliyi', 'DİN-in Baş Dövlət Yol Polisi İdarəsi', 'Azərbaycan Respublikasının Daxili İşlər Nazirliyi', '400', '-', 'CBC20D00D7EC42ACAE06:30CE8B8540F80', 'Uğursuz', '01.09.2026\n14:45:55'],
  ['11-1/4-2/2-3545/2026', 'Azərbaycan Avtomobil Yolları Dövlət Agentliyi', 'Azərbaycan Avtomobil Yolları Dövlət Agentliyi', 'DİN-in Baş Dövlət Yol Polisi İdarəsi', 'Azərbaycan Respublikasının Daxili İşlər Nazirliyi', '526', '-', '8FA0B8CA0214B04A4FE:D5AE60715538', 'Uğursuz', '01.09.2026\n14:45:20'],
  ['11-1/4-2/2-3545/2026', 'Azərbaycan Avtomobil Yolları Dövlət Agentliyi', 'Azərbaycan Avtomobil Yolları Dövlət Agentliyi', 'DİN-in Baş Dövlət Yol Polisi İdarəsi', 'Azərbaycan Respublikasının Daxili İşlər Nazirliyi', '504', '-', '534F69CA20AD48A29420:AE BCC738A0C', 'Uğursuz', '01.09.2026\n14:45:19'],
  ['11-1/4-2/2-3545/2026', 'Azərbaycan Avtomobil Yolları Dövlət Agentliyi', 'Azərbaycan Avtomobil Yolları Dövlət Agentliyi', 'DİN-in Baş Dövlət Yol Polisi İdarəsi', 'Azərbaycan Respublikasının Daxili İşlər Nazirliyi', '401', '-', 'DAF6C731C8D1401FB1DD:B4727D340174', 'Uğursuz', '01.09.2026\n14:44:25'],
]

export const REPORT_PATH = '/hesabatlar/qurumlar'

export type Difficulty = 'asan' | 'orta' | 'cetin'

export type AnalysisCategory =
  | 'Şəbəkə'
  | 'Sertifikat'
  | 'Qəbul edən sistem'
  | 'Format'
  | 'Vaxt aşımı'
  | 'Avtorizasiya'

export type Analysis = {
  detectedError: string
  category: AnalysisCategory
  difficulty: Difficulty
  confidence: number
  rootCause: string
  suggestedAssignee: { entity: string; team: string }
  logRefs: readonly string[]
}

const analysesByIndex: Readonly<Record<number, Analysis>> = {
  1: {
    detectedError: 'Sorğu ölçüsü limitini aşması (413 Request Entity Too Large)',
    category: 'Qəbul edən sistem',
    difficulty: 'orta',
    confidence: 87,
    rootCause: 'Göndərilən paket qəbul edən tərəfin icazə verdiyi maksimum ölçünü aşır (2.4 MB > 2.0 MB). Sənədin bölünməsi və ya limitin artırılması tələb olunur.',
    suggestedAssignee: {
      entity: 'DİN — Baş Dövlət Yol Polisi İdarəsi',
      team: 'İnteqrasiya komandası',
    },
    logRefs: [
      '2026-09-01T14:49:02Z ERROR gateway.dispatch status=413 size=2.4MB limit=2.0MB',
      '2026-09-01T14:49:02Z WARN retry policy exhausted after 3 attempts',
    ],
  },
  2: {
    detectedError: 'Qoşulma rədd edildi (Connection refused)',
    category: 'Şəbəkə',
    difficulty: 'asan',
    confidence: 92,
    rootCause: 'TCP əlaqəsi qəbul edən sistem tərəfindən rədd edildi (ECONNREFUSED). Ehtimal olunan səbəb: qarşı tərəfin xidməti dayanıb və ya port bloklanıb.',
    suggestedAssignee: {
      entity: 'Şəbəkə İnfrastrukturu Komandası',
      team: '24/7 dəstək',
    },
    logRefs: [
      '2026-09-01T14:48:44Z ERROR gateway.transport ECONNREFUSED peer=192.168.14.22:8443',
      '2026-09-01T14:48:44Z INFO circuit-breaker=open ttl=30s',
    ],
  },
  3: {
    detectedError: 'Servis müvəqqəti əlçatan deyil (503)',
    category: 'Qəbul edən sistem',
    difficulty: 'cetin',
    confidence: 68,
    rootCause: 'Qəbul edən sistem son 12 dəqiqədir 503 (Service Unavailable) qaytarır. Səhv sabit təkrarlanır — sistem tərəfində davamlı problem ehtimalı yüksəkdir.',
    suggestedAssignee: {
      entity: 'DİN — Baş Dövlət Yol Polisi İdarəsi',
      team: 'Servis operatorları',
    },
    logRefs: [
      '2026-09-01T14:46:04Z ERROR gateway.dispatch status=503 upstream=police-esd',
      '2026-09-01T14:46:04Z ERROR upstream health-check failed streak=8',
      '2026-09-01T14:46:04Z WARN escalation triggered severity=high',
    ],
  },
  4: {
    detectedError: 'Validasiya xətası (400)',
    category: 'Format',
    difficulty: 'orta',
    confidence: 79,
    rootCause: 'Sorğu bədəni gözlənilən XSD sxeminə uyğun deyil: “DocumentType” elementi yoxdur. Göndərən tərəfin şablonunda dəyişiklik ehtimalı var.',
    suggestedAssignee: {
      entity: 'Azərbaycan Avtomobil Yolları Dövlət Agentliyi',
      team: 'İnteqrasiya komandası',
    },
    logRefs: [
      '2026-09-01T14:45:55Z ERROR validator.xsd missing-element=DocumentType',
      '2026-09-01T14:45:55Z INFO validator.schema version=2.1.0',
    ],
  },
  5: {
    detectedError: 'SSL/Sertifikat xətası',
    category: 'Sertifikat',
    difficulty: 'asan',
    confidence: 95,
    rootCause: 'Göndərən tərəfin TLS sertifikatının müddəti bitmişdir (expired 2026-08-30). Yeni sertifikatın yüklənməsi tələb olunur.',
    suggestedAssignee: {
      entity: 'RSD Platforma Komandası',
      team: 'Sertifikat mərkəzi',
    },
    logRefs: [
      '2026-09-01T14:45:20Z ERROR tls.handshake certificate-expired notAfter=2026-08-30',
      '2026-09-01T14:45:20Z INFO client=azavt-yollari fingerprint=8FA0…5538',
    ],
  },
  6: {
    detectedError: 'Timeout (vaxt bitməsi)',
    category: 'Vaxt aşımı',
    difficulty: 'cetin',
    confidence: 73,
    rootCause: 'Yuxarı axın (upstream) 30 saniyəlik cavab vermə limitini aşdı. Son 24 saatda oxşar hadisələrin sayı 6 dəfə artıb.',
    suggestedAssignee: {
      entity: 'DİN — Baş Dövlət Yol Polisi İdarəsi',
      team: 'Performans komandası',
    },
    logRefs: [
      '2026-09-01T14:45:19Z ERROR gateway.dispatch timeout=30s upstream=police-esd',
      '2026-09-01T14:45:19Z WARN latency p95=28.4s baseline=4.1s',
      '2026-09-01T14:45:19Z INFO similar-incidents-24h=6',
    ],
  },
  7: {
    detectedError: 'Avtorizasiya xətası (401)',
    category: 'Avtorizasiya',
    difficulty: 'asan',
    confidence: 89,
    rootCause: 'Qəbul edən sistem sorğunu 401 (Unauthorized) ilə rədd etdi. Ehtimal olunan səbəb: API açarının müddəti bitib və ya yenilənməyib.',
    suggestedAssignee: {
      entity: 'RSD Platforma Komandası',
      team: 'İdentifikasiya xidməti',
    },
    logRefs: [
      '2026-09-01T14:44:25Z ERROR gateway.dispatch status=401 reason="invalid_token"',
      '2026-09-01T14:44:25Z INFO token.issuedAt=2026-06-15 age=80d ttl=90d',
    ],
  },
}

export const getAnalysis = (index: number): Analysis | undefined =>
  analysesByIndex[index]

export const hasAnalysis = (index: number): boolean =>
  index in analysesByIndex

export const difficultyMeta: Readonly<
  Record<Difficulty, { label: string; dotClass: string; bgClass: string; textClass: string; borderClass: string }>
> = {
  asan: {
    label: 'Asan',
    dotClass: 'bg-[#178a4c]',
    bgClass: 'bg-[#e8f5ed]',
    textClass: 'text-[#178a4c]',
    borderClass: 'border-[#b7e0c5]',
  },
  orta: {
    label: 'Orta',
    dotClass: 'bg-[#b26a00]',
    bgClass: 'bg-[#fff5e5]',
    textClass: 'text-[#b26a00]',
    borderClass: 'border-[#f4d9a8]',
  },
  cetin: {
    label: 'Çətin',
    dotClass: 'bg-[#c73030]',
    bgClass: 'bg-[#fdecec]',
    textClass: 'text-[#c73030]',
    borderClass: 'border-[#f4c2c2]',
  },
}
