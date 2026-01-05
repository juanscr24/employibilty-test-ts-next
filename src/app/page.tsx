'use client'
import { getCharacters } from "@/services/api"
import { useEffect, useState } from "react"
import { Card } from "../components/Card"

export default function Home() {
  const [characters, setCharacters] = useState<any[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    fetch("https://rickandmortyapi.com/api/character")
      .then(res => res.json())
      .then(data => {
        setCharacters(data.results)
        setLoading(false)
      })
  }, [])

  if (loading) return <p>Cargando...</p>

  return (
    <div className="">
      {characters.map((char, index) => (
        <div key={index}>
          <h3>{char.name}</h3>
          <Card
            title={char.name}
            description={char.description}
            imageUrl={char.image}
            onClick={() => getCharacters()}
          />
          <img src={char.image} />
        </div>
      ))}
    </div>
  )
}
