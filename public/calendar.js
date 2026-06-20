/* ============================================================
   Mini Star Child Care — Calendar / Events Module
   API: GET/POST/PATCH/DELETE /api/events
   Views: Month, Agenda
   ============================================================ */

let _CAL = null;
let _CAL_LOADING = false;
let _CAL_ERR = false;
let _CAL_VIEW = 'agenda'; // 'month' | 'agenda'
let _CAL_FORM = false;
let _CAL_EDIT = null; // event being edited
let _CAL_MONTH = null; // {year, month} — null = current

function _calReset() { _CAL = null; _CAL_LOADING = false; _CAL_ERR = false; _CAL_FORM = false; _CAL_EDIT = null; }

function _calCurrentMonth() {
  if (_CAL_MONTH) return _CAL_MONTH;
  const d = new Date();
  return { year: d.getFullYear(), month: d.getMonth() + 1 };
}

function _calMonthStr(y, m) {
  return y + '-' + String(m).padStart(2,'0');
}

function calendarView() {
  if (!apiToken()) return noTokenCard();

  const { year, month } = _calCurrentMonth();
  const from = _calMonthStr(year, month) + '-01';
  const lastDay = new Date(year, month, 0).getDate();
  const to = _calMonthStr(year, month) + '-' + lastDay;

  if (!_CAL && !_CAL_LOADING) {
    _CAL_LOADING = true; _CAL_ERR = false;
    apiFetch('/api/events?from=' + from + '&to=' + to)
      .then(r => r.ok ? r.json() : Promise.reject())
      .then(d => { _CAL = Array.isArray(d) ? d : []; _CAL_LOADING = false; renderPortal(); })
      .catch(() => { _CAL = []; _CAL_LOADING = false; _CAL_ERR = true; renderPortal(); });
    return loadingCard();
  }
  if (_CAL_LOADING) return loadingCard();
  if (_CAL_ERR) return errCard();

  if (_CAL_FORM || _CAL_EDIT) return _calForm();

  return _calViewLayout();
}

const _CAL_TYPE_COLORS = {
  holiday:  '#c0392b',
  meeting:  '#1B2A5E',
  activity: '#54A28F',
  reminder: '#EC5A2A'
};

function _calTypeLabel(type) {
  return ({
    holiday:  t('Holiday','Día Festivo'),
    meeting:  t('Meeting','Reunión'),
    activity: t('Activity','Actividad'),
    reminder: t('Reminder','Recordatorio')
  })[type] || type;
}

function _calEvBadge(type) {
  const color = _CAL_TYPE_COLORS[type] || '#888';
  return `<span style="background:${color};color:#fff;border-radius:999px;font-size:.72rem;padding:2px 8px;font-weight:600">${_calTypeLabel(type)}</span>`;
}

function _calViewLayout() {
  const { year, month } = _calCurrentMonth();
  const canCreate = CU.role === 'admin' || CU.role === 'teacher';
  const monthName = new Date(year, month - 1, 1).toLocaleDateString(LANG === 'es' ? 'es-US' : 'en-US', { month:'long', year:'numeric' });

  let h = `<div class="card" style="display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:10px">
    <div style="display:flex;align-items:center;gap:10px">
      <button class="mini-btn ghost" onclick="_calPrevMonth()">&#8592;</button>
      <b style="color:var(--night);font-size:1rem;min-width:160px;text-align:center">${esc(monthName)}</b>
      <button class="mini-btn ghost" onclick="_calNextMonth()">&#8594;</button>
      <button class="mini-btn ghost" onclick="_calGoToday()" style="font-size:.78rem">${t('Today','Hoy')}</button>
    </div>
    <div style="display:flex;gap:8px;flex-wrap:wrap">
      <div class="pill-tabs" style="margin:0">
        <button class="${_CAL_VIEW==='month'?'active':''}" onclick="_CAL_VIEW='month';renderPortal()" style="font-size:.8rem">&#128198; ${t('Month','Mes')}</button>
        <button class="${_CAL_VIEW==='agenda'?'active':''}" onclick="_CAL_VIEW='agenda';renderPortal()" style="font-size:.8rem">&#128203; ${t('Agenda','Agenda')}</button>
      </div>
      ${canCreate ? `<button class="mini-btn in" onclick="_calOpenForm()">+ ${t('New Event','Nuevo Evento')}</button>` : ''}
      <button class="mini-btn ghost" onclick="_calRefresh()">&#8635;</button>
    </div>
  </div>`;

  h += _CAL_VIEW === 'month' ? _calMonthView(year, month) : _calAgendaView(year, month);
  return h;
}

