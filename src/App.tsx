import React, { useState } from 'react';
import { 
  Car, 
  Sparkles, 
  ShieldCheck, 
  Clock, 
  User, 
  Instagram, 
  MessageCircle,
  Menu,
  Award,
  Wrench,
  Sun,
  Send,
  X,
  Star,
  ChevronDown,
  CheckCircle
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
    texto: 'Fiz o polimento dos faróis e a lavagem detalhada na Prime Auto Estética. O carro renovou completamente!',
    avaliacao: 5
  },
  {
    id: 2,
    nome: 'Fernanda Lima',
    veiculo: 'Jeep Compass',
    foto: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80',
    texto: 'A higienização interna completa e o tratamento de couro deixaram a cabine cheirosa e super limpa!',
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
  const [numeroWhatsapp] = useState('5543920005013');
  const [nomeLoja] = useState('Prime Auto Estética');
  const [instagramUser] = useState('a_primeestetica');

  const mensagemDirectaWhatsApp = encodeURIComponent(
    "Olá! Gostaria de solicitar um orçamento para o meu carro."
  );

  const getLinkWhatsAppDirecto = () => {
    const numeroLimpo = numeroWhatsapp.replace(/\D/g, '');
    return `https://wa.me/${numeroLimpo}?text=${mensagemDirectaWhatsApp}`;
  };

  const [menuMobileAberto, setMenuMobileAberto] = useState(false);
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
  const [, setMensagemSucesso] = useState(false);

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
- *Nome:* ${nomeCliente}
- *WhatsApp:* ${telefoneCliente}

🚘 *DADOS DO VEÍCULO:*
- *Modelo/Ano:* ${modeloVeiculo}
- *Categoria:* ${tipoVeiculo}
${placaCor ? `• *Placa / Cor:* ${placaCor.toUpperCase()}\n` : ''}
📅 *DATA E HORÁRIO DESEJADOS:*
- *Data:* ${dataFormatada}
- *Horário:* ${horarioAgendamento}

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

  const servicosFiltrados = categoriaFiltro === 'Todas' 
    ? SERVICOS_INICIAIS 
    : SERVICOS_INICIAIS.filter(s => s.categoria.toLowerCase() === categoriaFiltro.toLowerCase());

  return (
    <div className="min-h-screen bg-black text-neutral-100 font-sans selection:bg-[#00ffff] selection:text-black relative">
      
      {/* Botão Flutuante WhatsApp */}
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

      {/* Cabeçalho */}
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
            <a href="#calculadora" className="hover:text-[#00ffff] transition-colors">Calculadora & Agendar</a>
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
            >
              <Instagram className="w-4 h-4 text-[#00ffff]" />
              <span>@{instagramUser}</span>
            </a>
            
            <a
              href={getLinkWhatsAppDirecto()}
              target="_blank"
              rel="noreferrer"
              className="bg-[#00ffff] hover:bg-[#5ffff] text-black px-5 py-2.5 rounded-xl font-black text-sm transition-all flex items-center gap-2 shadow-[0_0_20px_rgba(0,255,255,0.3)]"
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
            <a href="#calculadora" onClick={() => setMenuMobileAberto(false)} className="text-neutral-300 hover:text-[#00ffff] py-2">Calculadora & Agendar</a>
            <a href="#galeria" onClick={() => setMenuMobileAberto(false)} className="text-neutral-300 hover:text-[#00ffff] py-2">Antes & Depois</a>
            <a href="#depoimentos" onClick={() => setMenuMobileAberto(false)} className="text-neutral-300 hover:text-[#00ffff] py-2">Depoimentos</a>
            <a href="#faq" onClick={() => setMenuMobileAberto(false)} className="text-neutral-300 hover:text-[#00ffff] py-2">Dúvidas</a>
            <a
              href={`https://instagram.com/${instagramUser}`}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 text-[#00ffff] text-sm py-2 font-bold"
            >
              <Instagram className="w-4 h-4" /> Instagram: @{instagramUser}
            </a>
          </div>
        )}
      </header>

      {/* Secção Hero */}
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
                <p className="text-xs text-neutral-400 mt-0.5">Serviço feito com máxima atenção</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="p-2.5 bg-neutral-900 border border-[#00ffff]/30 rounded-xl text-[#00ffff] shrink-0">
                <Award className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-white font-bold text-sm">Produtos Específicos</h3>
                <p className="text-xs text-
