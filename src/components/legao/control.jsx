import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { DownloadOutlined, UndoOutlined } from '@ant-design/icons'
import {
  Slider,
  InputNumber,
  Row,
  Col,
  Radio,
  Form,
  Button,
  message,
  Spin
} from 'antd'
import {
  updateBrickEffect,
  updateMaxLength,
  waitingServer,
  updateResultImage,
  updateStats
} from './actions'

function MaxLengthSlider() {
  const dispatch = useDispatch()
  const inputValue = useSelector(state => state.maxLength)
  return (
    <Row>
      <Col span={14}>
        <Slider
          min={10}
          max={200}
          onChange={value => dispatch(updateMaxLength(value))}
          value={typeof inputValue === 'number' ? inputValue : 0}
        />
      </Col>
      <Col span={4}>
        <InputNumber
          min={10}
          max={300}
          style={{ marginLeft: 16 }}
          value={inputValue}
          onChange={value => dispatch(updateMaxLength(value))}
        />
      </Col>
    </Row>
  )
}

function BrickEffectSelection() {
  const palette = useSelector(state => state.brickEffect)
  const dispatch = useDispatch()
  const handlePaletteChange = e => {
    dispatch(updateBrickEffect(e.target.value))
  }
  return (
    <Radio.Group value={palette} onChange={handlePaletteChange}>
      <Radio.Button value="all">All</Radio.Button>
      <Radio.Button value="solid">Solid</Radio.Button>
      <Radio.Button value="mono">Mono</Radio.Button>
    </Radio.Group>
  )
}

function CtrlForm() {
  const formItemLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 16 }
  }
  const maxLength = useSelector(state => state.maxLength)
  const brickEffect = useSelector(state => state.brickEffect)
  const uploadedImageMD5 = useSelector(state => state.uploadedImageMD5)
  const dispatch = useDispatch()
  const handleSubmit = e => {
    if (!uploadedImageMD5) {
      message.error('Please upload an image first!')
    } else if (maxLength > 0 && brickEffect) {
      dispatch(waitingServer(true))
      fetch('https://api.adrian-gao.com/legao/submit', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          maxLength,
          brickEffect,
          uploadedImageMD5
        })
      }).then(resp =>
        resp.json().then(json => {
          dispatch(waitingServer(false))
          dispatch(updateResultImage(json['resultImage']))
          dispatch(updateStats(json['stats']))
        })
      )
    } else {
      message.error('Wrong parameters!')
    }
  }
  return (
    <Form {...formItemLayout} onFinish={handleSubmit}>
      <Form.Item
        label="Longest Dimension"
        help="The number of 1x1 bricks along the longest axis of the output picture. Higher value gives better resolution but takes longer time."
      >
        <MaxLengthSlider />
      </Form.Item>
      <br />
      <Form.Item
        label="Brick Effects"
        help="The bricks to be used in constructing the output picture. Default is to use all including transparent and effect bricks."
        style={{ marginTop: '10px' }}
      >
        <BrickEffectSelection />
      </Form.Item>
      <br />
      <Button type="primary" htmlType="submit" block>
        Let's Make it!
      </Button>
    </Form>
  )
}

function ButtonsAfterResult() {
  const dispatch = useDispatch()
  const resultImage = useSelector(state => state.resultImage)
  const imageUrl = 'https://api.adrian-gao.com/legao/result/' + resultImage
  const handleRedo = e => {
    e.preventDefault()
    dispatch(updateResultImage(null))
  }
  return (
    <Row gutter={8} type="flex" justify="space-between">
      <Col>
        <Button type="default" onClick={handleRedo}>
          <UndoOutlined /> Retry
        </Button>
      </Col>
      <Col span={8}>
        <a href={imageUrl} download="legao.png">
          <Button type="primary" block>
            <DownloadOutlined /> Download
          </Button>
        </a>
      </Col>
    </Row>
  )
}

export default function Control() {
  const waitingServer = useSelector(state => state.waitingServer)
  const resultImage = useSelector(state => state.resultImage)
  return (
    <div>
      {resultImage ? (
        <div>
          <img
            alt="resultImage"
            src={'https://api.adrian-gao.com/legao/result/' + resultImage}
            style={{ width: '100%' }}
          />
          <br />
          <ButtonsAfterResult />
        </div>
      ) : (
        <div>
          <Spin spinning={waitingServer} tip="My server is working hard now...">
            <CtrlForm />
          </Spin>
        </div>
      )}
    </div>
  )
}
