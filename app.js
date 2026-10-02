const STORAGE_KEY = 'noria_questionario_clinica_nubia_v2_reduzido';
const SPECIAL = ['Ainda não definido','Não se aplica','Encaminhar para a equipe'];

const q = (id, text, type='textarea', extra={}) => ({id,text,type,...extra});
const yesNo = (id,text,extra={}) => q(id,text,'radio',{options:['Sim','Não',...SPECIAL],...extra});
const choice = (id,text,options,extra={}) => q(id,text,'radio',{options:[...options,...SPECIAL],...extra});

const sections = [
  {title:'1. Apresentação e funcionamento', subsections:[
    {title:'1.1 Identidade e linguagem', questions:[
      choice('1.1.1','Qual nome comercial deve ser utilizado?',['Clínica da Núbia','NB Bronze','Outro'],{other:true}),
      q('1.1.2','Como a atendente deve se apresentar?'),
      q('1.1.3','Qual deve ser a mensagem inicial?'),
      choice('1.1.4','Quando a cliente começar com uma pergunta específica, como a IA deve agir?',['Responder diretamente','Enviar a apresentação primeiro','Responder e se apresentar na mesma mensagem','Outro'],{other:true}),
      choice('1.1.5','Qual tom de conversa você deseja?',['Direto','Acolhedor','Descontraído','Profissional','Outro'],{multi:true,other:true}),
      q('1.1.6','Quais palavras, apelidos ou formas de tratamento devem ser evitados?'),
      q('1.1.7','Em quais situações a IA pode usar emojis?'),
      q('1.1.8','Qual deve ser a resposta quando perguntarem se estão falando com uma IA?')
    ]},
    {title:'1.2 Local e horários', questions:[
      yesNo('1.2.1','Confirma que o atendimento é somente em Angra dos Reis?'),
      q('1.2.2','Qual endereço completo deve ser informado?','text'),
      q('1.2.3','Qual ponto de referência ou link de localização deve ser enviado?','text'),
      q('1.2.4','Qual é o horário de funcionamento de segunda a sexta? Indique os dias com horários diferentes.'),
      q('1.2.5','Qual é o horário de funcionamento no sábado e no domingo?'),
      q('1.2.6','Como funciona o atendimento em feriados?'),
      q('1.2.7','Qual é o horário de resposta da equipe humana pelo WhatsApp?'),
      q('1.2.8','Quais informações sobre acesso ou estrutura do local são importantes para a cliente?')
    ]}
  ]},
  {title:'2. Catálogo oficial', subsections:[
    {title:'2.1 Serviços disponíveis', questions:[
      q('2.1.1','Quais serviços estão disponíveis atualmente?'),
      q('2.1.2','Quais serviços antigos ou suspensos não devem mais ser oferecidos?'),
      q('2.1.3','Quais serviços só podem ser agendados pela equipe humana?')
    ]},
    {title:'2.2 Ficha de cada serviço', repeater:'services', description:'Preencha uma ficha para cada serviço ou versão com preço diferente. As perguntas da seção 3 servem apenas para resolver divergências já identificadas; não é necessário repetir respostas.'}
  ]},
  {title:'3. Informações que precisam de confirmação', subsections:[
    {title:'3.1 Bronzes em máquina', questions:[
      choice('3.1.1','Confirma os preços: Clássico R$99,99, Premium R$149,99 e Comfort R$179,99?',['Sim, confirmo todos','Não, há correções'],{followupOn:'Não, há correções',followupId:'3.1.1a',followupText:'Informe os preços corretos.'}),
      q('3.1.2','Quais são as diferenças essenciais entre Clássico, Premium e Comfort?'),
      choice('3.1.3','A agenda do Clássico deve permitir quantas clientes por horário?',['4 clientes','6 clientes','Outro'],{other:true}),
      choice('3.1.4','Os três bronzes devem continuar ocupando blocos de 90 minutos na agenda?',['Sim, os três','Não'],{followupOn:'Não',followupId:'3.1.4a',followupText:'Informe o bloco correto de cada modalidade.'})
    ]},
    {title:'3.2 Solar e Jato', questions:[
      q('3.2.1','Quando o clima impedir o Bronze Solar, qual deve ser a solução oferecida?'),
      choice('3.2.2','Qual é o preço correto do Bronze a Jato?',['R$ 150,00','R$ 149,99','Outro'],{other:true}),
      yesNo('3.2.3','A limpeza corporal está incluída no preço do Jato?'),
      choice('3.2.4','Onde o Jato é realizado?',['Na clínica','A domicílio','Nos dois locais']),
      choice('3.2.5','Qual duração do resultado deve ser divulgada?',['Até 15 dias','De 5 a 14 dias','Outra'],{other:true}),
      choice('3.2.6','Quanto tempo a cliente deve ficar sem molhar a pele após o Jato?',['8 horas','De 8 a 12 horas','Outro'],{other:true}),
      choice('3.2.7','Existe Jato no Bojo por R$49,99?',['Sim','Não','Existe, mas o preço é outro'],{followupOn:'Existe, mas o preço é outro',followupId:'3.2.7a',followupText:'Qual é o preço correto?'}),
      q('3.2.8','Quais regiões são atendidas a domicílio?','textarea',{condition:{id:'3.2.4',in:['A domicílio','Nos dois locais']}}),
      q('3.2.9','Qual é a regra de cobrança do deslocamento?','textarea',{condition:{id:'3.2.4',in:['A domicílio','Nos dois locais']}})
    ]},
    {title:'3.3 Banho de Lua, Detox e combinações', questions:[
      choice('3.3.1','Como funciona atualmente o Banho de Lua?',['Serviço único de R$ 60,00','Três versões','Outra configuração'],{other:true}),
      choice('3.3.2','Se houver três versões, confirma estes preços?',['Sim: Clássico R$19,99, Premium R$34,99 e Comfort R$69,99','Não, há correções'],{condition:{id:'3.3.1',equals:'Três versões'},followupOn:'Não, há correções',followupId:'3.3.2a',followupText:'Informe os preços corretos.'}),
      choice('3.3.3','Detox Corporal e Mousse Clareador são o mesmo serviço de R$49,99?',['Sim','Não','São o mesmo serviço, mas o preço é outro'],{followupOn:'Não',followupId:'3.3.3a',followupText:'Explique a diferença entre eles.',followupOn2:'São o mesmo serviço, mas o preço é outro',followupId2:'3.3.3b',followupText2:'Qual é o preço correto?'}),
      yesNo('3.3.4','Potência Bronze e Bronze Duplo são o mesmo produto?',{followupOn:'Não',followupId:'3.3.4a',followupText:'Qual é a diferença entre eles?'}),
      choice('3.3.5','Qual regra vale para combinar bronze com Jato?',['Tabela fixa: R$179,99 / R$229,99 / R$259,99','Preço do bronze escolhido + R$99,99','Outra regra'],{other:true}),
      q('3.3.6','Existem pacotes, promoções ou adicionais? Informe apenas os que estão ativos, com preço e condição principal.')
    ]}
  ]},
  {title:'4. Agendamento', subsections:[
    {title:'4.1 Horários e disponibilidade', questions:[
      q('4.1.1','Quais horários de início devem estar disponíveis em cada dia da semana?'),
      yesNo('4.1.2','Existe alguma opção de atendimento após as 18h?',{followupOn:'Sim',followupId:'4.1.2a',followupText:'Quais horários e em quais condições?'}),
      q('4.1.3','Com quanta antecedência mínima e máxima a cliente pode reservar?'),
      choice('4.1.4','São permitidos encaixes ou reservas para o mesmo dia?',['Sim, ambos','Somente encaixes','Somente reservas no mesmo dia','Não']),
      choice('4.1.5','Quando não houver vaga, como a IA deve agir?',['Oferecer outros horários/datas','Encaminhar para a equipe','Oferecer alternativas e, se não resolver, encaminhar','Outro'],{other:true}),
      yesNo('4.1.6','Existe lista de espera?',{followupOn:'Sim',followupId:'4.1.6a',followupText:'Como a lista de espera deve funcionar?'}),
      yesNo('4.1.7','A cliente pode escolher a profissional?',{followupOn:'Sim',followupId:'4.1.7a',followupText:'Essa escolha altera preço ou disponibilidade?'}),
      q('4.1.8','Quem atualiza os bloqueios e exceções da agenda?')
    ]},
    {title:'4.2 Dados e reserva', questions:[
      q('4.2.1','Quais dados são obrigatórios para registrar um agendamento?'),
      yesNo('4.2.2','A cliente precisa aprovar um resumo antes de a reserva ser registrada?'),
      q('4.2.3','Qual mensagem deve ser enviada após o pré-agendamento?'),
      q('4.2.4','O pré-agendamento segura a vaga por quanto tempo antes do pagamento?'),
      q('4.2.5','O que deve acontecer quando o prazo de pagamento vencer?'),
      yesNo('4.2.6','A cliente pode reservar para outra pessoa?',{followupOn:'Sim',followupId:'4.2.6a',followupText:'Quais dados da outra pessoa devem ser solicitados?'}),
      q('4.2.7','Como deve funcionar uma reserva para duas ou mais pessoas?'),
      yesNo('4.2.8','Uma cliente pode manter mais de uma reserva futura?')
    ]}
  ]},
  {title:'5. Pagamento', subsections:[
    {title:'5.1 Dados e condições', questions:[
      q('5.1.1','Qual é a chave Pix correta?','text'),
      choice('5.1.2','Quem é o favorecido correto?',['Silvana Marques','Yhago Gonçalves','Outro'],{other:true}),
      q('5.1.3','Qual é a instituição financeira do Pix?','text'),
      yesNo('5.1.4','O sinal é sempre de 50%?',{followupOn:'Não',followupId:'5.1.4a',followupText:'Quais são as exceções?'}),
      q('5.1.5','Quais formas de pagamento são aceitas para o sinal?'),
      q('5.1.6','Quais formas de pagamento são aceitas para o restante?'),
      q('5.1.7','Quando o restante deve ser pago?'),
      q('5.1.8','Quais condições de cartão ou parcelamento podem ser divulgadas?'),
      q('5.1.9','Quais descontos a IA está autorizada a oferecer?')
    ]},
    {title:'5.2 Adicionais e conferência', questions:[
      choice('5.2.1','Confirma adicional de R$10 após as 17h, aos domingos e feriados?',['Sim','Não, a regra é diferente'],{followupOn:'Não, a regra é diferente',followupId:'5.2.1a',followupText:'Informe a regra correta.'}),
      choice('5.2.2','Quando mais de uma dessas condições ocorrer, como cobrar?',['Um único adicional','Acumular os adicionais','Outra regra'],{other:true}),
      yesNo('5.2.3','Os adicionais entram no cálculo do sinal?'),
      choice('5.2.4','O que deve iniciar a conferência do pagamento?',['Somente a mensagem “SINAL PAGO”','Qualquer aviso de pagamento','Envio do comprovante','Qualquer aviso ou comprovante','Outro'],{other:true}),
      q('5.2.5','Qual mensagem exata deve ser enviada enquanto a equipe confere o sinal?'),
      q('5.2.6','Quem confirma o pagamento?','text'),
      q('5.2.7','Qual mensagem deve ser enviada após a confirmação?'),
      q('5.2.8','Qual deve ser a conduta quando houver divergência no valor ou no comprovante?')
    ]}
  ]},
  {title:'6. Cancelamento, remarcação e atraso', subsections:[
    {title:'6.1 Regras da cliente', questions:[
      q('6.1.1','Qual é a regra de devolução ou perda do sinal em caso de cancelamento?'),
      q('6.1.2','Qual é a antecedência mínima para remarcar?'),
      q('6.1.3','Em quais casos vale a exceção de remarcação com oito horas de antecedência?'),
      q('6.1.4','Existe limite de remarcações para o mesmo sinal?'),
      q('6.1.5','Qual é a regra para trocar de serviço depois de reservar?'),
      yesNo('6.1.6','A tolerância de atraso continua sendo de cinco minutos?',{followupOn:'Não',followupId:'6.1.6a',followupText:'Qual é a tolerância correta?'}),
      q('6.1.7','O que acontece quando a cliente ultrapassa a tolerância ou não comparece?'),
      choice('6.1.8','A IA pode resolver cancelamentos, remarcações e atrasos sozinha?',['Sim, todos','Somente alguns casos','Não, todos devem ir para a equipe'],{followupOn:'Somente alguns casos',followupId:'6.1.8a',followupText:'Quais casos a IA pode resolver sozinha?'})
    ]},
    {title:'6.2 Imprevistos da clínica', questions:[
      q('6.2.1','Qual solução deve ser oferecida quando a clínica precisar cancelar?'),
      q('6.2.2','Qual mensagem deve ser enviada quando houver atraso ou indisponibilidade do equipamento?'),
      q('6.2.3','Quem pode autorizar exceções às regras acima?')
    ]}
  ]},
  {title:'7. Preparo e segurança', subsections:[
    {title:'7.1 Regras gerais', questions:[
      yesNo('7.1.1','A chegada com 15 minutos de antecedência vale para todos os serviços?',{followupOn:'Não',followupId:'7.1.1a',followupText:'Quais serviços têm outra antecedência?'}),
      q('7.1.2','Quais restrições existem para crianças, acompanhantes ou bicicletas?'),
      q('7.1.3','Quais públicos possuem restrições de atendimento? Considere homens, menores, gestantes e lactantes.'),
      q('7.1.4','Qual deve ser a resposta quando a cliente não seguir o preparo necessário?'),
      q('7.1.5','Quais orientações precisam ser enviadas antes da visita, além da apresentação do serviço?')
    ]},
    {title:'7.2 Dúvidas e problemas', questions:[
      q('7.2.1','Quais dúvidas sobre saúde ou segurança devem ser encaminhadas diretamente para a equipe?'),
      q('7.2.2','Qual mensagem aprovada deve ser enviada quando a cliente relatar dor, queimadura ou reação?'),
      q('7.2.3','Quem recebe esses relatos com prioridade?'),
      q('7.2.4','Qual deve ser a conduta quando a cliente enviar foto da pele?'),
      q('7.2.5','Quais promessas sobre resultado ou duração a IA não pode fazer?'),
      q('7.2.6','Como deve ser tratada uma reclamação de resultado insatisfatório?')
    ]}
  ]},
  {title:'8. Textos e situações de conversa', subsections:[
    {title:'8.1 Apresentações', questions:[
      q('8.1.1','Quais textos do NB.docx devem ser usados sem alteração?'),
      q('8.1.2','Quais trechos do documento precisam ser corrigidos?'),
      q('8.1.3','Qual apresentação deve ser enviada quando a cliente perguntar “quais serviços vocês têm”?'),
      choice('8.1.4','Quando a cliente perguntar apenas o preço, como responder?',['Resposta curta e direta','Texto completo do serviço','Depende da situação','Outro'],{other:true}),
      q('8.1.5','Em qual momento devem ser enviados os textos de preparo e cuidados posteriores?'),
      q('8.1.6','Qual deve ser a orientação para quem diz “é minha primeira vez”?')
    ]},
    {title:'8.2 Respostas desejadas', scenarios:true, description:'Para cada situação, escreva a resposta desejada e marque se a IA continua atendendo ou encaminha para humano.'}
  ]},
  {title:'9. Atendimento humano e novas conversas', subsections:[
    {title:'9.1 Encaminhamento', questions:[
      q('9.1.1','Em quais situações a IA deve obrigatoriamente chamar a equipe?'),
      q('9.1.2','Qual deve ser a mensagem padrão de encaminhamento?'),
      q('9.1.3','Quem deve receber cada tipo de encaminhamento?'),
      q('9.1.4','Em qual coluna do Kanban cada tipo de caso deve ficar?'),
      q('9.1.5','Qual prazo de resposta humana pode ser informado?'),
      yesNo('9.1.6','A IA deve ficar totalmente em silêncio depois do encaminhamento?'),
      q('9.1.7','Quem pode devolver a conversa para a IA?')
    ]},
    {title:'9.2 Encerramento e retorno', questions:[
      q('9.2.1','Quando o atendimento deve ser encerrado?'),
      q('9.2.2','Qual mensagem deve ser enviada ao encerrar?'),
      yesNo('9.2.3','Ao iniciar outro atendimento, a IA deve evitar reutilizar automaticamente preferências da conversa encerrada?'),
      q('9.2.4','Qual mensagem deve ser usada quando a cliente mencionar uma conversa antiga que não possa ser identificada com segurança?'),
      q('9.2.5','Qual deve ser a conduta quando alguém perguntar sobre a reserva de outra pessoa?')
    ]}
  ]},
  {title:'10. Contatos, acompanhamento e aprovação', subsections:[
    {title:'10.1 Contatos e dados', questions:[
      yesNo('10.1.1','Existem contatos que devem ser atendidos somente por humanos?',{followupOn:'Sim',followupId:'10.1.1a',followupText:'Quais contatos ou categorias?'}),
      yesNo('10.1.2','Deseja enviar lembretes de agendamento?',{followupOn:'Sim',followupId:'10.1.2a',followupText:'Com qual antecedência?'}),
      yesNo('10.1.3','Deseja retomar conversas abandonadas?',{followupOn:'Sim',followupId:'10.1.3a',followupText:'Após quanto tempo e com qual limite de tentativas?'}),
      q('10.1.4','Como registrar a autorização para mensagens de acompanhamento e os pedidos para não recebê-las?'),
      q('10.1.5','Quais dados a IA pode solicitar durante o atendimento?'),
      q('10.1.6','Quem deve receber pedidos sobre privacidade, correção ou exclusão de dados?')
    ]},
    {title:'10.2 Validação', questions:[
      q('10.2.1','Quais são as cinco dúvidas mais frequentes das clientes?'),
      q('10.2.2','Quais erros da IA não podem se repetir? Envie exemplos sem dados pessoais desnecessários.'),
      q('10.2.3','Quem aprovará as respostas e informará futuras alterações de preços ou regras?'),
      q('10.2.4','Quais casos precisam ser testados antes da aprovação final?')
    ]}
  ]}
];

