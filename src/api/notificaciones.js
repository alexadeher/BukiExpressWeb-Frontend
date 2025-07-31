import api from "./api";

const endpoint = "/notificaciones";

export const getNotificaciones = async () => {
    return await api.get(`${endpoint}/all`);
}

export const getPendientes = async () => {
    return await api.get(`${endpoint}/pendientes`);
}

export const aprobarUsuario = async (body) => {
    try {
        const response = await api.put(
        `${endpoint}/aprobar`,
        body,
        {
            headers: {
            Authorization: `Bearer ${localStorage.getItem("jwt")}`
            },
        }
        );
        return response.data;
    } catch (error) {
        console.error(
        "Error al aprobar al usuario:",
        error
        );
        throw error;
    }
}

export const rechazarUsuario = async (body) => {
    try {
        const response = await api.put(
        `${endpoint}/rechazar`,
        body,
        {
            headers: {
            Authorization: `Bearer ${localStorage.getItem("jwt")}`
            },
        }
        );
        return response.data;
    } catch (error) {
        console.error(
        "Error al rechazar al usuario:",
        error
        );
        throw error;
    }
}