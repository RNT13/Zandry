import { professionalsListMock } from './professionalsMock'
import { serviceListMock } from './serviceMock'

export const enterpriseListMock: Enterprise[] = [
  {
    id: 1,
    name: 'Barbearia Unissex SP',
    phone: '(11) 99999-9999',
    category: 'Barbearia',
    description: 'Barbearia Unissex SP é uma barbearia para homens e mulheres, com ambiente aconchegante e preços de alta qualidade.',
    logo: '',
    banner: 'https://localhost:3000',
    slug: 'barbearia-unissex',
    address: 'Rua dos Barros, 1000 - São Paulo, SP',
    city: 'São Paulo',
    state: 'SP',
    schedules: 'Segunda a Sexta - 9h às 17h',
    advantage1: 'Ambiente aconchegante',
    advantage2: 'Wi-Fi gratuito',
    advantage3: 'Profissionais qualificados',
    services: serviceListMock,
    professionals: professionalsListMock
  },
  {
    id: 2,
    name: 'Barbearia do João RJ',
    phone: '(21) 99999-9999',
    category: 'Barbearia',
    description: 'Barbearia do João RJ é uma barbearia para homens, com ambiente aconchegante e preços de alta qualidade.',
    logo: '',
    banner: 'https://localhost:3000',
    slug: 'barbearia-do-joao',
    address: 'Rua dos Barros, 1000 - Rio de Janeiro, RJ',
    city: 'Rio de Janeiro',
    state: 'RJ',
    schedules: 'Segunda a Sexta - 9h às 17h',
    advantage1: 'Estacionamento gratuito',
    advantage2: 'Wi-Fi gratuito',
    advantage3: 'Profissionais qualificados',
    services: serviceListMock,
    professionals: professionalsListMock
  },
  {
    id: 3,
    name: 'Barbearia da Luiza MG',
    phone: '(31) 99999-9999',
    category: 'Barbearia',
    description: 'Barbearia da Luiza MG é uma barbearia para mulheres, com ambiente aconchegante e preços de alta qualidade.',
    logo: '',
    banner: 'https://localhost:3000',
    slug: 'barbearia-da-luiza',
    address: 'Rua dos Barros, 1000 - Belo Horizonte, MG',
    city: 'Belo Horizonte',
    state: 'MG',
    schedules: 'Segunda a Sexta - 9h às 17h',
    advantage1: 'Estacionamento gratuito',
    advantage2: 'Wi-Fi gratuito',
    advantage3: 'Profissionais qualificados',
    services: serviceListMock,
    professionals: professionalsListMock
  }
]