const serviceQuestions = [
  q('2.2.1','Qual é o nome do serviço?','text'),
  q('2.2.2','Qual descrição a IA deve usar para explicá-lo?'),
  q('2.2.3','O que está incluído no serviço?'),
  q('2.2.4','Qual é o preço?','text'),
  q('2.2.5','Quanto tempo dura o procedimento?','text'),
  q('2.2.6','Quanto tempo a cliente deve permanecer no local?','text'),
  q('2.2.7','Quantos minutos devem ser bloqueados na agenda, incluindo preparo e limpeza?','text'),
  q('2.2.8','Quantas clientes podem ser atendidas simultaneamente nesse serviço?','text'),
  q('2.2.9','Esse atendimento impede outro serviço de acontecer ao mesmo tempo? Qual?'),
  q('2.2.10','Quais dias ou horários são exclusivos desse serviço?'),
  q('2.2.11','Qual preparo deve ser feito antes do atendimento?'),
  q('2.2.12','O que a cliente deve levar?'),
  q('2.2.13','Quais cuidados posteriores devem ser seguidos e por quanto tempo?'),
  q('2.2.14','Qual texto completo de apresentação desse serviço está aprovado?')
];

const scenarios = [
  ['8.2.1','“Qual bronze você recomenda?”'],
  ['8.2.2','“Está caro, faz desconto?”'],
  ['8.2.3','“Não quero pagar sinal.”'],
  ['8.2.4','“Vou pagar tudo quando chegar.”'],
  ['8.2.5','“Quero meu dinheiro de volta.”'],
  ['8.2.6','“Já falei o horário.”'],
  ['8.2.7','“Já tenho reserva, quero marcar outra.”'],
  ['8.2.8','“Vou pensar e depois volto.”'],
  ['8.2.9','A IA não entendeu um áudio ou uma mensagem.'],
  ['8.2.10','Não foi possível consultar a agenda.']
];

