FROM node:17.0.1 AS builder

WORKDIR /app
ENV PORT=80
ENV REACT_APP_BACKEND_URL=https://chuongnt.api.internship.designveloper.com
#ENV REACT_APP_BACKEND_URL=http://localhost:3060

COPY package*.json ./

RUN npm install --legacy-peer-deps
COPY . .

RUN npm run build

FROM nginx:1.22.0-alpine
COPY --from=builder /app/build /usr/share/nginx/html

COPY nginx.conf /etc/nginx/conf.d/default.conf

CMD ["nginx", "-g", "daemon off;"]
