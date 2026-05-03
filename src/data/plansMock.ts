import { PlanFeatureLimit, RegisterPlanCard } from '@/types/common'

export const plansMock: RegisterPlanCard[] = [
  {
    id: 'trial',
    title: 'TESTE GRÁTIS',
    subtitle: 'Teste todas as funcionalidades',
    price: 'R$0',
    monthly_value: 0,
    description: 'Conheça a plataforma completa sem precisar de cartão.',
    trial_days: 15,
    badge: 'FREE',
    limits: {} as PlanFeatureLimit,
    features: ['Acesso completo', 'Todas as funcionalidades liberadas', 'Sem necessidade de cartão de crédito']
  },

  {
    id: 'start',
    title: 'PLANO START',
    subtitle: 'Ideal para pequenos negócios',
    price: 'R$39,90/mês',
    monthly_value: 39.9,
    description: 'Para quem está começando a organizar seus agendamentos.',
    limits: {} as PlanFeatureLimit,
    features: [
      '1 unidade empresarial',
      'Até 10 serviços',
      'Até 5 profissionais',
      'Até 100 agendamentos por mês',
      'Dashboard gerencial limitado',
      'Cadastro e gestão de clientes',
      'Notificações em tempo real'
    ]
  },

  {
    id: 'pro',
    title: 'PLANO PRO',
    subtitle: 'Mais escolhido',
    price: 'R$79,90/mês',
    monthly_value: 79.9,
    description: 'Plano completo para negócios em crescimento.',
    badge: 'RECOMENDADO',
    recommended: true,
    limits: {} as PlanFeatureLimit,
    features: [
      'Tudo do Plano Start +',
      'Serviços ilimitados',
      'Agendamentos ilimitados',
      'Até 20 profissionais',
      'Dashboard gerencial avançado',
      'Confirmação automática de agendamentos',
      'Lembretes automáticos',
      'Cores e logotipo personalizados',
      'Histórico completo de clientes',
      'Relatórios de desempenho'
    ]
  },

  {
    id: 'business',
    title: 'PLANO BUSINESS',
    subtitle: 'Estrutura corporativa',
    price: 'R$129,90/mês',
    monthly_value: 129.9,
    description: 'Para operações robustas e escaláveis.',
    limits: {} as PlanFeatureLimit,
    features: [
      'Tudo do Plano PRO +',
      'Gestão de múltiplas unidades',
      'Serviços ilimitados',
      'Agendamentos ilimitados',
      'Profissionais ilimitados',
      'Dashboard avançado',
      'Chat interno entre cliente e empresa',
      'Automação de mensagens e lembretes',
      'Exportação de relatórios',
      'Controle de permissões de acesso'
    ]
  }
]
