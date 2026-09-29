/* =====================================================================
   VOCAÇÃO POLAR — novo banco de perguntas
   ---------------------------------------------------------------------
   Mantém a estrutura atual do projeto:
     FASE 1  -> 7 perguntas que levam a um dos 4 grupos (GRP1..GRP4)
     FASE 2  -> 7 perguntas "duelo" entre os 2 cursos do grupo
                (3 antes do jogo, 4 depois)

   Cursos: ADM, COMEX, INFO, MKT, RH, SEGTRAB, JURID

   O que mudou em relação à versão anterior:
   - Toda alternativa da Fase 1 agora tem relação real com o grupo
     (antes, "voar" ou "taco de beisebol" não diziam nada sobre curso).
   - Fase 2 tem 7 perguntas (número ímpar) => nunca dá empate 3x3.
   - Cada pergunta da Fase 2 tem 2 alternativas por curso, com peso
     e "apelo" parecidos, para nenhum curso parecer mais legal.
   - Use embaralhar() para as alternativas NÃO ficarem sempre na mesma
     posição (antes a 1ª e a 3ª eram sempre o mesmo curso).
   ===================================================================== */

// ---------------------------------------------------------------------
// GRUPOS: quais cursos cada um decide e para qual página de resultado vai
// ---------------------------------------------------------------------
const GRUPOS = {
  GRP1: { nome: "Negócios e Mundo",       cursos: ["ADM", "COMEX"],
          resultado: { ADM: "resultado/resultADM.html",  COMEX: "resultado/resultCOMEX.html" } },
  GRP2: { nome: "Tecnologia e Comunicação", cursos: ["INFO", "MKT"],
          resultado: { INFO: "resultado/resultINFO.html", MKT: "resultado/resultMKT.html" } },
  GRP3: { nome: "Regras e Proteção",       cursos: ["SEGTRAB", "JURID"],
          resultado: { SEGTRAB: "resultado/resultSEGTRAB.html", JURID: "resultado/resultJURID.html" } },
  GRP4: { nome: "Pessoas e Organização",   cursos: ["RH", "ADM"],
          resultado: { RH: "resultado/resultRH.html", ADM: "resultado/resultADM2.html" } },
};

