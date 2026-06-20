/* ============================================================
   Mini Star Child Care — Incidents Module
   API: GET/POST /api/incidents, PATCH /api/incidents/:id
   ============================================================ */

let _INC = null;
let _INC_LOADING = false;
let _INC_ERR = false;
let _INC_FORM = false;
let _INC_DETAIL = null; // selected incident id for detail view

function _incReset() { _INC = null; _INC_LOADING = false; _INC_ERR = false; _INC_FORM = false; _INC_DETAIL = null; }

function incidentsView() {
  if (!apiToken()) return noTokenCard();

  if (!_INC && !_INC_LOADING) {
    _INC_LOADING = true;
    _INC_ERR = false;
    apiFetch('/api/incidents')
      .then(r => r.ok ? r.json() : Promise.reject())
      .then(d => { _INC = Array.isArray(d) ? d : []; _INC_LOADING = false; renderPortal(); })
      .catch(() => { _INC = []; _INC_LOADING = false; _INC_ERR = true; renderPortal(); });
    return loadingCard();
  }
  if (_INC_LOADING) return loadingCard();
  if (_INC_ERR) return errCard();

  if (_INC_FORM) return _incForm();
  if (_INC_DETAIL) {
    const it = _INC.find(i => i.id === _INC_DETAIL);
    if (it) return _incDetail(it);
    _INC_DETAIL = null;
  }

  return _incList();
}

function _incSevBadge(sev) {
  const cfg = {
    low:    { color:'#54A28F', label: t('Low','Leve') },
    medium: { color:'#EC5A2A', label: t('Medium','Moderado') },
    high:   { color:'#c0392b', label: t('High','Grave') }
  };
  const c = cfg[sev] || cfg.low;
  return `<span style="background:${c.color};color:#fff;border-radius:999px;font-size:.72rem;padding:2px 10px;font-weight:700">${c.label}</span>`;
}

function _incStatusBadge(st) {
  const cfg = {
    open:     { color:'#EC5A2A', label: t('Open','Abierto') },
    resolved: { color:'#54A28F', label: t('Resolved','Resuelto') },
    closed:   { color:'#888',    label: t('Closed','Cerrado') }
  };
  const c = cfg[st] || cfg.open;
  return `<span style="background:${c.color};color:#fff;border-radius:999px;font-size:.72rem;padding:2px 10px">${c.label}</span>`;
}

