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
    descricao: 'Limpeza minuciosa com produtos específicos e técnicas que não danificam a lataria.',
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
    descricao: 'Recuperação de faróis amarelados e opacos, devolvendo a transparência.',
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
    descricao: 'Limpeza profunda de carpetes, teto, painéis e bancos.',
    icone: ShieldCheck
  }
];

const GALERIA_ANTES_DEPOIS = [
  {
    id: 1,
    titulo: 'Polimento e Restauração de Faróis',
    modelo: 'Honda Civic',
    antes: 'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&w=600&q=80',
    depois: 'https://images.unsplash.com/photo-1555215695-3004980adade?auto=format&fit=crop&w=600&q=80'
  }
];

const DEPOIMENTOS_INICIAIS = [
  {
    id: 1,
    nome: 'Carlos Eduardo',
    veiculo: 'Honda Civic',
    foto: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80',
    texto: 'Fiz o polimento dos faróis e a lavagem detalhada. O carro renovou completamente!',
    avaliacao: 5
  }
];

const FAQ_LISTA = [
  {
    pergunta: 'Com que frequência devo fazer a Hidratação de Bancos de Couro?',
    resposta: 'Recomendamos a cada 3 a 6 meses para evitar rachaduras e ressecamento.'
  }
];

export default function App() {
  const [numeroWhatsapp] = useState('5543920005013');
  const [nomeLoja] = useState('Prime Auto Estética');
  const [instagramUser] = useState('a_primeestetica');

  const getLinkWhatsAppDirecto = () => {
    const numeroLimpo = numeroWhatsapp.replace(/\D/g, '');
    return `https://wa.me/${numeroLimpo}?text=` + encodeURIComponent("Olá! Gostaria de um orçamento.");
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
      alert('Selecione pelo menos um serviço!');
      return;
    }

    const listaServicosTexto = servicosSelecionados.map(s => `• *${s.nome}* — ${s.precoTexto}`).join('\n');
    const mensagem = `🚗 *NOVO AGENDAMENTO - ${nomeLoja}* 🚗\n\nNome: ${nomeCliente}\nWhatsApp: ${telefoneCliente}\nVeículo: ${modeloVeiculo} (${tipoVeiculo})\nData: ${dataAgendamento} às ${horarioAgendamento}\n\nServiços:\n${listaServicosTexto}\n\nTotal estimado: R$ ${valorTotalMin} a R$ ${valorTotalMax}`;
    
    window.open(`https://wa.me/${numeroWhatsapp}?text=` + encodeURIComponent(mensagem), '_blank');
  };

  const servicosFiltrados = categoriaFiltro === 'Todas' 
    ? SERVICOS_INICIAIS 
    : SERVICOS_INICIAIS.filter(s => s.categoria.toLowerCase() === categoriaFiltro.toLowerCase());

  return (
    <div className="min-h-screen bg-black text-neutral-100 font-sans selection:bg-[#00ffff] selection:text-black relative">
      <header className="sticky top-0 z-40 bg-black/90 backdrop-blur-md border-b border-neutral-800">
        <div className="max-w-7xl mx-auto px-4 h-20 flex items-center justify-between">
          <a href="#" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-neutral-900 border border-[#00ffff]/40 flex items-center justify-center text-[#00ffff]">
              <Car className="w-6 h-6" />
            </div>
            <span className="font-black text-xl text-white uppercase">Prime <span className="text-[#00ffff]">Auto Estética</span></span>
          </a>
          <button onClick={() => setMenuMobileAberto(!menuMobileAberto)} className="md:hidden text-white">
            {menuMobileAberto ? <X /> : <Menu />}
          </button>
        </div>
      </header>

      <section className="py-20 text-center px-4">
        <h1 className="text-4xl sm:text-6xl font-black text-white mb-6">
          Tratamento especial para o seu <span className="text-[#00ffff]">veículo</span>
        </h1>
        <p className="text-neutral-400 mb-8 max-w-xl mx-auto">Monte seu combo de cuidados e agende direto pelo WhatsApp.</p>
        <a href={getLinkWhatsAppDirecto()} target="_blank" rel="noreferrer" className="bg-[#00ffff] text-black px-6 py-3 rounded-xl font-black inline-block shadow-[0_0_20px_rgba(0,255,255,0.4)]">
          Falar no WhatsApp
        </a>
      </section>

      <section id="servicos" className="py-16 px-4 max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-white mb-8">Nossos Serviços</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {servicosFiltrados.map((servico) => {
            const estaSelecionado = servicosSelecionados.some(s => s.id === servico.id);
            return (
              <div key={servico.id} className={`p-6 rounded-2xl border ${estaSelecionado ? 'border-[#00ffff] bg-neutral-900' : 'border-neutral-800 bg-neutral-950'}`}>
                <h3 className="text-xl font-bold text-white mb-2">{servico.nome}</h3>
                <p className="text-sm text-neutral-400 mb-4">{servico.descricao}</p>
                <div className="flex justify-between items-center">
                  <span className="text-white font-black">{servico.precoTexto}</span>
                  <button onClick={() => alternarServico(servico)} className={`px-4 py-2 rounded-xl text-xs font-bold ${estaSelecionado ? 'bg-[#00ffff] text-black' : 'bg-neutral-800 text-white'}`}>
                    {estaSelecionado ? 'Selecionado' : 'Adicionar'}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <section id="calculadora" className="py-16 px-4 max-w-7xl mx-auto border-t border-neutral-800">
        <h2 className="text-3xl font-bold text-white mb-8">Agendamento</h2>
        <form onSubmit={aoEnviarAgendamento} className="space-y-4 max-w-2xl bg-neutral-950 p-6 rounded-2xl border border-neutral-800">
          <div>
            <label className="block text-xs font-bold text-neutral-300 mb-1">Seu Nome</label>
            <input type="text" required value={nomeCliente} onChange={e => setNomeCliente(e.target.value)} className="w-full bg-neutral-900 border border-neutral-800 p-3 rounded-xl text-white" />
          </div>
          <div>
            <label className="block text-xs font-bold text-neutral-300 mb-1">WhatsApp</label>
            <input type="tel" required value={telefoneCliente} onChange={e => setTelefoneCliente(e.target.value)} className="w-full bg-neutral-900 border border-neutral-800 p-3 rounded-xl text-white" />
          </div>
          <div>
            <label className="block text-xs font-bold text-neutral-300 mb-1">Modelo do Carro</label>
            <input type="text" required value={modeloVeiculo} onChange={e => setModeloVeiculo(e.target.value)} className="w-full bg-neutral-900 border border-neutral-800 p-3 rounded-xl text-white" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <input type="date" required value={dataAgendamento} onChange={e => setDataAgendamento(e.target.value)} className="bg-neutral-900 border border-neutral-800 p-3 rounded-xl text-white" />
            <select value={horarioAgendamento} onChange={e => setHorarioAgendamento(e.target.value)} required className="bg-neutral-900 border border-neutral-800 p-3 rounded-xl text-white">
              <option value="">Horário</option>
              <option value="08:00">08:00</option>
              <option value="14:00">14:00</option>
            </select>
          </div>
          <button type="submit" className="w-full bg-[#00ffff] text-black font-black p-4 rounded-xl">Enviar Agendamento</button>
        </form>
      </section>

      <footer className="py-8 text-center text-xs text-neutral-500 border-t border-neutral-800">
        <p>© Prime Auto Estética</p>
      </footer>
    </div>
  );
}