// ---------------------------------------------------------------------
// FASE 1 — descobrir o grupo (cada alternativa soma 1 ponto no grupo)
// ---------------------------------------------------------------------
const FASE1 = [
  {
    pergunta: "Sábado livre, sem nenhuma obrigação. O que você mais curtiria fazer?",
    opcoes: [
      { texto: "Bolar um plano para ganhar dinheiro: vender algo, revender produtos ou abrir um mini negócio.", grupo: "GRP1" },
      { texto: "Mexer com algo digital: criar um site, editar um vídeo ou montar um perfil de conteúdo.", grupo: "GRP2" },
      { texto: "Organizar um campeonato com regras claras, cuidando para ninguém sair prejudicado ou se machucar.", grupo: "GRP3" },
      { texto: "Reunir a galera e organizar um encontro em que todo mundo se sinta bem e enturmado.", grupo: "GRP4" },
    ],
  },
  {
    pergunta: "Em um trabalho em grupo, qual tarefa você pega sem reclamar?",
    opcoes: [
      { texto: "Planejar prazos, dividir as tarefas e cuidar dos materiais e do orçamento.", grupo: "GRP1" },
      { texto: "Cuidar da parte criativa e tecnológica: slides, site, vídeo ou design.", grupo: "GRP2" },
      { texto: "Conferir se tudo segue o que foi pedido e apontar erros e riscos antes de entregar.", grupo: "GRP3" },
      { texto: "Cuidar do clima do grupo: ouvir todo mundo e resolver os desentendimentos.", grupo: "GRP4" },
    ],
  },
  {
    pergunta: "Qual dessas notícias chamaria mais a sua atenção?",
    opcoes: [
      { texto: "\"Empresa brasileira fecha acordo e passa a vender para 30 países.\"", grupo: "GRP1" },
      { texto: "\"Novo aplicativo com inteligência artificial vira febre entre jovens.\"", grupo: "GRP2" },
      { texto: "\"Nova lei muda regras de proteção ao trabalhador e ao consumidor.\"", grupo: "GRP3" },
      { texto: "\"Empresa é eleita uma das melhores para se trabalhar pelo bom ambiente.\"", grupo: "GRP4" },
    ],
  },
  {
    pergunta: "Qual desses problemas você teria mais vontade de resolver?",
    opcoes: [
      { texto: "Uma padaria muito boa que está perdendo dinheiro e ninguém sabe o motivo.", grupo: "GRP1" },
      { texto: "O site da escola: lento, feio e difícil de usar.", grupo: "GRP2" },
      { texto: "Um lugar onde alguém pode se machucar ou ter seus direitos desrespeitados.", grupo: "GRP3" },
      { texto: "Uma equipe desmotivada, com muitas brigas e gente saindo toda hora.", grupo: "GRP4" },
    ],
  },
  {
    pergunta: "Qual dessas habilidades você diria que é o seu ponto forte?",
    opcoes: [
      { texto: "Organização e negociação: transformar ideias em resultados.", grupo: "GRP1" },
      { texto: "Curiosidade e criatividade: gosto de criar coisas novas.", grupo: "GRP2" },
      { texto: "Atenção aos detalhes, responsabilidade e senso de justiça.", grupo: "GRP3" },
      { texto: "Empatia e comunicação: sei ouvir e perceber como as pessoas estão.", grupo: "GRP4" },
    ],
  },
  {
    pergunta: "Com quem você gostaria de passar um dia inteiro aprendendo a profissão?",
    opcoes: [
      { texto: "Com o(a) dono(a) de uma empresa que vende produtos para o mundo todo.", grupo: "GRP1" },
      { texto: "Com um(a) desenvolvedor(a) ou criador(a) de campanhas digitais.", grupo: "GRP2" },
      { texto: "Com um(a) advogado(a) ou um(a) técnico(a) que cuida da segurança de uma fábrica.", grupo: "GRP3" },
      { texto: "Com um(a) gestor(a) de pessoas que cuida de contratações e do bem-estar da equipe.", grupo: "GRP4" },
    ],
  },
  {
    pergunta: "Seus colegas discordam sobre o que fazer no projeto final. Qual é a sua reação?",
    opcoes: [
      { texto: "Proponho uma solução prática que equilibre tempo, custo e resultado.", grupo: "GRP1" },
      { texto: "Sugiro testar um protótipo ou pesquisar dados para decidir sem \"achismo\".", grupo: "GRP2" },
      { texto: "Releio o que foi combinado e as regras do trabalho para decidir com justiça.", grupo: "GRP3" },
      { texto: "Converso com cada um para entender o que motiva cada opinião e chegar a um acordo.", grupo: "GRP4" },
    ],
  },
];

