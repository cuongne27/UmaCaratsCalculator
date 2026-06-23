"use client"
import React from 'react'

export default function RankSelect({ id, value, onChange, options, label }: {
  id: string
  value: string
  onChange: (v: string) => void
  options: string[]
  label?: string
}) {
  return (
    <div className="field">
      {label ? <label htmlFor={id}>{label}</label> : null}
      <select id={id} value={value} onChange={(e) => onChange(e.target.value)}>
        {options.map((o) => (
          <option key={o} value={o}>{o}</option>
        ))}
      </select>
    </div>
  )
}
