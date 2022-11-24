import { useState } from 'react'
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa'
import { ImageWithPreview } from '../types'

function Gallery({ images }: { images: ImageWithPreview[] }) {
  const [index, setIndex] = useState(0)

  return (
    <div className="flex flex-row items-center justify-center w-full">
      <FaChevronLeft className="h-10 w-10" onClick={() => setIndex((index - 1 + images.length) % images.length)} />
      {images && images.length > 0 && images[index] && (
        <img src={images[index].preview} alt={images[index].name} className="aspect-square object-contain w-1/2 select-none" />
      )}
      <FaChevronRight className="h-10 w-10" onClick={() => setIndex((index + 1) % images.length)} />
    </div>
  )
}

export default Gallery