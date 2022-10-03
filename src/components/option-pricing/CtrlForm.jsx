import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Form, InputNumber, Row, Col, Slider, Radio } from 'antd'
import updateState from './actions'
import { calculateOptionValue } from './calculateOptionValue'

function OptionPicker() {
  const dispatch = useDispatch()
  const optionType = useSelector(state => state.optionType)
  return (
    <Radio.Group
      defaultValue={optionType}
      buttonStyle="solid"
      value={optionType}
      onChange={e => dispatch(updateState('optionType', e.target.value))}
    >
      <Radio.Button value="call">Call</Radio.Button>
      <Radio.Button value="put">Put</Radio.Button>
    </Radio.Group>
  )
}

function SpotPricePicker() {
  const dispatch = useDispatch()
  const spotPrice = useSelector(state => state.spotPrice)
  const validatePrice = value => {
    return typeof value === 'number' ? parseFloat(value) : spotPrice
  }
  return (
    <Row type="flex" justify="start" gutter={8}>
      <Col>
        <InputNumber
          min={0.01}
          step={0.01}
          value={spotPrice}
          formatter={value => `$${value}`}
          parser={value => value.replace('$', '')}
          onChange={value =>
            dispatch(updateState('spotPrice', validatePrice(value)))
          }
        />
      </Col>
      <Col span={8}>
        <Slider
          min={0.01}
          max={100}
          step={0.01}
          onChange={value => dispatch(updateState('spotPrice', value))}
          value={spotPrice}
        />
      </Col>
    </Row>
  )
}

function StrikePricePicker() {
  const dispatch = useDispatch()
  const strikePrice = useSelector(state => state.strikePrice)
  const validatePrice = value => {
    return typeof value === 'number' ? parseFloat(value) : strikePrice
  }
  return (
    <Row type="flex" justify="start" gutter={8}>
      <Col>
        <InputNumber
          min={0.01}
          step={0.01}
          value={strikePrice}
          formatter={value => `$${value}`}
          parser={value => value.replace('$', '')}
          onChange={value =>
            dispatch(updateState('strikePrice', validatePrice(value)))
          }
        />
      </Col>
      <Col span={8}>
        <Slider
          min={0.01}
          max={100}
          step={0.01}
          onChange={value => dispatch(updateState('strikePrice', value))}
          value={strikePrice}
        />
      </Col>
    </Row>
  )
}

function VolatilityPicker() {
  const dispatch = useDispatch()
  const volatility = useSelector(state => state.volatility)
  const validate = value => {
    return typeof value === 'number' ? parseFloat(value) : volatility
  }
  return (
    <Row type="flex" justify="start" gutter={8}>
      <Col>
        <InputNumber
          min={0.01}
          step={0.01}
          value={volatility}
          formatter={value => `${value}%`}
          parser={value => value.replace('%', '')}
          onChange={value =>
            dispatch(updateState('volatility', validate(value)))
          }
        />
      </Col>
      <Col span={8}>
        <Slider
          min={0.01}
          max={100}
          step={0.01}
          onChange={value =>
            dispatch(updateState('volatility', parseFloat(value)))
          }
          value={volatility}
        />
      </Col>
    </Row>
  )
}

function TimeToMaturityPicker() {
  const dispatch = useDispatch()
  const timeToMaturity = useSelector(state => state.timeToMaturity)
  const timeToMaturityFreq = useSelector(state => state.timeToMaturityFreq)
  const validate = value => {
    return typeof value === 'number' ? parseFloat(value) : timeToMaturity
  }
  return (
    <Row type="flex" justify="start" gutter={8}>
      <Col>
        <InputNumber
          min={0.01}
          step={0.1}
          value={timeToMaturity}
          onChange={value =>
            dispatch(updateState('timeToMaturity', validate(value)))
          }
        />
      </Col>
      <Col>
        <Radio.Group
          defaultValue={timeToMaturityFreq}
          buttonStyle="solid"
          value={timeToMaturityFreq}
          onChange={e =>
            dispatch(updateState('timeToMaturityFreq', e.target.value))
          }
        >
          <Radio.Button value="years">years</Radio.Button>
          <Radio.Button value="months">months</Radio.Button>
          <Radio.Button value="weeks">weeks</Radio.Button>
          <Radio.Button value="days">days</Radio.Button>
        </Radio.Group>
      </Col>
    </Row>
  )
}

