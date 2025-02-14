const criandoCategoriaController = async (req, res) => {
    try {
        const db = require("../../connection/db");
        const categorias = require("../../models/categorias");
        await db.sync();

        const { categoria, fotoCategoria } = req.body;
        const novaCategoria = await categorias.create({
            categoria, fotoCategoria
        });

        return res.json({ message: "Categoria adicionada!", Categoria: novaCategoria });
    } catch (err) {
        console.log(err)
        return res.json({ error: err });
    }
};

module.exports = criandoCategoriaController;