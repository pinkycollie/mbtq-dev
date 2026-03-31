# 🔐 GitHub Account Lockdown: MBTQ Bypass Guide

Your GitHub account is currently experiencing a billing lock. The "Foundational Factory" has been re-architected to bypass GitHub Agents and run entirely on **Deno** and **GCP Cloud Build**.

## 🚀 How to Run the Pipeline Locally
You no longer need to push to trigger CI. Run the full validation suite on your machine:
```bash
deno task pipeline:full
```
This runs:
1. `lint` (Static analysis)
2. `test` (Unit/Integration tests)
3. `compliance` (Visual-first accessibility audit)
4. `gate` (Fibonrose trust validation)

## ☁️ How to Deploy to GCP
Since GitHub Actions are locked, use the direct Cloud Build bridge:
```bash
deno task docker:build
```
This triggers the `cloudbuild.yaml` on GCP, which will:
1. Verify the code using the same Deno pipeline.
2. Build and push the Docker image.
3. Deploy to Cloud Run.

## 🛠️ GitHub Actions Status
All automatic workflows (push, PR, issue) have been **deactivated** (`workflow_dispatch` only) to prevent additional billing attempts while you resolve the account issue.

**Verdict**: The factory is 100% operational. Engineering and Community contributions can continue through local validation and direct GCP deployment.
