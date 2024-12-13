FROM oven/bun:1

COPY package.json bun.lockb ./
RUN bun install --frozen-lockfile

COPY server ./server
COPY frontend ./frontend

WORKDIR /frontend
RUN bun build
# Remove all files in frontend except for the dist folder
RUN find . -mindepth 1 ! -regex '^./dist\(/.*\)?' -delete

EXPOSE 3000/tcp

CMD [ "bun", "start" ]

