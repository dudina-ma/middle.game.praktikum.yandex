import { FullscreenExitOutlined, FullscreenOutlined } from '@ant-design/icons'
import { toggleFullscreen as toggleFs } from '../../utils/fullscreen'
import { Button } from 'antd'
import { useFullscreenState } from './useFullscreenState'

export const FullscreenButton = () => {
  const { isFullscreen } = useFullscreenState()

  return (
    <Button
      type="dashed"
      size="middle"
      icon={isFullscreen ? <FullscreenExitOutlined /> : <FullscreenOutlined />}
      onClick={toggleFs}>
      {isFullscreen ? 'Свернуть' : 'На весь экран'}
    </Button>
  )
}
