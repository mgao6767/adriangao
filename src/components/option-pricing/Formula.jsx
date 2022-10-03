import React from "react";
import { useSelector } from "react-redux";
import "katex/dist/katex.min.css";
import TeX from "@matejmazur/react-katex";
import {
  calculateRateContinuousAndTimeToMaturity,
  calcualteD1andD2,
  normalcdf
} from "./calculateOptionValue";

export default function BSFormula() {
  const spotPrice = useSelector(state => state.spotPrice);
  const strikePrice = useSelector(state => state.strikePrice);
  const interestRate = useSelector(state => state.interestRate);
  const compoundingFreq = useSelector(state => state.compoundingFreq);
  const timeToMaturity = useSelector(state => state.timeToMaturity);
  const timeToMaturityFreq = useSelector(state => state.timeToMaturityFreq);
  const volatility = useSelector(state => state.volatility);
  const optionType = useSelector(state => state.optionType);
  const optionValue = useSelector(state => state.optionValue);

  const data = {
    spotPrice,
    interestRate,
    strikePrice,
    compoundingFreq,
    timeToMaturity,
    timeToMaturityFreq,
    volatility,
    optionType
  };
  const { continuouslyRate, T } = calculateRateContinuousAndTimeToMaturity(
    data
  );
  const { d1, d2 } = calcualteD1andD2(data);
  const t = T.toFixed(4);
  const Tex = String.raw`\begin{aligned}d_1 &= \frac{\ln(\frac{S}{X}) + (r + \frac{\sigma^2}{2})T }{\sigma \sqrt{T}} \\ &=  \frac{\ln(\frac{${spotPrice}}{${strikePrice}}) + (${continuouslyRate.toFixed(
    4
  )}+\frac{${(volatility / 100).toFixed(4)}^2}{2})\times ${t} }{${(
    volatility / 100
  ).toFixed(4)} \sqrt{${t}}} =${d1.toFixed(
    4
  )} \\ d_2 &= d_1 - \sigma \sqrt{T} = ${d2.toFixed(4)} \\ \\`;

  let fullTex = "";
  if (optionType === "call") {
    fullTex =
      Tex +
      String.raw`N(d_1) &= ${normalcdf(0, 1, d1).toFixed(5)} \\
      N(d_2) &= ${normalcdf(0, 1, d2).toFixed(5)} \\ \\
      c &= SN(d_1) - X e^{-rT} N(d_2) \\& = ${
        optionValue ? optionValue.toFixed(4) : 0
      }  \end{aligned}`;
  } else {
    fullTex =
      Tex +
      String.raw`N(-d_1) &= ${normalcdf(0, 1, -d1).toFixed(5)} \\
      N(-d_2) &= ${normalcdf(0, 1, -d2).toFixed(5)} \\
      \\
      p &=Xe^{-rT} N(-d_2) - SN(-d_1) \\& = ${
        optionValue ? optionValue.toFixed(4) : 0
      }  \end{aligned}`;
  }
  return (
    <div>
      <p>This value is computed using Black-Scholes model as below:</p>

      <TeX block>{fullTex}</TeX>
      <p>
        <TeX math="r" />: the continuously compounded interest rate per annum.
      </p>
      <p>
        <TeX math="S" />: the spot price of the stock.
      </p>
      <p>
        <TeX math="X" />: the exercise price of the option.
      </p>
      <p>
        <TeX math="\sigma" />: the volatility per annum.
      </p>
      <p>
        <TeX math="T" />: the time to maturity.
      </p>
      <p>
        <TeX math="N(\cdot)" />: the cumulative standard normal distribution
        function.
      </p>
    </div>
  );
}
