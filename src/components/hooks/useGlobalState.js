import { useContext } from "react"
import { State } from "../context/StateContext"

export const useGlobalState = () => {
    return useContext(State)
}