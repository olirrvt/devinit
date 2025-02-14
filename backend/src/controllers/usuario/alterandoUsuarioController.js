const { hash } = require("bcrypt")

const alterandoUsuarioController = async (req, res) => {
    try {
        let usuario = require("../../models/usuario");
        const idUsuario = req.params.idUsuario;
        const { nome, nomeDeUsuario, email, senha, foto } = req.body;
        const usuarioExistente = usuario.findByPk(idUsuario);
        const senhaHash = await hash(senha, 8)
        await usuario.update({
            nome: nome || usuarioExistente.nome,
            nomeDeUsuario: nomeDeUsuario || usuarioExistente.nomeDeUsuario,
            email: email || usuarioExistente.email,
            senha: senhaHash || usuarioExistente.senha,
            foto: foto || usuarioExistente.foto
        }, { where: { idUsuario: idUsuario } });
        const usuarioAtualizado = await usuario.findByPk(idUsuario);
        return res.json({ message: "Usuario atualizado com sucesso!", usuario: usuarioAtualizado })
    } catch (err) {
        return console.log(err)
    }
};

module.exports = alterandoUsuarioController;