// ---------------------------------------------------------------------
// FASE 2 — duelo entre os 2 cursos do grupo (cada alternativa soma 1
// ponto no curso). Índices 0-2 = antes do jogo; 3-6 = depois do jogo.
// ---------------------------------------------------------------------
const FASE2 = {

  // ================== ADMINISTRAÇÃO x COMÉRCIO EXTERIOR ==================
  GRP1: [
    {
      pergunta: "Você herdou uma lanchonete pequena. Qual seria a sua primeira missão?",
      opcoes: [
        { texto: "Organizar contas, estoque e caixa para saber exatamente quanto entra e quanto sai.", curso: "ADM" },
        { texto: "Descobrir se o molho da casa venderia em outros países e como levá-lo até lá.", curso: "COMEX" },
        { texto: "Dividir as funções da equipe e criar um passo a passo de atendimento.", curso: "ADM" },
        { texto: "Fechar parceria com um fornecedor estrangeiro de ingredientes especiais.", curso: "COMEX" },
      ],
    },
    {
      pergunta: "Qual dessas manchetes você abriria primeiro?",
      opcoes: [
        { texto: "\"Empresa reduz desperdícios e dobra o lucro em um ano.\"", curso: "ADM" },
        { texto: "\"Brasil bate recorde de exportações e conquista novos mercados.\"", curso: "COMEX" },
        { texto: "\"Jovem de 20 anos abre a própria empresa e já contrata equipe.\"", curso: "ADM" },
        { texto: "\"Porto amplia operação e encurta o prazo de entrega para a Europa.\"", curso: "COMEX" },
      ],
    },
    {
      pergunta: "Você ganhou um curso extra gratuito. Qual você escolheria?",
      opcoes: [
        { texto: "Planilhas e análise de números para tomar decisões.", curso: "ADM" },
        { texto: "Inglês, espanhol e outros idiomas para negócios.", curso: "COMEX" },
        { texto: "Liderança e gestão de projetos.", curso: "ADM" },
        { texto: "Costumes, moedas e regras de comércio de outros países.", curso: "COMEX" },
      ],
    },
    {
      pergunta: "Qual dessas reuniões você toparia participar?",
      opcoes: [
        { texto: "Definir as metas e os indicadores do próximo trimestre da empresa.", curso: "ADM" },
        { texto: "Videochamada com clientes de três países diferentes.", curso: "COMEX" },
        { texto: "Decidir onde cortar gastos e onde investir mais.", curso: "ADM" },
        { texto: "Escolher a melhor rota e o melhor transporte para enviar um produto ao exterior.", curso: "COMEX" },
      ],
    },
    {
      pergunta: "Qual viagem a trabalho seria a mais empolgante para você?",
      opcoes: [
        { texto: "Conhecer a sede de uma grande empresa e entender como ela é organizada.", curso: "ADM" },
        { texto: "Ir a uma feira internacional para fechar negócio com compradores estrangeiros.", curso: "COMEX" },
        { texto: "Fazer um curso intensivo de gestão e empreendedorismo em outra cidade.", curso: "ADM" },
        { texto: "Visitar o porto ou aeroporto de onde as cargas partem para o mundo.", curso: "COMEX" },
      ],
    },
    {
      pergunta: "Qual desafio parece mais divertido para você?",
      opcoes: [
        { texto: "Fazer uma empresa bagunçada passar a funcionar com eficiência.", curso: "ADM" },
        { texto: "Descobrir a papelada e as regras para vender um produto para outro país.", curso: "COMEX" },
        { texto: "Transformar uma ideia solta em um negócio que dá lucro.", curso: "ADM" },
        { texto: "Negociar um preço com alguém de outra cultura sem gerar mal-entendidos.", curso: "COMEX" },
      ],
    },
    {
      pergunta: "Como você imagina o seu dia de trabalho ideal?",
      opcoes: [
        { texto: "Variado: um pouco de finanças, equipe, planejamento e vendas dentro de uma mesma empresa.", curso: "ADM" },
        { texto: "Conectado ao mundo: idiomas, fusos horários e clientes de vários lugares.", curso: "COMEX" },
        { texto: "Estruturado: processos claros e metas acompanhadas de perto.", curso: "ADM" },
        { texto: "Dinâmico: sempre atento a câmbio, notícias e mudanças no mercado global.", curso: "COMEX" },
      ],
    },
  ],

  // ================== INFORMÁTICA PARA INTERNET x MARKETING ==================
  GRP2: [
    {
      pergunta: "Um aplicativo novo bombou. O que você mais quer descobrir sobre ele?",
      opcoes: [
        { texto: "Como ele foi programado e como funciona por dentro.", curso: "INFO" },
        { texto: "Como ele conquistou tantos usuários em tão pouco tempo.", curso: "MKT" },
        { texto: "Como os dados dos usuários ficam guardados e protegidos.", curso: "INFO" },
        { texto: "Como a marca conversa com o público e cria identificação.", curso: "MKT" },
      ],
    },
    {
      pergunta: "Projeto da feira de ciências: qual seria a sua parte?",
      opcoes: [
        { texto: "Programar o site ou o jogo que apresenta o projeto.", curso: "INFO" },
        { texto: "Criar o nome, o visual e a campanha de divulgação.", curso: "MKT" },
        { texto: "Montar o sistema que guarda e organiza os dados da pesquisa.", curso: "INFO" },
        { texto: "Pesquisar o que o público quer e apresentar o projeto de forma convincente.", curso: "MKT" },
      ],
    },
    {
      pergunta: "Qual desses problemas você toparia resolver agora?",
      opcoes: [
        { texto: "Um site que trava e dá erro sem ninguém saber o motivo.", curso: "INFO" },
        { texto: "Uma loja com produto ótimo, mas quase ninguém sabe que ela existe.", curso: "MKT" },
        { texto: "Um formulário online que perde as respostas das pessoas.", curso: "INFO" },
        { texto: "Uma marca que perdeu a confiança do público depois de uma polêmica.", curso: "MKT" },
      ],
    },
    {
      pergunta: "Qual dessas ferramentas parece mais interessante para explorar?",
      opcoes: [
        { texto: "Um editor de código para criar suas próprias páginas da web.", curso: "INFO" },
        { texto: "Um painel que mostra quantas pessoas viram, curtiram e compraram.", curso: "MKT" },
        { texto: "Um programa que testa se um site aguenta tentativas de invasão.", curso: "INFO" },
        { texto: "Um editor de imagem e vídeo para criar anúncios.", curso: "MKT" },
      ],
    },
    {
      pergunta: "O que te daria mais satisfação?",
      opcoes: [
        { texto: "Ver o código funcionar certinho depois de horas tentando.", curso: "INFO" },
        { texto: "Ver uma campanha sua viralizar.", curso: "MKT" },
        { texto: "Automatizar uma tarefa chata para nunca mais precisar fazê-la à mão.", curso: "INFO" },
        { texto: "Convencer alguém a experimentar algo que a pessoa nem conhecia.", curso: "MKT" },
      ],
    },
    {
      pergunta: "Você abriu uma startup com um amigo. Qual papel escolheria?",
      opcoes: [
        { texto: "Quem desenvolve o produto.", curso: "INFO" },
        { texto: "Quem cuida da divulgação e de conseguir clientes.", curso: "MKT" },
        { texto: "Quem mantém tudo no ar, funcionando e seguro.", curso: "INFO" },
        { texto: "Quem entende o cliente e decide como apresentar e precificar o produto.", curso: "MKT" },
      ],
    },
    {
      pergunta: "Que tipo de raciocínio você mais curte usar?",
      opcoes: [
        { texto: "Lógico, passo a passo: se acontece A, então acontece B.", curso: "INFO" },
        { texto: "Criativo e ligado a pessoas: o que faz alguém querer isso?", curso: "MKT" },
        { texto: "Investigativo: testar hipóteses até achar a causa exata de um erro.", curso: "INFO" },
        { texto: "Observador: notar comportamentos e tendências para prever o que vai fazer sucesso.", curso: "MKT" },
      ],
    },
  ],

  // ================== SEGURANÇA DO TRABALHO x SERVIÇOS JURÍDICOS ==================
  GRP3: [
    {
      pergunta: "Você chega a um lugar novo. O que seu olhar percebe primeiro?",
      opcoes: [
        { texto: "Fios expostos, piso escorregadio ou saída de emergência bloqueada.", curso: "SEGTRAB" },
        { texto: "As placas e avisos que dizem o que pode e o que não pode.", curso: "JURID" },
        { texto: "Se as pessoas estão usando capacete, luvas e outros equipamentos de proteção.", curso: "SEGTRAB" },
        { texto: "Se existe algum contrato ou documento definindo quem é responsável por quê.", curso: "JURID" },
      ],
    },
    {
      pergunta: "Qual tarefa você faria com mais prazer?",
      opcoes: [
        { texto: "Percorrer uma obra ou fábrica apontando riscos e sugerindo melhorias.", curso: "SEGTRAB" },
        { texto: "Organizar os documentos de um processo e conferir os prazos.", curso: "JURID" },
        { texto: "Dar um treinamento mostrando como evitar acidentes no dia a dia.", curso: "SEGTRAB" },
        { texto: "Pesquisar leis e casos parecidos para ajudar um advogado.", curso: "JURID" },
      ],
    },
    {
      pergunta: "Qual dessas situações mais incomodaria você?",
      opcoes: [
        { texto: "Ver alguém trabalhar sem proteção porque \"sempre foi assim\".", curso: "SEGTRAB" },
        { texto: "Ver alguém ser prejudicado por não conhecer os próprios direitos.", curso: "JURID" },
        { texto: "Saber que um acidente poderia ter sido evitado com um pouco de prevenção.", curso: "SEGTRAB" },
        { texto: "Ver uma regra ser aplicada de forma injusta.", curso: "JURID" },
      ],
    },
    {
      pergunta: "Como seria o seu ambiente de trabalho ideal?",
      opcoes: [
        { texto: "Movimentado, circulando por diferentes setores e locais.", curso: "SEGTRAB" },
        { texto: "Um escritório organizado, com documentos, computador e reuniões.", curso: "JURID" },
        { texto: "Junto de operários, técnicos e engenheiros, no dia a dia da prática.", curso: "SEGTRAB" },
        { texto: "Junto de advogados e em contato com fóruns e cartórios.", curso: "JURID" },
      ],
    },
    {
      pergunta: "Qual dessas habilidades você acha que tem mais?",
      opcoes: [
        { texto: "Olhar para um espaço e antecipar o que pode dar errado.", curso: "SEGTRAB" },
        { texto: "Ler textos longos e entender o que realmente está sendo dito.", curso: "JURID" },
        { texto: "Explicar procedimentos de forma clara para quem está na prática.", curso: "SEGTRAB" },
        { texto: "Argumentar com base em fatos e regras.", curso: "JURID" },
      ],
    },
    {
      pergunta: "Se pudesse aprender uma matéria extra agora, qual escolheria?",
      opcoes: [
        { texto: "Primeiros socorros e combate a incêndio.", curso: "SEGTRAB" },
        { texto: "Noções de direito do trabalho, do consumidor e civil.", curso: "JURID" },
        { texto: "Normas de saúde e segurança no trabalho.", curso: "SEGTRAB" },
        { texto: "Redação de documentos e petições.", curso: "JURID" },
      ],
    },
    {
      pergunta: "Qual desfecho deixaria você mais orgulhoso(a)?",
      opcoes: [
        { texto: "Um ano inteiro sem acidentes no lugar onde você trabalha.", curso: "SEGTRAB" },
        { texto: "Um processo bem organizado que ajudou a garantir o direito de alguém.", curso: "JURID" },
        { texto: "Uma empresa que passou a cuidar melhor da saúde dos funcionários por causa do seu trabalho.", curso: "SEGTRAB" },
        { texto: "Um acordo justo fechado entre duas pessoas que discordavam.", curso: "JURID" },
      ],
    },
  ],

  // ================== RECURSOS HUMANOS x ADMINISTRAÇÃO ==================
  GRP4: [
    {
      pergunta: "Uma empresa pede a sua ajuda. Qual problema você prefere enfrentar?",
      opcoes: [
        { texto: "A equipe está desmotivada e muita gente pede demissão.", curso: "RH" },
        { texto: "As contas não fecham e ninguém sabe para onde o dinheiro está indo.", curso: "ADM" },
        { texto: "Os novos funcionários não sabem o que fazer no primeiro dia.", curso: "RH" },
        { texto: "Os processos são lentos e cheios de retrabalho.", curso: "ADM" },
      ],
    },
    {
      pergunta: "Qual dessas tarefas você faria com mais vontade?",
      opcoes: [
        { texto: "Entrevistar candidatos e descobrir quem combina com a vaga.", curso: "RH" },
        { texto: "Montar o planejamento e as metas do ano da empresa.", curso: "ADM" },
        { texto: "Organizar um treinamento para a equipe crescer nas suas funções.", curso: "RH" },
        { texto: "Controlar estoque, compras e fornecedores.", curso: "ADM" },
      ],
    },
    {
      pergunta: "Dois colegas entraram em conflito. Como você reage?",
      opcoes: [
        { texto: "Converso com cada um separadamente para entender os dois lados.", curso: "RH" },
        { texto: "Reorganizo tarefas e responsabilidades para o conflito não se repetir.", curso: "ADM" },
        { texto: "Promovo uma conversa mediada para chegarem a um acordo.", curso: "RH" },
        { texto: "Defino regras e um fluxo de trabalho claros para todo o time.", curso: "ADM" },
      ],
    },
    {
      pergunta: "Qual dessas notícias despertaria mais o seu interesse?",
      opcoes: [
        { texto: "\"Empresa é eleita uma das melhores do país para se trabalhar.\"", curso: "RH" },
        { texto: "\"Startup cresce 300% com nova estratégia de gestão.\"", curso: "ADM" },
        { texto: "\"Programa de jovem aprendiz abre oportunidades de primeiro emprego.\"", curso: "RH" },
        { texto: "\"Empresa reorganiza processos e economiza milhões por ano.\"", curso: "ADM" },
      ],
    },
    {
      pergunta: "O seu dia de trabalho ideal teria mais...",
      opcoes: [
        { texto: "Conversas, reuniões individuais e ações com pessoas.", curso: "RH" },
        { texto: "Planilhas, relatórios e decisões sobre como usar os recursos.", curso: "ADM" },
        { texto: "Eventos de integração, treinamentos e feedbacks.", curso: "RH" },
        { texto: "Acompanhamento de indicadores e ajustes na rota da empresa.", curso: "ADM" },
      ],
    },
    {
      pergunta: "Qual frase descreve melhor o seu jeito?",
      opcoes: [
        { texto: "Percebo quando alguém não está bem, mesmo que a pessoa não diga.", curso: "RH" },
        { texto: "Gosto de deixar tudo planejado, com prazo e responsável.", curso: "ADM" },
        { texto: "Sei explicar as coisas de um jeito que cada pessoa entende.", curso: "RH" },
        { texto: "Consigo enxergar onde dá para gastar menos e render mais.", curso: "ADM" },
      ],
    },
    {
      pergunta: "Qual conquista seria mais gratificante para você?",
      opcoes: [
        { texto: "Ver alguém que você contratou e ajudou a crescer virar líder.", curso: "RH" },
        { texto: "Ver uma empresa que estava no vermelho voltar a dar lucro.", curso: "ADM" },
        { texto: "Perceber que o clima da equipe melhorou depois das suas ações.", curso: "RH" },
        { texto: "Ver um processo bagunçado virar algo simples e eficiente.", curso: "ADM" },
      ],
    },
  ],
};

