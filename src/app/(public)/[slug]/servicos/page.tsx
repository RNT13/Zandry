'use client'

import ServiceList from "@/components/ui/ServiceList/ServiceList"
import { serviceListMock } from "@/data/serviceMock"
import { ToScheduleContainer, ToScheduleContent } from "./toSchedule.styles"


export default function ToSchedule() {
  return (
    <ToScheduleContainer>
      <ToScheduleContent>
        <ServiceList services={serviceListMock} />
      </ToScheduleContent>
    </ToScheduleContainer>
  )
}
