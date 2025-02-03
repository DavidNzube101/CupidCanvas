"use client"

import { useEffect, useRef } from "react"

export function EmojiBackground() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const emojis = ["❤️", "💝", "💖", "💗", "💓", "💘", "💕"]
    const particleCount = 50
    const particles: HTMLDivElement[] = []

    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement("div")
      particle.textContent = emojis[Math.floor(Math.random() * emojis.length)]
      particle.className = "absolute text-2xl opacity-20 pointer-events-none"
      particle.style.left = `${Math.random() * 100}%`
      particle.style.top = `${Math.random() * 100}%`
      particle.style.animation = `float ${5 + Math.random() * 10}s linear infinite`
      container.appendChild(particle)
      particles.push(particle)
    }

    return () => {
      particles.forEach((particle) => particle.remove())
    }
  }, [])

  return <div ref={containerRef} className="fixed inset-0 overflow-hidden -z-10" aria-hidden="true" />
}

