FROM node:16 as base
WORKDIR /app/
COPY ./lerna.json ./
COPY ./package.json ./
RUN npm install

# UI package
FROM base as ui
WORKDIR /app/packages/ui
COPY packages/ui/ ./
WORKDIR /app/
RUN npx lerna bootstrap --scope=ui --includeDependencies
WORKDIR /app/packages/ui
RUN npm run build

# API package
FROM base as api
WORKDIR /app/packages/apiClient
COPY packages/apiClient ./
WORKDIR /app/
RUN npx lerna bootstrap --scope=apiclient --includeDependencies
WORKDIR /app/packages/apiClient
RUN npm run build

# Posts app
FROM base as posts
COPY --from=ui /app/packages/ui /app/packages/ui/
COPY --from=api /app/packages/apiClient /app/packages/apiClient/
WORKDIR /app/packages/posts
COPY packages/posts ./
WORKDIR /app/
RUN npx lerna bootstrap --scope=posts --includeDependencies
WORKDIR /app/packages/posts

# Admin app
FROM base as admin
COPY --from=ui /app/packages/ui /app/packages/ui/
COPY --from=api /app/packages/apiClient /app/packages/apiClient/
WORKDIR /app/packages/admin
COPY packages/admin ./
WORKDIR /app/
RUN npx lerna bootstrap --scope=admin --includeDependencies
WORKDIR /app/packages/admin

# Final
FROM base
COPY --from=ui /app/packages/ui /app/packages/ui
COPY --from=api /app/packages/apiClient /app/packages/apiClient
COPY --from=posts /app/packages/posts /app/packages/posts
RUN npx lerna bootstrap