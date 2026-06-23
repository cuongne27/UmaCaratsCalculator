"use client"
import React from 'react'

type Option = { value: string; label: string }

export default function Dropdown({ id, value, onChange, options, label }: {
  id: string
  value: string
  onChange: (v: string) => void
  options: Option[]
  label?: string
}) {
  return (
    <div className="field">
      {label ? <label htmlFor={id}>{label}</label> : null}
      <select id={id} value={value} onChange={(e) => onChange(e.target.value)}>
        {options.map((o) => (
          <option key={o.value} value={o.value}>{o.label}</option>
        ))}
      </select>
    </div>
  )
}
