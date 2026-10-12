import React, { useState } from 'react';
import { 
  Car, 
  Sparkles, 
  ShieldCheck, 
  Clock, 
  Phone, 
  ChevronDown,
  CheckCircle, 
  CheckCircle2,
  Star, 
  Settings, 
  X, 
  MapPin, 
  Instagram, 
  MessageCircle,
  Menu,
  Award,
  Wrench,
  Sun,
  Send
} from 'lucide-react';

interface Servico {
  id: string;
  nome: string;
  categoria: string;
  precoMin: number;
  precoMax: number;
  precoTexto: string;
  tempoEstimadoHoras: number;
  tempo: string;
  destaque?: string;
  descricao: string;
  icone: any;
}

interface Depoimento {
  id: number;
  nome: string;
  veiculo: string;
  foto: string;
  texto: string;
  avaliacao: number;
}

const SERVICOS_INICIAIS: Servico[] = [
  {
    id: 'lavagem-detalhada',
    nome: 'Lavagem Detalhada',
    categoria: 'Limpeza',
    precoMin: 150,
    precoMax: 350,
    precoTexto: 'R$ 150,00 a R$ 350,00',
    tempoEstimadoHoras: 2,
    tempo: '2 horas',
    destaque: 'Mais Pedido',
    descricao: 'Limpeza minuciosa com produtos específicos, uso de pincéis para cantos difíceis e técnicas que não danificam a lataria.',
    icone: Sparkles
  },
  {
    id: 'polimento-farois',
    nome: 'Polimento de Faróis',
    categoria: 'Restauração',
    precoMin: 100,
    precoMax: 180,
    precoTexto: 'R$ 100,00 a R$ 180,00',
    tempoEstimadoHoras: 1.5,
    tempo: '1h 30min',
    destaque: 'Segurança & Estética',
    descricao: 'Recuperação de faróis amarelados e opacos, devolvendo a transparência e a segurança na iluminação.',
    icone: Sun
  },
  {
    id: 'higienizacao-interna-completa',
    nome: 'Higienização Interna Completa',
    categoria: 'Interior',
    precoMin: 350,
    precoMax: 600,
    precoTexto: 'R$ 350,00 a R$ 600,00',
    tempoEstimadoHoras: 4,
    tempo: '4 horas',
    destaque: 'Saúde & Conforto',
    descricao: 'Limpeza profunda de carpetes, teto, painéis, cintos de segurança e aspiração de alta potência.',
    icone: ShieldCheck
  },
  {
    id: 'limpeza-hidratacao-couro',
    nome: 'Limpeza e Hidratação de Bancos de Couro',
    categoria: 'Interior',
    precoMin: 150,
    precoMax: 300,
    precoTexto: 'R$ 150,00 a R$ 300,00',
    tempoEstimadoHoras: 2,
    tempo: '2 horas',
    destaque: 'Proteção Macia',
    descricao: 'Tratamento para limpar o couro e evitar rachaduras ou ressecamento.',
    icone: Award
  },
  {
    id: 'revitalizacao-plasticos-borrachas',
    nome: 'Revitalização de Plásticos e Borrachas',
    categoria: 'Restauração',
    precoMin: 80,
    precoMax: 150,
    precoTexto: 'R$ 80,00 a R$ 150,00',
    tempoEstimadoHoras: 1.5,
    tempo: '1h 30min',
    destaque: 'Renovação Externa',
    descricao: 'Recuperação da cor original de para-choques e molduras desbotadas.',
    icone: Wrench
  }
];

const GALERIA_ANTES_DEPOIS = [
  {
    id: 1,
    titulo: 'Polimento e Restauração de Faróis Opacos',
    modelo: 'Honda Civic',
    antes: 'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&w=600&q=80',
    depois: 'https://images.unsplash.com/photo-1555215695-3004980adade?auto=format&fit=crop&w=600&q=80',
    servico: 'Polimento de Faróis'
  },
  {
    id: 2,
    titulo: 'Higienização Interna e Cuidado com Couro',
    modelo: 'Jeep Compass',
    antes: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=600&q=80',
    depois: 'https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?auto=format&fit=crop&w=600&q=80',
    servico: 'Higienização + Hidratação de Couro'
  }
];

const DEPOIMENTOS_INICIAIS: Depoimento[] = [
  {
    id: 1,
    nome: 'Carlos Eduardo',
    veiculo: 'Honda Civic',
    foto: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80',
    texto: 'Fiz o polimento dos faróis e a lavagem detalhada na Prime Auto Estética. O carro renovou completamente, parecia outro farol!',
    avaliacao: 5
  },
  {
    id: 2,
    nome: 'Fernanda Lima',
    veiculo: 'Jeep Compass',
    foto: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80',
    texto: 'A higienização interna completa e o tratamento de couro deixaram a cabine cheirosa e super limpa. Trabalho impecável!',
    avaliacao: 5
  },
  {
    id: 3,
    nome: 'Marcelo Siqueira',
    veiculo: 'Toyota Corolla',
    foto: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&w=150&q=80',
    texto: 'A revitalização dos plásticos deu vida nova aos para-choques que estavam acinzentados. Recomendo demais!',
    avaliacao: 5
  }
];

const FAQ_LISTA = [
  {
    pergunta: 'Com que frequência devo fazer a Hidratação de Bancos de Couro?',
    resposta: 'Recomendamos a cada 3 a 6 meses para evitar rachaduras, ressecamento e manter o toque macio do couro original.'
  },
  {
    pergunta: 'Quanto tempo dura o efeito do Polimento de Faróis?',
    resposta: 'O efeito dura por muito tempo pois removemos a camada amarelada/oxidada e aplicamos proteção UV sobre a lente do farol.'
  },
  {
    pergunta: 'Como funciona a escolha dos serviços no site?',
    resposta: 'Você pode selecionar quantos serviços desejar na lista! O site calcula o valor e o tempo estimado automaticamente e envia o resumo direto para nosso WhatsApp.'
  },
  {
    pergunta: 'Como é feito o pagamento?',
    resposta: 'O pagamento é feito diretamente no local após você inspecionar o veículo e aprovar todo o serviço realizado.'
  }
];

