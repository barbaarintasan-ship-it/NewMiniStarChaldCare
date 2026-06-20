/* ============================================================
   Mini Star Child Care — Notifications Module
   API: GET /api/notifications, PATCH /api/notifications/:id/read,
        PATCH /api/notifications/read-all
   ============================================================ */

let _NOTIF = null;
let _NOTIF_LOADING = false;
let _NOTIF_ERR = false;
let _NOTIF_FILTER = 'all'; // 'all' | 'unread'

function _notifReset() { _NOTIF = null; _NOTIF_LOADING = false; _NOTIF_ERR = false; _NOTIF_FILTER = 'all'; }

function notificationsView() {
  if (!apiToken()) return noTokenCard();

  if (!_NOTIF && !_NOTIF_LOADING) {
    _NOTIF_LOADING = true; _NOTIF_ERR = false;
    apiFetch('/api/notifications')
      .then(r => r.ok ? r.json() : Promise.reject())
      .then(d => {
        _NOTIF = Array.isArray(d) ? d : [];
        _NOTIF_UNREAD = _NOTIF.filter(n => !n.read).length;
        _NOTIF_LOADING = false;
        renderPortal();
      })
      .catch(() => { _NOTIF = []; _NOTIF_LOADING = false; _NOTIF_ERR = true; renderPortal(); });
    return loadingCard();
  }
  if (_NOTIF_LOADING) return loadingCard();
  if (_NOTIF_ERR) return errCard();

  return _notifList();
}

function _notifTypeIcon(type) {
  const icons = {
    incident: '&#128680;',
    medication: '&#128138;',
    message: '&#128172;',
    report: '&#128203;',
    enrollment: '&#128221;',
    attendance: '&#9989;',
    general: '&#128276;'
  };
  return icons[type] || icons.general;
}

function _notifTimeAgo(dateStr) {
  if (!dateStr) return '';
  const diff = Date.now() - new Date(dateStr).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return t('just now','ahora');
  if (mins < 60) return mins + ' ' + t('min ago','min');
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return hrs + ' ' + t('hr ago','h');
  const days = Math.floor(hrs / 24);
  return days + ' ' + t('day(s) ago','día(s)');
}

function _notifList() {
  const unreadCount = _NOTIF.filter(n => !n.read).length;
  const displayed = _NOTIF_FILTER === 'unread' ? _NOTIF.filter(n => !n.read) : _NOTIF;

  let h = `<div class="card" style="display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:10px">
    <div>
      <p class="lead" style="margin:0">&#128276; ${t('Notifications','Notificaciones')}</p>
      <p class="soft" style="margin:4px 0 0;font-size:.85rem">
        ${unreadCount > 0
          ? `<span style="color:var(--coral);font-weight:700">${unreadCount}</span> ${t('unread','no leída(s)')}`
          : t('All caught up!','¡Todo al día!')}
      </p>
    </div>
    <div style="display:flex;gap:8px;flex-wrap:wrap">
      ${unreadCount > 0 ? `<button class="mini-btn in" onclick="_notifMarkAll()">&#9989; ${t('Mark All Read','Marcar Todo Leído')}</button>` : ''}
      <button class="mini-btn ghost" onclick="_notifRefresh()">&#8635;</button>
    </div>
  </div>
  <div class="pill-tabs" style="margin-bottom:14px">
    <button class="${_NOTIF_FILTER==='all'?'active':''}" onclick="_NOTIF_FILTER='all';renderPortal()">${t('All','Todas')} (${_NOTIF.length})</button>
    <button class="${_NOTIF_FILTER==='unread'?'active':''}" onclick="_NOTIF_FILTER='unread';renderPortal()">${t('Unread','No leídas')} (${unreadCount})</button>
  </div>`;

  if (!displayed.length) {
    h += `<div class="empty">&#128276; ${_NOTIF_FILTER === 'unread' ? t('No unread notifications.','Sin notificaciones no leídas.') : t('No notifications yet.','Sin notificaciones todavía.')}</div>`;
    return h;
  }

  h += displayed.map(n => {
    return `<div class="card" style="margin-bottom:0;border-left:4px solid ${n.read?'#EAE2DA':'var(--gold)'};${n.read?'opacity:.85':''}">
      <div style="display:flex;align-items:flex-start;justify-content:space-between;gap:10px">
        <div style="flex:1;min-width:0">
          <div style="display:flex;align-items:center;gap:8px;margin-bottom:5px">
            <span style="font-size:1.1rem">${_notifTypeIcon(n.type)}</span>
            <b style="color:var(--night);font-size:.92rem">${esc(n.title||'')}</b>
            ${!n.read ? `<span style="background:var(--gold);color:#fff;border-radius:999px;font-size:.65rem;padding:1px 6px;font-weight:700">${t('NEW','NUEVO')}</span>` : ''}
          </div>
          <p style="margin:0 0 5px;font-size:.87rem;color:var(--ink)">${esc(n.message||'')}</p>
          <p class="soft" style="font-size:.78rem;margin:0">&#9200; ${_notifTimeAgo(n.created_at)}</p>
        </div>
        ${!n.read ? `<button class="mini-btn ghost" style="font-size:.75rem;white-space:nowrap" onclick="_notifMarkRead('${esc(n.id)}')">&#9989; ${t('Read','Leída')}</button>` : ''}
      </div>
    </div>`;
  }).join('');

  return h;
}

function _notifRefresh() { _NOTIF = null; _NOTIF_ERR = false; renderPortal(); }

function _notifMarkRead(id) {
  apiFetch('/api/notifications/'+id+'/read', { method:'PATCH', body:'{}' })
    .then(r => r.ok ? r.json() : Promise.reject())
    .then(() => {
      const n = (_NOTIF||[]).find(x => x.id === id);
      if (n) { n.read = true; _NOTIF_UNREAD = (_NOTIF||[]).filter(x=>!x.read).length; renderPortal(); }
    })
    .catch(() => {});
}

function _notifMarkAll() {
  apiFetch('/api/notifications/read-all', { method:'PATCH', body:'{}' })
    .then(r => r.ok ? r.json() : Promise.reject())
    .then(() => { _NOTIF = null; _NOTIF_UNREAD = 0; renderPortal(); })
    .catch(() => alert(t('Error marking notifications read.','Error al marcar notificaciones.')));
}
