const qs = require('querystring');

export default function (instance) {
  return {
    getAll() {
      return instance.get('/api/students/');
    },
    removeStudent(id) {
      return instance.delete(`api/students/${id}`);
    },
    addStudent(payload) {
      return instance.post('api/students/', qs.stringify(payload));
    },
    changeStudent(payload, id) {
      return instance.put(`api/students/${id}`, qs.stringify(payload));
    }
  }
}