function _calMonthView(year, month) {
  const firstDOW = new Date(year, month - 1, 1).getDay(); // 0=Sun
  const daysInMonth = new Date(year, month, 0).getDate();
  const todayStr = today();
  const dayNames = LANG === 'es'
    ? ['Dom','Lun','Mar','Mié','Jue','Vie','Sáb']
    : ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];

  // Build event map by date
  const evMap = {};
  for (const ev of (_CAL||[])) {
    const d = ev.start_date ? ev.start_date.slice(0,10) : null;
    if (d) { if (!evMap[d]) evMap[d] = []; evMap[d].push(ev); }
  }

  let h = `<div class="card" style="padding:0;overflow:hidden">
    <div style="display:grid;grid-template-columns:repeat(7,1fr);background:var(--night)">
      ${dayNames.map(d => `<div style="text-align:center;padding:6px;color:#fff;font-size:.75rem;font-weight:700">${d}</div>`).join('')}
    </div>
    <div style="display:grid;grid-template-columns:repeat(7,1fr);border-left:1px solid #EAE2DA;border-top:1px solid #EAE2DA">`;

  let cellCount = 0;
  // Empty cells for first week
  for (let i = 0; i < firstDOW; i++) {
    h += `<div style="min-height:60px;border-right:1px solid #EAE2DA;border-bottom:1px solid #EAE2DA;background:#fafafa"></div>`;
    cellCount++;
  }

  for (let d = 1; d <= daysInMonth; d++) {
    const dateStr = _calMonthStr(year, month) + '-' + String(d).padStart(2,'0');
    const isToday = dateStr === todayStr;
    const evs = evMap[dateStr] || [];
    h += `<div style="min-height:60px;border-right:1px solid #EAE2DA;border-bottom:1px solid #EAE2DA;padding:4px;${isToday?'background:#fff8f0;':''}" >
      <div style="font-size:.82rem;font-weight:${isToday?'700':'400'};color:${isToday?'var(--gold)':'var(--night)'};margin-bottom:3px">${d}</div>
      ${evs.slice(0,2).map(ev => `<div style="background:${_CAL_TYPE_COLORS[ev.type]||'#888'};color:#fff;border-radius:4px;font-size:.68rem;padding:1px 4px;margin-bottom:2px;overflow:hidden;white-space:nowrap;text-overflow:ellipsis;cursor:pointer" onclick="_calShowEvent('${esc(ev.id)}')">${esc(ev.title)}</div>`).join('')}
      ${evs.length > 2 ? `<div style="font-size:.65rem;color:#888;padding-left:4px">+${evs.length-2} ${t('more','más')}</div>` : ''}
    </div>`;
    cellCount++;
  }

  // Fill remaining cells
  const remaining = (7 - (cellCount % 7)) % 7;
  for (let i = 0; i < remaining; i++) {
    h += `<div style="min-height:60px;border-right:1px solid #EAE2DA;border-bottom:1px solid #EAE2DA;background:#fafafa"></div>`;
  }

  h += `</div></div>`;
  return h;
}

