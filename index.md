---
layout: default
title: Research Data & Models
---

# 🗂 Energy Use, Retrofit & Net Zero Catalogue

Welcome to the **[Energy Use, Retrofit & Net Zero Research Theme](https://www.ucl.ac.uk/bartlett/environment-energy-resources/environmental-design/research-ucl-institute-environmental-design-and-engineering/energy-use-retrofit-and-net-zero)**'s catalogue of datasets and computational models.
We are part of the **[UCL Institute for Environmental Design and Engineering (IEDE)](https://www.ucl.ac.uk/bartlett/environment-energy-resources/environmental-design)** within the **Bartlett School of Environment, Energy and Resources (BSEER)** at UCL.
Our research investigates the energy consumption and carbon intensity of individual buildings and entire building stocks to inform retrofit strategies and accelerate the journey to net zero.

<style>
/* ── Filter bar ─────────────────────────────────────────── */
.filter-bar {
  display: flex;
  gap: 8px;
  margin: 1.5rem 0 0.5rem;
  flex-wrap: wrap;
  align-items: center;
}

.filter-btn {
  padding: 7px 20px;
  border: 2px solid #157878;
  background: transparent;
  color: #157878;
  border-radius: 20px;
  cursor: pointer;
  font-size: 0.875rem;
  font-weight: 600;
  letter-spacing: 0.02em;
  transition: background 0.15s, color 0.15s;
}

.filter-btn:hover,
.filter-btn.active {
  background: #157878;
  color: #fff;
}

/* ── Resource count ─────────────────────────────────────── */
#resource-count {
  font-size: 0.83rem;
  color: #9ca3af;
  margin: 0.4rem 0 1rem;
}

/* ── Type badges ────────────────────────────────────────── */
.badge {
  display: inline-block;
  padding: 3px 10px;
  border-radius: 12px;
  font-size: 0.76rem;
  font-weight: 700;
  text-transform: capitalize;
  white-space: nowrap;
  letter-spacing: 0.03em;
}

.badge-data  { background: #dbeafe; color: #1d4ed8; }
.badge-model { background: #dcfce7; color: #15803d; }
.badge-both  { background: #f3e8ff; color: #7e22ce; }
.badge-other { background: #fff7ed; color: #c2410c; }

/* ── Tags ───────────────────────────────────────────────── */
.tags { margin-top: 7px; }

.tag {
  display: inline-block;
  padding: 2px 8px;
  margin: 2px 2px 2px 0;
  border-radius: 10px;
  font-size: 0.71rem;
  background: #f1f5f9;
  color: #64748b;
  border: 1px solid #e2e8f0;
  cursor: pointer;
  transition: background 0.15s, color 0.15s, border-color 0.15s;
  user-select: none;
}

.tag:hover          { background: #e2e8f0; color: #1e293b; }
.tag.active         { background: #157878; color: #fff; border-color: #157878; }

/* ── Table ──────────────────────────────────────────────── */
#resource-table {
  width: 100% !important;
  border-collapse: collapse;
  font-size: 0.875rem;
}

#resource-table thead th {
  background: #f8fafc;
  color: #6b7280;
  font-weight: 700;
  font-size: 0.71rem;
  text-transform: uppercase;
  letter-spacing: 0.07em;
  padding: 11px 12px;
  border-top: 2px solid #e5e7eb;
  border-bottom: 2px solid #e5e7eb;
  white-space: nowrap;
}

#resource-table tbody tr {
  transition: background 0.1s;
}

#resource-table tbody tr:hover {
  background: #f9fafb;
}

#resource-table tbody td {
  padding: 12px;
  border-bottom: 1px solid #f0f0f0;
  vertical-align: top;
  line-height: 1.55;
}

/* Bold title column */
#resource-table tbody td:first-child {
  font-weight: 600;
  color: #111827;
  min-width: 160px;
}

/* ── Access buttons ─────────────────────────────────────── */
.access-link {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  padding: 5px 13px;
  border-radius: 6px;
  font-size: 0.81rem;
  font-weight: 600;
  text-decoration: none !important;
  transition: background 0.15s, box-shadow 0.15s;
  white-space: nowrap;
}

.access-download {
  background: #157878;
  color: #fff !important;
  box-shadow: 0 1px 3px rgba(21,120,120,0.3);
}

.access-download:hover {
  background: #0f5f5f;
  box-shadow: 0 2px 6px rgba(21,120,120,0.4);
}

.access-contact {
  background: #f0f9ff;
  color: #0369a1 !important;
  border: 1px solid #bae6fd;
}

.access-contact:hover {
  background: #e0f2fe;
}

/* ── Contact cell ───────────────────────────────────────── */
.contact-link {
  color: #157878;
  text-decoration: none;
  font-size: 0.83rem;
  word-break: break-all;
}

.contact-link:hover { text-decoration: underline; }

/* ── DataTables search box ──────────────────────────────── */
.dataTables_wrapper .dataTables_filter {
  margin-bottom: 0.5rem;
}

.dataTables_wrapper .dataTables_filter label {
  font-size: 0.875rem;
  color: #6b7280;
}

.dataTables_wrapper .dataTables_filter input {
  border: 1px solid #d1d5db;
  border-radius: 8px;
  padding: 7px 12px;
  font-size: 0.875rem;
  outline: none;
  transition: border-color 0.15s, box-shadow 0.15s;
  min-width: 220px;
}

.dataTables_wrapper .dataTables_filter input:focus {
  border-color: #157878;
  box-shadow: 0 0 0 3px rgba(21,120,120,0.12);
}

/* ── Impact stats ───────────────────────────────────────── */
.impact-stats {
  display: flex;
  gap: 12px;
  margin: 1.5rem 0 1rem;
  flex-wrap: wrap;
}

.impact-stat {
  flex: 1;
  min-width: 110px;
  background: #f8fafc;
  border: 1px solid #e5e7eb;
  border-radius: 10px;
  padding: 0.9rem 1.1rem;
  text-align: center;
}

.impact-stat-value {
  font-size: 1.6rem;
  font-weight: 800;
  color: #157878;
  line-height: 1.1;
  display: block;
  letter-spacing: -0.02em;
}

.impact-stat-label {
  font-size: 0.72rem;
  color: #9ca3af;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.07em;
  margin-top: 4px;
  display: block;
}

/* ── Contribute box ─────────────────────────────────────── */
.contribute-box {
  background: #f0fafa;
  border: 1px solid #b2dfdf;
  border-radius: 10px;
  padding: 1.1rem 1.4rem;
  margin-top: 1.5rem;
  font-size: 0.9rem;
  line-height: 1.7;
}
</style>

<script>
  const RESOURCES = {{ site.data.resources | jsonify }};
</script>

<div class="impact-stats">
  <div class="impact-stat">
    <span class="impact-stat-value" id="stat-resources">–</span>
    <span class="impact-stat-label">Resources</span>
  </div>
  <div class="impact-stat">
    <span class="impact-stat-value" id="stat-visitors">–</span>
    <span class="impact-stat-label">Visitors</span>
  </div>
  <div class="impact-stat">
    <span class="impact-stat-value" id="stat-downloads">–</span>
    <span class="impact-stat-label">Downloads</span>
  </div>
</div>

<div class="filter-bar">
  <button class="filter-btn active" data-filter="all">All</button>
  <button class="filter-btn" data-filter="data">Data</button>
  <button class="filter-btn" data-filter="model">Model</button>
  <button class="filter-btn" data-filter="other">Other</button>
</div>

<p id="resource-count"></p>

<table id="resource-table">
  <thead>
    <tr>
      <th>Title</th>
      <th>Type</th>
      <th>Description &amp; Tags</th>
      <th>Access</th>
      <th>License</th>
      <th>Contact</th>
    </tr>
  </thead>
  <tbody>
    <!-- Populated by JavaScript -->
  </tbody>
</table>

<div class="contribute-box">
  <strong>Add a resource</strong> — fill out our <a href="https://forms.office.com/e/3qTjfDh5wp">short submission form</a> or open an issue on this repo.<br>
  <strong>Questions or access requests</strong> — email <a href="mailto:ucbvauy@ucl.ac.uk">Chun Sang Au Yong</a>.
</div>

<link rel="stylesheet" href="https://cdn.datatables.net/1.13.4/css/jquery.dataTables.min.css">
<script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
<script src="https://cdn.datatables.net/1.13.4/js/jquery.dataTables.min.js"></script>

<script>
$(document).ready(function () {
  const $tbody = $('#resource-table tbody');

  RESOURCES.forEach(r => {
    // Type badge — handle "data, model" (both) and other types like "simulation"
    const t = r.type.toLowerCase().replace(/\s/g, '');
    let badgeClass, badgeLabel;
    if (t === 'data')                          { badgeClass = 'badge-data';  badgeLabel = 'Data'; }
    else if (t === 'model')                    { badgeClass = 'badge-model'; badgeLabel = 'Model'; }
    else if (t.includes('data') && t.includes('model')) { badgeClass = 'badge-both';  badgeLabel = 'Data + Model'; }
    else                                       { badgeClass = 'badge-other'; badgeLabel = r.type; }
    const typeCell = `<span class="badge ${badgeClass}">${badgeLabel}</span>`;

    // Access link
    const accessCell = r.link.startsWith('mailto:')
      ? `<a href="${r.link}" class="access-link access-contact">✉ Contact</a>`
      : `<a href="${r.link}" class="access-link access-download" target="_blank" rel="noopener">↓ Download</a>`;

    // Contact cell – clickable mailto link
    const contactCell = r.contact
      ? `<a href="mailto:${r.contact}" class="contact-link">${r.contact}</a>`
      : '<span style="color:#d1d5db">—</span>';

    // Tags as clickable chips
    const tagsHtml = (r.tags || [])
      .map(tag => `<span class="tag" data-tag="${tag}">${tag}</span>`)
      .join('');
    const descCell = r.description + (tagsHtml ? `<div class="tags">${tagsHtml}</div>` : '');

    const row = `<tr data-type="${r.type}">
      <td>${r.title}</td>
      <td>${typeCell}</td>
      <td>${descCell}</td>
      <td>${accessCell}</td>
      <td>${r.license}</td>
      <td>${contactCell}</td>
    </tr>`;
    $tbody.append(row);
  });

  // ── Initialise DataTables ──────────────────────────────
  let activeTypeFilter = 'all';

  const table = $('#resource-table').DataTable({
    paging:    false,
    info:      false,
    searching: true,
    order:     [],
    language: {
      search:            '',
      searchPlaceholder: '🔍  Search resources…'
    }
  });

  // ── Custom type filter ─────────────────────────────────────────
  // Handles "data, model", "simulation", and any future types.
  // "data" and "model" filters include items that contain both.
  // "other" catches anything that is neither data nor model.
  $.fn.dataTable.ext.search.push(function (settings, data, dataIndex) {
    if (activeTypeFilter === 'all') return true;
    const raw = ($(table.row(dataIndex).node()).data('type') || '').toLowerCase().replace(/\s/g, '');
    const hasData  = raw.includes('data');
    const hasModel = raw.includes('model');
    if (activeTypeFilter === 'data')  return hasData;
    if (activeTypeFilter === 'model') return hasModel;
    if (activeTypeFilter === 'other') return !hasData && !hasModel;
    return true;
  });

  // ── Resource count ─────────────────────────────────────
  function updateCount () {
    const shown = table.rows({ search: 'applied' }).count();
    const total = RESOURCES.length;
    $('#resource-count').text(
      shown === total
        ? `${total} resources`
        : `Showing ${shown} of ${total} resources`
    );
  }
  table.on('draw', updateCount);
  updateCount();

  // ── Impact stats ───────────────────────────────────────
  // Resources count (static)
  $('#stat-resources').text(RESOURCES.length);

  // Visitor count — increment on page load
  fetch('https://api.counterapi.dev/v1/netzero-catalogue/visits/up')
    .then(r => r.json())
    .then(d => { $('#stat-visitors').text(d.count.toLocaleString()); })
    .catch(() => { /* keep – if unavailable */ });

  // Download count — increment on each download click
  $(document).on('click', '.access-download', function () {
    fetch('https://api.counterapi.dev/v1/netzero-catalogue/downloads/up')
      .then(r => r.json())
      .then(d => { $('#stat-downloads').text(d.count.toLocaleString()); })
      .catch(() => {});
  });

  // ── Filter buttons ─────────────────────────────────────
  $('.filter-btn').on('click', function () {
    $('.filter-btn').removeClass('active');
    $(this).addClass('active');
    activeTypeFilter = $(this).data('filter');
    table.draw();
  });

  // ── Tag chips → full-text search ──────────────────────
  $(document).on('click', '.tag', function () {
    const tag = $(this).data('tag');
    if ($(this).hasClass('active')) {
      $(this).removeClass('active');
      table.search('').draw();
    } else {
      $('.tag').removeClass('active');
      $(this).addClass('active');
      table.search(tag).draw();
    }
  });
});
</script>