let state = loadState();
function loadState(){
  try { return JSON.parse(localStorage.getItem(STORAGE_KEY)) || {answers:{},repeaters:{services:[{}]},scenarios:{},meta:{},final:{}}; }
  catch { return {answers:{},repeaters:{services:[{}]},scenarios:{},meta:{},final:{}}; }
}
function saveState(){ collectFixed(); localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); updateProgress(); }
function esc(v=''){ return String(v).replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m])); }
function valueOf(id){ return state.answers[id] ?? ''; }
function conditionMet(cond){ if(!cond) return true; const v=valueOf(cond.id); if(cond.equals!==undefined) return v===cond.equals; if(cond.in) return cond.in.includes(v); return true; }

function render(){
  const host=document.getElementById('questionnaire'); host.innerHTML='';
  const nav=document.getElementById('sectionNav'); nav.innerHTML='';
  sections.forEach((section,si)=>{
    const sectionId=`sec-${si+1}`;
    const link=document.createElement('a'); link.href=`#${sectionId}`; link.textContent=section.title; nav.appendChild(link);
    const box=document.createElement('section'); box.className='section-card'; box.id=sectionId;
    const h2=document.createElement('h2'); h2.textContent=section.title; box.appendChild(h2);
    section.subsections.forEach(sub=>{
      const s=document.createElement('div'); s.className='subsection';
      const h3=document.createElement('h3'); h3.textContent=sub.title; s.appendChild(h3);
      if(sub.description){ const p=document.createElement('p'); p.className='desc'; p.textContent=sub.description; s.appendChild(p); }
      if(sub.repeater==='services') renderServices(s);
      else if(sub.scenarios) renderScenarios(s);
      else sub.questions.forEach(item=>s.appendChild(renderQuestion(item)));
      box.appendChild(s);
    });
    host.appendChild(box);
  });
  hydrateFixed(); applyVisibility(); updateProgress();
}

