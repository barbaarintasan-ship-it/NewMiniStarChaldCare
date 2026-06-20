/* ============================================================
   Mini Star Child Care — Medications Module
   API: GET/POST/PATCH /api/medications, GET/POST /api/medication-logs
   ============================================================ */

let _MED = null;
let _MED_LOADING = false;
let _MED_ERR = false;
let _MED_LOGS = null;
let _MED_LOGS_LOADING = false;
let _MED_FORM = false;
let _MED_LOG_ID = null; // medication id to log administration for
let _MED_LOG_FORM = false;

function _medReset() { _MED = null; _MED_LOADING = false; _MED_ERR = false; _MED_LOGS = null; _MED_LOGS_LOADING = false; _MED_FORM = false; _MED_LOG_ID = null; _MED_LOG_FORM = false; }

function medicationsView() {
  if (!apiToken()) return noTokenCard();

  // Load medications
  if (!_MED && !_MED_LOADING) {
    _MED_LOADING = true; _MED_ERR = false;
    apiFetch('/api/medications')
      .then(r => r.ok ? r.json() : Promise.reject())
      .then(d => { _MED = Array.isArray(d) ? d : []; _MED_LOADING = false; renderPortal(); })
      .catch(() => { _MED = []; _MED_LOADING = false; _MED_ERR = true; renderPortal(); });
    return loadingCard();
  }
  if (_MED_LOADING) return loadingCard();
  if (_MED_ERR) return errCard();

  // Load today's logs
  if (!_MED_LOGS && !_MED_LOGS_LOADING) {
    _MED_LOGS_LOADING = true;
    apiFetch('/api/medication-logs?date=' + today())
      .then(r => r.ok ? r.json() : Promise.reject())
      .then(d => { _MED_LOGS = Array.isArray(d) ? d : []; _MED_LOGS_LOADING = false; renderPortal(); })
      .catch(() => { _MED_LOGS = []; _MED_LOGS_LOADING = false; renderPortal(); });
  }

  if (_MED_FORM) return _medForm();
  if (_MED_LOG_FORM && _MED_LOG_ID) return _medLogForm();

  return _medList();
}

