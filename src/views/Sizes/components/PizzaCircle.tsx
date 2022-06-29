import Svg, { Circle, Line } from 'react-native-svg'

export const PizzaCircle = (props: { centimeters: number; slices: number }) => {
  const { centimeters, slices } = props
  const borderSize = 8
  const radius = (centimeters / 2) * 1.75
  const size = radius * 2

  const cutRotations = Array(slices)
    .fill(null)
    .map((_, i) => (i * 360) / slices)

  const pepperoniPositions = [
    { x: 0.6, y: 0.4 },
    { x: -0.5, y: 0.6 },
    { x: 0.2, y: -0.5 },
    { x: -0.4, y: -0.7 },
    { x: 0.1, y: 0.8 },
    { x: -0.6, y: -0.2 },
    { x: 0.6, y: -0.1 },
    { x: -0.1, y: 0.2 },
  ]

  return (
    <Svg height={size} width={size} viewBox={`0 0 ${size} ${size}`}>
      {/* Border */}
      <Circle cx={size / 2} cy={size / 2} r={radius} fill={colors.border} />

      {/* Cheese */}
      <Circle
        cx={size / 2}
        cy={size / 2}
        r={radius - borderSize}
        fill={colors.cheese}
      />

      {/* Pepperoni */}
      {pepperoniPositions.map(({ x, y }, i) => (
        <Circle
          key={i}
          translateX={(radius - borderSize) * x}
          translateY={(radius - borderSize) * y}
          cx={size / 2}
          cy={size / 2}
          r={(radius - borderSize) / 6}
          fill={colors.pepperoni}
        />
      ))}

      {/* Cuts */}
      {slices > 1 &&
        cutRotations.map((rotation, i) => (
          <Line
            key={i}
            rotation={rotation}
            originX={size / 2}
            originY={size / 2}
            x1={size / 2}
            y1={size / 2}
            x2={size / 2}
            y2={0}
            stroke={colors.cut}
            strokeWidth={1.5}
            strokeOpacity={0.3}
          />
        ))}
    </Svg>
  )
}

const colors = {
  cheese: '#ffd631',
  border: '#e7bc93',
  pepperoni: '#de4114',
  cut: '#000000',
}
