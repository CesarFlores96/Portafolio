(() => {
  const cards = [...document.querySelectorAll('.project-item[data-project-demo]')];
  if (!cards.length) return;

  const imageMap = {
    sigma: './images/project-colegio-sigma-hero.svg',
    hr: './images/project-talento-humano-hero.svg',
    api: './images/project-api-erp-hero.svg',
    chatbot: './images/project-chatbot-hero.svg',
    automation: './images/project-automation-hero.svg',
    sql: './images/project-sql-agent-hero.svg'
  };

  const projects = {
    sigma: {
      type: 'education', title: 'Colegio Sigma', subtitle: 'Gestión educativa integral', icon: 'Σ',
      nav: ['Inicio', 'Estudiantes', 'Asistencia', 'Comunicados'],
      stats: [['Estudiantes', '1,248', '+8.4%'], ['Asistencia', '96.4%', '+1.8%'], ['Matrículas', '184', 'Periodo 2026'], ['Comunicados', '328', '96% entregados']],
      students: [['ST-1048', 'Valentina Ramos', '6° Primaria', '98%', 'Activo'], ['ST-1047', 'Marcelo Peña', '6° Primaria', '95%', 'Activo'], ['ST-1046', 'Sofía Cipriano', '5° Primaria', '91%', 'Seguimiento'], ['ST-1045', 'Gabriel Méndez', '5° Primaria', '97%', 'Activo']],
      announcements: [['Día de la Peruanidad', '54 familias', 'Enviado'], ['Reunión de padres', '6° Primaria', 'Programado'], ['Reporte semanal', 'Dirección', 'Publicado']]
    },
    hr: {
      type: 'hr', title: 'Talento Humano', subtitle: 'Operación y bienestar del personal', icon: 'TH',
      nav: ['Resumen', 'Personal', 'Asistencia', 'Planilla'],
      stats: [['Colaboradores', '186', '12 áreas'], ['Puntualidad', '92%', '+3.1%'], ['Vacaciones', '14', 'Este mes'], ['Planilla', 'S/ 418K', 'Julio']],
      people: [['Ana Torres', 'Administración', '08:01', 'Puntual'], ['Luis Mendoza', 'Tecnología', '08:17', 'Tardanza'], ['Carla Ruiz', 'Académico', '07:56', 'Puntual'], ['José Vega', 'Servicios', '08:04', 'Puntual']],
      requests: [['María Soto', 'Vacaciones', '15 - 19 Jul', 'Por aprobar'], ['Carlos León', 'Permiso', '12 Jul', 'Aprobado'], ['Elena Paredes', 'Trabajo remoto', '18 Jul', 'Revisión']]
    },
    api: {
      type: 'api', title: 'API ERP', subtitle: 'Servicios empresariales en .NET', icon: 'API',
      nav: ['Overview', 'Endpoints', 'Logs', 'Arquitectura'],
      stats: [['Disponibilidad', '99.98%', '30 días'], ['Solicitudes', '1.24M', '+11%'], ['Latencia p95', '286 ms', '-18 ms'], ['Errores', '0.14%', 'Objetivo < 0.5%']],
      endpoints: [['GET', '/api/v1/orders', '118 ms', '200'], ['POST', '/api/v1/reports', '242 ms', '201'], ['GET', '/api/v1/customers', '96 ms', '200'], ['PUT', '/api/v1/workflows', '154 ms', '200']],
      logs: ['10:42:18  INFO  GET /orders 200 118ms', '10:42:15  INFO  POST /reports 201 242ms', '10:42:02  WARN  Retry provider=mail attempt=2', '10:41:58  INFO  JWT validated user=cflores']
    },
    chatbot: {
      type: 'chatbot', title: 'Asistente empresarial', subtitle: 'Chatbot con contexto y fuentes', icon: 'AI',
      nav: ['Conversaciones', 'Fuentes', 'Calidad', 'Ajustes'],
      stats: [['Conversaciones', '1,842', '+18%'], ['Resolución', '87%', 'Sin derivación'], ['Respuesta', '2.4 s', 'Promedio'], ['Satisfacción', '96.2%', 'Positiva']],
      sources: [['Manual operativo', 'PDF · v4.1', 'Actualizado'], ['Órdenes de trabajo', 'API interna', 'En línea'], ['Base documental', '128 archivos', 'Indexada'], ['Incidencias', 'REST API', 'En línea']],
      messages: [
        { side: 'user', text: '¿Cuál es el estado de la OT-2034?' },
        { side: 'bot', text: 'La orden está en ejecución. Tiene 3 evidencias y la última actividad fue registrada hoy a las 10:42.' },
        { side: 'user', text: '¿Qué acción corresponde ahora?' },
        { side: 'bot', text: 'Validar la evidencia fotográfica y solicitar confirmación al supervisor de zona.' }
      ]
    },
    automation: {
      type: 'automation', title: 'Centro de automatizaciones', subtitle: 'Flujos, aprobaciones y trazabilidad', icon: '⚡',
      nav: ['Flujos', 'Ejecuciones', 'Aprobaciones', 'Alertas'],
      stats: [['Flujos activos', '28', '6 críticos'], ['Ejecuciones', '14,320', 'Este mes'], ['Horas evitadas', '312 h', 'Estimado'], ['Éxito', '99.3%', '100 reintentos']],
      runs: [['Consolidación de cartas', '04:12', '1,284 filas', 'Completado'], ['Reporte comercial', '01:48', 'Revisión humana', 'Pendiente'], ['Sincronización API', '00:54', '642 registros', 'Completado'], ['Notificaciones', '00:31', '118 envíos', 'Completado']],
      approvals: [['Reporte comercial', 'Gerencia', 'Hace 16 min'], ['Carga de facturación', 'Supervisor', 'Hace 42 min'], ['Envío masivo', 'Comunicaciones', 'Hace 1 h']]
    },
    sql: {
      type: 'sql', title: 'Agente SQL auditado', subtitle: 'Consulta segura de datos', icon: 'DB',
      nav: ['Consulta', 'Resultados', 'Políticas', 'Auditoría'],
      stats: [['Consultas', '6,482', '30 días'], ['Auditadas', '100%', 'Sin excepción'], ['Escrituras', '0', 'Solo lectura'], ['Tiempo medio', '1.8 s', 'Validación incluida']],
      query: "SELECT sector, AVG(consumo) AS promedio\nFROM mediciones\nWHERE periodo >= '2026-01'\nGROUP BY sector\nORDER BY promedio DESC\nLIMIT 100;",
      results: [['Sector Sur', '20.1 m³', '+4.2%'], ['Sector Norte', '18.4 m³', '+1.8%'], ['Sector Centro', '16.9 m³', '-2.1%'], ['Sector Este', '15.7 m³', '+0.6%']],
      checks: [['Solo lectura', 'Aprobado'], ['Columnas permitidas', 'Aprobado'], ['Límite de filas', '100'], ['Timeout', '10 s'], ['Registro de auditoría', 'Activo']]
    }
  };

  cards.forEach(card => {
    const id = card.dataset.projectDemo;
    const img = card.querySelector('img');
    if (img && imageMap[id]) img.src = `${imageMap[id]}?v=20260712-unique`;
  });

  const layer = document.createElement('div');
  layer.className = 'showcase-layer';
  layer.setAttribute('aria-hidden', 'true');
  layer.innerHTML = `
    <section class="showcase-modal" role="dialog" aria-modal="true" aria-labelledby="showcase-title">
      <header class="showcase-chrome">
        <div class="showcase-lights"><button data-close aria-label="Cerrar"></button><button data-close aria-label="Minimizar"></button><button data-max aria-label="Pantalla completa"></button></div>
        <div class="showcase-titlebar" id="showcase-title">Proyecto</div>
        <button class="showcase-close" data-close>Cerrar</button>
      </header>
      <div id="showcase-root"></div>
    </section>`;
  document.body.appendChild(layer);

  const toast = document.createElement('div');
  toast.className = 'showcase-toast';
  document.body.appendChild(toast);

  const root = layer.querySelector('#showcase-root');
  let activeId = null;
  let activeTab = 0;

  const escapeHtml = value => String(value).replace(/[&<>'"]/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[char]));
  const showToast = message => {
    toast.textContent = message;
    toast.classList.add('is-visible');
    clearTimeout(showToast.timer);
    showToast.timer = setTimeout(() => toast.classList.remove('is-visible'), 1900);
  };
  const metricCards = project => `<div class="metric-grid">${project.stats.map(([label,value,note]) => `<article><span>${label}</span><strong>${value}</strong><small>${note}</small></article>`).join('')}</div>`;
  const pill = value => `<span class="status-pill-demo ${/pend|tard|revis|segu/i.test(value) ? 'warning' : /error|bloq/i.test(value) ? 'danger' : ''}">${value}</span>`;
  const table = (headers, rows) => `<div class="data-table-wrap"><table class="data-table"><thead><tr>${headers.map(h=>`<th>${h}</th>`).join('')}</tr></thead><tbody>${rows.map(row=>`<tr>${row.map((cell,i)=>`<td>${i===row.length-1?pill(cell):escapeHtml(cell)}</td>`).join('')}</tr>`).join('')}</tbody></table></div>`;

  function educationView(p) {
    if (activeTab === 1) return `<div class="section-head"><div><h2>Directorio de estudiantes</h2><p>Seguimiento académico y asistencia por estudiante.</p></div><button data-action>Nuevo estudiante</button></div>${table(['Código','Estudiante','Nivel','Asistencia','Estado'],p.students)}`;
    if (activeTab === 2) return `<div class="section-head"><div><h2>Asistencia semanal</h2><p>Comparativo por grado y día.</p></div></div><div class="attendance-board">${['1°','2°','3°','4°','5°','6°'].map((g,i)=>`<article><strong>${g} Primaria</strong><div class="attendance-cells">${[94,96,92,98,95].map((v,j)=>`<span style="--level:${(v-88)/12}">${v}%</span>`).join('')}</div></article>`).join('')}</div>`;
    if (activeTab === 3) return `<div class="section-head"><div><h2>Comunicaciones</h2><p>Envíos recientes a familias y personal.</p></div><button data-action>Crear comunicado</button></div>${table(['Asunto','Destinatarios','Estado'],p.announcements)}`;
    return `${metricCards(p)}<div class="edu-grid"><section class="panel"><div class="panel-head"><h3>Rendimiento por nivel</h3><span>Periodo actual</span></div><div class="line-chart edu-line"><svg viewBox="0 0 640 230" preserveAspectRatio="none"><polyline points="20,180 115,145 210,158 305,104 400,121 495,72 620,91"/><g>${[[20,180],[115,145],[210,158],[305,104],[400,121],[495,72],[620,91]].map(([x,y])=>`<circle cx="${x}" cy="${y}" r="6"/>`).join('')}</g></svg><div class="chart-labels">${['1°','2°','3°','4°','5°','6°'].map(x=>`<span>${x}</span>`).join('')}</div></div></section><section class="panel"><div class="panel-head"><h3>Actividad académica</h3><span>Hoy</span></div><div class="activity-list"><article><i></i><div><strong>Matrícula confirmada</strong><p>Valentina Ramos · 6° Primaria</p></div><time>8 min</time></article><article><i></i><div><strong>Reporte publicado</strong><p>Asistencia semanal disponible</p></div><time>24 min</time></article><article><i></i><div><strong>Comunicado enviado</strong><p>Día de la Peruanidad</p></div><time>1 h</time></article></div></section></div>${table(['Código','Estudiante','Nivel','Asistencia','Estado'],p.students)}`;
  }

  function hrView(p) {
    if (activeTab === 1) return `<div class="section-head"><div><h2>Directorio de personal</h2><p>Colaboradores por área y estado de marcación.</p></div><button data-action>Agregar colaborador</button></div>${table(['Colaborador','Área','Ingreso','Estado'],p.people)}`;
    if (activeTab === 2) return `<div class="section-head"><div><h2>Calendario de asistencia</h2><p>Resumen mensual de incidencias.</p></div></div><div class="hr-calendar">${Array.from({length:30},(_,i)=>`<span class="${[4,11,18,25].includes(i)?'late':[6,13,20,27].includes(i)?'off':''}">${i+1}</span>`).join('')}</div><div class="calendar-legend"><span><i class="ok"></i>Puntual</span><span><i class="late"></i>Tardanza</span><span><i class="off"></i>No laborable</span></div>`;
    if (activeTab === 3) return `<div class="section-head"><div><h2>Planilla del periodo</h2><p>Resumen por centro de costo.</p></div><button data-action>Exportar resumen</button></div><div class="payroll-grid"><article><span>Remuneración bruta</span><strong>S/ 418,250</strong><small>186 colaboradores</small></article><article><span>Descuentos</span><strong>S/ 46,820</strong><small>11.2% del bruto</small></article><article><span>Neto estimado</span><strong>S/ 371,430</strong><small>Pago programado 25 Jul</small></article></div>`;
    return `${metricCards(p)}<div class="hr-main-grid"><section class="panel"><div class="panel-head"><h3>Asistencia por área</h3><span>Semana actual</span></div><div class="progress-list">${[['Administración',84],['Académico',92],['Tecnología',96],['Servicios',78]].map(([n,v])=>`<article><div><strong>${n}</strong><span>${v}%</span></div><b><i style="width:${v}%"></i></b></article>`).join('')}</div></section><section class="panel"><div class="panel-head"><h3>Solicitudes pendientes</h3><span>${p.requests.length} solicitudes</span></div>${table(['Colaborador','Tipo','Fecha','Estado'],p.requests)}</section></div>`;
  }

  function apiView(p) {
    if (activeTab === 1) return `<div class="api-page-head"><div><span class="mono-label">ENDPOINTS</span><h2>Servicios publicados</h2></div><button data-action>Probar endpoint</button></div>${table(['Método','Ruta','Latencia','Código'],p.endpoints)}`;
    if (activeTab === 2) return `<div class="api-page-head"><div><span class="mono-label">LIVE LOGS</span><h2>Registro de ejecución</h2></div><button data-action>Limpiar consola</button></div><pre class="log-console">${p.logs.map((x,i)=>`<span class="${x.includes('WARN')?'warn':''}">${escapeHtml(x)}</span>`).join('\n')}</pre>`;
    if (activeTab === 3) return `<div class="api-page-head"><div><span class="mono-label">SYSTEM MAP</span><h2>Arquitectura del servicio</h2></div></div><div class="api-architecture"><article>Clientes web y móvil</article><i>→</i><article>API Gateway</article><i>→</i><article class="accent">Servicios .NET</article><i>→</i><article>SQL Server</article><aside><span>JWT</span><span>Auditoría</span><span>Reportes</span><span>Colas</span></aside></div>`;
    return `${metricCards(p)}<div class="api-grid"><section class="terminal-panel"><header><span>traffic.service</span><b>LIVE</b></header><div class="api-bars">${[42,58,51,73,88,64,91,76,84,69,95,81].map(v=>`<i style="height:${v}%"></i>`).join('')}</div><footer>${['00h','04h','08h','12h','16h','20h','24h'].map(x=>`<span>${x}</span>`).join('')}</footer></section><section class="terminal-panel"><header><span>recent.requests</span><b>200 OK</b></header><pre class="log-console compact">${p.logs.map(x=>`<span class="${x.includes('WARN')?'warn':''}">${escapeHtml(x)}</span>`).join('\n')}</pre></section></div>${table(['Método','Ruta','Latencia','Código'],p.endpoints)}`;
  }

  function chatbotView(p) {
    if (activeTab === 1) return `<div class="section-head"><div><h2>Fuentes de conocimiento</h2><p>Repositorios y servicios utilizados por el asistente.</p></div><button data-action>Conectar fuente</button></div><div class="source-grid">${p.sources.map(([name,type,status])=>`<article><i>⌘</i><div><strong>${name}</strong><p>${type}</p></div>${pill(status)}</article>`).join('')}</div>`;
    if (activeTab === 2) return `${metricCards(p)}<div class="quality-grid"><article><strong>Precisión contextual</strong><b>94%</b><div><i style="width:94%"></i></div></article><article><strong>Respuestas con fuente</strong><b>98%</b><div><i style="width:98%"></i></div></article><article><strong>Derivaciones correctas</strong><b>89%</b><div><i style="width:89%"></i></div></article></div>`;
    if (activeTab === 3) return `<div class="settings-card"><h2>Configuración del asistente</h2><label><span>Modelo de respuesta</span><select><option>Equilibrado</option><option>Preciso</option><option>Conciso</option></select></label><label><span>Fuentes obligatorias</span><input type="checkbox" checked /></label><label><span>Derivar con confianza menor a</span><input type="range" value="70" /></label><button data-action>Guardar configuración</button></div>`;
    return `<div class="chat-layout"><aside class="chat-sources"><header><span>Fuentes activas</span><b>${p.sources.length}</b></header>${p.sources.map(([name,type,status])=>`<article><i></i><div><strong>${name}</strong><small>${type}</small></div></article>`).join('')}</aside><section class="chat-window"><header><div><span class="bot-avatar">AI</span><div><strong>Asistente de operaciones</strong><small>En línea · consulta fuentes autorizadas</small></div></div><button data-action>Nueva conversación</button></header><div class="chat-messages">${p.messages.map(m=>`<article class="${m.side}"><p>${m.text}</p>${m.side==='bot'?'<small>3 fuentes consultadas · confianza 96%</small>':''}</article>`).join('')}</div><footer><input placeholder="Escribe una consulta…"/><button data-chat-send>Enviar</button></footer></section><aside class="chat-insights">${metricCards(p)}</aside></div>`;
  }

  function automationView(p) {
    if (activeTab === 1) return `<div class="section-head"><div><h2>Historial de ejecuciones</h2><p>Duración, resultado y estado de cada flujo.</p></div><button data-action>Ejecutar flujo</button></div>${table(['Flujo','Duración','Resultado','Estado'],p.runs)}`;
    if (activeTab === 2) return `<div class="section-head"><div><h2>Bandeja de aprobaciones</h2><p>Acciones que requieren confirmación humana.</p></div></div><div class="approval-list">${p.approvals.map(([name,owner,time])=>`<article><div><strong>${name}</strong><p>Responsable: ${owner} · ${time}</p></div><span><button data-action>Rechazar</button><button data-action>Aprobar</button></span></article>`).join('')}</div>`;
    if (activeTab === 3) return `<div class="automation-alerts"><article><i class="critical"></i><div><strong>Proveedor externo lento</strong><p>El flujo de correo activó 2 reintentos automáticos.</p></div><time>12 min</time></article><article><i></i><div><strong>Umbral de ejecución alcanzado</strong><p>Sincronización API procesó 642 registros.</p></div><time>29 min</time></article><article><i></i><div><strong>Flujo recuperado</strong><p>Consolidación de archivos continuó desde el último checkpoint.</p></div><time>1 h</time></article></div>`;
    return `${metricCards(p)}<section class="workflow-canvas"><header><div><span>Flujo seleccionado</span><strong>Consolidación y validación documental</strong></div><button data-action>Ejecutar ahora</button></header><div class="workflow-track">${[['Entrada','Archivo recibido'],['Validación','Estructura correcta'],['Agente IA','Clasifica observaciones'],['Aprobación','Control humano'],['Acción','Genera reporte']].map(([a,b],i)=>`<article class="${i===2?'active':''}"><i>${i+1}</i><strong>${a}</strong><small>${b}</small></article>${i<4?'<span>→</span>':''}`).join('')}</div></section><div class="automation-grid"><section class="panel"><div class="panel-head"><h3>Ejecuciones recientes</h3><span>Últimas 24 h</span></div>${table(['Flujo','Duración','Resultado','Estado'],p.runs)}</section><section class="panel"><div class="panel-head"><h3>Aprobaciones</h3><span>${p.approvals.length} pendientes</span></div><div class="mini-approval">${p.approvals.map(([name,owner,time])=>`<article><div><strong>${name}</strong><p>${owner}</p></div><time>${time}</time></article>`).join('')}</div></section></div>`;
  }

  function sqlView(p) {
    if (activeTab === 1) return `<div class="sql-result-page"><div class="section-head"><div><h2>Resultados de la consulta</h2><p>Promedio de consumo agrupado por sector.</p></div><button data-action>Exportar CSV</button></div>${table(['Sector','Promedio','Variación'],p.results)}</div>`;
    if (activeTab === 2) return `<div class="section-head"><div><h2>Políticas aplicadas</h2><p>Controles ejecutados antes de consultar la base.</p></div></div><div class="policy-grid">${p.checks.map(([name,value],i)=>`<article><i>${i<2?'✓':'•'}</i><div><strong>${name}</strong><span>${value}</span></div></article>`).join('')}</div>`;
    if (activeTab === 3) return `<div class="section-head"><div><h2>Registro de auditoría</h2><p>Historial de consultas, usuario y decisión de seguridad.</p></div></div>${table(['ID','Usuario','Consulta','Duración','Estado'],[['AU-6482','analista01','Consumo por sector','1.6 s','Aprobada'],['AU-6481','supervisor02','Deuda por suministro','2.1 s','Aprobada'],['AU-6480','analista03','Datos personales','0.3 s','Bloqueada'],['AU-6479','admin01','Tendencia mensual','1.9 s','Aprobada']])}`;
    return `<div class="sql-workspace"><section class="sql-question"><span>Pregunta</span><h2>¿Cuál fue el consumo promedio por sector?</h2><div class="sql-editor"><header><span>consulta.sql</span><button data-action>Copiar SQL</button></header><pre>${escapeHtml(p.query)}</pre></div><div class="sql-actions"><button data-action>Validar consulta</button><button data-action class="primary">Ejecutar consulta</button></div></section><aside class="sql-security"><header><span>Security checks</span><b>5/5</b></header>${p.checks.map(([name,value],i)=>`<article><i>✓</i><div><strong>${name}</strong><small>${value}</small></div></article>`).join('')}</aside></div><div class="sql-bottom-grid">${table(['Sector','Promedio','Variación'],p.results)}<section class="sql-summary"><span>Respuesta generada</span><p>El sector Sur presenta el mayor consumo promedio con <strong>20.1 m³</strong>, seguido del sector Norte con <strong>18.4 m³</strong>.</p></section></div>`;
  }

  const renderers = { education: educationView, hr: hrView, api: apiView, chatbot: chatbotView, automation: automationView, sql: sqlView };

  function render() {
    const p = projects[activeId];
    if (!p) return;
    layer.querySelector('.showcase-titlebar').textContent = p.title;
    root.innerHTML = `<div class="showcase-app theme-${p.type}"><aside class="showcase-sidebar"><div class="showcase-brand"><span>${p.icon}</span><div><strong>${p.title}</strong><small>${p.subtitle}</small></div></div><nav>${p.nav.map((item,i)=>`<button class="${activeTab===i?'active':''}" data-tab="${i}"><i>${['⌂','▦','◫','⌘'][i]}</i><span>${item}</span></button>`).join('')}</nav><footer><span class="demo-mark">Demo</span><small>Interfaz demostrativa del tipo de solución desarrollada.</small></footer></aside><main class="showcase-main"><header class="showcase-topbar"><div class="showcase-search">⌕ <input placeholder="Buscar en ${p.title}…"/></div><div><button class="top-icon" data-info title="Contenido demostrativo">i</button><span class="showcase-avatar">CF</span></div></header><div class="showcase-content">${renderers[p.type](p)}</div></main></div>`;
    root.querySelectorAll('[data-tab]').forEach(button => button.addEventListener('click', () => { activeTab = Number(button.dataset.tab); render(); }));
    root.querySelectorAll('[data-action]').forEach(button => button.addEventListener('click', () => showToast('Acción de demostración ejecutada.')));
    root.querySelector('[data-chat-send]')?.addEventListener('click', () => showToast('Mensaje enviado en modo demostración.'));
    root.querySelector('[data-info]')?.addEventListener('click', () => showToast('Esta vista representa un proyecto con información de muestra.'));
  }

  function open(id) {
    activeId = id;
    activeTab = 0;
    render();
    layer.classList.add('is-open');
    layer.setAttribute('aria-hidden', 'false');
    document.body.classList.add('showcase-open');
  }
  function close() {
    layer.classList.remove('is-open');
    layer.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('showcase-open');
  }

  cards.forEach(card => {
    const activate = event => {
      if (event.type === 'keydown' && !['Enter', ' '].includes(event.key)) return;
      event.preventDefault();
      open(card.dataset.projectDemo);
    };
    card.addEventListener('click', activate);
    card.addEventListener('keydown', activate);
  });

  layer.querySelectorAll('[data-close]').forEach(button => button.addEventListener('click', close));
  layer.querySelector('[data-max]')?.addEventListener('click', () => layer.querySelector('.showcase-modal').requestFullscreen?.());
  layer.addEventListener('click', event => { if (event.target === layer) close(); });
  document.addEventListener('keydown', event => { if (event.key === 'Escape' && layer.classList.contains('is-open')) close(); });
})();