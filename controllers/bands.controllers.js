const { response } = require('express');
const { v4: uuidv4 } = require('uuid')
let bandas = [];

const agregarBanda = (req, res) => {
    try {

        const { nombre, foundation, style, members } = req.body
        const nuevaBanda = {
            id: uuidv4(),
            nombre,
            foundation,
            style,
            members
        }

        bandas.push(nuevaBanda)
        res.json({
            success: true,
            response: 'Banda agregada correctamente '
        })
    } catch (error) {
        res.json({
            success: false,
            response: error.message
        })
    }
}

const leerBandas = (req, res) => {
    console.log(process.env.CLAVE_SECRETA);
    try {        
        const clave = req.headers.clave
        if (clave === process.env.CLAVE_SECRETA) {
            res.json({
                success: true,
                response: bandas
            })
        }else{
            throw new Error('No tienes permiso para ver este contenido')
        }

    } catch (error) {
        res.json({ success: false, error: error.message })
    }



}

const eliminarBanda = (req, res) => {
    try {
        const id = req.params.id

        if (!bandas.find((element) => element.id === id)) {
            throw new Error('No existe banda con el id asociado')
        }

        bandas = bandas.filter(banda => banda.id !== id)
        res.json({ success: true, response: bandas })

    } catch (error) {
        res.json({ success: false, error: error.message })
    }
}

const editarBanda = (req, res) => {
    const id = req.params.id
    console.log(req.body)

    const { nombre, foundation, style, members } = req.body
    const bandaEnEdicion = {
        id,
        nombre,
        foundation,
        style,
        members
    }

    bandas = bandas.map(banda => {
        if (banda.id === id) {
            return bandaEnEdicion
        }
        return banda
    })

    res.json({ success: true, response: bandas })
}

module.exports = { agregarBanda, leerBandas, eliminarBanda, editarBanda }