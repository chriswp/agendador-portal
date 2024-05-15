import {
  Box,
  Button,
  Card,
  Container,
  Flex,
  Text,
  TextField,
} from '@radix-ui/themes'
import {
  ActionFunction,
  Form,
  json,
  redirect,
  useActionData,
  useSubmit,
} from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { LoginSchema, LoginType } from '../schema/login.schema.ts'
import { zodResolver } from '@hookform/resolvers/zod'
import { routes } from '../router/routes.ts'
import AuthService from '../services/AuthService'
import UserService from '../services/UserService.ts'
import { useMemo } from 'react'
import { AxiosError, HttpStatusCode } from 'axios'
import { z } from 'zod'
import Alert from '../components/Alert'

export const loginAction: ActionFunction = async ({ request }) => {
  try {
    const formData = await request.formData()
    const newUser = Object.fromEntries(formData)
    const parsedData = LoginSchema.parse(newUser)
    const { data } = await AuthService.login(parsedData)
    AuthService.storeUserData({
      token: data.access_token,
      nome_completo: '',
      email: '',
    })
    const { data: userInfo } = await UserService.getUserData()
    AuthService.storeUserData({ token: data.access_token, ...userInfo })
    return redirect(routes.HOME)
  } catch (e) {
    const error = e as AxiosError | z.ZodError
    if (error instanceof z.ZodError)
      return json({ error, statusCode: HttpStatusCode.NotAcceptable })

    return json({
      error: error,
      statusCode: error?.status ?? HttpStatusCode.BadRequest,
    })
  }
}

const Login = () => {
  const submit = useSubmit()
  const actionData = useActionData() as {
    error: AxiosError | z.ZodError
    statusCode: HttpStatusCode
  }

  const showAlert = useMemo<boolean>(
    () =>
      actionData?.statusCode === HttpStatusCode.BadRequest ||
      actionData?.statusCode === HttpStatusCode.InternalServerError ||
      actionData?.statusCode === HttpStatusCode.Unauthorized,
    [actionData],
  )

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginType>({ resolver: zodResolver(LoginSchema) })

  return (
    <Container>
      <Flex justify='center' align='center' minHeight='100vh'>
        <Box width='30%'>
          <Card>
            <Flex justify='center' align='center'>
              <Text>Informe os dados de Acesso</Text>
            </Flex>
            {showAlert && (
              <Alert
                variant='error'
                subTitle='Verifique seu dados e tente novamente!'
              />
            )}
            <Form
              onSubmit={handleSubmit(data =>
                submit(data, { action: routes.LOGIN, method: 'post' }),
              )}
            >
              <Flex direction='column' gap='4'>
                <div>
                  <TextField.Root
                    color={errors.email ? 'red' : undefined}
                    {...register('email')}
                    placeholder='Email'
                  />
                  {errors.email?.message && (
                    <Text size='1' as='span' color='red'>
                      {errors.email.message}
                    </Text>
                  )}
                </div>
                <TextField.Root
                  {...register('password')}
                  placeholder='Senha'
                  type='password'
                />
                <Flex gap='3' mt='4' justify='end'>
                  <Button type='button' variant='soft' color='gray'>
                    Registrar-se
                  </Button>
                  <Button type='submit'>Login</Button>
                </Flex>
              </Flex>
            </Form>
          </Card>
        </Box>
      </Flex>
    </Container>
  )
}

export default Login
