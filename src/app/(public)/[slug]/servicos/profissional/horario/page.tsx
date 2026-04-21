'use client'

import DataTime from "@/components/ui/DataTime/DataTime"
import { TimeContainer, TimeContent } from "./time.styles"


export default function Time() {
  return (
    <TimeContainer>
      <TimeContent>
        <DataTime />
      </TimeContent>
    </TimeContainer>
  )
}
