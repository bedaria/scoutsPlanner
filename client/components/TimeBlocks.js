import React from 'react'

export const TimeBlocks = ({timeBlocks}) => (
  <div>
    {
      timeBlocks.map(block => {
        return <button> {block.startTime} - {block.endTime}: {block.volunteerCount} volunteer(s) are coming</button>
      })
    }
  </div>
)
