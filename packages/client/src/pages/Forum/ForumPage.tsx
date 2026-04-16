import { useState } from 'react'
import { Col, Empty, Row, Spin } from 'antd'
import { ForumToolbar, TopicDetails, TopicList } from '../../organisms'
import styles from './ForumPage.module.css'
import { useGetTopicsQuery } from '../../api/forum.api'
import { useFilterTopics } from './model/useTopics'
import { Topic } from '../../api/forum.schema'

const ForumPage = () => {
  const { data, isLoading, isError } = useGetTopicsQuery()
  const [selectedTopic, setSelectedTopic] = useState<Topic | null>(null)
  const [search, setSearch] = useState('')
  const { topics } = useFilterTopics(search, data)

  return (
    <div className={styles.page}>
      <div className={styles.toolbar}>
        <ForumToolbar searchValue={search} onSearchChange={setSearch} />
      </div>

      <Row gutter={[16, 16]} className={styles.contentRow}>
        <Col xs={24} md={10} className={styles.leftCol}>
          {isLoading ? (
            <Spin />
          ) : isError ? (
            <Empty description="Ошибка!" />
          ) : topics ? (
            <TopicList
              topics={topics}
              selectedTopicId={selectedTopic?.id}
              onSelectTopic={setSelectedTopic}
            />
          ) : (
            <Empty description="Создайте топик!" />
          )}
        </Col>
        <Col xs={24} md={14} className={styles.rightCol}>
          {selectedTopic ? (
            <TopicDetails topic={selectedTopic} />
          ) : (
            <Empty description="Выберите тему из списка" />
          )}
        </Col>
      </Row>
    </div>
  )
}

export default ForumPage
