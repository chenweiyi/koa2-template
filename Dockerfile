FROM xxx

RUN npm i -g pnpm@9

ARG APP_NAME
ENV APP_NAME $APP_NAME

WORKDIR /home/homework/

COPY pnpm-lock.yaml package.json .npmrc /home/homework/

RUN pnpm install --frozen-lockfile --prefer-offline

COPY . .

CMD ["npm", "start"]
