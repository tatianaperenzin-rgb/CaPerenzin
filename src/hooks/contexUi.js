"use client"

import { createContext, useContext, useState } from "react"

// 1. Creiamo il contesto (la scatola vuota)
const UIContext = createContext()

// 2. Creiamo il "Provider" (la centralina che dà corrente)
export function ContextUi({ children }) {

  const [navState, setNavState] = useState(null)
  const [experienceActive, setExperienceActive] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [roomInfoActive, setRoomInfoActive] = useState(false)
  const [isLargeView, setIsLargeView] = useState(false)
  const [bubbleTest, setBubbleTest] = useState(false)

  return (
    <UIContext.Provider value={{ navState, setNavState, experienceActive, setExperienceActive, isMenuOpen, setIsMenuOpen, roomInfoActive, setRoomInfoActive, isLargeView, setIsLargeView, bubbleTest, setBubbleTest }}>
      {children}
    </UIContext.Provider>
  )
}

// 3. Creiamo un gancio veloce per usarlo (Hook personalizzato)
export function useUI() {
  return useContext(UIContext)
}