function renderQuestion(item, store=state.answers, prefix=''){
  const card=document.createElement('div'); card.className='question-card'; card.dataset.qid=item.id;
  if(item.condition) card.dataset.condition=JSON.stringify(item.condition);
  const label=document.createElement('div'); label.className='question-label';
  label.innerHTML=`<span class="question-number">${esc(item.id)}</span>${esc(item.text)}`; card.appendChild(label);
  const fieldKey=prefix+item.id;
  const saved=store[item.id] ?? '';
  let control;
  if(item.type==='radio'){
    control=document.createElement('div'); control.className='choice-grid'; control.dataset.field=fieldKey;
    item.options.forEach(opt=>{
      const lab=document.createElement('label'); lab.className='choice-pill';
      const inp=document.createElement('input'); inp.type=item.multi?'checkbox':'radio'; inp.name=fieldKey; inp.value=opt;
      if(item.multi){ const arr=Array.isArray(saved)?saved:[]; inp.checked=arr.includes(opt); }
      else inp.checked=saved===opt;
      const span=document.createElement('span'); span.textContent=opt; lab.append(inp,span); control.appendChild(lab);
      inp.addEventListener('change',()=>{
        if(item.multi){ store[item.id]=[...control.querySelectorAll('input:checked')].map(x=>x.value); }
        else store[item.id]=inp.value;
        saveState(); applyVisibility(); renderFollowupState(card,item,store,prefix);
      });
    });
    card.appendChild(control);
    if(item.other){
      const other=document.createElement('input'); other.type='text'; other.placeholder='Se escolheu “Outro”, descreva aqui'; other.className='other-input'; other.value=store[item.id+'__other']||'';
      other.addEventListener('input',()=>{store[item.id+'__other']=other.value; saveState();}); card.appendChild(other);
    }
  } else {
    control=document.createElement(item.type==='text'?'input':'textarea');
    if(item.type==='text') control.type='text'; else control.rows=3;
    control.value=saved; control.dataset.field=fieldKey;
    control.addEventListener('input',()=>{store[item.id]=control.value; saveState();}); card.appendChild(control);
    addQuickButtons(card,control,store,item.id);
  }
  renderFollowupState(card,item,store,prefix);
  return card;
}

