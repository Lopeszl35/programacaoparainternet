const events = [
  {
    id: 1,
    name: "Festival de Música ao Ar Livre",
    date: "2024-09-01",
    location: "Parque do Ibirapuera, São Paulo",
    price: 100,
    description: "Venha curtir um dia inteiro de música ao ar livre com bandas locais e internacionais. Traga sua família e amigos para aproveitar o melhor da música ao vivo em um dos parques mais icônicos de São Paulo.",
    ticketsAvailable: 50
  },
  {
    id: 2,
    name: "Conferência Tech Innovation",
    date: "2024-09-10",
    location: "Centro de Convenções Rebouças, São Paulo",
    price: 150,
    description: "Participe da maior conferência de tecnologia da América Latina. Descubra as últimas inovações em tecnologia, assista a palestras de especialistas renomados e faça networking com profissionais do setor.",
    ticketsAvailable: 30
  },
  {
    id: 3,
    name: "Exposição de Arte Contemporânea",
    date: "2024-09-15",
    location: "Museu de Arte Moderna, Rio de Janeiro",
    price: 200,
    description: "Explore as obras mais recentes de artistas contemporâneos em uma exposição que desafia a percepção e o entendimento da arte moderna. Uma experiência visual imperdível no coração do Rio de Janeiro.",
    ticketsAvailable: 20
  }
];

export const getAllEvents = (req, res) => {
  res.render('index', { events });
};


export const getEventDetails = (req, res) => {
  const event = events.find(e => e.id == req.params.id);
  if (event) {
    res.render('detalhes', { event });
  } else {
    res.status(404).send('Evento não encontrado');
  }
};

