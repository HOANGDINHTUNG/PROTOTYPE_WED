# Integration notes

## 1) Tech stack
- React + TypeScript
- Tailwind CSS v4
- React Router
- Axios
- Redux Toolkit
- No `any` used in source code

## 2) Expected backend endpoints
Client-side services assume these endpoints exist on your virtual server:

- `GET /api/simulation/snapshot`
- `POST /api/simulation/seed`
- `POST /api/simulation/reset`
- `POST /api/orders`
- `PATCH /api/orders/:orderId/status`

Configure with:

```env
VITE_API_BASE_URL=http://your-virtual-server/api
VITE_ENABLE_DEMO_FALLBACK=true
```

## 3) Notes
- The current package is built to let you keep all persistence on your server.
- `VITE_ENABLE_DEMO_FALLBACK=true` is optional and only helps preview UI when backend is not ready.
- Image paths are placeholders so you can import your own assets later.
