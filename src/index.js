import { createRoot } from 'react-dom/client'
import './styles.css'
import { App } from './App'

const pexel = (id) => `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260`
console.log(pexel(327482))
const images = [
  // Front
  { position: [0, 0, 1.5], rotation: [0, 0, 0], url: '/hyemin-1.png', name: 'hyemin-1' },
  // Back
  { position: [-0.8, 0, -0.6], rotation: [0, 0, 0], url: '/hyemin-2.jpg' },
  { position: [0.8, 0, -0.6], rotation: [0, 0, 0], url: pexel(310452) },
  // Left
  { position: [-1.75, 0, 0.25], rotation: [0, Math.PI / 2.5, 0], url: '/hyemin-3.jpg' },
  { position: [-2.15, 0, 1.5], rotation: [0, Math.PI / 2.5, 0], url: pexel(325185) },
  { position: [-2, 0, 2.75], rotation: [0, Math.PI / 2.5, 0], url: '/hyemin-4.jpg' },
  // Right
  { position: [1.75, 0, 0.25], rotation: [0, -Math.PI / 2.5, 0], url: pexel(227675) },
  { position: [2.15, 0, 1.5], rotation: [0, -Math.PI / 2.5, 0], url: pexel(911738) },
  { position: [2, 0, 2.75], rotation: [0, -Math.PI / 2.5, 0], url: '/hyemin-5.jpg' }
]

createRoot(document.getElementById('root')).render(<App images={images} />)
