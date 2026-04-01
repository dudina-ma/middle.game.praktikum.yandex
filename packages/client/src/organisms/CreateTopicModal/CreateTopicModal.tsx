import { Form, FormProps, Input, Modal } from 'antd'
import { useCreateTopicMutation } from '../../api/forum.api'
import { useEffect } from 'react'
import { MessageInstance } from 'antd/es/message/interface'

const { TextArea } = Input

type CreateTopicFormValues = {
  title: string
  content: string
}

type CreateTopicModalProps = {
  isOpen: boolean
  close: () => void
  messageApi: MessageInstance
}

export const CreateTopicModal = ({
  isOpen,
  close,
  messageApi,
}: CreateTopicModalProps) => {
  const [createTopic] = useCreateTopicMutation()
  const [form] = Form.useForm()

  useEffect(() => {
    form.resetFields()
  }, [isOpen])

  const onFinish: FormProps<CreateTopicFormValues>['onFinish'] = ({
    title,
    content,
  }) => {
    createTopic({ title, content })
      .unwrap()
      .then(_ =>
        messageApi.open({
          type: 'success',
          content: 'Топик успешно создался',
        })
      )
      .catch(_ =>
        messageApi.open({
          type: 'error',
          content: 'Произошла ошибка!',
        })
      )
    close()
  }

  return (
    <Modal
      title="Новая тема"
      open={isOpen}
      onCancel={close}
      onOk={form.submit}
      okText="Создать"
      cancelText="Отмена"
      destroyOnHidden>
      <Form form={form} layout="vertical" onFinish={onFinish}>
        <Form.Item
          label="Заголовок"
          name="title"
          rules={[{ required: true, message: 'Введите заголовок' }]}>
          <Input placeholder="Например, Тактика на первые 10 ходов" />
        </Form.Item>

        <Form.Item
          label="Содержание"
          name="content"
          rules={[{ required: true, message: 'Напишите текст темы' }]}>
          <TextArea rows={4} placeholder="Опишите вашу тему..." />
        </Form.Item>
      </Form>
    </Modal>
  )
}
