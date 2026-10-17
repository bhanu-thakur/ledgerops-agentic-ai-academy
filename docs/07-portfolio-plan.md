# Portfolio plan for the AI-Forward Engineer role

## 1 What this document is

A five-week plan to convert this repository from a study plan into a portfolio of three deployed applications, aimed at the AI-Forward Engineer opening at Prudent Accountants.

The role advertisement asks for three production-ready applications that the candidate built and deployed independently, and three enterprise-level solutions the candidate designed and implemented. That pair of numbers sets the shape of the work: three applications, each presented as a business solution rather than a demonstration.

This is an independent preparation exercise using fictional data. It is not company training and makes no claim of affiliation with Prudent Accountants.

## 2 Scope decision

The advertisement also lists DevOps experience, production monitoring, logging and performance optimisation. **Those items are deliberately out of scope for this portfolio.** The plan covers the application and AI side of the role only.

The consequence is worth stating plainly rather than hiding: an application that omits these items leaves part of the advertisement unanswered. Address that directly in the covering email instead of leaving it unexplained.

One narrow exception is retained because it is inexpensive and sits inside the applications themselves: sign-in, permissions, and keeping application keys out of source code. The advertisement lists these under application security, not under operations.

## 3 Requirement mapping

The advertisement describes six areas of work. This table records where each one is evidenced.

| Advertised area | Where this portfolio answers it |
| --- | --- |
| Build intelligent solutions | All three applications |
| Integrate AI models and automation | Applications 1 and 2; Zoho and model-provider integration |
| Work with modern tools: language models, Python, cloud, AI frameworks | Application 2 is the primary evidence; Python backend and browser front end |
| Drive impact on productivity, decision-making and client experience | One application per phrase: 3, 2 and 1 respectively |
| Evaluate and adopt new AI technology | Build-versus-configure map and the evaluation pack |
| Secure and monitor | Sign-in, permissions and secret storage only; monitoring is out of scope |

| Advertised experience item | Status in this plan |
| --- | --- |
| Three production-ready applications, built and deployed | Applications 1 to 3 |
| Three enterprise-level solutions, designed and implemented | The same three, each with a business brief |
| Strong knowledge of AI/ML concepts and language models | Evidenced by the evaluation pack, not by assertion |
| Python and full-stack development | Application 2 |
| Integrating AI models, application programming interfaces and automation tools | Applications 1 and 2 |
| Cloud platforms, Azure preferred | All three hosted on Azure |
| Application security: authentication, access control, secrets management | Covered at application level |
| DevOps, production monitoring, logging, performance optimisation | **Out of scope by decision** |
| Problem solving and communication | The one-page briefs and recorded walkthroughs |

## 4 The platform position

The advertisement names Azure as the preferred cloud. It does not mention Zoho. Separate intelligence indicates the firm operates on Zoho.

The resulting architecture is the answer to give in an interview: **Zoho is the system of record, Azure is where the code runs.** Accounting data stays in Zoho Books and Zoho CRM. The applications read from Zoho through its published interfaces, perform their own calculations and language-model work on Azure, and write back only through a reviewed action.

### What Zoho already does

Checking this before proposing custom work is the professional habit the role's "evaluate and adopt" area is asking for.

- **Zia Agent Studio** builds agents without code, with roughly 700 prebuilt actions across Zoho applications.
- **Zoho MCP** exposes Zoho data and actions to external AI assistants through the Model Context Protocol, an open standard for connecting AI tools to business software.
- **Zoho Flow AI** creates workflows from plain-English descriptions and offers prebuilt AI steps.
- **Zoho Books** includes Ask Zia, the CoCreate Agent, anomaly detection and cashflow forecasting.
- **Zoho Creator** runs agents that use Deluge scripts as their tools.

Custom development is defensible when it joins several systems, applies firm-specific review rules, provides a specialised operations view, or makes an exception process manageable. It is not defensible when it reproduces a feature the platform already ships.

### Interface facts that shape Application 2

Zoho Books uses OAuth 2.0. Access tokens expire after about one hour, so a refresh token must be used to obtain new ones. There is a limit of roughly 100 requests per minute per organisation, with daily caps varying by subscription tier, and the interface returns HTTP status 429 when a limit is exceeded. Confirm the current figures for the specific organisation rather than assuming these.

## 5 The three applications

### Application 1: Client Document Chaser

**Business problem.** Chasing clients for missing paperwork is repetitive, and nobody can see at a glance who owes what.

**What it does.** Reads clients and their required documents from Zoho, determines what is missing, and builds a queue showing the owner of each outstanding item. A language model drafts the chasing message in the firm's tone. A person approves before anything is sent.

**Why it is on the list.** It is the client-facing application, which answers the "client experiences" phrase in the advertisement. The approval step demonstrates that AI touching clients is given a brake.

**Deliverable.** Deployed application, one-page business brief, and a short recorded walkthrough that includes the approval gate refusing to send.

### Application 2: AR Exception Desk

**Business problem.** Receivables reporting takes preparation time, and the reported figures cannot easily be traced back to the underlying invoices.

**What it does.** A Python service reads invoices and payments from the Zoho Books interface and presents an aging view in which **every figure can be opened to reveal the invoices behind it**. One bounded language-model tool answers "why is this invoice overdue?" by citing evidence, and declines to answer when the evidence is insufficient.

**The engineering it demonstrates.** Refresh-token handling for hourly expiry; paging through long result lists; a saved checkpoint so that repeating a synchronisation never counts anything twice; and backing off when the request limit is reached. A Python backend with a browser front end covers the full-stack requirement.

