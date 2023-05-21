const express = require("express");
const bodyParser = require("body-parser");
const dbConfig = require("./config/db.config");
const Post = require("./models/post");

// Conexión a la base de datos
dbConfig();

const app = express();
app.use(bodyParser.json());

// Endpoint POST /api/posts
app.post("/api/posts", async (req, res) => {
  try {
    const { title, text, author } = req.body;

    // Validar el cuerpo de la petición
    if (!title || !text || !author) {
      return res.status(400).json({ error: "Todos los campos son requeridos" });
    }

    // Validar la longitud mínima de title y text
    if (title.length < 5 || text.length < 5) {
      return res.status(400).json({
        error: "Los campos title y text deben tener al menos 5 caracteres",
      });
    }

    // Crear un nuevo post
    const newPost = await Post.create({ title, text, author });

    return res.status(201).json(newPost);
  } catch (error) {
    return res
      .status(500)
      .json({ error: "Ha ocurrido un error en el servidor" });
  }
});

// Endpoint GET /api/posts
app.get("/api/posts", async (req, res) => {
  try {
    // Obtener todos los posts almacenados
    const posts = await Post.find();

    return res.status(200).json(posts);
  } catch (error) {
    return res
      .status(500)
      .json({ error: "Ha ocurrido un error en el servidor" });
  }
});

// Endpoint GET /api/posts/:id
app.get("/api/posts/:id", async (req, res) => {
  try {
    const { id } = req.params;

    // Buscar un post por su ID
    const post = await Post.findById(id);

    if (!post) {
      return res.status(404).json({ error: "El post no existe" });
    }

    return res.status(200).json(post);
  } catch (error) {
    return res
      .status(500)
      .json({ error: "Ha ocurrido un error en el servidor" });
  }
});

// Endpoint PATCH /api/posts/:id
app.patch("/api/posts/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { title, text, author } = req.body;

    // Buscar un post por su ID y actualizar sus atributos
    const updatedPost = await Post.findByIdAndUpdate(
      id,
      { title, text, author },
      { new: true }
    );

    if (!updatedPost) {
      return res.status(404).json({ error: "El post no existe" });
    }

    return res.status(200).json(updatedPost);
  } catch (error) {
    return res
      .status(500)
      .json({ error: "Ha ocurrido un error en el servidor" });
  }
});

// Endpoint DELETE /api/posts/:id
app.delete("/api/posts/:id", async (req, res) => {
  try {
    const { id } = req.params;

    // Buscar un post por su ID y eliminarlo
    const deletedPost = await Post.findByIdAndDelete(id);

    if (!deletedPost) {
      return res.status(404).json({ error: "El post no existe" });
    }

    return res.sendStatus(204);
  } catch (error) {
    return res
      .status(500)
      .json({ error: "Ha ocurrido un error en el servidor" });
  }
});

// Iniciar el servidor
app.listen(3000, () => {
  console.log("Servidor en ejecución en el puerto 3000");
});