function _calAgendaView(year, month) {
  if (!_CAL.length) {
    return `<div class="empty">&#128197; ${t('No events this month.','No hay eventos este mes.')}</div>`;
  }

  // Sort by date
  const sorted = [..._CAL].sort((a,b) => (a.start_date||'').localeCompare(b.start_date||''));
  const canManage = CU.role === 'admin' || CU.role === 'teacher';
  const todayStr = today();

  // Group by date
  let currentDate = null;
  let h = '';
  for (const ev of sorted) {
    const d = ev.start_date ? ev.start_date.slice(0,10) : null;
    if (d !== currentDate) {
      currentDate = d;
      const isToday = d === todayStr;
      const dateLabel = d ? new Date(d+'T12:00').toLocaleDateString(LANG==='es'?'es-US':'en-US',{weekday:'long',month:'long',day:'numeric'}) : '-';
      h += `<div style="padding:6px 0 4px;display:flex;align-items:center;gap:8px">
        <div style="width:8px;height:8px;background:${isToday?'var(--gold)':'var(--night)'};border-radius:50%;flex-shrink:0"></div>
        <b style="font-size:.85rem;color:${isToday?'var(--gold)':'var(--night)'}">${esc(dateLabel)}${isToday?' — '+t('Today','Hoy'):''}</b>
      </div>`;
    }
    h += `<div class="card" style="margin-bottom:0;border-left:4px solid ${_CAL_TYPE_COLORS[ev.type]||'#888'}">
      <div style="display:flex;align-items:flex-start;justify-content:space-between;gap:8px;flex-wrap:wrap">
        <div style="flex:1;min-width:0">
          <div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap;margin-bottom:6px">
            <b style="color:var(--night)">${esc(ev.title)}</b>
            ${_calEvBadge(ev.type)}
          </div>
          ${ev.description ? `<p style="margin:0 0 4px;font-size:.88rem;color:var(--ink)">${esc(ev.description)}</p>` : ''}
          <p class="soft" style="font-size:.8rem;margin:0">
            ${!ev.all_day && ev.start_time ? '&#9200; '+esc(ev.start_time)+(ev.end_time?' – '+esc(ev.end_time):'') : t('All day','Todo el día')}
            ${ev.classroom ? ' &middot; &#127979; '+esc(ev.classroom.name) : ''}
          </p>
        </div>
        ${canManage ? `<div style="display:flex;gap:5px">
          <button class="mini-btn ghost" style="font-size:.75rem" onclick="_calEditEvent('${esc(ev.id)}')">&#9998;</button>
          <button class="mini-btn danger" style="font-size:.75rem" onclick="_calDeleteEvent('${esc(ev.id)}')">&#128465;</button>
        </div>` : ''}
      </div>
    </div>`;
  }

  return h;
}

function _calForm() {
  const ev = _CAL_EDIT ? _CAL.find(e => e.id === _CAL_EDIT) : null;
  const { year, month } = _calCurrentMonth();
  const defaultDate = _calMonthStr(year, month) + '-' + String(new Date().getDate()).padStart(2,'0');

  return `<div style="display:flex;align-items:center;gap:10px;margin-bottom:14px;flex-wrap:wrap">
    <button class="mini-btn ghost" onclick="_calCancelForm()">&#8592; ${t('Back','Volver')}</button>
    <h3 style="margin:0;color:var(--night)">&#128197; ${ev ? t('Edit Event','Editar Evento') : t('New Event','Nuevo Evento')}</h3>
  </div>
  <div class="card">
    <div class="field"><label>${t('Event Title *','Título del Evento *')}</label><input id="cal-title" value="${ev?esc(ev.title):''}"></div>
    <div class="field"><label>${t('Description','Descripción')}</label><textarea id="cal-desc" rows="2">${ev?esc(ev.description||''):''}</textarea></div>
    <div class="rc-grid">
      <div class="field" style="margin:0"><label>${t('Type *','Tipo *')}</label>
        <select id="cal-type">
          <option value="activity" ${ev&&ev.type==='activity'?'selected':''}>${t('Activity','Actividad')}</option>
          <option value="meeting"  ${ev&&ev.type==='meeting' ?'selected':''}>${t('Meeting','Reunión')}</option>
          <option value="holiday"  ${ev&&ev.type==='holiday' ?'selected':''}>${t('Holiday','Día Festivo')}</option>
          <option value="reminder" ${ev&&ev.type==='reminder'?'selected':''}>${t('Reminder','Recordatorio')}</option>
        </select>
      </div>
      <div class="field" style="margin:0"><label>${t('All Day?','¿Todo el día?')}</label>
        <select id="cal-allday" onchange="_calToggleTime(this.value)">
          <option value="yes" ${!ev||ev.all_day!==false?'selected':''}>${t('Yes','Sí')}</option>
          <option value="no"  ${ev&&ev.all_day===false?'selected':''}>${t('No','No')}</option>
        </select>
      </div>
    </div>
    <div class="rc-grid">
      <div class="field" style="margin:0"><label>${t('Start Date *','Fecha de Inicio *')}</label><input type="date" id="cal-start" value="${ev?esc(ev.start_date||defaultDate):defaultDate}"></div>
      <div class="field" style="margin:0"><label>${t('End Date','Fecha de Fin')}</label><input type="date" id="cal-end" value="${ev?esc(ev.end_date||''):''}"></div>
    </div>
    <div id="cal-time-row" style="${(!ev||ev.all_day!==false)?'display:none':''}">
      <div class="rc-grid">
        <div class="field" style="margin:0"><label>${t('Start Time','Hora de Inicio')}</label><input type="time" id="cal-time-s" value="${ev?esc(ev.start_time||''):''}"></div>
        <div class="field" style="margin:0"><label>${t('End Time','Hora de Fin')}</label><input type="time" id="cal-time-e" value="${ev?esc(ev.end_time||''):''}"></div>
      </div>
    </div>
    <button class="btn btn-night btn-full" onclick="_calSubmit()">${ev ? t('Update Event','Actualizar Evento') : '&#128197; '+t('Save Event','Guardar Evento')}</button>
    <div class="form-msg" id="cal-msg"></div>
  </div>`;
}

