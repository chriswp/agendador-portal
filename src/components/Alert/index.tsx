// @ts-ignore
import { Callout, calloutRootPropDefs, Strong } from '@radix-ui/themes'
import { useCallback, useMemo } from 'react'
import { FiInfo } from 'react-icons/fi'
import { GoCheckCircle } from 'react-icons/go'
import { VscError } from 'react-icons/vsc'

import { AlertProps } from './types'

const Alert = ({
  title,
  subTitle,
  variant,
  errorsList,
  ...props
}: AlertProps) => {
  const alertColor = useMemo<
    (typeof calloutRootPropDefs.color.values)[number]
  >(() => {
    switch (variant) {
      case 'error':
        return 'crimson'
      case 'info':
        return 'blue'
      case 'warning':
        return 'yellow'
      default:
        return 'mint'
    }
  }, [variant])

  const Icon = useCallback(() => {
    switch (variant) {
      case 'success':
        return <GoCheckCircle size={16} />
      case 'error':
        return <VscError size={16} />
      default:
        return <FiInfo size={16} />
    }
  }, [variant])

  return (
    <Callout.Root {...props} color={alertColor} role='alert'>
      <Callout.Icon>
        <Icon />
      </Callout.Icon>
      {title && <Callout.Text weight='medium'>{title}</Callout.Text>}{' '}
      <Callout.Text>{subTitle}</Callout.Text>
      {errorsList?.map(item => (
        <Callout.Text key={item.fieldName}>
          <Strong>{item.fieldName}: </Strong>
          {item.message}
        </Callout.Text>
      ))}
    </Callout.Root>
  )
}

export default Alert
