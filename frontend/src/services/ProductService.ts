import axios from 'axios';

const API_URL = 'http://localhost:5000/Product';

class ProductService {
    async getAll() {
        try {
            const response = await axios.get(API_URL+'/getAll');
            return response.data;
        } catch (error) {
            return { error: error };
        }
    }

    async get(id: number) {
        try {
            const response = await axios.get(`${API_URL}/get/${id}`);
            return response.data;
        } catch (error) {
            return { error: error };
        }
    }

    async create(data: any) {
        try {
            const response = await axios.post(API_URL+"/addproducts", data);
            return response.data;
        } catch (error) {
            return { error: error };
        }
    }

    async update(id: number, data: any) {
        try {
            const response = await axios.put(`${API_URL}/editproducts/${id}`, data);
            return response.data;
        } catch (error) {
            return { error: error };
        }
    }

    async delete(id: number) {
        try {
            const response = await axios.delete(`${API_URL}/deleteproducts/${id}`);
            return response.data;
        } catch (error) {
            return { error: error };
        }
    }

    async search(searchTerm: string) {
        try {
            const response = await axios.get(`${API_URL}/search?q=${searchTerm}`);
            return response.data;
        } catch (error) {
            return { error: error };
        }
    }
}

export default new ProductService();