import RequestService from '../../services/RequestService'
import { ActionFunction, json } from 'react-router-dom'

const deleteTarefaRequestAction: ActionFunction = async ({ params }) => {
  try {
    const { id = '' } = params
    console.log(params)
    await RequestService.deleteTarefa(id)

    return json({ success: true })
  } catch (e) {
    return json({ success: false, error: e })
  }
}

export default deleteTarefaRequestAction
