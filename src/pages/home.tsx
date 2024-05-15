import {
  Box,
  Button,
  Card,
  Container,
  Dialog,
  Flex,
  IconButton,
  Text,
  TextArea,
  TextField,
  Tooltip,
} from '@radix-ui/themes'
import {
  ActionFunction,
  Form,
  json,
  useActionData,
  useFetcher,
  useNavigation,
  useSearchParams,
  useSubmit,
} from 'react-router-dom'
import { useEffect, useMemo, useState } from 'react'
import { PaginationMetaType, RequestResponse } from '@/types'
import { createColumnHelper } from '@tanstack/react-table'
import { IoAdd } from 'react-icons/io5'
import { MdDelete } from 'react-icons/md'
import RequestService from '../services/RequestService'
import Table from '../components/Table'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { TarefaSchema, TarefaType } from '../schema/tarefa.schema.ts'
import { routes } from '../router/routes.ts'

export const tarefaAction: ActionFunction = async ({ request }) => {
  try {
    const formData = await request.formData()
    const newUser = Object.fromEntries(formData)
    const parsedData = TarefaSchema.parse(newUser)
    await RequestService.createTarefa(parsedData)
    return json({ success: true })
  } catch (e) {
    return json({ success: false })
  }
}
const Home = () => {
  const submit = useSubmit()
  const [data, setData] = useState<RequestResponse[]>([])
  const [paginationData, setPaginationData] =
    useState<PaginationMetaType | null>(null)

  const fetcher = useFetcher<{ success: boolean; error?: unknown }>()
  const [searchParams, setSearchParams] = useSearchParams()
  const columnHelper = createColumnHelper<RequestResponse>()
  const [openModal, setOpenModal] = useState<boolean>(false)
  const navigation = useNavigation()
  const actionData = useActionData() as { success: boolean }

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<TarefaType>({ resolver: zodResolver(TarefaSchema) })

  const columns = useMemo(() => {
    return [
      columnHelper.accessor('id', {
        cell: item => item.getValue(),
        header: 'Id',
      }),
      columnHelper.accessor('titulo', {
        cell: item => item.getValue(),
        header: 'Titulo',
      }),
      columnHelper.accessor('descricao', {
        cell: item => item.getValue(),
        header: 'Descricao',
      }),
      columnHelper.accessor('status.data.descricao', {
        cell: item => item.getValue(),
        header: 'Status da Tarefa',
      }),
      columnHelper.display({
        header: 'Ações',
        enableSorting: false,
        cell: item => (
          <Flex justify={'center'} gap={'2'}>
            <Tooltip content='Adicionar'>
              <IconButton
                size='1'
                variant='soft'
                radius='full'
                onClick={() => setOpenModal(true)}
              >
                <IoAdd />
              </IconButton>
            </Tooltip>
            <Tooltip content='Remover'>
              <IconButton
                color='red'
                size='1'
                variant='soft'
                radius='full'
                onClick={() =>
                  fetcher.submit(null, {
                    action: routes.TAREFA_DELETE.replace(
                      /\/:[^/]+/g,
                      `/${item.row.original.id}`,
                    ),
                    method: 'post',
                  })
                }
              >
                <MdDelete />
              </IconButton>
            </Tooltip>
          </Flex>
        ),
      }),
    ]
  }, [columnHelper])

  const getRequest = async (params?: Record<string, string>) => {
    try {
      // setIsLoading(true)
      const { data, meta } = await RequestService.getRequests({
        include: 'status',
        limit: '100',
        ...params,
      })
      setData(data)
      setPaginationData(meta.pagination)
    } catch (e) {
      console.error(e)
    } finally {
      // setIsLoading(false)
    }
  }

  useEffect(() => {
    const page = searchParams.get('page') ?? '1'
    getRequest({ page })
  }, [searchParams])

  useEffect(() => {
    const page = searchParams.get('page') ?? '1'
    if (navigation.state === 'idle' && actionData && actionData.success) {
      reset()
      getRequest({ page })
    }
  }, [actionData])

  useEffect(() => {
    if (fetcher.data && fetcher.data.success) {
      const page = searchParams.get('page') ?? '1'
      getRequest({ page })
    }
  }, [fetcher.data, searchParams])

  return (
    <Container size='4' px='4' pt='6'>
      <Dialog.Root open={openModal}>
        <Dialog.Content maxWidth='450px'>
          <Dialog.Title>Adicionar Nova Tarefa</Dialog.Title>
          {navigation.state === 'idle' && actionData && actionData.success && (
            <Flex>
              <Text color={'green'}>Tarefa adicionada com sucesso</Text>
            </Flex>
          )}

          {navigation.state === 'idle' && actionData && !actionData.success && (
            <Text color={'red'}>Oops! Problema ao cadastrar</Text>
          )}

          <Form
            onSubmit={handleSubmit(data =>
              submit(data, { action: '/home', method: 'post' }),
            )}
          >
            <Flex direction='column' gap='4'>
              <div>
                <TextField.Root
                  color={errors.titulo ? 'red' : undefined}
                  {...register('titulo')}
                  placeholder='Título'
                />
                {errors.titulo?.message && (
                  <Text size='1' as='span' color='red'>
                    {errors.titulo.message}
                  </Text>
                )}
              </div>
              <TextArea {...register('descricao')} placeholder='Descrição' />
              {errors.descricao?.message && (
                <Text size='1' as='span' color='red'>
                  {errors.descricao.message}
                </Text>
              )}
              <Flex gap='3' mt='4' justify='end'>
                <Button
                  onClick={() => {
                    setOpenModal(false)
                    reset()
                  }}
                  type='button'
                  variant='soft'
                  color='gray'
                >
                  Fechar
                </Button>
                <Button>Salvar</Button>
              </Flex>
            </Flex>
          </Form>
        </Dialog.Content>
      </Dialog.Root>
      <Flex justify='center' align='center' minHeight='30vh'>
        <Box mt='6'>
          <Card mt='6'>
            <Table
              data={data}
              columns={columns}
              pagination={
                paginationData
                  ? {
                      pages: paginationData.total_pages,
                      currentPage: paginationData.current_page,
                      onNextPage: (page: number) =>
                        setSearchParams({ page: String(page) }),
                      onPreviousPage: (page: number) =>
                        setSearchParams({ page: String(page) }),
                      onClickPage: (page: number) =>
                        setSearchParams({ page: String(page) }),
                    }
                  : undefined
              }
            />
          </Card>
        </Box>
      </Flex>
    </Container>
  )
}

export default Home
