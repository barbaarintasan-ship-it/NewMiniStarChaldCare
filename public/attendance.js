/* ============================================================
   Mini Star Child Care — Attendance Page Module
   API: GET /api/attendance, POST /api/attendance,
        GET /api/attendance/stats/:childId
   Different from My Class quick check-in: this is full history,
   bulk marking, stats, and reporting.
   ============================================================ */

let _ATT = null;
let _ATT_LOADING = false;
let _ATT_ERR = false;
let _ATT_DATE = null; // selected date, null = today
let _ATT_VIEW = 'daily'; // 'daily' | 'history' | 'stats'
let _ATT_CHILD_FILTER = ''; // child id filter for parent/stats view
let _ATT_BULK = {}; // { childId: { status, check_in, check_out, notes } }

function _attGetDate() { return _ATT_DATE || today(); }

function _attReset() { _ATT = null; _ATT_LOADING = false; _ATT_ERR = false; _ATT_BULK = {}; }

function attendanceView() {
  if (!apiToken()) return noTokenCard();

  // Determine query params based on view
  let url = '/api/attendance';
  const d = _attGetDate();

  if (_ATT_VIEW === 'daily') {
    url += '?date=' + d;
  } else if (_ATT_VIEW === 'history') {
    // Last 30 days
    const past = new Date(); past.setDate(past.getDate() - 29);
    const fromStr = past.toISOString().slice(0,10);
    url += '?from=' + fromStr + '&to=' + d;
    if (_ATT_CHILD_FILTER) url += '&child_id=' + _ATT_CHILD_FILTER;
  } else if (_ATT_VIEW === 'stats') {
    const nd = new Date(d);
    url = '/api/attendance?from=' + nd.getFullYear() + '-' + String(nd.getMonth()+1).padStart(2,'0') + '-01&to=' + d;
    if (_ATT_CHILD_FILTER) url += '&child_id=' + _ATT_CHILD_FILTER;
  }

  if (!_ATT && !_ATT_LOADING) {
    _ATT_LOADING = true; _ATT_ERR = false;
    apiFetch(url)
      .then(r => r.ok ? r.json() : Promise.reject())
      .then(data => { _ATT = Array.isArray(data) ? data : []; _ATT_LOADING = false; renderPortal(); })
      .catch(() => { _ATT = []; _ATT_LOADING = false; _ATT_ERR = true; renderPortal(); });
    return loadingCard();
  }
  if (_ATT_LOADING) return loadingCard();
  if (_ATT_ERR) return errCard();

  return _attLayout();
}

function _attStatusColor(st) {
  return ({present:'#54A28F',absent:'#c0392b',late:'#e67e22',early_pickup:'#8e44ad',excused:'#3498db'})[st]||'#888';
}

function _attStatusLabel(st) {
  return ({
    present:      t('Present','Presente'),
    absent:       t('Absent','Ausente'),
    late:         t('Late','Tarde'),
    early_pickup: t('Early Pickup','Salida Temprana'),
    excused:      t('Excused','Justificado')
  })[st] || (st||'-');
}

function _attStatusBadge(st) {
  return `<span style="background:${_attStatusColor(st)};color:#fff;border-radius:999px;font-size:.72rem;padding:2px 10px;font-weight:600">${_attStatusLabel(st)}</span>`;
}

function _attLayout() {
  const canMark = CU.role === 'admin' || CU.role === 'teacher';
  const d = _attGetDate();

  let h = `<div class="card" style="display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:10px">
    <div>
      <p class="lead" style="margin:0">&#9989; ${t('Attendance','Asistencia')}</p>
    </div>
    <div style="display:flex;gap:8px;flex-wrap:wrap">
      <button class="mini-btn ghost" onclick="_attRefresh()">&#8635; ${t('Refresh','Actualizar')}</button>
    </div>
  </div>
  <div class="pill-tabs" style="margin-bottom:14px">
    <button class="${_ATT_VIEW==='daily'?'active':''}" onclick="_ATT_VIEW='daily';_ATT=null;renderPortal()">&#128197; ${t('Daily','Diario')}</button>
    <button class="${_ATT_VIEW==='history'?'active':''}" onclick="_ATT_VIEW='history';_ATT=null;renderPortal()">&#128193; ${t('History','Historial')}</button>
    <button class="${_ATT_VIEW==='stats'?'active':''}" onclick="_ATT_VIEW='stats';_ATT=null;renderPortal()">&#128202; ${t('Stats','Estadísticas')}</button>
  </div>`;

  if (_ATT_VIEW === 'daily') h += _attDailyView(d, canMark);
  else if (_ATT_VIEW === 'history') h += _attHistoryView();
  else h += _attStatsView();

  return h;
}