**Why it is on the list.** Traceable figures are the single thing an accounting firm cares about most, and a model that declines to answer is the clearest available signal of an engineer who has shipped language-model features before.

**Deliverable.** Deployed application, business brief, recorded walkthrough showing a figure traced to its source invoices, and a recorded case where the model declines.

### Application 3: Firm Policy Answer Desk

**Business problem.** Staff repeatedly ask how to handle particular cases, and the answers live in documents nobody rereads.

**What it does.** Staff ask a question in plain English. The application retrieves the relevant standard operating procedure and answers **with a citation to it**, refusing when no document supports an answer. A small usage view records questions asked, the proportion answered with a source, and the proportion refused.

**Why it is on the list.** That usage view is the evidence for the "evaluate and adopt" area. Adoption is demonstrated by measuring whether people used the application, not by claiming they would.

**Deliverable.** Deployed application, business brief, and the usage figures after a fortnight of self-use.

### Hosting, kept deliberately small

All three run on Azure App Service or Azure Container Apps. Sign-in uses Microsoft Entra ID. Application keys are held in Azure Key Vault and retrieved using a managed identity, which means no keys or passwords appear in the source code. Three sentences in each README cover this and satisfy both the cloud preference and the application-security requirement.

## 6 Two cross-cutting artefacts

### A. The build-versus-configure map

One page. Eight accounting workflows, drawn from `practice/week-01/automation-opportunity-map.md`, each marked **native Zia**, **low-code**, or **custom build**, with a single line of reasoning.

Include at least one workflow whose verdict is *do not build this; Zoho Books already does it*. That row demonstrates judgement more economically than any amount of code.

### B. The evaluation pack

One test set of roughly twenty realistic cases spanning all three applications.

| Measure | The question it answers |
| --- | --- |
| Answer accuracy | Is the output actually correct? |
| Refusal rate on ambiguous cases | Does it know when to stop? |
| Unsafe actions blocked | Can it be trusted near money and client data? |
| Minutes per item, before and after | What does this save? |

Report savings as estimates until a real pilot measures them. This restraint is required by the working rules in the repository README, and it reads as maturity rather than hedging.

## 7 Five-week schedule at roughly twelve hours a week

| Week | Hours | Result |
| --- | --- | --- |
| 1 | 12 | Build-versus-configure map complete; Zoho trial organisation populated with fictional client data |
| 2 | 12 | Application 2 built: Zoho reading, checkpoint, traceable aging view |
| 3 | 12 | Application 2 finished and deployed: language-model tool with refusal, sign-in, secret storage |
| 4 | 12 | Application 1 built and deployed, including the approval gate |
| 5 | 12 | Application 3 built and deployed; evaluation pack run across all three; briefs and recordings finished |

Compressed to three weeks if the interview is sooner: the map, Application 2, Application 3, and the evaluation pack. Omit Application 1.

**Costs.** A Zoho trial organisation is free for fourteen days; Zoho Books offers a free tier in India subject to turnover conditions, which should be confirmed at signup. The Azure free tier covers this scale of work. Model-provider usage at this scale is approximately ₹1,000 to ₹2,000 in total.

## 8 Presentation

- Rewrite the repository README so the three applications appear first and the twenty-week curriculum appears below them.
- One page for each application: business problem, what was built, what it refuses to do, what was measured, known limitations.
- One recording of roughly three minutes for each application. Most reviewers watch rather than read.
- The build-versus-configure map, presented as a considered opinion. This is the interview conversation worth starting.
- Retain the existing statement that this is independent work using fictional data, with no claim of affiliation.

## 9 Two matters to raise before being asked

**Working hours.** The advertisement requires United States Central Time hours, and the firm is based in Minneapolis. Central Time is eleven and a half hours behind Indian Standard Time, so a nine-to-six Central working day falls roughly between 7:30 in the evening and 4:30 in the morning, Indian time. State the intended working window in the first message rather than letting it surface as a problem.

**The state of this repository.** `progress/state.json` currently records no completed weeks, the week-one practice files are unfilled templates, and the README opens with a twenty-week curriculum. As it stands the repository reads as extensive planning without delivery, which is the opposite of the advertisement's requirement for three applications built and deployed. Section 8 corrects this.

## 10 Sources

Checked 15 September 2026. Product features, interface limits and subscription terms change; confirm before relying on any figure here.

- Zoho. [Zia LLM, prebuilt agents, custom agent builder, MCP and marketplace announcement](https://secure.businesswire.com/news/home/20250717118204/en/Zoho-Launches-Zia-LLM-and-Deepens-AI-Portfolio-with-Prebuilt-Agents-Custom-Agent-Builder-MCP-and-Marketplace). 17 July 2025.
- Zoho. [Zoho MCP](https://www.zoho.com/mcp/). Living documentation.
- Zoho. [AI features in Zoho Books](https://www.zoho.com/in/books/help/ai-features/ai-features.html). Living documentation.
- Zoho. [AI agents in Zoho Creator](https://www.zoho.com/creator/ai-agents.html). Living documentation.
- [Zoho Flow AI automation in 2026](https://abhijeetbuilts.tech/blog/zoho-flow-ai-automation-2026). Third-party summary; verify against Zoho documentation.
- [Zoho Books interface endpoints, authentication and rate limits](https://www.getknit.dev/blog/zoho-books-api-directory-9eeBzn). Third-party summary; verify against Zoho documentation.
- Microsoft. [Key Vault references in Azure App Service](https://learn.microsoft.com/en-us/azure/app-service/app-service-key-vault-references). Living documentation.
- Microsoft. [Security overview in Azure Container Apps](https://learn.microsoft.com/en-us/azure/container-apps/security). Living documentation.
