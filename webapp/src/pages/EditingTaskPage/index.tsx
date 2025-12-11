import { useParams } from 'react-router-dom'
import { trpc } from '../../lib/trpc'
import './style.css'
import { Input } from '../../components/Imput'
import { useFormik } from 'formik'


export const EditingTaskPage = () => {

  type EditingTaskState = {
    title: string
    description: string
    FullText: string
  }

  const formik = useFormik<EditingTaskState>({
    initialValues: {
      title: '',
      description: '',
      FullText: '',
    },
    onSubmit: (values) => {
      console.info('Form submitted with values:', values)
      // Here you can add the logic to update the task in your backend
    },
  })
  //const [state, setState] = useState<EditingTaskState>({
  //  title: '',
  //  description: '',
  //  FullText: '',
  //})

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

      <form onSubmit={(e) => {
        e.preventDefault();
        formik.handleSubmit();
        }}>

        <h2>{task.title} Details</h2>
        <Input 
          input='input'
          field="title"
          label={task.title}
          placeholder="Edit title"
          formik={formik}
        /> 

        <Input
          input='input'
          field="description"
          label={task.description}
          bonus='Description: '
          placeholder="Edit description"
          formik={formik}        
        />

        <p>
          <strong>Status:</strong> {task.status}
        </p>

        <hr />

        <Input
          input='textarea'
          field="FullText"
          label={task.FullText}
          bonus="Full Text: "
          placeholder="Edit full text"
          formik={formik}      
        />

      </form>
    </div>
  )
}
