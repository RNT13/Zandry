
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { goToStep, nextStep, prevStep, selectAddress, updateAddress } from "@/redux/slices/registerSlice";
import { Column, MinorTextH4, Row } from "@/styles/globalStyles";
import { MAnimation } from "@/styles/MaskedAnimations/MAnimation";
import { FormikProvider, useFormik } from "formik";
import { FaTreeCity } from "react-icons/fa6";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { MdOutlineRealEstateAgent, MdPlace } from "react-icons/md";
import { TbNumber } from "react-icons/tb";
import { useSelector } from "react-redux";
import * as yup from 'yup';
import { MButton } from "../../MaskedButton/MaskedButton";
import { FormikMInput } from "../../MaskedInput/FormikMaskedInput";
import ProgressBar from "../../ProgressBar/ProgressBar";
import { RegisterWindowBody, RegisterWindowFooter, RegisterWindowHeader, RegisterWindowWrapper } from "../RegisterWindow.styles";

const validationSchema = yup.object({
  cep: yup.string().min(9, 'O CEP está incompleto').required('Campo obrigatório'),
  address: yup.string().required('Campo obrigatório'),
  number: yup.string().required('Campo obrigatório'),
  city: yup.string().required('Campo obrigatório'),
  state: yup.string().required('Campo obrigatório'),
})

export default function Step03AddressInfo() {
  const dispatch = useAppDispatch()

  const addressData = useSelector(selectAddress)

  const form = useFormik({
    enableReinitialize: true,
    initialValues: {
      cep: addressData.cep,
      address: addressData.address,
      number: addressData.number,
      city: addressData.city,
      state: addressData.state,
    },
    validationSchema,
    onSubmit: (values) => {
      dispatch(updateAddress(values))
      dispatch(nextStep())
    }
  })

  return (
    <MAnimation variant="revealSoftRevealDown" trigger="mount">
      <RegisterWindowWrapper >

        <RegisterWindowHeader >
          <ProgressBar currentStep={3} totalSteps={7} onStepClick={(step) => dispatch(goToStep(step))} />
          <MinorTextH4>Navegue pelas etapas anterioes</MinorTextH4>
        </RegisterWindowHeader>

        <FormikProvider value={form}>
          <form onSubmit={form.handleSubmit} >

            <RegisterWindowBody>

              <MAnimation variant="revealSoftRevealRight" trigger="mount" delay={0.1}>
                <FormikMInput
                  required
                  variant="masked"
                  mask="00000-000"
                  name="cep"
                  id="Endereço completo"
                  label="CEP da empresa"
                  icon={<TbNumber />}
                  placeholder="00000-000"
                />
              </MAnimation>

              <MAnimation variant="revealSoftRevealRight" trigger="mount" delay={0.2}>
                <FormikMInput
                  required
                  variant="default"
                  name="address"
                  id="Logradouro"
                  label="Logradouro"
                  icon={<MdPlace />}
                  placeholder="Rua, avenida, etc"
                />
              </MAnimation>

              <MAnimation variant="revealSoftRevealRight" trigger="mount" delay={0.3}>
                <FormikMInput
                  required
                  variant="default"
                  name="number"
                  id="Numero"
                  label="Número do endereço"
                  icon={<TbNumber />}
                  placeholder="Número do endereço"
                />
              </MAnimation>

              <MAnimation variant="revealSoftRevealRight" trigger="mount" delay={0.4}>
                <FormikMInput
                  required
                  variant="default"
                  name="city"
                  id="Cidade"
                  label="Cidade"
                  icon={<FaTreeCity />}
                  placeholder="Sua cidade"
                />
              </MAnimation>


              <MAnimation variant="revealSoftRevealRight" trigger="mount" delay={0.5}>
                <FormikMInput
                  required
                  variant="default"
                  name="state"
                  id="Estado"
                  label="Estado"
                  icon={<MdOutlineRealEstateAgent />}
                  placeholder="Seu estado"
                />
              </MAnimation>

            </RegisterWindowBody>


            <RegisterWindowFooter>
              <Row>
                <Column>
                  <MAnimation variant="revealSoftRevealDown" trigger="mount" delay={0.1}>
                    <MButton $variant="outline" fullWidth onClick={() => dispatch(prevStep())} leftIcon={<IoIosArrowBack />}>Voltar</MButton>
                  </MAnimation>
                </Column>
                <Column>
                  <MAnimation variant="revealSoftRevealDown" trigger="mount" delay={0.2}>
                    <MButton $variant="gradient" fullWidth type="submit" rightIcon={<IoIosArrowForward />}>Próximo</MButton>
                  </MAnimation>
                </Column>
              </Row>
            </RegisterWindowFooter>

          </form>
        </FormikProvider>

      </RegisterWindowWrapper>
    </MAnimation>
  )
}
