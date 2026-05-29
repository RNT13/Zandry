'use client'

import ServiceList from "@/components/ui/ServiceList/ServiceList"
import { ToScheduleContainer, ToScheduleContent } from "./toSchedule.styles"


export default function ToSchedule() {
  return (
    <ToScheduleContainer>
      <ToScheduleContent>
        <ServiceList />
      </ToScheduleContent>
    </ToScheduleContainer>
  )
}
