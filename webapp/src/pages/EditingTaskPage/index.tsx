import { useParams } from 'react-router-dom'
import { trpc } from '../../lib/trpcClient'
import './style.css'
import { Input } from '../../components/Imput'
import { useFormik } from 'formik'
import * as Yup from 'yup'

export const EditingTaskPage = () => {
  type EditingTaskState = {
    title: string
    description: string
    FullText: string
  }

  // Схема валидации 
  const validationSchema = Yup.object({
    title: Yup.string()
    .required('Title is required')
    .max(20, 'Title must be at most 20 characters')
    .matches(/^[a-z0-9-]+$/, 'Nick may contain only lowercase letters, numbers and dashes'),
    description: Yup.string()
    .required('Description is required')
    .max(50, 'Description must be at most 50 characters'),
    FullText: Yup.string()
      .required('Full text is required')
      .max(200, 'Full text must be at most 200 characters')
  })

  const formik = useFormik<EditingTaskState>({
    initialValues: {
      title: '',
      description: '',
      FullText: '',
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      console.info('Form submitted with values:', values)
      // Here you can add the logic to update the task in your backend
    },
  })

  const { id } = useParams() as { id?: string }

  // Load full task details (includes FullText) on demand
  const { data: task, error, isLoading, isError } = trpc.get.useQuery(id ?? '', { enabled: !!id })

  if (isLoading) {
    return <div>Loading...</div>
  }
  if (isError) {
    return <div>Error: {error?.message}</div>
  }
  if (!task) {
    return <div>No data found for task ID: {id}</div>
  }

  return (
    <div>
      <title>{`Editing Task Page: ${id}`}</title>

      <form
        onSubmit={(e) => {
          e.preventDefault()
          formik.handleSubmit()
        }}
      >

        <h2>{task.title} Details</h2>
        <div style={{ backgroundColor: '#1b263b', padding: '8px', borderRadius: '4px', marginBottom: '8px' }}>
          <Input input="input" field="title" label={task.title} placeholder="Edit title" formik={formik} />
        </div>

        <div style={{ backgroundColor: '#1b263b', padding: '8px', borderRadius: '4px', marginBottom: '8px' }}>
          <Input
            input="input"
            field="description"
            label={task.description}
            bonus="Description: "
            placeholder="Edit description"
            formik={formik}
          />
        </div>

        <p style={{ backgroundColor: '#1b263b', padding: '8px', borderRadius: '4px', marginBottom: '8px' }}>
          <strong>Status:</strong> {task.status}
        </p>

        <div style={{ backgroundColor: '#1b263b', padding: '8px', borderRadius: '4px', marginBottom: '8px' }}>
          <Input
            input="textarea"
            field="FullText"
            label={task.FullText}
            bonus="Full Text: "
            placeholder="Edit full text"
            formik={formik}
          />
        </div>
      </form>
    </div>
  )
}
