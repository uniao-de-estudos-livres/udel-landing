'use client'

import { Button } from '@/components/ui/button'
import { useNotification } from '@/components/ui/notifications'

export default function TestNotifications() {
  const notification = useNotification()

  return (
    <div className="flex gap-4">
      <Button
        onClick={() =>
          notification.success('Sucesso!', 'Operação realizada com sucesso.')
        }
      >
        Mostrar Sucesso
      </Button>
      <Button
        onClick={() =>
          notification.error('Erro!', 'Algo deu errado. Tente novamente.')
        }
      >
        Mostrar Erro
      </Button>
      <Button
        onClick={() =>
          notification.info('Info', 'Aqui está uma informação importante.')
        }
      >
        Mostrar Info
      </Button>
      <Button
        onClick={() =>
          notification.warning('Atenção', 'Você precisa completar esta ação.')
        }
      >
        Mostrar Aviso
      </Button>
    </div>
  )
}

