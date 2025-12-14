# Angular Frontend (RAG UI)

Quickstart

1. Install dependencies:

```powershell
cd frontend
npm install
```

2. Run locally (uses local Angular CLI):

```powershell
npx ng serve --open
```
Change backend url value in environment.ts
```powershell
backendUrl: 'http://localhost:8000'
```
This simple UI talks to `http://localhost:8000` for `/upload` and `/query`. Update endpoints if your backend is hosted elsewhere.

Notes

- If backend deployed into new Azure Web App, configure the backend url in environment.ts and environment.prod.ts 
  by default, keep the env files unchanged [https://gmuece553-team4-rag-backend-a2fghsejh3awbncp.canadacentral-01.azurewebsites.net]
```powershell
--environment.ts
export const environment = {
  production: false,
  backendUrl: 'https://{your_backend_app_domain}.azurewebsites.net'
};....
]
--environment.prod.ts
export const environment = {
  production: false,
  backendUrl: 'https://{your_backend_app_domain}.azurewebsites.net'
};....
]
```

The project code  can be accessed through github [https://github.com/mohIT-gc/rag-app-frontend]
Deployed Azure Static Web App for Frontend service URL, UI can bve accessed through
[https://purple-meadow-08d99360f.3.azurestaticapps.net/]