function addQuickButtons(card,control,store,key){
  const quick=document.createElement('div'); quick.className='quick-actions';
  SPECIAL.forEach(txt=>{ const b=document.createElement('button'); b.type='button'; b.textContent=txt; b.onclick=()=>{control.value=txt;store[key]=txt;saveState();}; quick.appendChild(b); });
  card.appendChild(quick);
}

function renderFollowupState(card,item,store,prefix){
  card.querySelectorAll('.inline-followup').forEach(x=>x.remove());
  const pairs=[];
  if(item.followupOn) pairs.push([item.followupOn,item.followupId,item.followupText]);
  if(item.followupOn2) pairs.push([item.followupOn2,item.followupId2,item.followupText2]);
  pairs.forEach(([trigger,id,text])=>{
    const val=store[item.id]; if(val!==trigger) return;
    const wrap=document.createElement('div'); wrap.className='inline-followup';
    const lab=document.createElement('label'); lab.textContent=text;
    const ta=document.createElement('textarea'); ta.rows=2; ta.value=store[id]||'';
    ta.addEventListener('input',()=>{store[id]=ta.value;saveState();}); lab.appendChild(ta); wrap.appendChild(lab); card.appendChild(wrap);
    addQuickButtons(wrap,ta,store,id);
  });
}

