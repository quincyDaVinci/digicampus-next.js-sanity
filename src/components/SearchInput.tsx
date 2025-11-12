'use client'

import { useState, useId } from 'react'
import { SearchIcon } from './icons/FeatherIcons'

export default function SearchInput() {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<string[]>([])
  const searchId = useId()
  const resultsId = useId()

  const handleSearch = (value: string) => {
    setQuery(value)
    // Simulate search results
    if (value.length > 2) {
      setResults([`Result for "${value}"`])
    } else {
      setResults([])
    }
  }

  return (
    <div className="relative">
      <label 
        htmlFor={searchId} 
        className="sr-only"
      >
        Search courses and content
      </label>
      
      <div className="relative">
        <input
          id={searchId}
          type="search"
          value={query}
          onChange={(e) => handleSearch(e.target.value)}
          placeholder="Search courses..."
          className="w-full pl-10 pr-4 py-2 border border-dc rounded-lg focus-visible:ring-2 ring-dc-focus bg-dc-surface-98"
          aria-describedby={results.length > 0 ? resultsId : undefined}
          aria-autocomplete="list"
          aria-controls={resultsId}
        />
        <SearchIcon 
          className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-dc-text-muted pointer-events-none" 
          aria-hidden="true"
        />
      </div>

      {/* Search results with live region */}
      {results.length > 0 && (
        <div
          id={resultsId}
          role="status"
          aria-live="polite"
          aria-atomic="true"
          className="mt-2 p-4 bg-dc-surface-98 border border-dc rounded-lg"
        >
          <p className="text-sm text-dc-text-muted mb-2">
            {results.length} result{results.length !== 1 ? 's' : ''} found
          </p>
          <ul className="space-y-2">
            {results.map((result, index) => (
              <li
                key={index}
                className="p-2 hover:bg-dc-surface-90 rounded cursor-pointer"
              >
                {result}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}

