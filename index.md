---
layout: default
title: Research Data & Models
---

# 🗂 Energy Use, Retrofit & Net Zero Catalogue

Welcome to the Energy Use, Retrofit & Net Zero Research Theme’s catalogue of datasets and computational models. We are part of the Institute for Environmental Design and Engineering in the Bartlett School of Environment, Energy and Resources at UCL. Our research investigates the energy consumption and carbon intensity of individual buildings and entire building stocks to inform retrofit strategies and accelerate the journey to net zero.

Use the search box below or click a column header to sort through our curated resources.

---

<script>
  const RESOURCES = {{ site.data.resources | jsonify }};
</script>

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
      <th>Access</th>
      <th>License</th>
      <th>Contact</th>
    </tr>
  </thead>
  <tbody>
    <!-- JavaScript will populate rows here -->
  </tbody>
</table>

---

## ℹ️ Contribute & Support

If you’d like to **add** a resource, please fill out our  
[short submission form](https://forms.office.com/e/3qTjfDh5wp) or open an issue on this repo.  
For **questions** or **access requests**, email [ucbvauy@ucl.ac.uk].

<link rel="stylesheet" href="https://cdn.datatables.net/1.13.4/css/jquery.dataTables.min.css">
<script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
<script src="https://cdn.datatables.net/1.13.4/js/jquery.dataTables.min.js"></script>

<script>
$(document).ready(function() {
  let $tbody = $('#resource-table tbody');

  RESOURCES.forEach(r => {
    // Determine whether to show Download or Contact link
    let accessCell;
    if (r.link.startsWith('mailto:')) {
      accessCell = `<a href="${r.link}">Contact</a>`;
    } else {
      accessCell = `<a href="${r.link}">Download</a>`;
    }

    // Fallback for empty contact field
    let contactCell = r.contact ? r.contact : '—';

    let row = `<tr>
      <td>${r.title}</td>
      <td>${r.type}</td>
      <td>${r.description}</td>
      <td>${accessCell}</td>
      <td>${r.license}</td>
      <td>${contactCell}</td>
    </tr>`;
    $tbody.append(row);
  });

  let table = $('#resource-table').DataTable({
    paging:   false,
    info:     false,
    searching: true,
    order:    []
  });

  $('#filter-all').on('click',  () => table.column(1).search('').draw());
  $('#filter-data').on('click', () => table.column(1).search('data', false, true).draw());
  $('#filter-model').on('click',() => table.column(1).search('model', false, true).draw());
});
</script>