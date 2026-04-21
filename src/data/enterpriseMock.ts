import { professionalsListMock } from './professionalsMock'
import { serviceListMock } from './serviceMock'

export const enterpriseListMock: Enterprise[] = [
  {
    id: 1,
    name: 'Barbearia Unissex SP',
    phone: '(11) 99999-9999',
    category: 'Barbearia',
    description: 'Barbearia Unissex SP  uma barbearia para homens e mulheres, com ambiente aconchegante e pre os de alta qualidade.',
    logo: 'https://http://localhost:3000/barbearia-unissex',
    banner: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTn8sR5X7qyX7qyX7qyX7qyX7qyX7qyX7qyX7qyX7qy',
    slug: 'barbearia-unissex',
    address: 'Rua dos Barros, 1000 - São Paulo, SP',
    city: 'São Paulo',
    state: 'SP',
    schedules: 'Segunda a Sexta - 9h a s 17h',
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
    description: 'Barbearia do João RJ  uma barbearia para homens, com ambiente aconchegante e pre os de alta qualidade.',
    logo: 'http://localhost:3000/barbearia-do-joao',
    banner: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTn8sR5X7qyX7qyX7qyX7qyX7qyX7qyX7qyX7qyX7qy',
    slug: 'barbearia-do-joao',
    address: 'Rua dos Barros, 1000 - Rio de Janeiro, RJ',
    city: 'Rio de Janeiro',
    state: 'RJ',
    schedules: 'Segunda a Sexta - 9h a s 17h',
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
    description: 'Barbearia da Luiza MG  uma barbearia para mulheres, com ambiente aconchegante e pre os de alta qualidade.',
    logo: 'http://localhost:3000/barbearia-da-luiza',
    banner: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTn8sR5X7qyX7qyX7qyX7qyX7qyX7qyX7qyX7qyX7qy',
    slug: 'barbearia-da-luiza',
    address: 'Rua dos Barros, 1000 - Belo Horizonte, MG',
    city: 'Belo Horizonte',
    state: 'MG',
    schedules: 'Segunda a Sexta - 9h a s 17h',
    advantage1: 'Estacionamento gratuito',
    advantage2: 'Wi-Fi gratuito',
    advantage3: 'Profissionais qualificados',
    services: serviceListMock,
    professionals: professionalsListMock
  }
]
