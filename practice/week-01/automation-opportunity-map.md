# Automation opportunity map

These are practice examples. Replace the estimates with measured numbers when working inside a real organisation.

| Workflow | Trigger | Useful result | Main failure | First method | Your one-sentence explanation |
| --- | --- | --- | --- | --- | --- |
| Receivables dashboard | A scheduled refresh or user request | Current and overdue invoice view | Missing pages or wrong balance rules | API + fixed calculations | Provides real-time visibility into past-due debt by strictly computing deterministic aging and linking every headline total to its source invoice IDs. |
| Missing documents | A required file is absent | Owner queue and draft reminder | Duplicate tasks or wrong owner | Fixed workflow | Automatically detects missing tax or contract documents upon invoice receipt and routes a draft notification to the assigned account owner. |
| Bill intake | A bill arrives | Checked fields and review task | Wrong amount or duplicate bill | Workflow with AI extraction | Extracts vendor and line-item details from PDF bills using AI and stages them for human approval with duplicate detection. |
| Client setup | A new client is approved | Complete setup checklist | Missing access or unclear ownership | Fixed workflow | Orchestrates new customer provisioning across accounting, billing, and CRM using predefined step-by-step checklists. |
| Close readiness | A period enters close | Blocked-task and evidence view | A task appears complete without proof | Dashboard + workflow | Tracks month-end close progress by requiring documented reconciliations and evidence before allowing milestone sign-offs. |
| CRM-to-Books matching | A CRM account or contact changes | Reviewed identity link | Two clients share a similar name | Rules + review queue | Matches customer records across CRM and Zoho Books using normalized tax and domain IDs while queuing ambiguous names for human review. |
| Policy questions | An operator asks how to handle a case | Answer with the correct policy | Wrong client or old policy version | Search + AI | Retrieves indexed standard operating procedures to answer operator compliance questions, citing verified policy documents. |
| Invoice investigation | An invoice is overdue or disputed | Evidence-backed next step | Agent guesses or reads another client | Small read-only agent | Analyzes payment histories, communication logs, and contract terms with read-only tools to propose evidence-backed resolution paths. |

## Rank the top three

Score each item from 1 to 5. A higher total is a better early project.

| Workflow | Happens often | Time cost | Data is ready | Rules are clear | Error risk is manageable | Total |
| --- | ---: | ---: | ---: | ---: | ---: | ---: |
| Receivables dashboard | 5 | 4 | 4 | 5 | 4 | 22 |
| Missing documents | 4 | 4 | 4 | 4 | 4 | 20 |
| Close readiness | 3 | 5 | 3 | 4 | 4 | 19 |

Default Week 1 choice: **receivables dashboard with fictional Zoho-like data**.
