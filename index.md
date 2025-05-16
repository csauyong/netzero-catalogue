---
layout: default
title: Research Data & Models
---

# 🗂 Research Data & Models

Welcome to the catalogue of Energy use, retrofit and net zero datasets and computational models by UCL IEDE.  
Feel free to filter by **Type**, **Category**, or **Keyword**, or use the site-wide search.

---

## 🔍 Quick Filters

- **Type:** [Data](/?type=data) · [Model](/?type=model) · [Both](/)
- **Tags:**  
  {% for tag in site.tags %}
  [{{ tag[0] }}](/?tag={{ tag[0] }})
  {% endfor %}

---

## 📋 All Resources

| Title                                       | Type  | Description                         | Link                      | License  | Contact            |
|---------------------------------------------|-------|-------------------------------------|---------------------------|----------|--------------------|
| Time-Series Neural Encoder                  | Model | A CNN-based encoder for EEG signals | [GitHub]()                | MIT      | email@domain.com   |
| Global Land Cover Dataset                   | Data  | 30 m resolution land-use maps       | [Zenodo DOI](https://…)   | CC-BY    | —                  |
| Climate Pattern Detection (Restricted)      | Both  | Code + data for anomaly detection   | [Request access]()        | Proprietary | lead@univ.ac.uk   |

> **Tip:** click on any header to sort.  
> You can also use `/search?query=` in the URL for full-text search.

---

## ℹ️ Contribute & Support

If you’d like to **add** your own resource, please fill out our  
[submission form](https://forms.gle/…) or open an issue in this repo.  
For **questions** or **access requests**, contact us at [support@lab.org].