function _attDailyView(d, canMark) {
  let h = `<div class="card">
    <div class="field" style="margin-bottom:10px">
      <label>${t('Date','Fecha')}</label>
      <input type="date" id="att-date" value="${d}" onchange="_ATT_DATE=this.value;_ATT=null;_ATT_BULK={};renderPortal()">
    </div>
  </div>`;

  // If admin/teacher and no records yet, show all children for bulk marking
  const children = typeof DB !== 'undefined' ? DB.children || [] : [];
  const myClassChildren = CU.role === 'teacher'
    ? children.filter(c => c.classId === CU.classId)
    : children;

  if (!_ATT.length && canMark && myClassChildren.length) {
    h += `<div class="card" style="margin-top:0">
      <p class="lead">&#128221; ${t('Mark Attendance for','Marcar Asistencia para')} ${fmtDate(d)}</p>
      <p class="soft" style="font-size:.85rem;margin-bottom:14px">${myClassChildren.length} ${t('children','niños')}</p>
      ${myClassChildren.map(c => {
        const bulk = _ATT_BULK[c.id] || { status:'present', check_in:'', check_out:'', notes:'' };
        return `<div style="background:#f8f5f0;border-radius:10px;padding:10px 12px;margin-bottom:8px">
          <div style="display:flex;align-items:center;justify-content:space-between;gap:8px;flex-wrap:wrap;margin-bottom:8px">
            <b style="color:var(--night)">${esc(c.name)}</b>
            <select onchange="_attBulkSet('${esc(c.id)}','status',this.value)" style="font-size:.85rem;padding:4px 8px;border-radius:8px;border:1px solid #DDD">
              <option value="present"       ${bulk.status==='present'?'selected':''}>${t('Present','Presente')}</option>
              <option value="absent"        ${bulk.status==='absent'?'selected':''}>${t('Absent','Ausente')}</option>
              <option value="late"          ${bulk.status==='late'?'selected':''}>${t('Late','Tarde')}</option>
              <option value="early_pickup"  ${bulk.status==='early_pickup'?'selected':''}>${t('Early Pickup','Salida Temprana')}</option>
              <option value="excused"       ${bulk.status==='excused'?'selected':''}>${t('Excused','Justificado')}</option>
            </select>
          </div>
          <div class="rc-grid" style="gap:8px">
            <div style="display:flex;flex-direction:column;gap:3px">
              <label style="font-size:.78rem;color:#888">${t('Check In','Entrada')}</label>
              <input type="time" value="${esc(bulk.check_in)}" onchange="_attBulkSet('${esc(c.id)}','check_in',this.value)" style="font-size:.85rem">
            </div>
            <div style="display:flex;flex-direction:column;gap:3px">
              <label style="font-size:.78rem;color:#888">${t('Check Out','Salida')}</label>
              <input type="time" value="${esc(bulk.check_out)}" onchange="_attBulkSet('${esc(c.id)}','check_out',this.value)" style="font-size:.85rem">
            </div>
          </div>
        </div>`;
      }).join('')}
      <button class="btn btn-night btn-full" onclick="_attBulkSave()">${t('Save All','Guardar Todo')}</button>
      <div class="form-msg" id="att-msg"></div>
    </div>`;
    return h;
  }

  // Show existing records
  if (!_ATT.length) {
    h += `<div class="empty">&#9989; ${t('No attendance records for this date.','Sin registros de asistencia para esta fecha.')}</div>`;
    return h;
  }

  const summary = { present:0, absent:0, late:0, early_pickup:0, excused:0 };
  for (const r of _ATT) if (summary[r.status] !== undefined) summary[r.status]++;

  h += `<div class="stat-grid" style="margin-bottom:14px">
    <div class="stat-box" style="border-top:4px solid #54A28F"><div class="stat-num">${summary.present}</div><div class="stat-lbl">${t('Present','Presente')}</div></div>
    <div class="stat-box" style="border-top:4px solid #c0392b"><div class="stat-num">${summary.absent}</div><div class="stat-lbl">${t('Absent','Ausente')}</div></div>
    <div class="stat-box" style="border-top:4px solid #e67e22"><div class="stat-num">${summary.late}</div><div class="stat-lbl">${t('Late','Tarde')}</div></div>
    <div class="stat-box" style="border-top:4px solid #3498db"><div class="stat-num">${summary.excused}</div><div class="stat-lbl">${t('Excused','Justificado')}</div></div>
  </div>`;

  h += _ATT.map(r => {
    const childName = (r.child && r.child.name) ? r.child.name : t('Unknown','Desconocido');
    const teacherName = (r.teacher && r.teacher.name) ? r.teacher.name : '';
    return `<div class="card" style="margin-bottom:0;border-left:4px solid ${_attStatusColor(r.status)}">
      <div style="display:flex;align-items:center;justify-content:space-between;gap:8px;flex-wrap:wrap">
        <div>
          <div style="display:flex;align-items:center;gap:8px;margin-bottom:4px">
            <b style="color:var(--night)">${esc(childName)}</b>
            ${_attStatusBadge(r.status)}
          </div>
          <p class="soft" style="font-size:.8rem;margin:0">
            ${r.check_in ? '&#9200; '+t('In:','Entrada:')+' '+esc(r.check_in) : ''}
            ${r.check_out ? ' &middot; &#127968; '+t('Out:','Salida:')+' '+esc(r.check_out) : ''}
            ${teacherName ? ' &middot; &#129489; '+esc(teacherName) : ''}
            ${r.notes ? '<br>&#128221; '+esc(r.notes) : ''}
          </p>
        </div>
      </div>
    </div>`;
  }).join('');

  return h;
}

