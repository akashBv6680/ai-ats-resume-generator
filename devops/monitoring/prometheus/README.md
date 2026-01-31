# Prometheus Setup

This directory is reserved for Prometheus configuration files,
for example:

- `prometheus.yml` with scrape configs for:
  - backend (Express metrics endpoint)
  - ai-service (FastAPI metrics endpoint)
  - MongoDB exporter

Expose metrics in services via `/metrics` endpoints for scraping.
