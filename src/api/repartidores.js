import api from "./api";

const endpoint = "/repartidores";

export const getRepartidores = async () => {
    return await api.get(`${endpoint}/all`);
}

export const getRepartidor = async (id) => {
    return await api.get(`${endpoint}/${id}`);
}