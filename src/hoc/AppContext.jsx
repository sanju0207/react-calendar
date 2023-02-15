import React from "react"

export const AppContext=React.createContext()

export const AppContextProvider=({children})=>{
    return <AppContext.Provider>{children}</AppContext.Provider>
}