function applyVisibility(){
  document.querySelectorAll('.question-card[data-condition]').forEach(card=>{
    const cond=JSON.parse(card.dataset.condition); card.classList.toggle('hidden-question',!conditionMet(cond));
  }); updateProgress();
}

function renderServices(container){
  if(!state.repeaters) state.repeaters={}; if(!state.repeaters.services||!state.repeaters.services.length) state.repeaters.services=[{}];
  const wrap=document.createElement('div'); wrap.className='repeater';
  const draw=()=>{
    wrap.innerHTML='';
    state.repeaters.services.forEach((item,i)=>{
      const box=document.createElement('div'); box.className='repeat-item';
      const head=document.createElement('div'); head.className='repeat-head';
      const title=document.createElement('strong'); title.textContent=`Serviço / versão ${i+1}`; head.appendChild(title);
      if(state.repeaters.services.length>1){ const rm=document.createElement('button'); rm.type='button'; rm.className='mini-btn remove-btn'; rm.textContent='Remover'; rm.onclick=()=>{state.repeaters.services.splice(i,1);saveState();draw();}; head.appendChild(rm); }
      box.appendChild(head); serviceQuestions.forEach(itemQ=>box.appendChild(renderQuestion(itemQ,item,`service-${i}-`))); wrap.appendChild(box);
    });
    const add=document.createElement('button'); add.type='button'; add.className='add-btn'; add.textContent='+ Adicionar outro serviço ou versão'; add.onclick=()=>{state.repeaters.services.push({});saveState();draw();}; wrap.appendChild(add); updateProgress();
  };
  draw(); container.appendChild(wrap);
}