function _incList() {
  const canCreate = CU.role === 'admin' || CU.role === 'teacher';
  let h = `<div class="card" style="display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:10px">
    <div>
      <p class="lead" style="margin:0">&#128680; ${t('Incidents','Incidentes')}</p>
      <p class="soft" style="margin:4px 0 0;font-size:.85rem">${_INC.length} ${t('record(s)','registro(s)')}</p>
    </div>
    <div style="display:flex;gap:8px;flex-wrap:wrap">
      ${canCreate ? `<button class="mini-btn in" onclick="_incOpenForm()">+ ${t('New Incident','Nuevo Incidente')}</button>` : ''}
      <button class="mini-btn ghost" onclick="_incRefresh()">&#8635; ${t('Refresh','Actualizar')}</button>
    </div>
  </div>`;

  if (!_INC.length) {
    return h + `<div class="empty">&#128680; ${t('No incidents recorded yet.','No hay incidentes registrados.')}</div>`;
  }

  h += _INC.map(i => {
    const childName = (i.child && i.child.name) ? esc(i.child.name) : t('Unknown','Desconocido');
    const teacherName = (i.teacher && i.teacher.name) ? esc(i.teacher.name) : '';
    const classroomName = (i.classroom && i.classroom.name) ? esc(i.classroom.name) : '';
    return `<div class="card" style="margin-bottom:0;border-left:4px solid ${i.severity==='high'?'#c0392b':i.severity==='medium'?'#EC5A2A':'#54A28F'}">
      <div style="display:flex;align-items:flex-start;justify-content:space-between;gap:10px;flex-wrap:wrap">
        <div style="flex:1;min-width:0">
          <div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap;margin-bottom:6px">
            <b style="color:var(--night)">${childName}</b>
            ${_incSevBadge(i.severity)}
            ${_incStatusBadge(i.status || 'open')}
            ${i.parent_notified ? `<span style="background:#2ecc71;color:#fff;border-radius:999px;font-size:.72rem;padding:2px 8px">&#9989; ${t('Parent Notified','Padre Notificado')}</span>` : ''}
          </div>
          <p style="margin:0 0 4px;font-size:.88rem;color:var(--ink)">${esc(i.description || '')}</p>
          <p class="soft" style="font-size:.8rem;margin:0">
            &#128197; ${esc(i.date || '')} ${i.time ? '&#9200; '+esc(i.time) : ''}
            ${i.location ? ' &middot; &#128205; '+esc(i.location) : ''}
            ${teacherName ? ' &middot; &#129489; '+teacherName : ''}
            ${classroomName ? ' &middot; &#127979; '+classroomName : ''}
          </p>
        </div>
        <div style="display:flex;flex-direction:column;gap:6px;min-width:110px">
          <button class="mini-btn ghost" onclick="_incShowDetail('${esc(i.id)}')">&#128065; ${t('Details','Detalles')}</button>
          ${canCreate && (i.status || 'open') !== 'closed' ? `
            <button class="mini-btn ghost" onclick="_incUpdateStatus('${esc(i.id)}','resolved')" style="font-size:.78rem">&#9989; ${t('Resolve','Resolver')}</button>
            ${!i.parent_notified ? `<button class="mini-btn ghost" onclick="_incNotifyParent('${esc(i.id)}')" style="font-size:.78rem">&#128172; ${t('Notify Parent','Notif. Padre')}</button>` : ''}
          ` : ''}
        </div>
      </div>
    </div>`;
  }).join('');

  return h;
}

function _incDetail(i) {
  const canEdit = CU.role === 'admin' || CU.role === 'teacher';
  const childName = (i.child && i.child.name) ? esc(i.child.name) : t('Unknown','Desconocido');
  const teacherName = (i.teacher && i.teacher.name) ? esc(i.teacher.name) : '-';
  const classroomName = (i.classroom && i.classroom.name) ? esc(i.classroom.name) : '-';
  return `<div style="display:flex;align-items:center;gap:10px;margin-bottom:14px;flex-wrap:wrap">
    <button class="mini-btn ghost" onclick="_INC_DETAIL=null;renderPortal()">&#8592; ${t('Back','Volver')}</button>
    <h3 style="margin:0;color:var(--night)">&#128680; ${t('Incident Report','Reporte de Incidente')}</h3>
  </div>
  <div class="card">
    <div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap;margin-bottom:12px">
      ${_incSevBadge(i.severity)} ${_incStatusBadge(i.status || 'open')}
      ${i.parent_notified ? `<span style="background:#2ecc71;color:#fff;border-radius:999px;font-size:.72rem;padding:2px 8px">&#9989; ${t('Parent Notified','Padre Notificado')}</span>` : ''}
    </div>
    <div class="rc-grid">
      <div><p class="soft" style="font-size:.8rem;margin:0 0 2px">${t('Child','Niño')}</p><b>${childName}</b></div>
      <div><p class="soft" style="font-size:.8rem;margin:0 0 2px">${t('Date & Time','Fecha y Hora')}</p><b>${esc(i.date || '')} ${i.time ? esc(i.time) : ''}</b></div>
      <div><p class="soft" style="font-size:.8rem;margin:0 0 2px">${t('Location','Lugar')}</p><b>${esc(i.location || '-')}</b></div>
      <div><p class="soft" style="font-size:.8rem;margin:0 0 2px">${t('Injury Type','Tipo de Lesión')}</p><b>${esc(i.injury_type || '-')}</b></div>
      <div><p class="soft" style="font-size:.8rem;margin:0 0 2px">${t('Reported By','Reportado por')}</p><b>${teacherName}</b></div>
      <div><p class="soft" style="font-size:.8rem;margin:0 0 2px">${t('Classroom','Salón')}</p><b>${classroomName}</b></div>
    </div>
    <div style="margin-top:12px">
      <p class="soft" style="font-size:.8rem;margin:0 0 4px">${t('Description','Descripción')}</p>
      <p style="background:#f8f5f0;border-radius:8px;padding:10px 12px;margin:0">${esc(i.description || '-')}</p>
    </div>
    <div style="margin-top:12px">
      <p class="soft" style="font-size:.8rem;margin:0 0 4px">${t('First Aid Given','Primeros Auxilios')}</p>
      <p style="background:#f8f5f0;border-radius:8px;padding:10px 12px;margin:0">${esc(i.first_aid || '-')}</p>
    </div>
    ${i.parent_notified_at ? `<p class="soft" style="font-size:.8rem;margin-top:10px">&#9200; ${t('Parent notified at','Padre notificado a las:')} ${new Date(i.parent_notified_at).toLocaleString()}</p>` : ''}
  </div>
  ${canEdit && (i.status || 'open') !== 'closed' ? `
  <div class="card" style="margin-top:0">
    <p class="lead">${t('Actions','Acciones')}</p>
    <div style="display:flex;gap:8px;flex-wrap:wrap">
      ${(i.status || 'open') !== 'resolved' ? `<button class="mini-btn in" onclick="_incUpdateStatus('${esc(i.id)}','resolved')">&#9989; ${t('Mark Resolved','Marcar Resuelto')}</button>` : ''}
      ${(i.status || 'open') !== 'closed' ? `<button class="mini-btn ghost" onclick="_incUpdateStatus('${esc(i.id)}','closed')">&#128274; ${t('Close','Cerrar')}</button>` : ''}
      ${!i.parent_notified ? `<button class="mini-btn ghost" onclick="_incNotifyParent('${esc(i.id)}')">&#128172; ${t('Mark Parent Notified','Marcar Padre Notificado')}</button>` : ''}
    </div>
  </div>` : ''}`;
}

function _incForm() {
  const children = typeof DB !== 'undefined' ? DB.children || [] : [];
  return `<div style="display:flex;align-items:center;gap:10px;margin-bottom:14px;flex-wrap:wrap">
    <button class="mini-btn ghost" onclick="_INC_FORM=false;renderPortal()">&#8592; ${t('Back','Volver')}</button>
    <h3 style="margin:0;color:var(--night)">&#128680; ${t('New Incident Report','Nuevo Reporte de Incidente')}</h3>
  </div>
  <div class="card">
    <div class="field"><label>${t('Child *','Niño *')}</label>
      <select id="inc-child">
        <option value="">-- ${t('Select child','Seleccionar niño')} --</option>
        ${children.map(c => `<option value="${esc(c.id)}">${esc(c.name)}</option>`).join('')}
      </select>
    </div>
    <div class="rc-grid">
      <div class="field" style="margin:0"><label>${t('Date *','Fecha *')}</label><input type="date" id="inc-date" value="${today()}"></div>
      <div class="field" style="margin:0"><label>${t('Time','Hora')}</label><input type="time" id="inc-time" value="${nowTime()}"></div>
    </div>
    <div class="field"><label>${t('Location *','Lugar *')}</label><input id="inc-loc" placeholder="${t('e.g. Playground, Classroom','Ej.: Patio, Salón')}"></div>
    <div class="field"><label>${t('Severity *','Severidad *')}</label>
      <select id="inc-sev">
        <option value="low">${t('Low — Minor scrape, no treatment needed','Leve — Rasguño menor, sin tratamiento')}</option>
        <option value="medium">${t('Medium — Required first aid','Moderado — Requirió primeros auxilios')}</option>
        <option value="high">${t('High — Medical attention needed','Grave — Requiere atención médica')}</option>
      </select>
    </div>
    <div class="field"><label>${t('Injury Type','Tipo de Lesión')}</label><input id="inc-injury" placeholder="${t('e.g. Bruise, Cut, Fall','Ej.: Moretón, Corte, Caída')}"></div>
    <div class="field"><label>${t('Description *','Descripción *')}</label><textarea id="inc-desc" placeholder="${t('What happened?','¿Qué ocurrió?')}" rows="3"></textarea></div>
    <div class="field"><label>${t('First Aid Given','Primeros Auxilios Brindados')}</label><textarea id="inc-aid" placeholder="${t('Describe treatment given...','Describa el tratamiento dado...')}" rows="2"></textarea></div>
    <button class="btn btn-night btn-full" onclick="_incSubmit()">&#128680; ${t('Save Incident Report','Guardar Reporte de Incidente')}</button>
    <div class="form-msg" id="inc-msg"></div>
  </div>`;
}

function _incOpenForm() { _INC_FORM = true; renderPortal(); }

function _incRefresh() { _INC = null; _INC_ERR = false; renderPortal(); }

function _incShowDetail(id) { _INC_DETAIL = id; renderPortal(); }

function _incUpdateStatus(id, status) {
  apiFetch('/api/incidents/'+id, {method:'PATCH', body:JSON.stringify({status})})
    .then(r=>r.ok?r.json():Promise.reject())
    .then(() => { _INC = null; _INC_DETAIL = id; renderPortal(); })
    .catch(() => alert(t('Error updating status.','Error al actualizar estado.')));
}

function _incNotifyParent(id) {
  apiFetch('/api/incidents/'+id, {method:'PATCH', body:JSON.stringify({parent_notified:true})})
    .then(r=>r.ok?r.json():Promise.reject())
    .then(() => { _INC = null; renderPortal(); })
    .catch(() => alert(t('Error updating record.','Error al actualizar registro.')));
}

function _incSubmit() {
  const childId = (document.getElementById('inc-child')||{}).value||'';
  const date    = (document.getElementById('inc-date')||{}).value||today();
  const time    = (document.getElementById('inc-time')||{}).value||'';
  const loc     = (document.getElementById('inc-loc')||{}).value||'';
  const sev     = (document.getElementById('inc-sev')||{}).value||'low';
  const injury  = (document.getElementById('inc-injury')||{}).value||'';
  const desc    = (document.getElementById('inc-desc')||{}).value||'';
  const aid     = (document.getElementById('inc-aid')||{}).value||'';

  if (!childId) { msg('inc-msg', t('Select a child.','Seleccione un niño.')); return; }
  if (!loc) { msg('inc-msg', t('Enter the location.','Ingrese el lugar.')); return; }
  if (!desc) { msg('inc-msg', t('Enter a description.','Ingrese una descripción.')); return; }

  // Get classroom_id from child
  const child = typeof DB !== 'undefined' ? DB.children.find(c => c.id === childId) : null;
  const classroomId = child ? child.classId : null;

  apiFetch('/api/incidents', {
    method: 'POST',
    body: JSON.stringify({
      child_id: childId,
      classroom_id: classroomId,
      date, time, location: loc,
      description: desc,
      injury_type: injury,
      first_aid: aid,
      severity: sev
    })
  })
  .then(r => r.ok ? r.json() : Promise.reject())
  .then(() => {
    _INC = null;
    _INC_FORM = false;
    renderPortal();
  })
  .catch(() => msg('inc-msg', t('Error saving incident. Try again.','Error al guardar. Intente de nuevo.')));
}
