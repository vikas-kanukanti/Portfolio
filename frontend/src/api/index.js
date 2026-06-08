import axios from 'axios'

const api = axios.create({ baseURL: '/api' })

export const getProjects = (featured) =>
  api.get('/projects/', { params: featured != null ? { featured } : {} }).then((r) => r.data)

export const getProject = (id) => api.get(`/projects/${id}`).then((r) => r.data)

export const getSkills = (category) =>
  api.get('/skills/', { params: category ? { category } : {} }).then((r) => r.data)

export const getExperiences = () => api.get('/experience/').then((r) => r.data)

export const getBlogPosts = () => api.get('/blog/').then((r) => r.data)

export const getBlogPost = (slug) => api.get(`/blog/${slug}`).then((r) => r.data)

export const submitContact = (data) => api.post('/contact/', data).then((r) => r.data)
