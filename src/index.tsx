import { createRoot } from 'react-dom/client'
import './styles.css'
import { App } from './App'
import * as React from 'react'
import { ImageData } from './interfaces/imageData'

const pexel = (id: number) => `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260`
console.log(pexel(327482))
const images : ImageData[] = [
  // Front
  { position: [0, 0, 1.5], rotation: [0, 0, 0], url: '/main.jpg', caption: 'main' , opacity : 0.9},
  // Back
  { position: [-0.8, 0, -0.6], rotation: [0, 0, 0], url: '/hyemin-3.jpg'  , caption: 'back-left' },
  { position: [0.8, 0, -0.6], rotation: [0, 0, 0], url: '/hyemin-5.jpg', caption: 'back-right' },
  // Left
  { position: [-1.75, 0, 0.25], rotation: [0, Math.PI / 2.5, 0], url: '/hyemin-3.jpg' , caption: 'left-1' },
  { position: [-2.15, 0, 1.5], rotation: [0, Math.PI / 2.5, 0], url: '/hyemin-3.jpg'   , caption: 'left-2'},
  { position: [-2, 0, 2.75], rotation: [0, Math.PI / 2.5, 0], url: '/hyemin-3.jpg'  , caption: 'left-3'},
  // Right
  { position: [1.75, 0, 0.25], rotation: [0, -Math.PI / 2.5, 0], url:  '/hyemin-5.jpg', caption: 'right-1' },
  { position: [2.15, 0, 1.5], rotation: [0, -Math.PI / 2.5, 0], url:  '/hyemin-5.jpg', caption: 'right-2'},
  { position: [2, 0, 2.75], rotation: [0, -Math.PI / 2.5, 0], url: '/hyemin-5.jpg' , caption: 'right-3'}
]

createRoot(document.getElementById('root')!).render(<App images={images} />)
