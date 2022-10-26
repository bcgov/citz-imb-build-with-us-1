import React from 'react'
import { MUIBox } from '../Layout/MUI/Box/MUI-Box'
import { MUIContainer } from '../Layout/MUI/Box/MUI-Container'
import Data from '../mockdata/memorygame.json'

export const MemoryGame = () => {
  return (
       <MUIContainer>
            {
                Data.map(item => {
                    return <MUIBox key={item.id}>{item.name}</MUIBox>
                })
            }
       </MUIContainer>
  )
}