export default function App() {
  const [numeroWhatsapp, setNumeroWhatsapp] = useState('5543920005013');
  const [nomeLoja, setNomeLoja] = useState('Prime Auto Estética');
  const [instagramUser, setInstagramUser] = useState('a_primeestetica');
  const [modalConfigAberto, setModalConfigAberto] = useState(false);

  const mensagemDirectaWhatsApp = encodeURIComponent(
    "Olá! Gostaria de solicitar um orçamento para o meu carro."
  );

  const getLinkWhatsAppDirecto = () => {
    const numeroLimpo = numeroWhatsapp.replace(/\D/g, '');
    return `https://wa.me/${numeroLimpo}?text=${mensagemDirectaWhatsApp}`;
  };

  const [menuMobileAberto, setMenuMobileAberto] = useState(false);
  const [modalAvaliacaoAberto, setModalAvaliacaoAberto] = useState(false);

  const [listaDepoimentos, setListaDepoimentos] = useState<Depoimento[]>(DEPOIMENTOS_INICIAIS);
  const [novoNomeDep, setNovoNomeDep] = useState('');
  const [novoVeiculoDep, setNovoVeiculoDep] = useState('');
  const [novaNotaDep, setNovaNotaDep] = useState<number | string>(5);
  const [novoTextoDep, setNovoTextoDep] = useState('');
  const [sucessoAvaliacao, setSucessoAvaliacao] = useState(false);

  const [servicosSelecionados, setServicosSelecionados] = useState<Servico[]>([]);

  const [nomeCliente, setNomeCliente] = useState('');
  const [telefoneCliente, setTelefoneCliente] = useState('');
  const [modeloVeiculo, setModeloVeiculo] = useState('');
  const [tipoVeiculo, setTipoVeiculo] = useState('Sedan / Hatch');
  const [placaCor, setPlacaCor] = useState('');
  const [dataAgendamento, setDataAgendamento] = useState('');
  const [horarioAgendamento, setHorarioAgendamento] = useState('');
  const [observacoes, setObservacoes] = useState('');

  const [categoriaFiltro, setCategoriaFiltro] = useState('Todas');
  const [faqAberto, setFaqAberto] = useState<number | null>(null);
  const [mensagemSucesso, setMensagemSucesso] = useState(false);

  const alternarServico = (servico: Servico) => {
    if (servicosSelecionados.some(s => s.id === servico.id)) {
      setServicosSelecionados(servicosSelecionados.filter(s => s.id !== servico.id));
    } else {
      setServicosSelecionados([...servicosSelecionados, servico]);
    }
  };

  const valorTotalMin = servicosSelecionados.reduce((acc, curr) => acc + curr.precoMin, 0);
  const valorTotalMax = servicosSelecionados.reduce((acc, curr) => acc + curr.precoMax, 0);
  const horasTotais = servicosSelecionados.reduce((acc, curr) => acc + curr.tempoEstimadoHoras, 0);

  const aoEnviarAgendamento = (e: React.FormEvent) => {
    e.preventDefault();

    if (servicosSelecionados.length === 0) {
      alert('Por favor, selecione pelo menos um serviço para agendar!');
      return;
    }

    const listaServicosTexto = servicosSelecionados
      .map(s => `  • *${s.nome}* — ${s.precoTexto} (${s.tempo})`)
      .join('\n');

    const dataFormatada = dataAgendamento ? dataAgendamento.split('-').reverse().join('/') : '';

    const mensagemWhatsapp = 
`🚗 *NOVO AGENDAMENTO - ${nomeLoja.toUpperCase()}* 🚗

👤 *DADOS DO CLIENTE:*
• *Nome:* ${nomeCliente}
• *WhatsApp:* ${telefoneCliente}

🚘 *DADOS DO VEÍCULO:*
• *Modelo/Ano:* ${modeloVeiculo}
• *Categoria:* ${tipoVeiculo}
${placaCor ? `• *Placa / Cor:* ${placaCor.toUpperCase()}\n` : ''}
📅 *DATA E HORÁRIO DESEJADOS:*
• *Data:* ${dataFormatada}
• *Horário:* ${horarioAgendamento}

🛠️ *SERVIÇOS SELECIONADOS:*
${listaServicosTexto}

⏱️ *TEMPO ESTIMADO TOTAL:* ~${horasTotais} horas
💰 *VALOR ESTIMADO TOTAL:* R$ ${valorTotalMin.toFixed(2).replace('.', ',')} a R$ ${valorTotalMax.toFixed(2).replace('.', ',')}
${observacoes ? `\n📝 *OBSERVAÇÕES:* ${observacoes}` : ''}

_Olá! Gostaria de confirmar a disponibilidade deste agendamento no sistema da Prime Auto Estética (Instagram: @${instagramUser})._`;

    const urlEncoded = encodeURIComponent(mensagemWhatsapp);
    const numeroLimpo = numeroWhatsapp.replace(/\D/g, '');
    const linkWhatsapp = `https://wa.me/${numeroLimpo}?text=${urlEncoded}`;

    window.open(linkWhatsapp, '_blank');
    setMensagemSucesso(true);
  };

  const aoEnviarAvaliacao = (e: React.FormEvent) => {
    e.preventDefault();
    if (!novoNomeDep || !novoTextoDep) return;

    const novoDepObj: Depoimento = {
      id: Date.now(),
      nome: novoNomeDep,
      veiculo: novoVeiculoDep || 'Cliente Prime',
      foto: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80',
      texto: novoTextoDep,
      avaliacao: Number(novaNotaDep)
    };

    setListaDepoimentos([novoDepObj, ...listaDepoimentos]);
    setNovoNomeDep('');
    setNovoVeiculoDep('');
    setNovoTextoDep('');
    setSucessoAvaliacao(true);
    setTimeout(() => {
      setSucessoAvaliacao(false);
      setModalAvaliacaoAberto(false);
    }, 2000);
  };

  const enviarAvaliacaoWhatsapp = () => {
    const texto = `⭐ *NOVA AVALIAÇÃO - ${nomeLoja.toUpperCase()}* ⭐\n\n• *Nome:* ${novoNomeDep}\n• *Veículo:* ${novoVeiculoDep}\n• *Nota:* ${novaNotaDep} estrelas\n• *Comentário:* "${novoTextoDep}"`;
    const url = `https://wa.me/${numeroWhatsapp.replace(/\D/g, '')}?text=${encodeURIComponent(texto)}`;
    window.open(url, '_blank');
  };

  const servicosFiltrados = categoriaFiltro === 'Todas' 
    ? SERVICOS_INICIAIS 
    : SERVICOS_INICIAIS.filter(s => s.categoria.toLowerCase() === categoriaFiltro.toLowerCase());

  return (
    <div className="min-h-screen bg-black text-neutral-100 font-sans selection:bg-[#00ffff] selection:text-black relative">
      
      <a
        href={getLinkWhatsAppDirecto()}
        target="_blank"
        rel="noreferrer"
        className="fixed bottom-6 right-6 z-50 bg-[#00ffff] hover:bg-[#5ffff] text-black p-4 rounded-full shadow-[0_0_25px_rgba(0,255,255,0.6)] hover:shadow-[0_0_35px_rgba(0,255,255,0.9)] transition-all transform hover:scale-110 flex items-center justify-center group"
        title="Falar no WhatsApp"
      >
        <MessageCircle className="w-7 h-7 fill-current stroke-none" />
        <span className="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-300 ease-in-out whitespace-nowrap text-xs font-black uppercase tracking-wider pl-0 group-hover:pl-2">
          Orçamento WhatsApp
        </span>
      </a>

      <header className="sticky top-0 z-40 bg-black/90 backdrop-blur-md border-b border-neutral-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          
          <a href="#" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-neutral-900 border border-[#00ffff]/40 flex items-center justify-center text-[#00ffff] font-black shadow-[0_0_15px_rgba(0,255,255,0.2)] group-hover:bg-[#00ffff] group-hover:text-black transition-all">
              <Car className="w-6 h-6 stroke-[2.5]" />
            </div>
            <div>
              <span className="font-black text-xl tracking-wider text-white block uppercase leading-none">
                Prime <span className="text-[#00ffff]">Auto Estética</span>
              </span>
              <span className="text-[10px] tracking-widest text-neutral-400 uppercase font-semibold block mt-1">
                Detailing & Cuidados
              </span>
            </div>
          </a>

          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-neutral-300">
            <a href="#servicos" className="hover:text-[#00ffff] transition-colors">Serviços</a>
            <a href="#calculadora" className="hover:text-[#00ffff] transition-colors">Calculadora</a>
            <a href="#agendamento" className="hover:text-[#00ffff] transition-colors">Agendar</a>
            <a href="#galeria" className="hover:text-[#00ffff] transition-colors">Antes & Depois</a>
            <a href="#depoimentos" className="hover:text-[#00ffff] transition-colors">Depoimentos</a>
            <a href="#faq" className="hover:text-[#00ffff] transition-colors">Dúvidas</a>
          </nav>

          <div className="hidden md:flex items-center gap-3">
            <a
              href={`https://instagram.com/${instagramUser}`}
              target="_blank"
              rel="noreferrer"
              className="px-3 py-2 bg-neutral-900 border border-neutral-800 hover:border-[#00ffff]/50 text-xs font-bold text-neutral-300 hover:text-[#00ffff] rounded-xl flex items-center gap-2 transition-all"
              title="Siga no Instagram"
            >
              <Instagram className="w-4 h-4 text-[#00ffff]" />
              <span>@{instagramUser}</span>
            </a>

            <button 
              onClick={() => setModalConfigAberto(true)}
              className="p-2.5 text-neutral-400 hover:text-[#00ffff] hover:bg-neutral-900 border border-neutral-800 rounded-xl transition-all"
              title="Configurações da Loja"
            >
              <Settings className="w-5 h-5" />
            </button>
            
            <a
              href={getLinkWhatsAppDirecto()}
              target="_blank"
              rel="noreferrer"
              className="bg-[#00ffff] hover:bg-[#5ffff] text-black px-5 py-2.5 rounded-xl font-black text-sm transition-all flex items-center gap-2 shadow-[0_0_20px_rgba(0,255,255,0.3)] hover:shadow-[0_0_30px_rgba(0,255,255,0.5)] transform hover:-translate-y-0.5"
            >
              <MessageCircle className="w-4 h-4 fill-current" />
              Solicitar Orçamento
            </a>
          </div>

          <button 
            onClick={() => setMenuMobileAberto(!menuMobileAberto)}
            className="md:hidden p-2 text-neutral-300 hover:text-[#00ffff]"
          >
            {menuMobileAberto ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {menuMobileAberto && (
          <div className="md:hidden bg-neutral-950 border-b border-neutral-800 px-4 pt-2 pb-6 flex flex-col gap-3">
            <a href="#servicos" onClick={() => setMenuMobileAberto(false)} className="text-neutral-300 hover:text-[#00ffff] py-2">Serviços</a>
            <a href="#calculadora" onClick={() => setMenuMobileAberto(false)} className="text-neutral-300 hover:text-[#00ffff] py-2">Calculadora</a>
            <a href="#agendamento" onClick={() => setMenuMobileAberto(false)} className="text-neutral-300 hover:text-[#00ffff] py-2">Agendar</a>
            <a href="#galeria" onClick={() => setMenuMobileAberto(false)} className="text-neutral-300 hover:text-[#00ffff] py-2">Antes & Depois</a>
            <a href="#depoimentos" onClick={() => setMenuMobileAberto(false)} className="text-neutral-300 hover:text-[#00ffff] py-2">Depoimentos</a>
            
            <a
              href={`https://instagram.com/${instagramUser}`}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 text-[#00ffff] text-sm py-2 font-bold"
            >
              <Instagram className="w-4 h-4" /> Instagram: @{instagramUser}
            </a>

            <div className="pt-3 flex items-center justify-between border-t border-neutral-800">
              <button
                onClick={() => { setModalConfigAberto(true); setMenuMobileAberto(false); }}
                className="flex items-center gap-2 text-neutral-400 text-sm hover:text-[#00ffff]"
              >
                <Settings className="w-4 h-4 text-[#00ffff]" /> Configurar Loja
              </button>
              <a
                href={getLinkWhatsAppDirecto()}
                target="_blank"
                rel="noreferrer"
                onClick={() => setMenuMobileAberto(false)}
                className="bg-[#00ffff] text-black px-4 py-2 rounded-xl font-bold text-xs flex items-center gap-1.5"
              >
                <MessageCircle className="w-3.5 h-3.5 fill-current" /> WhatsApp Direto
              </a>
            </div>
          </div>
        )}
      </header>

      <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden border-b border-neutral-800 py-20 bg-black">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-[#00ffff]/15 blur-[150px] rounded-full pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-neutral-900 border border-[#00ffff]/40 text-[#00ffff] text-xs font-bold uppercase tracking-widest mb-8 shadow-[0_0_15px_rgba(0,255,255,0.15)]">
            <Sparkles className="w-4 h-4" /> Detalhes Impecáveis • Prime Auto Estética
          </div>
          
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-black text-white tracking-tight leading-[1.08] mb-6">
            Tratamento especial para o seu <br className="hidden sm:inline" />
            <span className="text-[#00ffff] drop-shadow-[0_0_25px_rgba(0,255,255,0.4)]">
              veículo brilhar de novo
            </span>.
          </h1>
          
          <p className="max-w-2xl mx-auto text-base sm:text-xl text-neutral-400 font-normal mb-10 leading-relaxed">
            Monte seu combo de cuidados personalizados para o seu carro, simule os valores e agende pelo WhatsApp em instantes!
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href={getLinkWhatsAppDirecto()}
              target="_blank"
              rel="noreferrer"
              className="w-full sm:w-auto bg-[#00ffff] hover:bg-[#5ffff] text-black px-8 py-4 rounded-xl font-black text-base shadow-[0_0_25px_rgba(0,255,255,0.4)] transition-all flex items-center justify-center gap-3 transform hover:-translate-y-0.5"
            >
              <MessageCircle className="w-5 h-5 fill-current" />
              Solicitar Orçamento no WhatsApp
            </a>
            <a
              href={`https://instagram.com/${instagramUser}`}
              target="_blank"
              rel="noreferrer"
              className="w-full sm:w-auto bg-neutral-900 hover:bg-neutral-800 text-neutral-200 border border-neutral-700 hover:border-[#00ffff]/50 px-8 py-4 rounded-xl font-bold text-base transition-all flex items-center justify-center gap-2"
            >
              <Instagram className="w-5 h-5 text-[#00ffff]" />
              @{instagramUser}
            </a>
          </div>

          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 pt-12 border-t border-neutral-800 text-left">
            <div className="flex items-start gap-3">
              <div className="p-2.5 bg-neutral-900 border border-[#00ffff]/30 rounded-xl text-[#00ffff] shrink-0">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-white font-bold text-sm">Garantia de Qualidade</h3>
                <p className="text-xs text-neutral-400 mt-0.5">Serviço feito com máxima atenção aos detalhes</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="p-2.5 bg-neutral-900 border border-[#00ffff]/30 rounded-xl text-[#00ffff] shrink-0">
                <Award className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-white font-bold text-sm">Produtos Específicos</h3>
                <p className="text-xs text-neutral-400 mt-0.5">Insumos neutros que protegem a lataria</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="p-2.5 bg-neutral-900 border border-[#00ffff]/30 rounded-xl text-[#00ffff] shrink-0">
                <User className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-white font-bold text-sm">Cuidado Profissional</h3>
                <p className="text-xs text-neutral-400 mt-0.5">Atendimento rápido e personalizado</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="p-2.5 bg-neutral-900 border border-[#00ffff]/30 rounded-xl text-[#00ffff] shrink-0">
                <Clock className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-white font-bold text-sm">Agilidade & Pontualidade</h3>
                <p className="text-xs text-neutral-400 mt-0.5">Seu veículo entregue no horário marcado</p>
              </div>
            </div>
          </div>

        </div>
      </section>

      <section id="servicos" className="py-24 bg-black relative border-b border-neutral-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8">
            <div>
              <span className="text-xs font-bold text-[#00ffff] uppercase tracking-widest block mb-2">Cuidados Exclusivos</span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white">Nossos Serviços</h2>
            </div>

            <div className="mt-6 md:mt-0 flex flex-wrap gap-2 bg-neutral-900 p-1.5 rounded-xl border border-neutral-800">
              {['Todas', 'Limpeza', 'Restauração', 'Interior'].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setCategoriaFiltro(cat)}
                  className={`px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all ${
                    categoriaFiltro === cat
                      ? 'bg-[#00ffff] text-black shadow-[0_0_15px_rgba(0,255,255,0.4)]'
                      : 'text-neutral-400 hover:text-white hover:bg-neutral-800'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="mb-10 p-4 rounded-xl bg-neutral-900/80 border border-[#00ffff]/30 flex items-start gap-3 text-neutral-300 text-xs sm:text-sm">
            <Sparkles className="w-5 h-5 text-[#00ffff] shrink-0 mt-0.5" />
            <p>
              Valores de referência sujeitos a alterações conforme o porte do veículo e a complexidade do serviço. Orçamento final mediante avaliação técnica.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {servicosFiltrados.map((servico) => {
              const IconeComp = servico.icone;
              const estaSelecionado = servicosSelecionados.some(s => s.id === servico.id);

              return (
                <div
                  key={servico.id}
                  className={`relative bg-neutral-950 border rounded-2xl p-6 transition-all duration-300 flex flex-col justify-between hover:border-[#00ffff]/60 group ${
                    estaSelecionado ? 'border-[#00ffff] ring-1 ring-[#00ffff] bg-neutral-900 shadow-[0_0_20px_rgba(0,255,255,0.15)]' : 'border-neutral-800'
                  }`}
                >
                  <div>
                    <div className="flex items-start justify-between mb-4">
                      <div className="p-3 bg-neutral-900 border border-neutral-800 rounded-xl text-[#00ffff] group-hover:bg-[#00ffff] group-hover:text-black transition-colors">
                        <IconeComp className="w-6 h-6" />
                      </div>
                      {servico.destaque && (
                        <span className="px-3 py-1 text-[10px] font-black uppercase tracking-wider rounded-md bg-[#00ffff]/10 text-[#00ffff] border border-[#00ffff]/30">
                          {servico.destaque}
                        </span>
                      )}
                    </div>

                    <h3 className="text-xl font-bold text-white mb-2">{servico.nome}</h3>
                    <p className="text-sm text-neutral-400 font-normal leading-relaxed mb-6">
                      {servico.descricao}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-neutral-800 flex items-center justify-between">
                    <div>
                      <div className="flex items-center gap-1.5 text-xs text-neutral-400 mb-1">
                        <Clock className="w-3.5 h-3.5 text-[#00ffff]" /> {servico.tempo}
                      </div>
                      <span className="text-lg font-black text-white">
                        {servico.precoTexto}
                      </span>
                    </div>

                    <button
                      onClick={() => alternarServico(servico)}
                      className={`px-4 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider transition-all flex items-center gap-2 ${
                        estaSelecionado
                          ? 'bg-[#00ffff] text-black shadow-[0_0_15px_rgba(0,255,255,0.4)]'
                          : 'bg-neutral-900 hover:bg-neutral-800 text-white border border-neutral-800 hover:border-[#00ffff]/40'
                      }`}
                    >
                      {estaSelecionado ? (
                        <>
                          <CheckCircle className="w-4 h-4" /> Selecionado
                        </>
                      ) : (
                        'Adicionar'
                      )}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      <section id="calculadora" className="py-24 bg-neutral-950 border-b border-neutral-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-bold text-[#00ffff] uppercase tracking-widest block mb-2">Estimativa & Agendamento</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4">Monte seu Combo e Agende</h2>
            <p className="text-neutral-400 text-sm">
              Selecione os serviços desejados, informe os dados do seu carro e envie o agendamento direto para nosso WhatsApp.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            <div className="lg:col-span-7 bg-black border border-neutral-800 p-6 sm:p-8 rounded-3xl">
              <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                <User className="w-5 h-5 text-[#00ffff]" /> Dados do Veículo e Agendamento
              </h3>

              <form id="agendamento" onSubmit={aoEnviarAgendamento} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-neutral-300 uppercase tracking-wider mb-2">
                      Seu Nome *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Ex: Carlos Silva"
                      value={nomeCliente}
                      onChange={(e) => setNomeCliente(e.target.value)}
                      className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-[#00ffff] transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-neutral-300 uppercase tracking-wider mb-2">
                      Seu WhatsApp *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="(43) 92000-5013"
                      value={telefoneCliente}
                      onChange={(e) => setTelefoneCliente(e.target.value)}
                      className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-[#00ffff] transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-neutral-300 uppercase tracking-wider mb-2">
                      Modelo do Carro *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Ex: Civic 2021"
                      value={modeloVeiculo}
                      onChange={(e) => setModeloVeiculo(e.target.value)}
                      className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-[#00ffff] transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-neutral-300 uppercase tracking-wider mb-2">
                      Porte / Categoria
                    </label>
                    <select
                      value={tipoVeiculo}
                      onChange={(e) => setTipoVeiculo(e.target.value)}
                      className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-[#00ffff] transition-colors"
                    >
                      <option value="Hatch / Compacto">Hatch / Compacto</option>
                      <option value="Sedan / Medium">Sedan / Medium</option>
                      <option value="SUV / Picape">SUV / Picape</option>
                      <option value="Esportivo / Premium">Esportivo / Premium</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-neutral-300 uppercase tracking-wider mb-2">
                      Placa / Cor (Opcional)
                    </label>
                    <input
                      type="text"
                      placeholder="Ex: ABC-1234 (Preto)"
                      value={placaCor}
                      onChange={(e) => setPlacaCor(e.target.value)}
                      className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-[#00ffff] transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-neutral-300 uppercase tracking-wider mb-2">
                      Data do Agendamento *
                    </label>
                    <input
                      type="date"
                      required
                      value={dataAgendamento}
                      onChange={(e) => setDataAgendamento(e.target.value)}
                      className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-[#00ffff] transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-neutral-300 uppercase tracking-wider mb-2">
                      Horário Preferencial *
                    </label>
                    <input
                      type="time"
                      required
                      value={horarioAgendamento}
                      onChange={(e) => setHorarioAgendamento(e.target.value)}
                      className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-[#00ffff] transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-neutral-300 uppercase tracking-wider mb-2">
                    Observações ou Detalhes Especiais
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Alguma mancha específica, ponto de atenção ou preferência de produto?"
                    value={observacoes}
                    onChange={(e) => setObservacoes(e.target.value)}
                    className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-[#00ffff] transition-colors"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#00ffff] hover:bg-[#5ffff] text-black font-black py-4 rounded-xl text-base shadow-[0_0_20px_rgba(0,255,255,0.3)] transition-all flex items-center justify-center gap-2 transform hover:-translate-y-0.5 mt-4"
                >
                  <MessageCircle className="w-5 h-5 fill-current" />
                  Confirmar Agendamento via WhatsApp
                </button>
              </form>
            </div>

            <div className="lg:col-span-5 bg-neutral-950 border border-neutral-800 p-6 sm:p-8 rounded-3xl sticky top-28">
              <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-[#00ffff]" /> Resumo dos Serviços Escolhidos
              </h3>

              {servicosSelecionados.length === 0 ? (
                <div className="text-center py-12 border-2 border-dashed border-neutral-800 rounded-2xl p-6">
                  <Car className="w-12 h-12 text-neutral-700 mx-auto mb-3" />
                  <p className="text-neutral-300 font-bold text-sm">Sua lista está vazia!</p>
                  <p className="text-neutral-500 text-xs mt-1">
                    Clique no botão "Adicionar" dos serviços no catálogo para calcular os valores aqui.
                  </p>
                </div>
              ) : (
                <div className="space-y-3 mb-6 max-h-[300px] overflow-y-auto pr-1">
                  {servicosSelecionados.map((serv) => (
                    <div
                      key={serv.id}
                      className="flex items-center justify-between bg-black p-3.5 rounded-xl border border-neutral-800"
                    >
                      <div>
                        <p className="text-sm font-bold text-white">{serv.nome}</p>
                        <p className="text-xs text-neutral-400 flex items-center gap-1 mt-0.5">
                          <Clock className="w-3 h-3 text-[#00ffff]" /> ~{serv.tempo}
                        </p>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-xs font-bold text-[#00ffff]">{serv.precoTexto}</span>
                        <button
                          onClick={() => alternarServico(serv)}
                          className="p-1 text-neutral-500 hover:text-red-400 rounded transition-colors"
                          title="Remover"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              <div className="pt-6 border-t border-neutral-800 space-y-3">
                <div className="flex items-center justify-between text-sm text-neutral-400">
                  <span>Tempo Estimado Total:</span>
                  <span className="text-white font-bold flex items-center gap-1">
                    <Clock className="w-4 h-4 text-[#00ffff]" /> ~{horasTotais} Horas
                  </span>
                </div>

                <div className="flex items-center justify-between text-base font-bold text-white pt-3 border-t border-neutral-800">
                  <span>Estimativa Total:</span>
                  <span className="text-xl sm:text-2xl font-black text-[#00ffff] drop-shadow-[0_0_15px_rgba(0,255,255,0.4)]">
                    R$ {valorTotalMin.toFixed(2).replace('.', ',')} a R$ {valorTotalMax.toFixed(2).replace('.', ',')}
                  </span>
                </div>

                <a
                  href={`https://instagram.com/${instagramUser}`}
                  target="_blank"
                  rel="noreferrer"
                  className="bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 hover:border-[#00ffff]/40 rounded-xl p-3 text-xs text-neutral-300 flex items-center justify-between transition-all mt-4"
                >
                  <div className="flex items-center gap-2">
                    <Instagram className="w-4 h-4 text-[#00ffff]" />
                    <span>Instagram do Portfólio:</span>
                  </div>
                  <span className="font-bold text-[#00ffff]">@{instagramUser}</span>
                </a>

                <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-3 text-xs text-neutral-300 flex items-start gap-2 mt-2">
                  <CheckCircle2 className="w-4 h-4 text-[#00ffff] shrink-0 mt-0.5" />
                  <span>
                    Pagamento realizado após a conferência e aprovação do serviço final!
                  </span>
                </div>
              </div>

            </div>

          </div>
        </div>
      </section>

      <section id="galeria" className="py-24 bg-black border-b border-neutral-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-bold text-[#00ffff] uppercase tracking-widest block mb-2">Resultados Reais</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4">Galeria Antes & Depois</h2>
            <p className="text-neutral-400 text-sm">
              Confira a transformação dos faróis, estofados e lataria realizados pela Prime Auto Estética.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {GALERIA_ANTES_DEPOIS.map((item) => (
              <div key={item.id} className="bg-neutral-950 border border-neutral-800 rounded-3xl overflow-hidden p-6">
                <h3 className="text-lg font-bold text-white mb-1">{item.titulo}</h3>
                <p className="text-xs text-neutral-400 font-semibold mb-4">{item.modelo} • {item.servico}</p>

                <div className="grid grid-cols-2 gap-3">
                  <div className="relative rounded-2xl overflow-hidden group">
                    <img src={item.antes} alt="Antes" className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500" />
                    <span className="absolute bottom-3 left-3 bg-red-600/90 text-white text-[10px] font-black uppercase px-2.5 py-1 rounded-md">
                      Antes
                    </span>
                  </div>
                  <div className="relative rounded-2xl overflow-hidden group">
                    <img src={item.depois} alt="Depois" className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500" />
                    <span className="absolute bottom-3 left-3 bg-[#00ffff] text-black text-[10px] font-black uppercase px-2.5 py-1 rounded-md shadow-[0_0_10px_rgba(0,255,255,0.5)]">
                      Depois
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      <section id="depoimentos" className="py-24 bg-black border-b border-neutral-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16">
            <div>
              <span className="text-xs font-bold text-[#00ffff] uppercase tracking-widest block mb-2">Satisfação Garantida</span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white">Depoimentos de Clientes</h2>
            </div>

            <div className="mt-6 md:mt-0 flex flex-wrap gap-3">
              <button
                onClick={() => setModalAvaliacaoAberto(true)}
                className="bg-[#00ffff] hover:bg-[#5ffff] text-black px-5 py-3 rounded-xl font-black text-xs uppercase tracking-wider transition-all flex items-center gap-2 shadow-[0_0_15px_rgba(0,255,255,0.3)]"
              >
                <Star className="w-4 h-4 fill-current" /> Deixar Avaliação
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {listaDepoimentos.map((dep) => (
              <div key={dep.id} className="bg-neutral-950 border border-neutral-800 p-6 rounded-2xl flex flex-col justify-between hover:border-[#00ffff]/40 transition-colors">
                <div>
                  <div className="flex items-center gap-1 mb-4 text-[#00ffff]">
                    {[...Array(dep.avaliacao)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                  <p className="text-neutral-300 text-sm italic leading-relaxed mb-6">
                    "{dep.texto}"
                  </p>
                </div>

                <div className="flex items-center gap-3 pt-4 border-t border-neutral-800">
                  <img src={dep.foto} alt={dep.nome} className="w-10 h-10 rounded-full object-cover border border-[#00ffff]/30" />
                  <div>
                    <h4 className="text-white font-bold text-sm">{dep.nome}</h4>
                    <p className="text-xs text-neutral-400 font-medium">{dep.veiculo}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      <section id="faq" className="py-24 bg-black">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center mb-16">
            <span className="text-xs font-bold text-[#00ffff] uppercase tracking-widest block mb-2">Tire Suas Dúvidas</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white">Perguntas Frequentes</h2>
          </div>

          <div className="space-y-4">
            {FAQ_LISTA.map((faq, index) => (
              <div 
                key={index} 
                className="bg-neutral-950 border border-neutral-800 rounded-2xl overflow-hidden transition-all"
              >
                <button
                  onClick={() => setFaqAberto(faqAberto === index ? null : index)}
                  className="w-full text-left p-5 text-white font-bold text-base flex items-center justify-between gap-4 hover:text-[#00ffff] transition-colors"
                >
                  <span>{faq.pergunta}</span>
                  <ChevronDown className={`w-5 h-5 text-[#00ffff] transition-transform ${faqAberto === index ? 'rotate-180' : ''}`} />
                </button>

                {faqAberto === index && (
                  <div className="px-5 pb-5 text-neutral-400 text-sm leading-relaxed border-t border-neutral-800 pt-3">
                    {faq.resposta}
                  </div>
                )}
              </div>
            ))}
          </div>

        </div>
      </section>

      <footer className="bg-neutral-950 border-t border-neutral-800 pt-16 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
            
            <div className="md:col-span-2">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-9 h-9 rounded-xl bg-[#00ffff] text-black flex items-center justify-center font-black shadow-[0_0_10px_rgba(0,255,255,0.4)]">
                  <Car className="w-5 h-5" />
                </div>
                <span className="font-extrabold text-lg text-white uppercase tracking-wider">
                  {nomeLoja}
                </span>
              </div>
              <p className="text-neutral-400 text-sm leading-relaxed mb-6 max-w-md">
                Especialistas em lavagem detalhada, polimento de faróis, higienização interna e tratamento de plástico e couro.
              </p>
              <div className="flex items-center gap-3">
                <a 
                  href={`https://instagram.com/${instagramUser}`}
                  target="_blank"
                  rel="noreferrer"
                  className="px-4 py-2 bg-black hover:text-[#00ffff] border border-neutral-800 hover:border-[#00ffff]/40 rounded-xl transition-all text-neutral-300 text-xs font-bold flex items-center gap-2"
                >
                  <Instagram className="w-4 h-4 text-[#00ffff]" />
                  <span>@{instagramUser}</span>
                </a>
                <a 
                  href={getLinkWhatsAppDirecto()} 
                  target="_blank" 
                  rel="noreferrer" 
                  className="p-2.5 bg-black hover:text-[#00ffff] border border-neutral-800 hover:border-[#00ffff]/40 rounded-xl transition-all text-neutral-400"
                  title="WhatsApp Orçamento Directo"
                >
                  <Phone className="w-5 h-5" />
                </a>
              </div>
            </div>

            <div>
              <h4 className="text-white font-bold text-sm uppercase tracking-wider mb-4">Navegação</h4>
              <ul className="space-y-2.5 text-sm text-neutral-400">
                <li><a href="#servicos" className="hover:text-[#00ffff] transition-colors">Serviços</a></li>
                <li><a href="#calculadora" className="hover:text-[#00ffff] transition-colors">Calculadora</a></li>
                <li><a href="#agendamento" className="hover:text-[#00ffff] transition-colors">Agendamento</a></li>
                <li><a href="#galeria" className="hover:text-[#00ffff] transition-colors">Antes e Depois</a></li>
                <li><a href="#faq" className="hover:text-[#00ffff] transition-colors">Perguntas Frequentes</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-bold text-sm uppercase tracking-wider mb-4">Atendimento</h4>
              <ul className="space-y-3 text-sm text-neutral-400">
                <li className="flex items-start gap-2.5">
                  <MapPin className="w-4 h-4 text-[#00ffff] shrink-0 mt-1" />
                  <span>Atendimento e Agendamentos Online</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Phone className="w-4 h-4 text-[#00ffff] shrink-0" />
                  <a 
                    href={getLinkWhatsAppDirecto()} 
                    target="_blank" 
                    rel="noreferrer"
                    className="hover:text-[#00ffff] transition-colors font-mono font-bold text-white flex items-center gap-2"
                  >
                    <span>(43) 92000-5013</span>
                  </a>
                </li>
                <li className="flex items-center gap-2.5">
                  <Instagram className="w-4 h-4 text-[#00ffff] shrink-0" />
                  <a href={`https://instagram.com/${instagramUser}`} target="_blank" rel="noreferrer" className="hover:text-[#00ffff] transition-colors">
                    @{instagramUser}
                  </a>
                </li>
                <li className="flex items-center gap-2.5">
                  <Clock className="w-4 h-4 text-[#00ffff] shrink-0" />
                  <span>Segunda a Sábado: 08h às 18h</span>
                </li>
              </ul>
            </div>

          </div>

          <div className="pt-8 border-t border-neutral-800 text-center text-xs text-neutral-500">
            <p>© {new Date().getFullYear()} {nomeLoja} (@{instagramUser}). Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>

      {modalConfigAberto && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-neutral-950 border border-neutral-800 rounded-3xl w-full max-w-md p-6 relative shadow-2xl">
            <button
              onClick={() => setModalConfigAberto(false)}
              className="absolute top-5 right-5 p-2 text-neutral-400 hover:text-white rounded-xl bg-neutral-900"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-neutral-900 rounded-xl text-[#00ffff] border border-[#00ffff]/30">
                <Settings className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">Configurações da Loja</h3>
                <p className="text-xs text-neutral-400">Ajuste seu WhatsApp e Instagram</p>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-neutral-300 uppercase tracking-wider mb-2">
                  Nome do Estabelecimento
                </label>
                <input
                  type="text"
                  value={nomeLoja}
                  onChange={(e) => setNomeLoja(e.target.value)}
                  className="w-full bg-black border border-neutral-800 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-[#00ffff]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-neutral-300 uppercase tracking-wider mb-2">
                  Instagram da Loja (Sem @)
                </label>
                <input
                  type="text"
                  value={instagramUser}
                  onChange={(e) => setInstagramUser(e.target.value.replace('@', ''))}
                  placeholder="a_primeestetica"
                  className="w-full bg-black border border-neutral-800 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-[#00ffff] font-mono text-[#00ffff]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-neutral-300 uppercase tracking-wider mb-2">
                  Número do WhatsApp (Com DDD e Cód. 55)
                </label>
                <input
                  type="text"
                  value={numeroWhatsapp}
                  onChange={(e) => setNumeroWhatsapp(e.target.value)}
                  placeholder="5543920005013"
                  className="w-full bg-black border border-neutral-800 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-[#00ffff] font-mono text-[#00ffff]"
                />
              </div>

              <div className="pt-4 border-t border-neutral-800 flex justify-end">
                <button
                  onClick={() => setModalConfigAberto(false)}
                  className="bg-[#00ffff] hover:bg-[#5ffff] text-black font-bold px-6 py-3 rounded-xl text-sm transition-colors shadow-[0_0_15px_rgba(0,255,255,0.4)]"
                >
                  Salvar Alterações
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {modalAvaliacaoAberto && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-neutral-950 border border-[#00ffff]/40 rounded-3xl w-full max-w-lg p-6 relative shadow-[0_0_30px_rgba(0,255,255,0.2)]">
            <button
              onClick={() => setModalAvaliacaoAberto(false)}
              className="absolute top-5 right-5 p-2 text-neutral-400 hover:text-white rounded-xl bg-neutral-900"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-neutral-900 rounded-xl text-[#00ffff] border border-[#00ffff]/30">
                <Star className="w-6 h-6 fill-current" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">Deixe sua Avaliação</h3>
                <p className="text-xs text-neutral-400">Conte como foi sua experiência na {nomeLoja}</p>
              </div>
            </div>

            {sucessoAvaliacao ? (
              <div className="text-center py-10">
                <div className="w-16 h-16 bg-[#00ffff]/10 text-[#00ffff] border border-[#00ffff]/30 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="w-8 h-8" />
                </div>
                <h4 className="text-lg font-bold text-white mb-2">Muito Obrigado!</h4>
                <p className="text-neutral-400 text-sm">Seu depoimento foi publicado com sucesso no site.</p>
              </div>
            ) : (
              <form onSubmit={aoEnviarAvaliacao} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-neutral-300 uppercase tracking-wider mb-2">Seu Nome *</label>
                    <input
                      type="text"
                      required
                      placeholder="Ex: Mariana Souza"
                      value={novoNomeDep}
                      onChange={(e) => setNovoNomeDep(e.target.value)}
                      className="w-full bg-black border border-neutral-800 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-[#00ffff]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-neutral-300 uppercase tracking-wider mb-2">Seu Veículo</label>
                    <input
                      type="text"
                      placeholder="Ex: Jeep Compass"
                      value={novoVeiculoDep}
                      onChange={(e) => setNovoVeiculoDep(e.target.value)}
                      className="w-full bg-black border border-neutral-800 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-[#00ffff]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-neutral-300 uppercase tracking-wider mb-2">Sua Nota (1 a 5 Estrelas) *</label>
                  <select
                    value={novaNotaDep}
                    onChange={(e) => setNovaNotaDep(e.target.value)}
                    className="w-full bg-black border border-neutral-800 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-[#00ffff]"
                  >
                    <option value="5">⭐⭐⭐⭐⭐ (5/5 - Excelente!)</option>
                    <option value="4">⭐⭐⭐⭐ (4/5 - Muito Bom)</option>
                    <option value="3">⭐⭐⭐ (3/5 - Bom)</option>
                    <option value="2">⭐⭐ (2/5 - Regular)</option>
                    <option value="1">⭐ (1/5 - Ruim)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-neutral-300 uppercase tracking-wider mb-2">Seu Depoimento *</label>
                  <textarea
                    required
                    rows={3}
                    placeholder="O que achou do atendimento, limpeza e resultado do carro?"
                    value={novoTextoDep}
                    onChange={(e) => setNovoTextoDep(e.target.value)}
                    className="w-full bg-black border border-neutral-800 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-[#00ffff]"
                  />
                </div>

                <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
                  <button
                    type="submit"
                    className="w-full bg-[#00ffff] hover:bg-[#5ffff] text-black font-bold py-3.5 rounded-xl text-sm transition-colors shadow-[0_0_15px_rgba(0,255,255,0.4)] flex items-center justify-center gap-2"
                  >
                    <Send className="w-4 h-4" /> Publicar no Site
                  </button>
                  <button
                    type="button"
                    onClick={enviarAvaliacaoWhatsapp}
                    className="w-full bg-neutral-900 hover:bg-neutral-800 text-neutral-200 border border-neutral-700 font-bold py-3.5 rounded-xl text-sm transition-colors flex items-center justify-center gap-2"
                  >
                    <MessageCircle className="w-4 h-4 text-[#00ffff]" /> Enviar via WhatsApp
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

      {mensagemSucesso && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-neutral-950 border border-[#00ffff]/40 rounded-3xl w-full max-w-sm p-6 text-center shadow-[0_0_30px_rgba(0,255,255,0.2)]">
            <div className="w-16 h-16 bg-[#00ffff]/10 text-[#00ffff] border border-[#00ffff]/30 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Agendamento Enviado!</h3>
            <p className="text-neutral-400 text-sm mb-6">
              O WhatsApp foi aberto com a lista dos serviços escolhidos e seus dados prontos para envio.
            </p>
            <button
              onClick={() => setMensagemSucesso(false)}
              className="w-full bg-neutral-900 hover:bg-neutral-800 text-white font-bold py-3 rounded-xl text-sm transition-colors border border-neutral-800"
            >
              Concluir
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
