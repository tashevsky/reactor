import { createContext, useState, useEffect } from "react"

export const ThemeContext = createContext()

const themeLight = 'light';
const themeDark = 'dark';

export const ThemeProvider = ({ children }) => {
    const [theme, setTheme] = useState(themeDark)

    useEffect(() => {
        // Get
        const savedThemePreference = localStorage.getItem('savedThemePreference')

        // Set
        if (savedThemePreference) {
            setTheme(savedThemePreference)
        }
    }, [/* Empty. */])

    useEffect(() => {
        // Save
        localStorage.setItem('savedThemePreference', theme)
        // Apply
        if (theme == themeDark) {
            document.body.className = 'theme-dark'
        } else {
            document.body.className = 'theme-light'
        }
    }, [theme])

    const toggle = () => {
        setTheme(_ => theme === themeDark
            ? themeLight
            : themeDark)
    }

    return (
        <ThemeContext.Provider value={{ theme, toggle }}>
            {children}
        </ThemeContext.Provider>
    )
}