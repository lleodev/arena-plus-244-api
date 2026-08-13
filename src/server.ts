import app from "./app.js"

const PORT = process.env.PORT || 8080

app.listen(PORT, (err) => {
    if (err)
        console.log("Erroo while attempt start server!", err.message)
    console.log(`Server running on http://localhost:${PORT}`)
} )
