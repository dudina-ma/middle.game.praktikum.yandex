import { useMemo, useState } from 'react'
import { Col, Divider, Empty, Form, Row } from 'antd'

import {
  categories,
  emojiSet,
  initialCommentsByTopic,
  topics,
} from './model/mock'
import { CommentItem, SegmentValue } from './model/types'
import {
  CommentComposer,
  CommentsList,
  CreateTopicModal,
  ForumToolbar,
  TopicDetails,
  TopicList,
} from './ui'
import styles from './ForumPage.module.css'

const ForumPage = () => {
  const [selectedTopicId, setSelectedTopicId] = useState<string | null>(
    topics[0]?.id ?? null
  )
  const [searchValue, setSearchValue] = useState('')
  const [categoryValue, setCategoryValue] = useState<string | undefined>()
  const [segmentValue, setSegmentValue] = useState<SegmentValue>('Все')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [newComment, setNewComment] = useState('')
  const [replyToId, setReplyToId] = useState<string | null>(null)
  const [commentsByTopic, setCommentsByTopic] = useState(
    () => initialCommentsByTopic
  )
  const [form] = Form.useForm()

  const filteredTopics = useMemo(() => {
    let result = topics.filter(topic =>
      topic.title.toLowerCase().includes(searchValue.toLowerCase())
    )

    if (categoryValue) {
      result = result.filter(topic => topic.category === categoryValue)
    }

    if (segmentValue === 'Популярные') {
      result = [...result].sort((a, b) => b.commentsCount - a.commentsCount)
    }

    if (segmentValue === 'Новые') {
      result = [...result].sort((a, b) => b.dateValue - a.dateValue)
    }

    return result
  }, [searchValue, categoryValue, segmentValue])

  const selectedTopic =
    topics.find(t => t.id === selectedTopicId) ??
    filteredTopics[0] ??
    topics[0] ??
    null

  const handleOpenModal = () => setIsModalOpen(true)

  const handleCloseModal = () => {
    setIsModalOpen(false)
    form.resetFields()
  }

  const handleEmojiInsert = (emoji: string) => {
    setNewComment(value => `${value}${emoji}`)
  }

  const handleCancelReply = () => {
    setReplyToId(null)
    setNewComment('')
  }

  const comments = selectedTopic ? commentsByTopic[selectedTopic.id] ?? [] : []
  const replyToComment = replyToId
    ? comments.find(comment => comment.id === replyToId)
    : null

  const handleSendComment = () => {
    if (!selectedTopic) {
      return
    }

    const trimmed = newComment.trim()
    if (!trimmed) {
      return
    }

    const newCommentItem: CommentItem = {
      id: `c${Date.now()}`,
      author: 'Вы',
      date: 'только что',
      content: trimmed,
      replyTo: replyToComment ? replyToComment.id : undefined,
    }

    setCommentsByTopic(prev => {
      const prevComments = prev[selectedTopic.id] ?? []
      return {
        ...prev,
        [selectedTopic.id]: [...prevComments, newCommentItem],
      }
    })
    setNewComment('')
    setReplyToId(null)
  }

  return (
    <div className={styles.page}>
      <div className={styles.toolbar}>
        <ForumToolbar
          searchValue={searchValue}
          onSearchChange={setSearchValue}
          categoryValue={categoryValue}
          onCategoryChange={setCategoryValue}
          segmentValue={segmentValue}
          onSegmentChange={setSegmentValue}
          categories={categories}
          onCreateTopic={handleOpenModal}
        />
      </div>

      <Row gutter={[16, 16]} className={styles.contentRow}>
        <Col xs={24} md={10} className={styles.leftCol}>
          <TopicList
            topics={filteredTopics}
            selectedTopicId={selectedTopicId}
            onSelectTopic={setSelectedTopicId}
          />
        </Col>

        <Col xs={24} md={14} className={styles.rightCol}>
          {selectedTopic ? (
            <TopicDetails topic={selectedTopic}>
              <CommentsList
                comments={comments}
                replyToId={replyToId}
                onReply={setReplyToId}
              />
              <Divider />
              <CommentComposer
                newComment={newComment}
                onChange={setNewComment}
                onSend={handleSendComment}
                onEmojiInsert={handleEmojiInsert}
                emojiSet={emojiSet}
                replyToComment={replyToComment ?? null}
                onCancelReply={handleCancelReply}
              />
            </TopicDetails>
          ) : (
            <Empty description="Выберите тему из списка" />
          )}
        </Col>
      </Row>

      <CreateTopicModal
        open={isModalOpen}
        onCancel={handleCloseModal}
        onSubmit={handleCloseModal}
        form={form}
        categories={categories}
      />
    </div>
  )
}

export default ForumPage
