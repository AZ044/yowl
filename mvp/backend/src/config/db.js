const fs = require("fs").promises;

async function read(table) {
    const result =  await fs.readFile("./src/data/db.json", "utf-8");

    if (table) return JSON.parse(result)[table];
    else return JSON.parse(result);
}

async function write(data, table) {
    const db = await read()
    db[table].push(data)
    await fs.writeFile("./src/data/db.json", JSON.stringify(db, 0, 4))
}

module.exports = {read, write}