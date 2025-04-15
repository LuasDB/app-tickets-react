import { createContext, useContext,useState,useEffect, Children } from "react";

const ThemeContext = createContext()

export const ThemeProvider = ({children})=>{

    const storedTheme = localStorage.getItem('themeTickets') || 'ligth'
    const [theme,setTheme] = useState(storedTheme)

    useEffect(()=>{
        const root = document.documentElement
        root.classList.remove('light', 'dark')
        root.classList.add(theme)
    },[theme])

    const toggleTheme = ()=>{
        const newTheme = theme === 'ligth' ? 'dark' : 'ligth'
        setTheme(newTheme)
        localStorage.setItem('themeTickets',newTheme)
    }


    return (
        <ThemeContext.Provider value={{theme,toggleTheme}}>
            {children}
        </ThemeContext.Provider>
    )
}

export const useTheme = ()=> useContext(ThemeContext)