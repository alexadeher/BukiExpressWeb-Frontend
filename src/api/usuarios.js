import api from "./api";

const endpoint = "/usuarios";

export const getUsuarios = async () => {
    return await api.get(`${endpoint}/all`);
}

export const getUsuario = async (id) => {
    return await api.get(`${endpoint}/${id}`);
}

export const crearUsuario = async (nombre, apellidos, correo, contrasena, rol) => {
    try {
        const formData = new FormData();
        formData.append("nombre", nombre);
        formData.append("apellidos", apellidos);
        formData.append("correo", correo);
        formData.append("contrasena", contrasena);
        formData.append("rol", rol);

        const response = await api.post(`${endpoint}/guardar`, formData, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("jwt")}`,
                "Content-Type": "multipart/form-data",
            },
        });
        return response.data;
    } catch (error) {
        console.error("Error al crear el usuario:");
        console.error(error.response); 
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