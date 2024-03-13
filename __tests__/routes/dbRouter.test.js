/**
 * @jest-environment node
 */

/**
 * ************************************
 *
 * @author Stephen Chow & Bongi Sibanda
 * @date March 13, 2024
 * @description Tests the select routes in dbRouter
 *
 * ************************************
 */


const request = require('supertest');
const dbRouter = require('../../server/routes/dbRouter');
const express = require('express');
const app = express()

// This is used to delete new test files from the DB during testing.
// This should be removed once delete functionality is added to this file.
const db = require('../../server/models/jobModels');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api', dbRouter);



describe('db Route', () => {

    /**
     * Hacky solution that will manually delete all entries from the DB that were added during this test.
     * Should remove once the delete routes are functional
     */
    afterAll(async () => {
        
        let cleanupListings = `
            DELETE FROM listings
            WHERE
                job_role_name = 'Test Software Developer'
                AND company_name = 'Test Company 1'
                AND details = 'Test Job Details 1';
        `
        await db.query(cleanupListings);

        let cleanupCategories = `
            DELETE FROM categories
            WHERE
                category_name LIKE 'WAITING%';
        `
        await db.query(cleanupCategories);

    })


    describe('get one job', () => {
        it('returns a 200 status if correct id given', async () => {

            const response = await request(app).get('/api/job/25');
            expect(response.status).toBe(200);

        });
    });

    describe('get all jobs', () => {
        it('returns a 200 status if correct id given', async () => {
            const response = await request(app).get('/api/job');
            expect(response.status).toBe(200);
            expect(response.body.length).not.toBe(0);
        })
        it('return an array of objects', async () => {
            const response = await request(app).get('/api/job');
            expect(response.body.length).not.toBe(0);
        })
    })

    describe('create job', () => {
        it('returns a 200 status for successful job creation', async () => {
            const jobData = {
                job_role_name: 'Test Software Developer',
                company_name: 'Test Company 1',
                details: 'Test Job Details 1', 
                date_applied: '2024-03-13T04:00:00.000Z', 
                category_id: 65
            };
            const response = await request(app).post('/api/job').send(jobData)
            expect(response.status).toBe(200);
        })
        it('returns 400 status if fields are missing or wrong data type', async () => {
            const incompleteJobData = {
                job_role_name: {},
                company_name: '',
                details: 'Test Job Details 2',
                date_applied: '03-13-2024'
            };
            const response = await request(app).post('/api/job').send(incompleteJobData)
            expect(response.status).toBe(400);
        });
    })

    describe('update job', () => {
        xit('returns 200 status if a job is successfully updated', async () => {
            const jobId = 25;
            const jobData = {
                job_role_name: 'Test Software Developer 3',
                company_name: 'Test Company 3',
                details: 'Test Job Details 3',
                date_applied: '2024-03-13T04:00:00.000Z', 
                category_id: 65
            }
            const response = await request(app).patch('/api/job/25').send(jobData)
            expect(response.status).toBe(200);
        })
        xit('returns 400 status if job doesnt exist', async () => {
            const incompleteJobData = {
                job_role_name: {},
                company_name: '',
                details: 'Test Job Details 2',
                date_applied: '03-13-2024'
            };
            const response = await request(app).patch('/api/job/9999').send(incompleteJobData)
            expect(response.status).toBe(400);
        });
    });

    describe('get one category', () => {
        it('returns a 200 status', async () => {
            const response = await request(app).get('/api/category/65');
            expect(response.status).toBe(200);
        })
        it('returns an error if category id does not exist in db', async () => {
            const response = await request(app).get('/api/category/700');
            expect(response.status).toBe(400);
        })
        it('returns an array with one category', async () => {
            const response = await request(app).get('/api/category/65');
            expect(response.body.category_id).toEqual("65");
        })

    })

    describe('get all category', () => {
        it('returns a 200 status', async () => {
            const response = await request(app).get('/api/category');
            expect(response.status).toBe(200);
        })
        it('returns an array of category objects', async () => {
            const response = await request(app).get('/api/category');
            expect(response.body.length).not.toBe(0);
        })

    })
    describe('create a category', () => {
        it('returns a 200 status', async () => {
            const response = await request(app).post('/api/category').send({ user_id: "2", category_name: 'WAITING' });
            expect(response.status).toBe(200);
        })
        it('returns created category_id', async () => {
            const response = await request(app).post('/api/category').send({ user_id: "2", category_name: 'WAITING' });
            expect(response.body._id).not.toBe(undefined);
        })

    })
    describe('update a category', () => {
        it('returns a 200 status', async () => {
            const response = await request(app).patch('/api/category/116').send({ user_id: "2", category_name: 'WAITING for response' });
            expect(response.status).toBe(200);
        })
        it('returns updated category', async () => {
            const response = await request(app).patch('/api/category/116').send({ user_id: "2", category_name: 'WAITING for response' });
            expect(response.body.length).not.toBe(0);
        })
    })

})