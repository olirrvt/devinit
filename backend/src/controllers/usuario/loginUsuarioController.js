const { compare } = require("bcrypt")

const loginUsuarioController = async (req, res) => {
    try {
        let usuario = require("../../models/usuario")
        const { email, senha } = req.body
        const usuarioExistente = await usuario.findOne({ where: { email: email } });
        if (!usuarioExistente) {
            return res.json("Email invalido!")
        }

        let senhaValida = await compare(senha, usuarioExistente.senha);
        if (!senhaValida) {
            return res.json("Senha incorreta!")
        }
        await usuario.update({
            id: usuarioExistente.id,
            nome: usuarioExistente.nome,
            email: usuarioExistente.email,
            senha: usuarioExistente.senha,
            logado: 1
        }, { where: { id: usuarioExistente.id } });
        return res.json({ message: "Login efetuado com sucesso!", usuario: usuarioExistente });
    } catch (err) {
        return res.json({ error: "Ocorreu um erro!" })
    }
}

module.exports = loginUsuarioController