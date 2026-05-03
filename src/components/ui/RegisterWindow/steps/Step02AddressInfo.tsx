
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { nextStep, prevStep, selectAddressData, updateAddressData } from "@/redux/slices/registerSlice";
import { Column, Row } from "@/styles/globalStyles";
import { MAnimation } from "@/styles/MaskedAnimations/MAnimation";
import { FormikProvider, useFormik } from "formik";
import { useRouter } from "next/navigation";
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

export default function Step02AddressInfo() {
  const addressData = useSelector(selectAddressData)

  const form = useFormik({
    enableReinitialize: true,
    initialValues: {
      address: addressData.address,
      number: addressData.number,
      city: addressData.city,
      cep: addressData.cep,
      state: addressData.state,
    },
    validationSchema: yup.object({
      address: yup.string().required('Campo obrigatório'),
      number: yup.string().required('Campo obrigatório'),
      city: yup.string().required('Campo obrigatório'),
      cep: yup.string().required('Campo obrigatório'),
      state: yup.string().required('Campo obrigatório'),
    }),
    onSubmit: (values) => {
      dispatch(updateAddressData(values))
      dispatch(nextStep())
    }
  })

  const { push } = useRouter()

  const handleLogin = () => {
    push(`/login`)
  }

  const dispatch = useAppDispatch()

  return (
    <MAnimation variant="revealSoftRevealDown" trigger="mount">
      <RegisterWindowWrapper >

        <RegisterWindowHeader >
          <ProgressBar currentStep={2} totalSteps={6} />
        </RegisterWindowHeader>

        <FormikProvider value={form}>
          <form onSubmit={form.handleSubmit} >

            <RegisterWindowBody>

              <MAnimation variant="revealSoftRevealRight" trigger="mount" delay={0.1}>
                <FormikMInput
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
              <MAnimation variant="revealSoftRevealDown" trigger="mount" delay={0.3}>
                <MButton $variant="link" fullWidth onClick={handleLogin}>Já possui uma conta?</MButton>
              </MAnimation>
            </RegisterWindowFooter>

          </form>
        </FormikProvider>

      </RegisterWindowWrapper>
    </MAnimation>
  )
}
