import { createRoot } from 'react-dom/client'
import './styles.css'
import { App } from './App'
import * as React from 'react'
import { ImageData } from './interfaces/imageData'

const pexel = (id: number) => `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260`
console.log(pexel(327482))
const images: ImageData[] = [
  // Front
  { position: [0, 0, 1.5], rotation: [0, 0, 0], url: '/main.jpg', caption: 'main', opacity: 0.9 },
  // Back
  { position: [-1.1, 0, -1], rotation: [0, 0, 0], url: '/개구리.png', caption: 'back-left' },
  { position: [0, 0, -1], rotation: [0, 0, 0], url: '/토끼.png', caption: 'right-3' },
  { position: [1.1, 0, -1], rotation: [0, 0, 0], url: '/고양이.png', caption: 'back-right' },
  // Left
  { position: [-1.75, 0, 0.25], rotation: [0, Math.PI / 2.5, 0], url: '/너구리.png', caption: 'left-1' },
  { position: [-2.15, 0, 1.5], rotation: [0, Math.PI / 2.5, 0], url: '/닭.png', caption: 'left-2' },
  { position: [-2.55, 0, 2.75], rotation: [0, Math.PI / 2.5, 0], url: '/말.png', caption: 'left-3' },
  // // Right
  { position: [1.75, 0, 0.25], rotation: [0, -Math.PI / 2.5, 0], url: '/부엉이.png', caption: 'right-1' },
  { position: [2.15, 0, 1.5], rotation: [0, -Math.PI / 2.5, 0], url: '/양.png', caption: 'right-2' },
  { position: [2.55, 0, 2.75], rotation: [0, -Math.PI / 2.5, 0], url: '/타조.png', caption: 'right-3' }
]

const fileName = ['개구리.png', '고양이.png', '너구리.png', '닭.png', '말.png', '부엉이.png', '양.png', '토끼.png', '타조.png']

const circleImages: ImageData[] = fileName.map((name, idx) => {
  // set position and rotation belong to a circle
  const radius = 4
  const count = fileName.length + 9
  const order = idx + 9.5
  const angle = (order * 2 * Math.PI) / count
  return {
    position: [radius * Math.cos(angle), 0, radius * Math.sin(angle)],
    // rotation as see to center
    rotation: [0, -Math.PI / 2 - Math.atan2(radius * Math.sin(angle), radius * Math.cos(angle)), 0],
    url: `/${name}`,
    caption: ""
  }
})

// add main image to  circle images
// circleImages.push({ position: [0, 0, 2.5], rotation: [0, 0, 0], url: '/main.jpg', caption: 'main', opacity: 0.9 })

createRoot(document.getElementById('root')!).render(<App images={circleImages} />)
