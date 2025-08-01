import api from "./api";

const endpoint = "/usuarios";

export const getUsuarios = async () => {
    return await api.get(`${endpoint}/all`);
}

export const getUsuario = async (id) => {
    return await api.get(`${endpoint}/${id}`);
}

export const crearUsuario = async (nombre, apellidos, correo, contrasena, rol) => {
    /*console.log({
        nombre,
        apellidos,
        correo,
        contrasena,
        rol
    });*/

    const jwt = localStorage.getItem("jwt");
    
    const headers = {
        "Content-Type": "application/json",
    };
    // Verificar si el JWT existe antes de hacer la solicitud
    if (jwt) {
        headers["Authorization"] = `Bearer ${jwt}`;
    }
    // Realizar la solicitud POST para crear el usuario
    try {
        const response = await api.post("/usuarios/guardar", {
            nombre,
            apellidos,
            correo,
            contrasena,
            rol
        }, { headers });
        return response.data;
    } catch (error) {
        console.error("Error al crear el usuario:");
        console.error(error.response?.data || error); 
        throw error;
    }
};

export const editUsuario = async (usuarioData) => {
    try {
        const response = await api.put(
            `${endpoint}/actualizar`,
            usuarioData,
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("jwt")}`
                },
            }
        );
        return response.data;
    } catch (error) {
        console.error("Error al editar el usuario:", error);
        throw error;
    }
};

export const changeStatus = async (id) => {
    try {
        const response = await api.put(
        `${endpoint}/cambiar-estado`,
        { id },
        {
            headers: {
            Authorization: `Bearer ${localStorage.getItem("jwt")}`
            },
        }
        );
        return response.data;
    } catch (error) {
        console.error(
        "Error al cambiar el estado del usuario:",
        error
        );
        throw error;
    }
};

export const eliminarUsuario = async (usuario) => {
    try {
        const response = await api.delete(`${endpoint}/eliminar`,
            {
                data: usuario, 
                headers: {
                Authorization: `Bearer ${localStorage.getItem("jwt")}`
            }
        });
        return response.data;
    } catch (error) {
        console.error("Error al eliminar el usuario:", error);
        throw error;
    }
}