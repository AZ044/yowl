const router = require("express").Router();
const verif_auth = require("../../middleware/auth");
const {read, write} = require("../../config/db");

// Get thread
router.get("/", async (req, res) => {
    const thread = await read("thread");
    res.send(thread);
})

// Get thread and post
router.get("/:uuid", async (req, res) => {
    const { uuid } = req.params;

    const thread = await read("thread");

    const verif = thread.filter((item)=> item.uuid === uuid)[0];
    if (!verif) return res.status(404).send("Thread not found");

    const data_post = await read("post");
    const post = data_post.filter((item) => item.thread_uuid === uuid)
    return res.send({"thread": uuid, "post": post ? post : []})
})

// Get the post with id
router.get("/post/:uuid", async (req, res) => {
    const { uuid } = req.params;

    const data_post = await read("post");
    res.send(data_post.filter((item) => item.uuid === uuid)[0])
})

// Create thread
router.post("/", verif_auth, async (req, res) => {
    const { title, description } = req.body;
    if (typeof title !== "string" || typeof description !== "string") throw new TypeError();

    const data = await read("thread");

    const verif = data.filter((item) => item.title === title)[0];
    if (verif) return res.status(401).send({"msg": "Thread already exists"});

    const thread_uuid = crypto.randomUUID();
    await write({
        title: title,
        description: description,
        uuid: thread_uuid
    }, "thread")

    return res.send({"thread": thread_uuid})
})

// Create post
router.post("/post", verif_auth, async (req, res) => {
    const { thread_uuid, message } = req.body;
    if (typeof thread_uuid !== "string" || typeof message !== "string") throw new TypeError();

    const thread = await read("thread");

    const verif = thread.filter((item) => item.uuid === thread_uuid);
    if (!verif) return res.status(404).send("Thread not found");

    const post_uuid = crypto.randomUUID();
    const data = {
        thread_uuid: thread_uuid,
        message: message,
        uuid: post_uuid,
        pseudo: req.user_auth.pseudo
    }
    await write(data, "post");

    const data_post = await read("post");
    res.send(data_post.filter((item) => item.uuid === post_uuid)[0])
})

module.exports = router;