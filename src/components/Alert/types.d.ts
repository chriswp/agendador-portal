import { MarginProps } from '@radix-ui/themes'

export interface AlertProps extends MarginProps {
  variant?: AlertVariantType
  title?: string
  subTitle?: string
  errorsList?: AlertErrorsType[]
}

type AlertVariantType = 'error' | 'warning' | 'info' | 'success'

interface AlertErrorsType {
  message: string
  fieldName: string
}