function renderScenarios(container){
  if(!state.scenarios) state.scenarios={};
  scenarios.forEach(([id,text])=>{
    if(!state.scenarios[id]) state.scenarios[id]={answer:'',route:''};
    const data=state.scenarios[id];
    const card=document.createElement('div'); card.className='question-card scenario-card';
    const label=document.createElement('div'); label.className='question-label'; label.innerHTML=`<span class="question-number">${id}</span>${esc(text)}`; card.appendChild(label);
    const ta=document.createElement('textarea'); ta.rows=3; ta.placeholder='Resposta exata desejada'; ta.value=data.answer||''; ta.addEventListener('input',()=>{data.answer=ta.value;saveState();}); card.appendChild(ta);
    const choices=document.createElement('div'); choices.className='choice-grid compact';
    ['Continuar com IA','Encaminhar para humano'].forEach(opt=>{ const lab=document.createElement('label'); lab.className='choice-pill'; const inp=document.createElement('input'); inp.type='radio'; inp.name=`route-${id}`; inp.value=opt; inp.checked=data.route===opt; inp.onchange=()=>{data.route=opt;saveState();}; const span=document.createElement('span'); span.textContent=opt; lab.append(inp,span); choices.appendChild(lab); });
    card.appendChild(choices); container.appendChild(card);
  });
}

function collectFixed(){
  state.meta={nome:document.getElementById('meta_nome')?.value||'',funcao:document.getElementById('meta_funcao')?.value||'',data:document.getElementById('meta_data')?.value||'',aprovador:document.getElementById('meta_aprovador')?.value||''};
  state.final={pendencias:document.getElementById('final_pendencias')?.value||'',responsavel:document.getElementById('final_responsavel')?.value||'',data:document.getElementById('final_data')?.value||''};
}
function hydrateFixed(){
  document.getElementById('meta_nome').value=state.meta?.nome||''; document.getElementById('meta_funcao').value=state.meta?.funcao||''; document.getElementById('meta_data').value=state.meta?.data||new Date().toISOString().slice(0,10); document.getElementById('meta_aprovador').value=state.meta?.aprovador||'';
  document.getElementById('final_pendencias').value=state.final?.pendencias||''; document.getElementById('final_responsavel').value=state.final?.responsavel||''; document.getElementById('final_data').value=state.final?.data||'';
  ['meta_nome','meta_funcao','meta_data','meta_aprovador','final_pendencias','final_responsavel','final_data'].forEach(id=>document.getElementById(id).addEventListener('input',saveState));
}

function isAnsweredValue(v){ if(Array.isArray(v)) return v.length>0; return String(v??'').trim()!==''; }
function updateProgress(){
  let total=0,answered=0;
  sections.forEach(sec=>sec.subsections.forEach(sub=>{
    if(sub.questions) sub.questions.forEach(item=>{ if(item.condition&&!conditionMet(item.condition)) return; total++; if(isAnsweredValue(state.answers[item.id])) answered++; if(item.followupOn&&state.answers[item.id]===item.followupOn){total++;if(isAnsweredValue(state.answers[item.followupId]))answered++;} if(item.followupOn2&&state.answers[item.id]===item.followupOn2){total++;if(isAnsweredValue(state.answers[item.followupId2]))answered++;} });
  }));
  (state.repeaters?.services||[]).forEach(item=>serviceQuestions.forEach(x=>{total++;if(isAnsweredValue(item[x.id]))answered++;}));
  scenarios.forEach(([id])=>{ total+=2; const d=state.scenarios?.[id]||{}; if(isAnsweredValue(d.answer))answered++; if(isAnsweredValue(d.route))answered++; });
  const pct=total?Math.round(answered/total*100):0; document.getElementById('progressBar').style.width=pct+'%'; document.getElementById('progressText').textContent=`${pct}% respondido`;
}
function setStatus(msg){ const s=document.getElementById('status'); s.textContent=msg; clearTimeout(setStatus.t); setStatus.t=setTimeout(()=>s.textContent='',4000); }

