import http from "../http-common";

class FeaturesDataService {
  getAll() {
    return http.get("/features");
  }

  get(id) {
    return http.get(`/features/${id}`);
  }

  create(data) {
    return http.post("/features", data);
  }

  vote(id) {
    return http.put(`/features/vote/${id}`);
  }

  update(id, data) {
    return http.put(`/features/${id}`, data);
  }

  delete(id) {
    return http.delete(`/features/${id}`);
  }

  deleteAll() {
    return http.delete(`/features`);
  }

  findByTitle(title) {
    return http.get(`/features?title=${title}`);
  }
}

export default new FeaturesDataService();