// ---------------------------------------------------------------------
// FUNÇÕES AUXILIARES
// ---------------------------------------------------------------------

// Embaralha as alternativas (Fisher-Yates) para não haver "posição viciada".
// Use em cada pergunta ao exibi-la: const opcoes = embaralhar(pergunta.opcoes);
function embaralhar(lista) {
  const copia = [...lista];
  for (let i = copia.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copia[i], copia[j]] = [copia[j], copia[i]];
  }
  return copia;
}

// Devolve os itens com a maior pontuação (pode voltar mais de um em caso de empate).
// Ex.: maisPontuados({GRP1: 2, GRP2: 2, GRP3: 1, GRP4: 2}) -> ["GRP1", "GRP2", "GRP4"]
function maisPontuados(pontuacao) {
  const maximo = Math.max(...Object.values(pontuacao));
  return Object.keys(pontuacao).filter((chave) => pontuacao[chave] === maximo);
}

// Fase 1: escolhe o grupo. Em caso de empate, sorteia entre os empatados
// (assim o GRP1 deixa de ser favorecido, como acontecia com o "primeiro maior").
function escolherGrupo(pontuacaoGrupos) {
  const empatados = maisPontuados(pontuacaoGrupos);
  return empatados[Math.floor(Math.random() * empatados.length)];
}

// Fase 2: escolhe o curso. Com 7 perguntas e 2 cursos não existe empate.
// Também devolve o 2º colocado, útil para a aba "Você também pode se identificar com...".
function escolherCurso(grupo, pontuacaoCursos) {
  const [a, b] = GRUPOS[grupo].cursos;
  const vencedor = pontuacaoCursos[a] > pontuacaoCursos[b] ? a : b;
  const segundo = vencedor === a ? b : a;
  return { vencedor, segundo, pagina: GRUPOS[grupo].resultado[vencedor] };
}
