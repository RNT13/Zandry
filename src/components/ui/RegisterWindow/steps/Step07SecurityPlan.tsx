import { plansMock } from "@/data/plansMock";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { prevStep, selectPlanData, selectRegisterData, updatePlanData } from "@/redux/slices/registerSlice";
import { Column } from "@/styles/globalStyles";
import { FormikProvider, useFormik } from "formik";
import { useRouter } from "next/navigation";
import { IoIosArrowBack } from "react-icons/io";
import { useSelector } from "react-redux";
import { MButton } from "../../MaskedButton/MaskedButton";
import PlanCards from "../../PlanCards/PlanCards";
import {
  RegisterWindowBody,
  RegisterWindowFooter
} from "../RegisterWindow.styles";

export default function Step07PlanInfo() {
  const dispatch = useAppDispatch()
  const planData = useSelector(selectPlanData)
  const registerData = useSelector(selectRegisterData)

  const { push } = useRouter()



  const form = useFormik({
    enableReinitialize: true,
    initialValues: {
      selected_plan: planData.selected_plan
    },
    onSubmit: async (values) => {
      dispatch(updatePlanData({
        selected_plan: values.selected_plan as 'trial' | 'start' | 'pro' | 'business',
        trial_days: 15
      }))

      const payload = {
        basic_info: registerData.basicData,
        address_info: registerData.addressData,
        advantages_info: registerData.advantagesData,
        services_info: registerData.servicesData,
        professionals_info: registerData.professionalsData,
        security_info: registerData.securityData,
        plan: {
          selected_plan: values.selected_plan,
          trial_days: 15
        }
      }

      console.log('REGISTER COMPLETO', payload)

      push('/dashboard')
    }
  })

  const currentPlan = plansMock.find(plan => plan.id === form.values.selected_plan)

  return (
    <div>
      <FormikProvider value={form}>
        <form onSubmit={form.handleSubmit}>

          <RegisterWindowBody>

            <PlanCards
              selectedPlan={form.values.selected_plan}
              onSelectPlan={(planId) => form.setFieldValue('selected_plan', planId)}
            />

          </RegisterWindowBody>

          <RegisterWindowFooter>
            <Column>

              <Column>
                <MButton
                  type="button"
                  $variant="outline"
                  fullWidth
                  onClick={() => dispatch(prevStep())}
                  leftIcon={<IoIosArrowBack />}
                >
                  Voltar
                </MButton>
              </Column>

              <Column>
                <MButton type="submit" $variant="gradient" fullWidth>
                  Continuar com {currentPlan?.title}
                </MButton>
              </Column>

            </Column>
          </RegisterWindowFooter>

        </form>
      </FormikProvider>
    </div>
  )
}