function InterestRateCompoundPicker() {
  const dispatch = useDispatch()
  const compoundingFreq = useSelector(state => state.compoundingFreq)
  return (
    <Row type="flex" justify="start" gutter={8}>
      <Col>
        <Radio.Group
          defaultValue={compoundingFreq}
          buttonStyle="solid"
          value={compoundingFreq}
          onChange={e =>
            dispatch(updateState('compoundingFreq', e.target.value))
          }
        >
          <Radio.Button value="continuously">continuously</Radio.Button>
          <Radio.Button value="daily">daily</Radio.Button>
          <Radio.Button value="weekly">weekly</Radio.Button>
          <Radio.Button value="monthly">monthly</Radio.Button>
          <Radio.Button value="annually">annually</Radio.Button>
        </Radio.Group>
      </Col>
    </Row>
  )
}

function InterestRatePicker() {
  const dispatch = useDispatch()
  const interestRate = useSelector(state => state.interestRate)
  const validate = value => {
    return typeof value === 'number' ? parseFloat(value) : interestRate
  }
  return (
    <Row type="flex" justify="start" gutter={8}>
      <Col>
        <InputNumber
          min={0.01}
          step={0.01}
          value={interestRate}
          formatter={value => `${value}%`}
          parser={value => value.replace('%', '')}
          onChange={value =>
            dispatch(updateState('interestRate', validate(value)))
          }
        />
      </Col>
    </Row>
  )
}

export default () => {
  const formItemLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 16 }
  }
  const spotPrice = useSelector(state => state.spotPrice)
  const strikePrice = useSelector(state => state.strikePrice)
  const interestRate = useSelector(state => state.interestRate)
  const compoundingFreq = useSelector(state => state.compoundingFreq)
  const timeToMaturity = useSelector(state => state.timeToMaturity)
  const timeToMaturityFreq = useSelector(state => state.timeToMaturityFreq)
  const volatility = useSelector(state => state.volatility)
  const optionType = useSelector(state => state.optionType)
  const dispatch = useDispatch()

  const data = {
    spotPrice,
    interestRate,
    strikePrice,
    compoundingFreq,
    timeToMaturity,
    timeToMaturityFreq,
    volatility,
    optionType
  }

  useEffect(() => {
    const value = calculateOptionValue(data)
    dispatch(updateState('optionValue', value))
  }, [data, dispatch])

  const helpMessage = () => {
    let continuouslyRate = 0
    switch (compoundingFreq) {
      case 'annually':
        continuouslyRate = Math.log(interestRate / 100 + 1) * 100
        break
      case 'monthly':
        continuouslyRate =
          Math.log(Math.pow(interestRate / 12 / 100 + 1, 12)) * 100
        break
      case 'weekly':
        continuouslyRate =
          Math.log(Math.pow(interestRate / 52 / 100 + 1, 52)) * 100
        break
      case 'daily':
        continuouslyRate =
          Math.log(Math.pow(interestRate / 365 / 100 + 1, 365)) * 100
        break
      default:
        return ''
    }
    return `${interestRate.toFixed(
      2
    )}% p.a. compounded ${compoundingFreq} is approx. ${continuouslyRate.toFixed(
      2
    )}% p.a. compounded continuously`
  }
  return (
    <Form {...formItemLayout} layout="horizontal" style={{ minWidth: '100%' }}>
      <Form.Item label="Option Type">
        <OptionPicker></OptionPicker>
      </Form.Item>
      <Form.Item label="Spot Price">
        <SpotPricePicker></SpotPricePicker>
      </Form.Item>
      <Form.Item label="Strike Price">
        <StrikePricePicker></StrikePricePicker>
      </Form.Item>
      <Form.Item label="Volatility (p.a.)">
        <VolatilityPicker></VolatilityPicker>
      </Form.Item>
      <Form.Item label="Interest Rate (p.a.)">
        <InterestRatePicker></InterestRatePicker>
      </Form.Item>
      <Form.Item label="Compounded" help={helpMessage()}>
        <InterestRateCompoundPicker></InterestRateCompoundPicker>
      </Form.Item>
      <Form.Item label="Time to Maturity">
        <TimeToMaturityPicker></TimeToMaturityPicker>
      </Form.Item>
    </Form>
  )
}