function _attHistoryView() {
  const children = typeof DB !== 'undefined' ? DB.children || [] : [];
  let h = `<div class="card">
    <div class="rc-grid">
      <div class="field" style="margin:0"><label>${t('Child','Niño')}</label>
        <select id="att-child-filter" onchange="_ATT_CHILD_FILTER=this.value;_ATT=null;renderPortal()">
          <option value="">${CU.role==='parent' ? '' : '-- '+t('All children','Todos los niños')+' --'}</option>
          ${children.map(c => `<option value="${esc(c.id)}" ${_ATT_CHILD_FILTER===c.id?'selected':''}>${esc(c.name)}</option>`).join('')}
        </select>
      </div>
    </div>
  </div>`;

  if (!_ATT.length) {
    return h + `<div class="empty">&#128193; ${t('No attendance history found.','Sin historial de asistencia.')}</div>`;
  }

  // Group by date descending
  const grouped = {};
  for (const r of _ATT) {
    const d = r.date || '-';
    if (!grouped[d]) grouped[d] = [];
    grouped[d].push(r);
  }
  const sortedDates = Object.keys(grouped).sort((a,b) => b.localeCompare(a));

  for (const d of sortedDates) {
    const recs = grouped[d];
    const present = recs.filter(r => r.status === 'present').length;
    h += `<div style="padding:4px 0 2px">
      <b style="font-size:.85rem;color:var(--night)">&#128197; ${fmtDate(d)}</b>
      <span class="soft" style="font-size:.8rem"> &middot; ${present}/${recs.length} ${t('present','presentes')}</span>
    </div>`;
    for (const r of recs) {
      const childName = (r.child && r.child.name) ? r.child.name : '-';
      h += `<div class="card" style="margin-bottom:0;padding:8px 12px;border-left:4px solid ${_attStatusColor(r.status)}">
        <div style="display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:6px">
          <span style="font-size:.87rem"><b>${esc(childName)}</b></span>
          ${_attStatusBadge(r.status)}
          <span class="soft" style="font-size:.78rem">
            ${r.check_in?'&#9200; '+esc(r.check_in):''}
            ${r.check_out?' &#127968; '+esc(r.check_out):''}
          </span>
        </div>
      </div>`;
    }
  }

  return h;
}

