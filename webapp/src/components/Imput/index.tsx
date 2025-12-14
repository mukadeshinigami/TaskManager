import React from 'react'
import { type FormikProps } from 'formik'
import styles from './index.module.scss'

type InputProps = {
  field: 'title' | 'description' | 'FullText'
  label?: string
  formik: FormikProps<any>
  input: 'input' | 'textarea'
  placeholder?: string
  bonus?: React.ReactNode
  bottom?: 'on' | 'off'
}

export const Input = ({ input = 'input', field, label, bonus, bottom, formik, placeholder }: InputProps) => {
  const error =
    formik.touched[field] && typeof formik.errors[field] === 'string' ? (formik.errors[field] as string) : undefined
  const handleSave = () => {
    formik.setFieldTouched(field, true, true)
    formik.validateField(field)
    formik.handleSubmit()
  }

  const [showSaving, setShowSaving] = React.useState(false)
  const [showSuccess, setShowSuccess] = React.useState(false)
  const submitStartRef = React.useRef<number | null>(null)
  const successTimerRef = React.useRef<ReturnType<typeof setTimeout> | null>(null)
  const hasValue = String(formik.values[field] ?? '').trim().length > 0

  React.useEffect(() => {
    // When submission starts
    if (formik.isSubmitting) {
      // only show animations if the field actually has a value
      if (hasValue) {
        submitStartRef.current = Date.now()
        setShowSaving(true)
        if (successTimerRef.current) {
          clearTimeout(successTimerRef.current)
          successTimerRef.current = null
        }
      }
      return
    }

    // When submission ends (transition from submitting -> not submitting)
    if (!formik.isSubmitting && submitStartRef.current) {
      const elapsed = Date.now() - submitStartRef.current
      const minSaving = 1000
      const remaining = Math.max(0, minSaving - elapsed)
      // Ensure 'Saving...' shows for at least minSaving ms
      setTimeout(() => setShowSaving(false), remaining)

      // Trigger success animation shortly after saving hide (or immediately)
      successTimerRef.current = setTimeout(() => {
        setShowSuccess(true)
        // hide success after animation duration
        successTimerRef.current = setTimeout(() => {
          setShowSuccess(false)
          successTimerRef.current = null
        }, 900)
      }, remaining)

      submitStartRef.current = null
    }

    return () => {
      if (successTimerRef.current) {
        clearTimeout(successTimerRef.current)
        successTimerRef.current = null
      }
    }
  }, [formik.isSubmitting, hasValue])
  ////
  return (
    <div>
      {bonus && <div>{bonus}</div>}
      {label && (
        <label>
          <strong>
            {label}
            <br />
          </strong>
        </label>
      )}
      <br />
      {input === 'input' ? (
        <input
          placeholder={placeholder || `Edit ${field}`}
          type="text"
          value={formik.values[field]}
          onChange={(e) => formik.setFieldValue(field, e.target.value)}
          onBlur={formik.handleBlur}
          name={field}
          style={error ? { borderColor: 'red' } : {}}
          disabled={formik.isSubmitting}
        />
      ) : (
        <textarea
          placeholder={placeholder || `Edit ${field}`}
          value={formik.values[field]}
          onChange={(e) => formik.setFieldValue(field, e.target.value)}
          onBlur={formik.handleBlur}
          name={field}
          style={error ? { borderColor: 'red' } : {}}
          disabled={formik.isSubmitting}
        />
      )}
      {error && <div style={{ color: 'red' }}>{error}</div>}
      <div>
        {bottom === 'on' ? (
          <button
            type="submit"
            disabled={formik.isSubmitting || !String(formik.values[field] ?? '').trim().length}
            className={`${styles.button} ${showSuccess ? styles.success : ''}`}
            style={{ marginLeft: 8 }}
            onClick={handleSave}
          >
            {showSaving || formik.isSubmitting ? 'Saving...' : showSuccess ? 'Saved' : 'Save'}
          </button>
        ) : null}
      </div>
    </div>
  )
}
