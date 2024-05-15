import { createBrowserRouter } from 'react-router-dom'
import { routes } from './routes.ts'
import Login, { loginAction } from '../pages/login.tsx'
import Home, { tarefaAction } from '../pages/home.tsx'
import deleteTarefaRequestAction from '../pages/actions/deleteTarefa.ts'

const router = createBrowserRouter([
  {
    path: routes.HOME,
    element: <Home />,
    action: tarefaAction,
  },
  {
    path: routes.LOGIN,
    element: <Login />,
    action: loginAction,
  },
  {
    path: routes.TAREFA_DELETE,
    action: deleteTarefaRequestAction,
  },
])

export default router
