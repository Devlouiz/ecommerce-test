import { useContext } from 'react'
import StateContext from '../context/StateContext'

const useStates = () => {
  return useContext(StateContext)
}

export default useStates