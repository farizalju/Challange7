const supertest = require("supertest");
const app = require("../app.js");

const component = {
    id: "",
    name: "Sabun Mandi",
    description: "Sabun Dengan Nature Protect",
};

// positive get all data
describe('TEST GET All /components endpoint', () => {
    // positive
    test('GET All Data', () => {
        return supertest(app)
            .get('/components')
            .then(res => {
                expect(res.statusCode).toBe(200);
                expect(res.body).toHaveProperty('status');
                expect(res.body).toHaveProperty('message');
                expect(res.body).toHaveProperty('data');
                expect(res.body.status).toBe(true);
                expect(res.body.message).toBe('success');
                expect(res.body.data).toStrictEqual([
                    {
                        id: expect.any(Number),
                        name: expect.any(String),
                        description: expect.any(String)
                    }
                ]);
            });
    });
});

// positive get by id
describe('TEST GET BY ID /components/:id_component endpoint', () => {
    // positive
    test('GET By ID', () => {
        return supertest(app)
            .get(`/components/` + component.id)
            .then(res => {
                expect(res.statusCode).toBe(200);
                expect(res.body).toHaveProperty('status');
                expect(res.body).toHaveProperty('message');
                expect(res.body).toHaveProperty('data');
                expect(res.body.data).toHaveProperty('id');
                expect(res.body.data).toHaveProperty('name');
                expect(res.body.data).toHaveProperty('description');
                expect(res.body.status).toBe(true);
                expect(res.body.message).toBe('success');
            });
    });
    //negative
    test('GET By ID', () => {
        return supertest(app)
            .get('/components/900')
            .then(res => {
                expect(res.statusCode).toBe(404);
                expect(res.body).toHaveProperty('status');
                expect(res.body).toHaveProperty('message');
                expect(res.body.status).toBe(false);
                expect(res.body.message).toBe(`cannot get component with component id ${component_id}`);
            });
    });
});

// positive create
describe('TEST POST /components endpoint', () => {
    // positive
    test('Create Components', () => {
        return supertest(app)
            .post('/components')
            .send(component)
            .then(res => {
                expect(res.statusCode).toBe(201);
                expect(res.body).toHaveProperty('status');
                expect(res.body).toHaveProperty('message');
                expect(res.body).toHaveProperty('data');
                expect(res.body.data).toHaveProperty('id');
                expect(res.body.data).toHaveProperty('name');
                expect(res.body.data).toHaveProperty('description');
                expect(res.body.status).toBe(true);
                expect(res.body.message).toBe('success');

                component.id = res.body.data.id
            });
    });

    // negative
    test('Create Components Gagal : Nama Atau Deskripsi Dibutuhkan', () => {
        return supertest(app)
            .post('/components')
            .send({})
            .then(res => {
                expect(res.statusCode).toBe(400);
                expect(res.body).toHaveProperty('status');
                expect(res.body).toHaveProperty('message');
                expect(res.body.status).toBe(false);
                expect(res.body.message).toBe("name or description is required!");
            });
    });

    test('Create Component Gagal : Email Sudah Ada', () => {
        return supertest(app)
            .post('/components')
            .send(component)
            .then(res => {
                expect(res.statusCode).toBe(400);
                expect(res.body).toHaveProperty('status');
                expect(res.body).toHaveProperty('message');
                expect(res.body.status).toBe(false);
                expect(res.body.message).toBe("component is already created!");
            });
    });
});


// Postive Update
describe('TEST UPDATE /components/:id_component endpoint', () => {
    // positive
    test('Update Components', () => {
        return supertest(app)
            .put(`/components/` + component.id)
            .send({ description : "Sabun Dengan Nature Protect"})
            .then(res => {
                expect(res.statusCode).toBe(200);
                expect(res.body).toHaveProperty('status');
                expect(res.body).toHaveProperty('message');
                expect(res.body.status).toBe(true);
                expect(res.body.message).toBe('updated succes');
            });
    });

    //negative
    test('Update Component Gagal', () => {
        return supertest(app)
            .put('/components/100')
            .then(res => {
                expect(res.statusCode).toBe(404);
                expect(res.body).toHaveProperty('status');
                expect(res.body).toHaveProperty('message');
                expect(res.body.status).toBe(false);
                expect(res.body.message).toBe("cannot update component with component id not found");
            });
    });
});

// positive delete
describe('TEST DELETE /components/:id_component endpoint', () => {
    // positive
    test('Delete Components', () => {
        return supertest(app)
            .delete(`/components/` + component.id)
            .then(res => {
                expect(res.statusCode).toBe(200);
                expect(res.body).toHaveProperty('status');
                expect(res.body).toHaveProperty('message');
                expect(res.body.status).toBe(true);
                expect(res.body.message).toBe('deleted succes');
            });
    });

    //negative
    test('Delete Components Gagal', () => {
        return supertest(app)
            .delete('/components/:id_component')
            .then(res => {
                expect(res.statusCode).toBe(404);
                expect(res.body).toHaveProperty('status');
                expect(res.body).toHaveProperty('message');
                expect(res.body.status).toBe(false);
                expect(res.body.message).toBe(`cannot delete component with component id ${component_id}`);
            });
    });
});