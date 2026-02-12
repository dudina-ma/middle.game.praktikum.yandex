import {
  Button,
  Card,
  Col,
  Input,
  Row,
  Segmented,
  Select,
  Space,
  Typography,
} from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import styles from './ForumToolbar.module.css'
import { segmentOptions, SegmentValue } from '../../../model/types'

const { Title } = Typography
const { Search } = Input

type ForumToolbarProps = {
  searchValue: string
  onSearchChange: (value: string) => void
  categoryValue?: string
  onCategoryChange: (value?: string) => void
  segmentValue: SegmentValue
  onSegmentChange: (value: SegmentValue) => void
  categories: string[]
  onCreateTopic: () => void
}

const ForumToolbar = ({
  searchValue,
  onSearchChange,
  categoryValue,
  onCategoryChange,
  segmentValue,
  onSegmentChange,
  categories,
  onCreateTopic,
}: ForumToolbarProps) => {
  return (
    <>
      <Space align="center" className={styles.header}>
        <Title level={2} className={styles.title}>
          Форум
        </Title>
        <Button type="primary" icon={<PlusOutlined />} onClick={onCreateTopic}>
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
          <Col xs={24} md={6}>
            <Select
              placeholder="Категория"
              allowClear
              className={styles.select}
              value={categoryValue}
              onChange={onCategoryChange}
              options={categories.map(category => ({
                value: category,
                label: category,
              }))}
            />
          </Col>
          <Col xs={24} md={8}>
            <Segmented
              block
              options={segmentOptions}
              value={segmentValue}
              onChange={value => onSegmentChange(value as SegmentValue)}
            />
          </Col>
        </Row>
      </Card>
    </>
  )
}

export default ForumToolbar
