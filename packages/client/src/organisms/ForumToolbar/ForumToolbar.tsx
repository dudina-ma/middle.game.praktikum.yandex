import { Button, Card, Col, Input, message, Row, Space, Typography } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import styles from './ForumToolbar.module.css'
import { Fragment } from 'react'
import { useModal } from '../../hooks/useModal'
import { CreateTopicModal } from '../CreateTopicModal'

const { Title } = Typography
const { Search } = Input

type ForumToolbarProps = {
  searchValue: string
  onSearchChange: (value: string) => void
}

export const ForumToolbar = ({
  searchValue,
  onSearchChange,
}: ForumToolbarProps) => {
  const { open, close, isOpen } = useModal(false)
  const [messageApi, contextHolder] = message.useMessage()

  return (
    <Fragment>
      {contextHolder}
      <Space align="center" className={styles.header}>
        <Title level={2} className={styles.title}>
          Форум
        </Title>
        <Button type="primary" icon={<PlusOutlined />} onClick={open}>
          Новая тема
        </Button>
      </Space>
      <Card className={styles.card}>
        <Row gutter={[16, 16]} align="middle">
          <Col xs={24} md={10}>
            <Search
              placeholder="Поиск по теме"
              allowClear
              value={searchValue}
              onChange={event => onSearchChange(event.target.value)}
            />
          </Col>
        </Row>
      </Card>

      <CreateTopicModal messageApi={messageApi} isOpen={isOpen} close={close} />
    </Fragment>
  )
}
