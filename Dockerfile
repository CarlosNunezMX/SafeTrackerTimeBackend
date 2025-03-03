FROM oven/bun:1
WORKDIR /app
COPY . .
RUN bun install
RUN bun x prisma generate
ARG PORT
EXPOSE ${PORT:-3000}
 
CMD ["bun", "server.ts"]
