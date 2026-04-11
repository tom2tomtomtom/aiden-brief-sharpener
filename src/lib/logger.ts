type LogLevel = 'info' | 'warn' | 'error'

interface LogEntry {
  level: LogLevel
  event: string
  ts: string
  [key: string]: unknown
}

function emit(entry: LogEntry) {
  const method = entry.level === 'error' ? console.error : entry.level === 'warn' ? console.warn : console.log
  method(JSON.stringify(entry))
}

export const logger = {
  info(event: string, data?: Record<string, unknown>) {
    emit({ level: 'info', event, ts: new Date().toISOString(), ...data })
  },
  warn(event: string, data?: Record<string, unknown>) {
    emit({ level: 'warn', event, ts: new Date().toISOString(), ...data })
  },
  error(event: string, data?: Record<string, unknown>) {
    emit({ level: 'error', event, ts: new Date().toISOString(), ...data })
  },
}
