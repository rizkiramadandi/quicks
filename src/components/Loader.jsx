import { useState, useEffect } from 'react'
import LoaderIcon from '../assets/react.svg'

export default function Loader({ subtitle }) {
  const [loaderDots, setLoaderDots] = useState(``)

  // trigger onload
  useEffect(() => {
    setInterval(() => {
      setLoaderDots((prevState) => {
        if (prevState.length >= 3) return ``
        return `${prevState}.`
      })
    }, 100)
  }, [])

  return (
    <>
      <div className="font-bold items-center justify-center w-full h-full flex flex-col gap-4">
        <img
          src={LoaderIcon}
          alt="Loader Icon"
          className="animate-spin w-[46px] h-[46px]"
        />
        Loading {subtitle}{loaderDots}
      </div>
    </>
  )
}
