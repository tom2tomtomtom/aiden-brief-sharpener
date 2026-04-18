const GATEWAY_URL = process.env.GATEWAY_URL || 'https://www.aiden.services'
const SERVICE_KEY = process.env.AIDEN_SERVICE_KEY

interface CheckResult {
  allowed: boolean
  required: number
  balance: number
}

interface DeductResult {
  success: boolean
  remaining?: number
  error?: string
  required?: number
  balance?: number
}

interface BalanceResult {
  balance: number
  plan: string
  lifetime_purchased: number
  lifetime_used: number
}

function getHeaders(userId: string): Record<string, string> {
  if (!SERVICE_KEY) {
    throw new Error('AIDEN_SERVICE_KEY is not configured')
  }
  return {
    'Content-Type': 'application/json',
    'X-Service-Key': SERVICE_KEY,
    'X-User-Id': userId,
  }
}

export async function checkTokens(
  userId: string,
  operation: string
): Promise<CheckResult> {
  try {
    const res = await fetch(`${GATEWAY_URL}/api/tokens/check`, {
      method: 'POST',
      headers: getHeaders(userId),
      body: JSON.stringify({ product: 'brief_sharpener', operation }),
    })

    if (!res.ok) {
      console.error(`[gateway-tokens] Check failed: ${res.status}`)
      // Fail closed: don't grant access on Gateway error.
      return { allowed: false, required: 0, balance: 0 }
    }

    return res.json()
  } catch (err) {
    console.error('[gateway-tokens] Check threw:', err)
    return { allowed: false, required: 0, balance: 0 }
  }
}

export async function deductTokens(
  userId: string,
  operation: string
): Promise<DeductResult> {
  try {
    const res = await fetch(`${GATEWAY_URL}/api/tokens/deduct`, {
      method: 'POST',
      headers: getHeaders(userId),
      body: JSON.stringify({ product: 'brief_sharpener', operation }),
    })

    if (!res.ok && res.status === 402) {
      return res.json()
    }

    if (!res.ok) {
      console.error(`[gateway-tokens] Deduct failed: ${res.status}`)
      // Fail closed: signal failure so caller can decide whether to refund the
      // upstream operation. Pretending the deduct succeeded silently leaks tokens.
      return { success: false, error: `gateway_error_${res.status}` }
    }

    return res.json()
  } catch (err) {
    console.error('[gateway-tokens] Deduct threw:', err)
    return { success: false, error: 'gateway_unreachable' }
  }
}

export async function getBalance(userId: string): Promise<BalanceResult | null> {
  const res = await fetch(`${GATEWAY_URL}/api/tokens/balance`, {
    method: 'GET',
    headers: getHeaders(userId),
  })

  if (!res.ok) {
    console.error(`[gateway-tokens] Balance fetch failed: ${res.status}`)
    return null
  }

  return res.json()
}
