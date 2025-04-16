
import * as React from "react"

// This breakpoint defines when we switch to mobile layout
const MOBILE_BREAKPOINT = 768

export function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState<boolean | undefined>(undefined)

  React.useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`)
    
    const onChange = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
    }
    
    // Add event listener for resize events
    window.addEventListener('resize', onChange)
    mql.addEventListener("change", onChange)
    
    // Initial check
    setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
    
    // Cleanup
    return () => {
      window.removeEventListener('resize', onChange)
      mql.removeEventListener("change", onChange)
    }
  }, [])

  return !!isMobile
}
