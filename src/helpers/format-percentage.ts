const percentageFormatter = Intl.NumberFormat('en-US', {
  style: 'percent',
  currency: 'USD',
  maximumFractionDigits: 2,

})

export const formatPercentage = (value: number) => percentageFormatter.format(value / 100)
