---
layout: default
title: Research Data & Models
---

# 🗂 Research Data & Models

Welcome to our lab’s catalogue of datasets and computational models.  
Use the search box below or click a column header to sort.

---

<!-- 1) Expose your YAML data as a JS variable -->
<script>
  const RESOURCES = {{ site.data.resources | jsonify }};
</script>

<!-- 2) (Optional) Add simple filter buttons for “Data” / “Model” / “All” -->
<p>
  <button id="filter-all">All</button>
  <button id="filter-data">Data</button>
  <button id="filter-model">Model</button>
</p>

---

## 📋 All Resources

<table id="resource-table">
  <thead>
    <tr>
      <th>Title</th>
      <th>Type</th>
      <th>Description</th>
      <th>Link</th>
      <th>License</th>
      <th>Contact</th>
    </tr>
  </thead>
  <tbody>
    <!-- JavaScript will fill this in -->
  </tbody>
</table>

---

## ℹ️ Contribute & Support

If you’d like to **add** a resource, please fill out our  
[short submission form](https://forms.gle/…) or open an issue on this repo.  
For **questions** or **access requests**, email [support@lab.org].

<!-- 3) Include DataTables JS/CSS and a small script to build+filter the table -->

<link rel="stylesheet" href="https://cdn.datatables.net/1.13.4/css/jquery.dataTables.min.css">
<script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
<script src="https://cdn.datatables.net/1.13.4/js/jquery.dataTables.min.js"></script>

<script>
$(document).ready(function() {
  // Populate <tbody> from RESOURCES
  let $tbody = $('#resource-table tbody');
  RESOURCES.forEach(r => {
    let contactCell = r.contact ? r.contact : '—';
    let row = `<tr>
      <td><a href="${r.link}">${r.title}</a></td>
      <td>${r.type}</td>
      <td>${r.description}</td>
      <td><a href="${r.link}">Download</a></td>
      <td>${r.license}</td>
      <td>${contactCell}</td>
    </tr>`;
    $tbody.append(row);
  });

  // Initialize DataTables
  let table = $('#resource-table').DataTable({
    paging:   false,
    info:     false,
    searching: true,
    order:    []
  });

  // Button handlers for “All / Data / Model”
  $('#filter-all').on('click', function() {
    table.column(1).search('').draw();
  });
  $('#filter-data').on('click', function() {
    table.column(1).search('data', false, true).draw();
  });
  $('#filter-model').on('click', function() {
    table.column(1).search('model', false, true).draw();
  });
});
</script>