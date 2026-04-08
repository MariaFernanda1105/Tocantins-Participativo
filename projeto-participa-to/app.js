/* ── Dados das Consultas ── */
const consultasMock = [
  { id: 1, titulo: "Plano Estadual de Educação 2025–2035", descricao: "Contribua com a revisão e atualização do Plano...", categoria: "Educação", orgao: "SEDUC-TO", status: "aberta", dataInicio: "2025-02-01", dataFim: "2025-04-30", participacoes: 1842, meta: 3000, iconSlug: "education", destaque: true },
  { id: 2, titulo: "Política Estadual de Saúde Mental", descricao: "Participe da construção da nova Política...", categoria: "Saúde", orgao: "SES-TO", status: "aberta", dataInicio: "2025-01-15", dataFim: "2025-03-31", participacoes: 976, meta: 2000, iconSlug: "health" },
  // ... mais 6 consultas
];

const categorias = ["Todas", "Educação", "Saúde", "Meio Ambiente", "Habitação", "Mobilidade", "Cultura", "Segurança Alimentar", "Direitos Humanos"];

/* ── State ── */
let activeFilter = "Todas";
const followState = {};
consultasMock.forEach((c) => { followState[c.id] = { followed: false, count: 0 }; });

/* ── Card HTML ── */
function renderCard(consulta) {
  const { followed, count } = followState[consulta.id];
  const isOpen = consulta.status === "aberta";
  
  return `<article class="consulta-card">
    <div class="card-inner">
      <div class="card-visual">${getIcon(consulta.iconSlug)}</div>
      <div class="card-content">
        ${statusBadge(consulta.status)}
        <span class="badge badge-category">${consulta.categoria}</span>
        <h3 class="card-title">${consulta.titulo}</h3>
        <p class="card-description">${consulta.descricao}</p>
        ${progressBar(consulta.participacoes, consulta.meta)}
        <div class="card-footer">
          ${isOpen ? `<a href="#" class="btn-primary">Participar</a>` : `<a href="#" class="btn-primary muted">Ver Resultados</a>`}
          <button class="btn-follow${followed ? ' followed' : ''}" data-id="${consulta.id}">${followed ? 'Seguindo' : 'Seguir'}</button>
        </div>
      </div>
    </div>
  </article>`;
}

/* ── Render ── */
function renderCards() {
  const filtered = activeFilter === "Todas" ? consultasMock : consultasMock.filter(c => c.categoria === activeFilter);
  document.getElementById("cards-grid").innerHTML = filtered.map(renderCard).join("");
}

/* ── Init ── */
document.addEventListener("DOMContentLoaded", () => {
  updateStats();
  buildFilterBar();
  renderCards();
});