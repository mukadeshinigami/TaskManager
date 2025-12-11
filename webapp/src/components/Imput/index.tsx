import { useState} from 'react'

type InputProps = {
  field: 'title' | 'description' | 'FullText'
  label?: string
  state: {
    title: string
    description: string
    FullText: string
  }
  setState: React.Dispatch<
    React.SetStateAction<{
      title: string
      description: string
      FullText: string
    }>
  >
  input: 'input' | 'textarea'
  placeholder?: string
  bonus?: React.ReactNode
}

export const Input = ({ input = 'input', field, label, bonus, state, setState, placeholder }: InputProps) => {
  const [inputValue, setInputValue] = useState(state[field])

  const handleSave = () => {
    setState({ ...state, [field]: inputValue })
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
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
      ) : (
        <textarea
          placeholder={placeholder || `Edit ${field}`}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
      )}

      <button style={{ marginLeft: 8 }} onClick={handleSave}>
        Save
      </button>
    </div>
  )
}
