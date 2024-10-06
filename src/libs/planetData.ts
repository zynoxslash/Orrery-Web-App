const random = (a, b) => a + Math.random() * b
const randomInt = (a, b) => Math.floor(random(a, b))

const planetD = [
  {
    key: 'mercury',
    texture: '/textures/mercury.png',
    size: 0.6,
    color: 0xb2b2b2,
    speed: 1.6,
    rotationSpeed: 0.03,
  },
  {
    key: 'venus',
    texture: '/textures/venus.png',
    size: 1.2,
    color: 0xddaa66,
    speed: 1.2,
    rotationSpeed: 0.01,
    isOpposite: true
  },
  {
    key: 'earth',
    texture: '/textures/earth.png',
    size: 1.35,
    color: 0x1e90ff,
    speed: 1,
    rotationSpeed: 0.02,
  },
  {
    key: 'mars',
    texture: '/textures/mars.png',
    size: 0.9,
    color: 0xc72c41,
    speed: 0.8,
    rotationSpeed: 0.0015,
  },
  {
    key: 'jupiter',
    texture: '/textures/jupiter.png',
    size: 2.4,
    color: 0xd9c4a1,
    speed: 0.5,
    rotationSpeed: 0.1,
  },
  {
    key: 'saturn',
    texture: '/textures/saturn.png',
    size: 2.1,
    color: 0xffd700,
    speed: 0.4,
    rotationSpeed: 0.08,
  },
  {
    key: 'uranus',
    texture: '/textures/uranus.png',
    size: 1.8,
    color: 0x4fb3e4,
    speed: 0.3,
    rotationSpeed: 0.05,
    isOpposite: true
  },
  {
    key: 'neptune',
    texture: '/textures/neptune.png',
    size: 1.8,
    color: 0x2f5d8e,
    speed: 0.2,
    rotationSpeed: 0.04,
  },
]
const planetData = []
const totalPlanets = 8
for (let index = 0; index < totalPlanets; index++) {
  planetData.push({
    id: index,
    key: planetD[index].key,
    textures: planetD[index].texture,
    xRadius: (index + 1.5) * 10 * (planetD[index].speed < 0.8 ? 1.3 : 1),
    zRadius: (index + 1.5) * 9.5 * (planetD[index].speed < 0.8 ? 1.3 : 1),
    color: planetD[index].color,
    size: planetD[index].size * 1.5,
    speed: planetD[index].speed,
    rotationSpeed: planetD[index].rotationSpeed,
    isOpposite: planetD[index]?.isOpposite
  })
}

export default planetData
