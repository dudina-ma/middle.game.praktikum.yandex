import { useState, useMemo, useEffect } from 'react'
import { Table, Spin, Typography, Button } from 'antd'
import type { ColumnsType } from 'antd/es/table'
import { useGetLeaderboardQuery } from '../../api/leaderboard'
import { LeaderboardEntry } from '../../api/leaderboard.types'

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
    render: (_, record) => record.data.display_name,
    sorter: (a, b) =>
      a.data.display_name.localeCompare(b.data.display_name, 'ru'),
  },
  {
    title: 'Счет',
    key: 'score',
    width: 150,
    align: 'right',
    render: (_, record) => record.data.score,
    sorter: (a, b) => a.data.score - b.data.score,
  },
]

const TEAM_NAME = 'Battleship'
const LIMIT = 10

const Leaderboard = () => {
  const [cursor, setCursor] = useState(0)
  const [allEntries, setAllEntries] = useState<LeaderboardEntry[]>([])

  const { data, isLoading } = useGetLeaderboardQuery({
    teamName: TEAM_NAME,
    ratingFieldName: 'score',
    cursor,
    limit: LIMIT,
  })

  useEffect(() => {
    if (!data?.data) return

    if (cursor === 0) {
      setAllEntries(data.data)
    } else {
      setAllEntries(prev => {
        const existingUserIds = new Set(prev.map(entry => entry.data.user_id))
        const newEntries = data.data.filter(
          entry => !existingUserIds.has(entry.data.user_id)
        )

        return newEntries.length > 0 ? [...prev, ...newEntries] : prev
      })
    }
  }, [data, cursor])

  const handleLoadMore = () => {
    setCursor(prev => prev + LIMIT)
  }

  const tableData = useMemo(
    () =>
      allEntries.map((entry, index) => ({
        ...entry,
        key: `${entry.data.user_id}-${index}`,
        place: index + 1,
      })),
    [allEntries]
  )

  const hasMore = data?.data && data.data.length === LIMIT

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
