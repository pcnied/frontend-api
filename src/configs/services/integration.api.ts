import axios from 'axios';

const baseURL =
	import.meta.env.MODE === 'development'
		? 'http://localhost:3000/' // URL para desenvolvimento
		: import.meta.env.VITE_API_URL; // URL para produção (definida no .env)

const api = axios.create({
	baseURL: baseURL,
});

export default api;