function _calToggleTime(val) {
  const row = document.getElementById('cal-time-row');
  if (row) row.style.display = val === 'no' ? '' : 'none';
}

function _calOpenForm() { _CAL_FORM = true; _CAL_EDIT = null; renderPortal(); }
function _calCancelForm() { _CAL_FORM = false; _CAL_EDIT = null; renderPortal(); }
function _calRefresh() { _CAL = null; _CAL_ERR = false; renderPortal(); }
function _calShowEvent(id) { /* future: detail modal — for now just show in agenda */ _CAL_VIEW = 'agenda'; renderPortal(); }
function _calEditEvent(id) { _CAL_EDIT = id; _CAL_FORM = true; renderPortal(); }

function _calPrevMonth() {
  const { year, month } = _calCurrentMonth();
  _CAL_MONTH = month === 1 ? { year: year-1, month: 12 } : { year, month: month-1 };
  _CAL = null; renderPortal();
}
function _calNextMonth() {
  const { year, month } = _calCurrentMonth();
  _CAL_MONTH = month === 12 ? { year: year+1, month: 1 } : { year, month: month+1 };
  _CAL = null; renderPortal();
}
function _calGoToday() { _CAL_MONTH = null; _CAL = null; renderPortal(); }

function _calDeleteEvent(id) {
  if (!confirm(t('Delete this event?','¿Eliminar este evento?'))) return;
  apiFetch('/api/events/'+id, { method:'DELETE' })
    .then(r => r.ok ? r.json() : Promise.reject())
    .then(() => { _CAL = null; renderPortal(); })
    .catch(() => alert(t('Error deleting event.','Error al eliminar evento.')));
}

function _calSubmit() {
  const title   = (document.getElementById('cal-title')||{}).value||'';
  const desc    = (document.getElementById('cal-desc')||{}).value||'';
  const type    = (document.getElementById('cal-type')||{}).value||'activity';
  const allday  = (document.getElementById('cal-allday')||{}).value === 'yes';
  const start   = (document.getElementById('cal-start')||{}).value||'';
  const end     = (document.getElementById('cal-end')||{}).value||'';
  const timeS   = (document.getElementById('cal-time-s')||{}).value||'';
  const timeE   = (document.getElementById('cal-time-e')||{}).value||'';

  if (!title) { msg('cal-msg', t('Enter a title.','Ingrese un título.')); return; }
  if (!start) { msg('cal-msg', t('Select a start date.','Seleccione una fecha de inicio.')); return; }

  const body = { title, description:desc, type, start_date:start, end_date:end||null, all_day:allday };
  if (!allday) { body.start_time = timeS||null; body.end_time = timeE||null; }

  const isEdit = !!_CAL_EDIT;
  const url = isEdit ? '/api/events/'+_CAL_EDIT : '/api/events';
  const method = isEdit ? 'PATCH' : 'POST';

  apiFetch(url, { method, body: JSON.stringify(body) })
    .then(r => r.ok ? r.json() : Promise.reject())
    .then(() => { _CAL = null; _CAL_FORM = false; _CAL_EDIT = null; renderPortal(); })
    .catch(() => msg('cal-msg', t('Error saving event. Try again.','Error al guardar evento. Intente de nuevo.')));
}
