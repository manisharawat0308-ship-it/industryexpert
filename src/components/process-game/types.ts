import type { ReactNode } from 'react'

// Optional embedded chart kinds the engine knows how to draw.
export type ChartKind = 'temperature' | 'rawmix' | null

// A question in the bank. options[0] is ALWAYS the correct answer in source
// data; the engine shuffles options at runtime and remaps the correct index.
export interface GameQuestion {
  topic: string
  prompt: string
  options: string[]
  explanation: string
  chart?: ChartKind
  chartCaption?: string
  image?: string
  imageAlt?: string
}

// A clickable hotspot over the process diagram (coords in a 300x200 space).
export interface DiagramSpot {
  id: string
  label: string
  info: string
  x: number
  y: number
  w: number
  h: number
}

// Everything an industry supplies to the generic ProcessGame engine.
export interface IndustryGameData {
  industryName: string           // e.g. "Cement"
  brandColor: string             // accent used across the game UI
  processName: string            // e.g. "cement manufacturing"

  // Build-mode reward (what the player assembles by answering correctly)
  reward: {
    noun: string                 // e.g. "Home", "Car", "Bag of Sugar"
    verb: string                 // e.g. "Build", "Assemble", "Produce"
    parts: number                // number of visible build stages (>=4)
    partLabels: string[]         // one label per part (length == parts)
    // renders the reward SVG given how many parts are built (0..parts)
    renderReward: (built: number, highlight: boolean) => ReactNode
    // a small icon-sized preview for the mode-select card
    renderPreview: () => ReactNode
    completionTitle: string      // e.g. "Your Home is Built!"
    completionSubtitle: string
  }

  // Question bank (>=10 recommended). Engine draws `questionsPerPlay`.
  questions: GameQuestion[]
  questionsPerPlay?: number      // default 10 (capped at questions.length)

  // Process-flow diagram for the jigsaw + interactive info
  diagram: {
    // draws the full diagram content within a 300x200 viewBox (no grid lines)
    renderContent: () => ReactNode
    spots: DiagramSpot[]         // clickable elements with info
  }
}
