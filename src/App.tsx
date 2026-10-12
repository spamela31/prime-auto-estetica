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
  X
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
        </div>
      </section>

      {/* Secção de Serviços */}
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
                      {estaSelecionado ? 'Selecionado' : 'Adicionar'}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Secção Calculadora e Agendamento */}
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

              <form onSubmit={aoEnviarAgendamento} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-neutral-300 uppercase tracking-wider mb-2">Seu Nome *</label>
                    <input
                      type="text"
                      required
                      placeholder="Ex: Carlos Silva"
                      value={nomeCliente}
                      onChange={(e) => setNomeCliente(e.target.value)}
                      className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-[#00ffff]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-neutral-300 uppercase tracking-wider mb-2">Seu WhatsApp *</label>
                    <input
                      type="tel"
                      required
                      placeholder="(43) 92000-5013"
                      value={telefoneCliente}
                      onChange={(e) => setTelefoneCliente(e.target.value)}
                      className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-[#00ffff]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-neutral-300 uppercase tracking-wider mb-2">Modelo do Carro *</label>
                    <input
                      type="text"
                      required
                      placeholder="Ex: Civic 2021"
                      value={modeloVeiculo}
                      onChange={(e) => setModeloVeiculo(e.target.value)}
                      className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-[#00ffff]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-neutral-300 uppercase tracking-wider mb-2">Porte / Categoria</label>
                    <select
                      value={tipoVeiculo}
                      onChange={(e) => setTipoVeiculo(e.target.value)}
                      className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-[#00ffff]"
                    >
                      <option value="Hatch / Compacto">Hatch / Compacto</option>
                      <option value="Sedan / Medium">Sedan / Medium</option>
                      <option value="SUV / Picape">SUV / Picape</option>
                      <option value="Esportivo / Premium">Esportivo / Premium</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-neutral-300 uppercase tracking-wider mb-2">Placa / Cor</label>
                    <input
                      type="text"
                      placeholder="Ex: ABC-1234 (Preto)"
                      value={placaCor}
                      onChange={(e) => setPlacaCor(e.target.value)}
                      className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-[#00ffff]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-neutral-300 uppercase tracking-wider mb-2">Data Desejada *</label>
                    <input
                      type="date"
                      required
                      value={dataAgendamento}
                      onChange={(e) => setDataAgendamento(e.target.value)}
                      className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-[#00ffff]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-neutral-300 uppercase tracking-wider mb-2">Horário Desejado *</label>
                    <select
                      value={horarioAgendamento}
                      onChange={(e) => setHorarioAgendamento(e.target.value)}
                      required
                      className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-[#00ffff]"
                    >
                      <option value="">Selecione o horário</option>
                      <option value="08:00">08:00</option>
                      <option value="10:00">10:00</option>
                      <option value="13:30">13:30</option>
                      <option value="15:30">15:30</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-neutral-300 uppercase tracking-wider mb-2">Observações (Opcional)</label>
                  <textarea
                    rows={3}
                    placeholder="Algum detalhe específico sobre o veículo..."
                    value={observacoes}
                    onChange={(e) => setObservacoes(e.target.value)}
                    className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-[#00ffff]"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#00ffff] hover:bg-[#5ffff] text-black font-black py-4 rounded-xl text-sm uppercase tracking-wider transition-all shadow-[0_0_20px_rgba(0,255,255,0.3)] flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4 fill-current" /> Enviar Agendamento via WhatsApp
                </button>
              </form>
            </div>

            <div className="lg:col-span-5 bg-black border border-neutral-800 p-6 sm:p-8 rounded-3xl sticky top-28">
              <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-[#00ffff]" /> Resumo do Combo
              </h3>

              {servicosSelecionados.length === 0 ? (
                <div className="text-center py-12 border border-dashed border-neutral-800 rounded-2xl p-6">
                  <p className="text-neutral-400 text-sm">Nenhum serviço selecionado ainda.</p>
                  <span className="text-xs text-neutral-500 mt-1 block">Escolha os serviços na lista acima para calcular o valor e tempo.</span>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="space-y-2 max-h-60 overflow-y-auto pr-2">
                    {servicosSelecionados.map((s) => (
                      <div key={s.id} className="flex items-center justify-between p-3 bg-neutral-900 rounded-xl border border-neutral-800 text-xs">
                        <div>
                          <span className="font-bold text-white block">{s.nome}</span>
                          <span className="text-neutral-400">{s.tempo}</span>
                        </div>
                        <span className="font-black text-[#00ffff]">{s.precoTexto}</span>
                      </div>
                    ))}
                  </div>

                  <div className="pt-4 border-t border-neutral-800 space-y-2">
                    <div className="flex justify-between text-sm text-neutral-400">
                      <span>Tempo Estimado:</span>
                      <span className="text-white font-bold">~{horasTotais} horas</span>
                    </div>
                    <div className="flex justify-between text-base font-black text-white">
                      <span>Valor Estimado:</span>
                      <span className="text-[#00ffff]">R$ {valorTotalMin.toFixed(2).replace('.', ',')} a R$ {valorTotalMax.toFixed(2).replace('.', ',')}</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Rodapé */}
      <footer className="bg-neutral-950 border-t border-neutral-800 py-12 text-center text-xs text-neutral-500">
        <p>© {new Date().getFullYear()} Prime Auto Estética. Todos os direitos reservados.</p>
      </footer>
    </div>
  );
}