function _medList() {
  const canManage = CU.role === 'admin' || CU.role === 'teacher';
  let h = `<div class="card" style="display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:10px">
    <div>
      <p class="lead" style="margin:0">&#128138; ${t('Medications','Medicamentos')}</p>
      <p class="soft" style="margin:4px 0 0;font-size:.85rem">${_MED.length} ${t('active medication(s)','medicamento(s) activo(s)')}</p>
    </div>
    <div style="display:flex;gap:8px;flex-wrap:wrap">
      ${canManage ? `<button class="mini-btn in" onclick="_medOpenForm()">+ ${t('Add Medication','Agregar Medicamento')}</button>` : ''}
      <button class="mini-btn ghost" onclick="_medRefresh()">&#8635; ${t('Refresh','Actualizar')}</button>
    </div>
  </div>`;

  if (!_MED.length) {
    h += `<div class="empty">&#128138; ${t('No active medications.','Sin medicamentos activos.')}</div>`;
    return h;
  }

  // Group by child
  const byChild = {};
  for (const m of _MED) {
    const cid = m.child_id;
    if (!byChild[cid]) byChild[cid] = { name: (m.child && m.child.name) ? m.child.name : t('Unknown','Desconocido'), meds: [] };
    byChild[cid].meds.push(m);
  }

  for (const [cid, group] of Object.entries(byChild)) {
    h += `<div class="card" style="margin-bottom:0;border-left:4px solid var(--teal)">
      <p class="lead" style="margin:0 0 10px">&#128118; ${esc(group.name)}</p>
      ${group.meds.map(m => {
        const todayLogs = (_MED_LOGS || []).filter(l => l.medication_id === m.id);
        const lastGiven = todayLogs.filter(l => !l.missed);
        const lastGivenTime = lastGiven.length ? lastGiven[0].given_at : null;
        const missed = todayLogs.filter(l => l.missed).length;
        return `<div style="background:#f8f5f0;border-radius:10px;padding:12px;margin-bottom:8px">
          <div style="display:flex;align-items:flex-start;justify-content:space-between;gap:8px;flex-wrap:wrap">
            <div style="flex:1;min-width:0">
              <div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap;margin-bottom:6px">
                <b style="color:var(--night)">${esc(m.name)}</b>
                <span style="background:var(--teal);color:#fff;border-radius:999px;font-size:.72rem;padding:2px 8px">${esc(m.dosage)}</span>
                ${m.parent_authorized ? `<span style="background:#2ecc71;color:#fff;border-radius:999px;font-size:.72rem;padding:2px 8px">&#9989; ${t('Auth.','Autoriz.')}</span>` : `<span style="background:#e67e22;color:#fff;border-radius:999px;font-size:.72rem;padding:2px 8px">&#9888; ${t('Not Auth.','Sin Autoriz.')}</span>`}
              </div>
              <p class="soft" style="font-size:.82rem;margin:0 0 3px">&#9201; ${esc(m.frequency)}</p>
              ${m.instructions ? `<p class="soft" style="font-size:.82rem;margin:0 0 3px">&#128221; ${esc(m.instructions)}</p>` : ''}
              ${m.prescribed_by ? `<p class="soft" style="font-size:.82rem;margin:0">&#128203; ${t('Rx:','Receta:')} ${esc(m.prescribed_by)}</p>` : ''}
            </div>
            <div style="display:flex;flex-direction:column;gap:5px;min-width:110px">
              ${canManage ? `<button class="mini-btn in" onclick="_medOpenLog('${esc(m.id)}')">&#9989; ${t('Log Admin.','Registrar')}</button>
              <button class="mini-btn ghost" onclick="_medMarkMissed('${esc(m.id)}','${esc(m.child_id)}')">&#10060; ${t('Missed','Perdida')}</button>
              <button class="mini-btn danger" onclick="_medDeactivate('${esc(m.id)}')" style="font-size:.75rem">&#128274; ${t('Deactivate','Desactivar')}</button>` : ''}
            </div>
          </div>
          ${lastGivenTime || missed ? `<div style="display:flex;gap:8px;flex-wrap:wrap;margin-top:8px">
            ${lastGivenTime ? `<span style="background:#e8f5e9;color:#2e7d32;border-radius:8px;padding:3px 8px;font-size:.78rem">&#9989; ${t('Last given:','Última dosis:')} ${new Date(lastGivenTime).toLocaleTimeString([],{hour:'2-digit',minute:'2-digit'})}</span>` : ''}
            ${missed ? `<span style="background:#fce4ec;color:#c62828;border-radius:8px;padding:3px 8px;font-size:.78rem">&#9888; ${missed} ${t('missed today','perdida(s) hoy')}</span>` : ''}
          </div>` : ''}
        </div>`;
      }).join('')}
    </div>`;
  }

  // Today's administration log summary
  if (_MED_LOGS && _MED_LOGS.length) {
    h += `<div class="card" style="margin-top:0">
      <p class="lead">&#128203; ${t("Today's Administration Log","Registro de Administración de Hoy")}</p>
      ${_MED_LOGS.map(l => {
        const medName = (l.medication && l.medication.name) ? l.medication.name : '-';
        const teacherName = (l.teacher && l.teacher.name) ? l.teacher.name : '-';
        return `<div class="list-item" style="font-size:.85rem">
          <div class="grow">
            ${l.missed
              ? `<span style="color:#c62828">&#10060; ${t('Missed','Perdida')}: ${esc(medName)}</span>`
              : `<span style="color:#2e7d32">&#9989; ${esc(medName)} &middot; ${esc(l.dosage||'')}</span>`}
            <span class="soft">&nbsp;&middot; ${teacherName} &middot; ${new Date(l.given_at).toLocaleTimeString([],{hour:'2-digit',minute:'2-digit'})}</span>
            ${l.notes ? `<br><span class="soft" style="font-size:.8rem">${esc(l.notes)}</span>` : ''}
          </div>
        </div>`;
      }).join('')}
    </div>`;
  }

  return h;
}

function _medForm() {
  const children = typeof DB !== 'undefined' ? DB.children || [] : [];
  return `<div style="display:flex;align-items:center;gap:10px;margin-bottom:14px;flex-wrap:wrap">
    <button class="mini-btn ghost" onclick="_MED_FORM=false;renderPortal()">&#8592; ${t('Back','Volver')}</button>
    <h3 style="margin:0;color:var(--night)">&#128138; ${t('Add Medication','Agregar Medicamento')}</h3>
  </div>
  <div class="card">
    <div class="field"><label>${t('Child *','Niño *')}</label>
      <select id="med-child">
        <option value="">-- ${t('Select child','Seleccionar niño')} --</option>
        ${children.map(c => `<option value="${esc(c.id)}">${esc(c.name)}</option>`).join('')}
      </select>
    </div>
    <div class="field"><label>${t('Medication Name *','Nombre del Medicamento *')}</label><input id="med-name" placeholder="${t('e.g. Amoxicillin','Ej.: Amoxicilina')}"></div>
    <div class="rc-grid">
      <div class="field" style="margin:0"><label>${t('Dosage *','Dosis *')}</label><input id="med-dose" placeholder="${t('e.g. 250mg','Ej.: 250mg')}"></div>
      <div class="field" style="margin:0"><label>${t('Frequency *','Frecuencia *')}</label><input id="med-freq" placeholder="${t('e.g. Twice daily','Ej.: Dos veces al día')}"></div>
    </div>
    <div class="field"><label>${t('Instructions','Instrucciones')}</label><input id="med-instr" placeholder="${t('e.g. Give with food','Ej.: Dar con comida')}"></div>
    <div class="field"><label>${t('Prescribed by','Recetado por')}</label><input id="med-by" placeholder="${t('e.g. Dr. Smith','Ej.: Dr. García')}"></div>
    <div class="field">
      <label><input type="checkbox" id="med-auth"> ${t('Parent has authorized administration','El padre autorizó la administración')}</label>
    </div>
    <button class="btn btn-night btn-full" onclick="_medSubmit()">&#128138; ${t('Save Medication','Guardar Medicamento')}</button>
    <div class="form-msg" id="med-msg"></div>
  </div>`;
}

