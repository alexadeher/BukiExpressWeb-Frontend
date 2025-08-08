import api from "./api";

const endpoint = "/socios";

export const getSocios = async () => {
    return await api.get(`${endpoint}/all`);
}

export const getSocio = async (id) => {
    return await api.get(`${endpoint}/${id}`);
}

export const saveSocio = async (socioData) => {
    return await api.post(`${endpoint}/guardar`, socioData);
}

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
        "Error al cambiar el estado del socio:",
        error
        );
        throw error;
    }
};

export const deleteSocio = async (socio) => {
    try {
        const response = await api.delete(`${endpoint}/eliminar`,
            {
                data: socio, 
                headers: {
                Authorization: `Bearer ${localStorage.getItem("jwt")}`
            }
        });
        return response.data;
    } catch (error) {
        console.error("Error al eliminar al socio:", error);
        throw error;
    }
}

export const contarSocios = async () => {
    try {
        const response = await api.get(`${endpoint}/contar`);
        return response.data;
    } catch (error) {
        console.error("Error al contar los espacios:", error);
        throw error;
    }
};