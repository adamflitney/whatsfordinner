# whatsfordinner

To install dependencies:

```bash
bun install
```

To run:

```bash
bun run index.ts
```

This project was created using `bun init` in bun v1.1.34. [Bun](https://bun.sh) is a fast all-in-one JavaScript runtime.


# Kill process running on port 3000 (handy when reconnecting to the pi server)
fuser -k 3000/tcp

# connect directly to the postgres instance
sudo docker exec -it postgres_wfd psql -U wfduser postgres
