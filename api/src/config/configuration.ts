export default () => ({
    port: parseInt(process.env.PORT ?? "") || 3001,
    secret: process.env.API_SECRET ?? "",
    token_ttl: process.env.TOKEN_TTL ?? "7d",
})