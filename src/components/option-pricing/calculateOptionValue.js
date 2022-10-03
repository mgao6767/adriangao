import { erf } from 'mathjs'

export function normalcdf(mean, standardDeviation, x) {
  return (1 - erf((mean - x) / (Math.SQRT2 * standardDeviation))) / 2
}

export function calcualteD1andD2(data) {
  const { continuouslyRate, T } = calculateRateContinuousAndTimeToMaturity(data)
  const { spotPrice, strikePrice, volatility /* percentage rate */ } = data
  const volatilityRate = volatility / 100
  const d1 =
    (Math.log(spotPrice / strikePrice) +
      (continuouslyRate + (volatilityRate * volatilityRate) / 2) * T) /
    (Math.sqrt(T) * volatilityRate)
  const d2 = d1 - volatilityRate * Math.sqrt(T)
  return { d1, d2 }
}

export function calculateRateContinuousAndTimeToMaturity(data) {
  const {
    interestRate /* percentage rate */,
    compoundingFreq,
    timeToMaturity,
    timeToMaturityFreq
  } = data
  let T = 0
  let continuouslyRate = 0
  switch (compoundingFreq) {
    case 'annually':
      continuouslyRate = Math.log(interestRate / 100 + 1)
      break
    case 'monthly':
      continuouslyRate = Math.log(Math.pow(interestRate / 12 / 100 + 1, 12))
      break
    case 'weekly':
      continuouslyRate = Math.log(Math.pow(interestRate / 52 / 100 + 1, 52))
      break
    case 'daily':
      continuouslyRate = Math.log(Math.pow(interestRate / 365 / 100 + 1, 365))
      break
    default:
      continuouslyRate = interestRate / 100
  }
  switch (timeToMaturityFreq) {
    case 'years':
      T = timeToMaturity
      break
    case 'months':
      T = timeToMaturity / 12
      break
    case 'weeks':
      T = timeToMaturity / 52
      break
    case 'days':
      T = timeToMaturity / 365
      break
    default:
      break
  }
  return { continuouslyRate, T }
}

export function calculateOptionValue(data) {
  const { d1, d2 } = calcualteD1andD2(data)
  const { continuouslyRate, T } = calculateRateContinuousAndTimeToMaturity(data)
  const { spotPrice, strikePrice, optionType } = data
  let value = 0

  if (optionType === 'call')
    value =
      normalcdf(0, 1, d1) * spotPrice -
      normalcdf(0, 1, d2) * strikePrice * Math.exp(-continuouslyRate * T)
  else {
    value =
      strikePrice * Math.exp(-continuouslyRate * T) * normalcdf(0, 1, -d2) -
      spotPrice * normalcdf(0, 1, -d1)
  }
  return value
}