function displayAnswer(item,store=state.answers){
  const v=store[item.id]; let ans=Array.isArray(v)?v.join(', '):(v||'Sem resposta');
  if(item.other && store[item.id+'__other']) ans += ` — ${store[item.id+'__other']}`;
  return ans;
}
function addPdfLine(doc,text,y,opts={}){
  const margin=15,width=180,size=opts.size||9.5; doc.setFont('helvetica',opts.bold?'bold':'normal'); doc.setFontSize(size); const lines=doc.splitTextToSize(String(text),width); const lh=size*0.45; if(y.y+lines.length*lh+3>282){doc.addPage();y.y=16;} doc.text(lines,margin,y.y); y.y+=lines.length*lh+2;
}
function addQA(doc,y,id,text,answer){ addPdfLine(doc,`${id} ${text}`,y,{bold:true}); addPdfLine(doc,`Resposta: ${answer||'Sem resposta'}`,y); y.y+=1; }
function generatePdf(){
  saveState(); if(!window.jspdf?.jsPDF){setStatus('Não foi possível carregar o gerador de PDF. Use “Imprimir / salvar como PDF”.');return;}
  const {jsPDF}=window.jspdf; const doc=new jsPDF({unit:'mm',format:'a4'}); const y={y:18};
  addPdfLine(doc,'Questionário de atendimento — Clínica da Núbia',y,{bold:true,size:15}); addPdfLine(doc,'Versão reduzida e condicional para configuração do atendimento automatizado',y,{size:9.5}); y.y+=2;
  addPdfLine(doc,`Responsável pelas respostas: ${state.meta?.nome||'Sem resposta'}`,y); addPdfLine(doc,`Função: ${state.meta?.funcao||'Sem resposta'}`,y); addPdfLine(doc,`Data: ${state.meta?.data||'Sem resposta'}`,y); addPdfLine(doc,`Aprovador: ${state.meta?.aprovador||'Sem resposta'}`,y); y.y+=3;
  sections.forEach(sec=>{ addPdfLine(doc,sec.title,y,{bold:true,size:12.5}); sec.subsections.forEach(sub=>{ addPdfLine(doc,sub.title,y,{bold:true,size:10.5});
    if(sub.repeater==='services'){ (state.repeaters?.services||[]).forEach((store,i)=>{ addPdfLine(doc,`Serviço / versão ${i+1}`,y,{bold:true}); serviceQuestions.forEach(item=>addQA(doc,y,item.id,item.text,displayAnswer(item,store))); }); }
    else if(sub.scenarios){ scenarios.forEach(([id,text])=>{ const d=state.scenarios?.[id]||{}; addQA(doc,y,id,text,d.answer||'Sem resposta'); addPdfLine(doc,`Destino: ${d.route||'Sem resposta'}`,y); }); }
    else sub.questions.forEach(item=>{ if(item.condition&&!conditionMet(item.condition)) return; addQA(doc,y,item.id,item.text,displayAnswer(item)); if(item.followupOn&&state.answers[item.id]===item.followupOn) addQA(doc,y,item.followupId,item.followupText,state.answers[item.followupId]||'Sem resposta'); if(item.followupOn2&&state.answers[item.id]===item.followupOn2) addQA(doc,y,item.followupId2,item.followupText2,state.answers[item.followupId2]||'Sem resposta'); }); y.y+=1; }); y.y+=2; });
  addPdfLine(doc,'Pendências antes da ativação',y,{bold:true,size:10.5}); addPdfLine(doc,state.final?.pendencias||'Sem resposta',y); addPdfLine(doc,`Responsável pela aprovação final: ${state.final?.responsavel||'Sem resposta'}`,y); addPdfLine(doc,`Data da aprovação: ${state.final?.data||'Sem resposta'}`,y);
  const clean=(state.meta?.nome||'cliente').normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/[^a-zA-Z0-9_-]+/g,'-').replace(/^-|-$/g,'').toLowerCase(); const date=state.meta?.data||new Date().toISOString().slice(0,10); doc.save(`questionario-clinica-nubia-${clean||'cliente'}-${date}.pdf`); setStatus('PDF gerado. Agora é só enviar o arquivo manualmente pelo WhatsApp.');
}

document.getElementById('saveBtn').onclick=()=>{saveState();setStatus('Respostas salvas neste navegador.');};
document.getElementById('printBtn').onclick=()=>{saveState();window.print();};
document.getElementById('pdfBtn').onclick=generatePdf;
window.addEventListener('beforeunload',saveState);
render();
