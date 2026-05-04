'use client'

import { useState, useRef, useEffect } from 'react'

export default function FloatingSocial() {
  const [isOpen, setIsOpen] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <div ref={containerRef} className={`floating-social ${isOpen ? 'open' : ''}`}>
      <div className="social-menu">
        <a
          href="https://linkedin.com/company/edumanage"
          target="_blank"
          rel="noopener noreferrer"
          className="social-link linkedin"
          aria-label="LinkedIn"
        >
          <i className="fa-brands fa-linkedin-in"></i>
        </a>
        <a
          href="https://instagram.com/edumanage"
          target="_blank"
          rel="noopener noreferrer"
          className="social-link instagram"
          aria-label="Instagram"
        >
          <i className="fa-brands fa-instagram"></i>
        </a>
        <a
          href="https://twitter.com/edumanage"
          target="_blank"
          rel="noopener noreferrer"
          className="social-link twitter"
          aria-label="Twitter"
        >
          <i className="fa-brands fa-x-twitter"></i>
        </a>
      </div>
      <button
        className="social-toggle"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Follow Us"
        aria-expanded={isOpen}
      >
        <i className="fa-solid fa-share-nodes"></i>
        <span>Follow Us</span>
      </button>
    </div>
  )
}
