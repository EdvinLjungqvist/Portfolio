import React, { createContext, useContext, useEffect, useState, ReactNode, FunctionComponent, ReactElement } from "react";
import { useCookies } from "react-cookie";

type Theme = "dark" | "light";

type ThemeContextType = {
    theme: Theme;
    setTheme: React.Dispatch<React.SetStateAction<Theme>>;
};

const ThemeContext = createContext<ThemeContextType | null>(null);

const useTheme = (): ThemeContextType => {
    const context = useContext(ThemeContext);
    
    if (!context) {
        throw new Error("useTheme must be used within a ThemeProvider");
    }
    return context;
};

type ThemeProviderProps = {
    children: ReactNode;
};

const ThemeProvider: FunctionComponent<ThemeProviderProps> = ({ children }): ReactElement => {
    const [theme, setTheme] = useState<Theme>("dark");
    const [cookies, setCookie] = useCookies(["theme", "consent"]);

    useEffect(() => {
        setTheme(cookies.theme ?? "dark");
    }, []);

    useEffect(() => {
        document.body.setAttribute("theme", theme);
        
        if (cookies.consent) {
            setCookie("theme", theme, { sameSite: "strict" });
        }
    }, [theme]);

    const value: ThemeContextType = {
        theme,
        setTheme,
    };

    return (
        <ThemeContext.Provider value={value}>
            {children}
        </ThemeContext.Provider>
    );
};

export { useTheme, ThemeProvider };
