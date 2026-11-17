# Se construye desde la raíz de esta repo: docker build -t disc-modulo-ejemplo .
# La plataforma también puede construirla directo desde la URL de la repo (ver README).
FROM node:22-alpine AS dependencias
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci

FROM node:22-alpine AS compilacion
WORKDIR /app
ARG RUTA_BASE=/m/ejemplo
ENV NEXT_TELEMETRY_DISABLED=1 RUTA_BASE=${RUTA_BASE}
COPY --from=dependencias /app/node_modules ./node_modules
COPY . .
RUN npm run build

FROM node:22-alpine
WORKDIR /app
ENV NODE_ENV=production NEXT_TELEMETRY_DISABLED=1 PORT=3000 HOSTNAME=0.0.0.0
COPY --from=compilacion --chown=node:node /app/.next/standalone ./
COPY --from=compilacion --chown=node:node /app/.next/static ./.next/static
USER node
EXPOSE 3000
HEALTHCHECK --interval=10s --timeout=5s --retries=10 CMD node -e "fetch('http://127.0.0.1:3000'+(process.env.RUTA_BASE||'/m/ejemplo')+'/salud').then(r=>process.exit(r.ok?0:1)).catch(()=>process.exit(1))"
CMD ["node", "server.js"]
