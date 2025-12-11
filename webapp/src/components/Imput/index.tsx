import {type FormikProps } from 'formik'


type InputProps = {
  field: 'title' | 'description' | 'FullText'
  label?: string
  formik: FormikProps<any>
  input: 'input' | 'textarea'
  placeholder?: string
  bonus?: React.ReactNode
}

export const Input = ({ input = 'input', field, label, bonus, formik, placeholder }: InputProps) => {
 // const [inputValue, setInputValue] = useState(state[field])

  const handleSave = () => {
    formik.handleSubmit()
  }


  return (
    <div>
      {bonus}
      <br />
      {label && (
        <label>
          <strong>
            {label}
            {}
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
        />
      ) : (
        <textarea
          placeholder={placeholder || `Edit ${field}`}
          value={formik.values[field]}
          onChange={(e) => formik.setFieldValue(field, e.target.value)}
          onBlur={formik.handleBlur}
          name={field}
        />
      )}

      <button style={{ marginLeft: 8 }} onClick={handleSave}>
        Save
      </button>
    </div>
  )
}
