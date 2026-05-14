import { useEffect } from 'react'
import { useThemeStore } from '../store/themeStore'

export const useDarkMode = () => {
  const { isDark, toggleTheme } = useThemeStore()

  useEffect(() => {
    const root = document.documentElement
    if (isDark) {
      root.classList.add('dark')
      root.classList.remove('light')
    } else {
      root.classList.remove('dark')
      root.classList.add('light')
    }
  }, [isDark])

  return { isDark, toggleTheme }
}
