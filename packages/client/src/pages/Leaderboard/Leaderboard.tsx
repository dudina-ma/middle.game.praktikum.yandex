import { useState, useMemo, useEffect } from 'react'
import { Table, Spin, Typography, Button, Result } from 'antd'
import type { ColumnsType } from 'antd/es/table'
import { useGetLeaderboardQuery } from '../../api/leaderboard'
import {
  LEADERBOARD_RATING_FIELD,
  LEADERBOARD_TEAM_NAME,
} from '../../api/consts'
import {
  FetchLeaderboardRequest,
  LeaderboardEntry,
} from '../../api/leaderboard.types'
import { getErrorMessage } from '../../utils/errorUtils'

const { Title } = Typography

type TableRow = LeaderboardEntry & {
  place: number
  key: string
}

const columns: ColumnsType<TableRow> = [
  {
    title: 'Место',
    dataIndex: 'place',
    key: 'place',
    width: 100,
    align: 'center',
    sorter: (a, b) => a.place - b.place,
  },
  {
    title: 'Имя',
    key: 'display_name',
    render: (_, record) =>
      record.data.display_name || `Игрок #${record.data.user_id}`,
    sorter: (a, b) =>
      (a.data.display_name || '').localeCompare(
        b.data.display_name || '',
        'ru'
      ),
  },
  {
    title: 'Счёт',
    key: 'score',
    width: 150,
    align: 'right',
    render: (_, record) => record.data.score,
    sorter: (a, b) => a.data.score - b.data.score,
  },
]

const LIMIT = 10

const Leaderboard = () => {
  const [cursor, setCursor] = useState(0)
  const [allEntries, setAllEntries] = useState<LeaderboardEntry[]>([])
  const queryArgs: FetchLeaderboardRequest = {
    teamName: LEADERBOARD_TEAM_NAME,
    ratingFieldName: LEADERBOARD_RATING_FIELD,
    cursor,
    limit: LIMIT,
  }

  const { data, isLoading, error, isError, refetch } =
    useGetLeaderboardQuery(queryArgs)

  useEffect(() => {
    if (!data) {
      return
    }

    if (cursor === 0) {
      setAllEntries(data)
      return
    }

    setAllEntries(prev => {
      const existingUserIds = new Set(prev.map(entry => entry.data.user_id))
      const newEntries = data.filter(
        entry => !existingUserIds.has(entry.data.user_id)
      )

      return newEntries.length > 0 ? [...prev, ...newEntries] : prev
    })
  }, [data, cursor])

  const handleLoadMore = () => {
    setCursor(prev => prev + LIMIT)
  }

  const handleRetry = () => {
    setCursor(0)
    setAllEntries([])
    refetch()
  }

  const tableData = useMemo(() => {
    const sortedEntries = [...allEntries].sort(
      (a, b) => b.data.score - a.data.score
    )

    return sortedEntries.map((entry, index) => ({
      ...entry,
      key: `${entry.data.user_id}-${index}`,
      place: index + 1,
    }))
  }, [allEntries])

  const hasMore = Boolean(data && data.length === LIMIT)

  if (isError && allEntries.length === 0) {
    return (
      <div style={{ padding: '20px' }}>
        <Title level={1}>Таблица лидеров</Title>
        <Result
          status="error"
          title="Ошибка загрузки данных"
          subTitle={getErrorMessage(error)}
          extra={[
            <Button type="primary" key="retry" onClick={handleRetry}>
              Повторить
            </Button>,
          ]}
        />
      </div>
    )
  }

  return (
    <div style={{ padding: '20px' }}>
      <Title level={1}>Таблица лидеров</Title>
      {isLoading && allEntries.length === 0 ? (
        <Spin size="large" />
      ) : (
        <>
          <Table
            columns={columns}
            dataSource={tableData}
            rowKey="key"
            pagination={false}
            locale={{ emptyText: 'Нет данных' }}
            loading={isLoading && allEntries.length > 0}
          />
          {hasMore && (
            <div style={{ textAlign: 'center', marginTop: '20px' }}>
              <Button onClick={handleLoadMore} loading={isLoading}>
                Загрузить еще
              </Button>
            </div>
          )}
        </>
      )}
    </div>
  )
}

export default Leaderboard