function _medLogForm() {
  const med = _MED.find(m => m.id === _MED_LOG_ID);
  if (!med) { _MED_LOG_FORM = false; _MED_LOG_ID = null; renderPortal(); return ''; }
  const childName = (med.child && med.child.name) ? med.child.name : '';
  return `<div style="display:flex;align-items:center;gap:10px;margin-bottom:14px;flex-wrap:wrap">
    <button class="mini-btn ghost" onclick="_MED_LOG_FORM=false;_MED_LOG_ID=null;renderPortal()">&#8592; ${t('Back','Volver')}</button>
    <h3 style="margin:0;color:var(--night)">&#9989; ${t('Log Administration','Registrar Administración')}</h3>
  </div>
  <div class="card">
    <p class="lead">${esc(med.name)} &mdash; ${esc(childName)}</p>
    <p class="soft" style="font-size:.85rem">&#128138; ${esc(med.dosage)} &middot; ${esc(med.frequency)}</p>
    <div class="field"><label>${t('Dosage Given','Dosis Dada')}</label><input id="mlog-dose" value="${esc(med.dosage)}" placeholder="${esc(med.dosage)}"></div>
    <div class="field"><label>${t('Notes','Notas')}</label><input id="mlog-notes" placeholder="${t('Any observations...','Alguna observación...')}"></div>
    <button class="btn btn-teal btn-full" onclick="_medLogSubmit()">&#9989; ${t('Log Administration','Registrar Administración')}</button>
    <div class="form-msg" id="mlog-msg"></div>
  </div>`;
}

function _medOpenForm() { _MED_FORM = true; renderPortal(); }
function _medOpenLog(medId) { _MED_LOG_ID = medId; _MED_LOG_FORM = true; renderPortal(); }
function _medRefresh() { _MED = null; _MED_LOGS = null; _MED_ERR = false; renderPortal(); }

function _medSubmit() {
  const childId = (document.getElementById('med-child')||{}).value||'';
  const name    = (document.getElementById('med-name')||{}).value||'';
  const dosage  = (document.getElementById('med-dose')||{}).value||'';
  const freq    = (document.getElementById('med-freq')||{}).value||'';
  const instr   = (document.getElementById('med-instr')||{}).value||'';
  const by      = (document.getElementById('med-by')||{}).value||'';
  const auth    = (document.getElementById('med-auth')||{}).checked||false;

  if (!childId) { msg('med-msg', t('Select a child.','Seleccione un niño.')); return; }
  if (!name)    { msg('med-msg', t('Enter medication name.','Ingrese el nombre.')); return; }
  if (!dosage)  { msg('med-msg', t('Enter dosage.','Ingrese la dosis.')); return; }
  if (!freq)    { msg('med-msg', t('Enter frequency.','Ingrese la frecuencia.')); return; }

  apiFetch('/api/medications', {
    method: 'POST',
    body: JSON.stringify({ child_id:childId, name, dosage, frequency:freq, instructions:instr, prescribed_by:by, parent_authorized:auth })
  })
  .then(r => r.ok ? r.json() : Promise.reject())
  .then(() => { _MED = null; _MED_FORM = false; renderPortal(); })
  .catch(() => msg('med-msg', t('Error saving. Try again.','Error al guardar. Intente de nuevo.')));
}

function _medLogSubmit() {
  const med = _MED.find(m => m.id === _MED_LOG_ID);
  if (!med) return;
  const dosage = (document.getElementById('mlog-dose')||{}).value||'';
  const notes  = (document.getElementById('mlog-notes')||{}).value||'';

  apiFetch('/api/medication-logs', {
    method: 'POST',
    body: JSON.stringify({ medication_id:med.id, child_id:med.child_id, dosage, notes, missed:false })
  })
  .then(r => r.ok ? r.json() : Promise.reject())
  .then(() => { _MED_LOGS = null; _MED_LOG_FORM = false; _MED_LOG_ID = null; renderPortal(); })
  .catch(() => msg('mlog-msg', t('Error logging. Try again.','Error al registrar. Intente de nuevo.')));
}

function _medMarkMissed(medId, childId) {
  apiFetch('/api/medication-logs', {
    method: 'POST',
    body: JSON.stringify({ medication_id:medId, child_id:childId, dosage:'', notes:'', missed:true })
  })
  .then(r => r.ok ? r.json() : Promise.reject())
  .then(() => { _MED_LOGS = null; renderPortal(); })
  .catch(() => alert(t('Error logging missed dose.','Error al registrar dosis perdida.')));
}

function _medDeactivate(medId) {
  if (!confirm(t('Deactivate this medication? It will no longer appear on the daily list.','¿Desactivar este medicamento? Ya no aparecerá en la lista diaria.'))) return;
  apiFetch('/api/medications/'+medId, { method:'PATCH', body:JSON.stringify({active:false}) })
    .then(r => r.ok ? r.json() : Promise.reject())
    .then(() => { _MED = null; renderPortal(); })
    .catch(() => alert(t('Error deactivating.','Error al desactivar.')));
}
