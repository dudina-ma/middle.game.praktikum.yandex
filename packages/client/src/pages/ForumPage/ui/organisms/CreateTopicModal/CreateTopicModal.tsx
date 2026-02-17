import { Form, Input, Modal, Select } from 'antd'
import type { FormInstance } from 'antd'

const { TextArea } = Input

type CreateTopicFormValues = {
  title: string
  category: string
  tags?: string[]
  content: string
}

type CreateTopicModalProps = {
  open: boolean
  onCancel: () => void
  onSubmit: () => void
  form: FormInstance<CreateTopicFormValues>
  categories: string[]
}

const tagOptions = ['Тактика', 'Баг', 'Идеи', 'Турнир', 'UI'].map(tag => ({
  value: tag,
  label: tag,
}))

const CreateTopicModal = ({
  open,
  onCancel,
  onSubmit,
  form,
  categories,
}: CreateTopicModalProps) => {
  return (
    <Modal
      title="Новая тема"
      open={open}
      onCancel={onCancel}
      onOk={form.submit}
      okText="Создать"
      cancelText="Отмена"
      destroyOnClose>
      <Form form={form} layout="vertical" onFinish={onSubmit}>
        <Form.Item
          label="Заголовок"
          name="title"
          rules={[{ required: true, message: 'Введите заголовок' }]}>
          <Input placeholder="Например, Тактика на первые 10 ходов" />
        </Form.Item>

        <Form.Item
          label="Категория"
          name="category"
          rules={[{ required: true, message: 'Выберите категорию' }]}>
          <Select
            placeholder="Выберите категорию"
            options={categories.map(category => ({
              value: category,
              label: category,
            }))}
          />
        </Form.Item>

        <Form.Item label="Теги" name="tags">
          <Select
            mode="tags"
            placeholder="Добавьте теги"
            options={tagOptions}
          />
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

export default CreateTopicModal
