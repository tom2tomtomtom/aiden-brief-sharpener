'use client'

import { useState } from 'react'

const TONES = [
  { value: 'professional', label: 'Professional' },
  { value: 'casual', label: 'Casual' },
  { value: 'bold', label: 'Bold' },
  { value: 'minimal', label: 'Minimal' },
] as const

type Tone = (typeof TONES)[number]['value']

interface FormData {
  productName: string
  productDescription: string
  targetAudience: string
  features: string[]
  tone: Tone
}

interface FormErrors {
  productName?: string
  productDescription?: string
}

const initialFormData: FormData = {
  productName: '',
  productDescription: '',
  targetAudience: '',
  features: ['', '', '', '', '', ''],
  tone: 'professional',
}

export default function LandingPageForm() {
  const [formData, setFormData] = useState<FormData>(initialFormData)
  const [errors, setErrors] = useState<FormErrors>({})
  const [submitted, setSubmitted] = useState(false)

  function validate(): boolean {
    const newErrors: FormErrors = {}
    if (!formData.productName.trim()) {
      newErrors.productName = 'Product name is required.'
    }
    if (!formData.productDescription.trim()) {
      newErrors.productDescription = 'Product description is required.'
    }
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  function handleFeatureChange(index: number, value: string) {
    setFormData((prev) => {
      const features = [...prev.features]
      features[index] = value
      return { ...prev, features }
    })
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!validate()) return
    setSubmitted(true)
  }

  const filledFeatures = formData.features.filter((f) => f.trim())

  if (submitted) {
    return (
      <div className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">
        <div className="mb-6 flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100">
            <svg className="h-5 w-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-xl font-semibold text-gray-900">Ready to generate</h2>
        </div>
        <dl className="space-y-3 text-sm">
          <div>
            <dt className="font-medium text-gray-500">Product</dt>
            <dd className="text-gray-900">{formData.productName}</dd>
          </div>
          <div>
            <dt className="font-medium text-gray-500">Description</dt>
            <dd className="text-gray-900">{formData.productDescription}</dd>
          </div>
          {formData.targetAudience && (
            <div>
              <dt className="font-medium text-gray-500">Audience</dt>
              <dd className="text-gray-900">{formData.targetAudience}</dd>
            </div>
          )}
          {filledFeatures.length > 0 && (
            <div>
              <dt className="font-medium text-gray-500">Features</dt>
              <dd>
                <ul className="mt-1 list-disc pl-4 text-gray-900">
                  {filledFeatures.map((f, i) => (
                    <li key={i}>{f}</li>
                  ))}
                </ul>
              </dd>
            </div>
          )}
          <div>
            <dt className="font-medium text-gray-500">Tone</dt>
            <dd className="capitalize text-gray-900">{formData.tone}</dd>
          </div>
        </dl>
        <button
          onClick={() => { setSubmitted(false); setErrors({}) }}
          className="mt-6 text-sm text-indigo-600 hover:text-indigo-800 underline"
        >
          Edit details
        </button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-6">
      {/* Product Name */}
      <div>
        <label htmlFor="productName" className="block text-sm font-medium text-gray-700">
          Product name <span className="text-red-500">*</span>
        </label>
        <input
          id="productName"
          type="text"
          value={formData.productName}
          onChange={(e) => setFormData((p) => ({ ...p, productName: e.target.value }))}
          placeholder="e.g. Acme Analytics"
          className={`mt-1 block w-full rounded-lg border px-3 py-2 text-sm shadow-sm outline-none transition focus:ring-2 focus:ring-indigo-500 ${
            errors.productName ? 'border-red-400 bg-red-50' : 'border-gray-300 bg-white'
          }`}
        />
        {errors.productName && (
          <p className="mt-1 text-xs text-red-500">{errors.productName}</p>
        )}
      </div>

      {/* Product Description */}
      <div>
        <label htmlFor="productDescription" className="block text-sm font-medium text-gray-700">
          Product description <span className="text-red-500">*</span>
        </label>
        <textarea
          id="productDescription"
          rows={4}
          value={formData.productDescription}
          onChange={(e) => setFormData((p) => ({ ...p, productDescription: e.target.value }))}
          placeholder="Describe what your product does and the problem it solves…"
          className={`mt-1 block w-full rounded-lg border px-3 py-2 text-sm shadow-sm outline-none transition focus:ring-2 focus:ring-indigo-500 ${
            errors.productDescription ? 'border-red-400 bg-red-50' : 'border-gray-300 bg-white'
          }`}
        />
        {errors.productDescription && (
          <p className="mt-1 text-xs text-red-500">{errors.productDescription}</p>
        )}
      </div>

      {/* Target Audience */}
      <div>
        <label htmlFor="targetAudience" className="block text-sm font-medium text-gray-700">
          Target audience
        </label>
        <input
          id="targetAudience"
          type="text"
          value={formData.targetAudience}
          onChange={(e) => setFormData((p) => ({ ...p, targetAudience: e.target.value }))}
          placeholder="e.g. SaaS founders, marketing teams, freelance designers"
          className="mt-1 block w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm shadow-sm outline-none transition focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      {/* Key Features */}
      <div>
        <fieldset>
          <legend className="block text-sm font-medium text-gray-700">
            Key features <span className="text-gray-400 font-normal">(up to 6)</span>
          </legend>
          <div className="mt-2 grid grid-cols-1 gap-2 sm:grid-cols-2">
            {formData.features.map((feature, index) => (
              <input
                key={index}
                type="text"
                value={feature}
                onChange={(e) => handleFeatureChange(index, e.target.value)}
                placeholder={`Feature ${index + 1}`}
                className="block w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm shadow-sm outline-none transition focus:ring-2 focus:ring-indigo-500"
              />
            ))}
          </div>
        </fieldset>
      </div>

      {/* Tone */}
      <div>
        <fieldset>
          <legend className="block text-sm font-medium text-gray-700">Tone</legend>
          <div className="mt-2 flex flex-wrap gap-2">
            {TONES.map(({ value, label }) => (
              <label
                key={value}
                className={`cursor-pointer rounded-full border px-4 py-1.5 text-sm font-medium transition select-none ${
                  formData.tone === value
                    ? 'border-indigo-600 bg-indigo-600 text-white'
                    : 'border-gray-300 bg-white text-gray-700 hover:border-indigo-400 hover:text-indigo-600'
                }`}
              >
                <input
                  type="radio"
                  name="tone"
                  value={value}
                  checked={formData.tone === value}
                  onChange={() => setFormData((p) => ({ ...p, tone: value }))}
                  className="sr-only"
                />
                {label}
              </label>
            ))}
          </div>
        </fieldset>
      </div>

      <button
        type="submit"
        className="w-full rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
      >
        Generate landing page
      </button>
    </form>
  )
}