function _attStatsView() {
  const children = typeof DB !== 'undefined' ? DB.children || [] : [];
  const nd = new Date(_attGetDate());
  const monthName = nd.toLocaleDateString(LANG==='es'?'es-US':'en-US',{month:'long',year:'numeric'});

  let h = `<div class="card">
    <div class="rc-grid">
      <div class="field" style="margin:0"><label>${t('Child','Niño')}</label>
        <select id="att-stats-child" onchange="_ATT_CHILD_FILTER=this.value;_ATT=null;renderPortal()">
          <option value="">${CU.role==='parent'?'':('-- '+t('All children','Todos los niños')+' --')}</option>
          ${children.map(c => `<option value="${esc(c.id)}" ${_ATT_CHILD_FILTER===c.id?'selected':''}>${esc(c.name)}</option>`).join('')}
        </select>
      </div>
      <div class="field" style="margin:0"><label>${t('Month','Mes')}</label>
        <input type="month" id="att-stats-month" value="${nd.getFullYear()+'-'+String(nd.getMonth()+1).padStart(2,'0')}"
          onchange="_ATT_DATE=this.value+'-01';_ATT=null;renderPortal()">
      </div>
    </div>
  </div>
  <p class="lead" style="margin-top:6px">&#128202; ${t('Attendance Stats','Estadísticas de Asistencia')} &mdash; ${esc(monthName)}</p>`;

  if (!_ATT.length) {
    return h + `<div class="empty">&#128202; ${t('No data for this period.','Sin datos para este período.')}</div>`;
  }

  // Compute stats per child
  const childStats = {};
  for (const r of _ATT) {
    const cid = r.child_id;
    const cname = (r.child && r.child.name) ? r.child.name : cid;
    if (!childStats[cid]) childStats[cid] = { name: cname, present:0, absent:0, late:0, early_pickup:0, excused:0, total:0 };
    childStats[cid].total++;
    if (childStats[cid][r.status] !== undefined) childStats[cid][r.status]++;
  }

  for (const [, cs] of Object.entries(childStats)) {
    const rate = cs.total ? Math.round(((cs.present + cs.late) / cs.total) * 100) : 0;
    h += `<div class="card" style="margin-bottom:0;border-left:4px solid var(--teal)">
      <div style="display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:8px;margin-bottom:10px">
        <b style="color:var(--night)">${esc(cs.name)}</b>
        <span style="background:${rate>=90?'#54A28F':rate>=75?'#e67e22':'#c0392b'};color:#fff;border-radius:999px;padding:3px 10px;font-size:.8rem;font-weight:700">${rate}% ${t('rate','tasa')}</span>
      </div>
      <div class="stat-grid">
        <div class="stat-box" style="border-top:3px solid #54A28F"><div class="stat-num" style="font-size:1.3rem">${cs.present}</div><div class="stat-lbl">${t('Present','Presente')}</div></div>
        <div class="stat-box" style="border-top:3px solid #c0392b"><div class="stat-num" style="font-size:1.3rem">${cs.absent}</div><div class="stat-lbl">${t('Absent','Ausente')}</div></div>
        <div class="stat-box" style="border-top:3px solid #e67e22"><div class="stat-num" style="font-size:1.3rem">${cs.late}</div><div class="stat-lbl">${t('Late','Tarde')}</div></div>
        <div class="stat-box" style="border-top:3px solid #3498db"><div class="stat-num" style="font-size:1.3rem">${cs.excused}</div><div class="stat-lbl">${t('Excused','Justificado')}</div></div>
      </div>
    </div>`;
  }

  return h;
}

function _attBulkSet(childId, field, value) {
  if (!_ATT_BULK[childId]) _ATT_BULK[childId] = { status:'present', check_in:'', check_out:'', notes:'' };
  _ATT_BULK[childId][field] = value;
}

function _attBulkSave() {
  const d = _attGetDate();
  const children = typeof DB !== 'undefined' ? DB.children || [] : [];
  const myClassChildren = CU.role === 'teacher'
    ? children.filter(c => c.classId === CU.classId)
    : children;

  if (!myClassChildren.length) return;

  const records = myClassChildren.map(c => {
    const bulk = _ATT_BULK[c.id] || { status:'present', check_in:'', check_out:'', notes:'' };
    return {
      child_id: c.id,
      classroom_id: c.classId || null,
      date: d,
      status: bulk.status,
      check_in: bulk.check_in || null,
      check_out: bulk.check_out || null,
      notes: bulk.notes || null
    };
  });

  apiFetch('/api/attendance', { method:'POST', body: JSON.stringify(records) })
    .then(r => r.ok ? r.json() : Promise.reject())
    .then(() => { _ATT = null; _ATT_BULK = {}; msg('att-msg', t('Attendance saved!','¡Asistencia guardada!'), true); setTimeout(()=>renderPortal(), 1000); })
    .catch(() => msg('att-msg', t('Error saving attendance.','Error al guardar asistencia.')));
}

function _attRefresh() { _ATT = null; _ATT_ERR = false; renderPortal(); }
