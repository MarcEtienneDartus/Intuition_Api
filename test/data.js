process.env.ENVIRONMENT = 'prod';

//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../server');
let should = chai.should();


chai.use(chaiHttp);

//   describe('/GET Api Working', () => {
//       it('it should GET a message from Api', (done) => {
//         chai.request(server)
//             .get('/api')
//             .end((err, res) => {
//                   res.should.have.status(200);
//                   res.text.should.equal('API works.');
//               done();
//             });
//       });
//   });

let token = null;

  describe('/POST login', () => {
    it('it should login and get token', (done) => {
      chai.request(server)
          .post('/api/auth/login')
          .set('Content-Type', 'application/x-www-form-urlencoded')
          .send({
            email: 'test@gmail.com',
            password: 'plop'
          })
          .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.auth.should.equal(true);
                res.body.token.should.a('string');
                token = res.body.token;
            done();
          });
    });
});

  describe('/GET header Secteur', () => {
    // it('it should GET all distinct Secteur', (done) => {
    //   chai.request(server)
    //       .get('/api/data/header/distinct/Secteur')
    //       .set('x-access-token', token)
    //       .end((err, res) => {
    //             res.should.have.status(200);
    //             res.body.should.be.a('array');
    //         done();
    //       });
    // });
    
    it('it should reject access with no token', (done) => {
        chai.request(server)
            .get('/api/data/header/distinct/Secteur')
            .end((err, res) => {
                  res.should.have.status(403);
                  res.body.should.be.a('object');
                  res.body.auth.should.equal(false);
                  res.body.message.should.equal('No token provided.');
              done();
            });
      });
    it('it should reject access with wrong token', (done) => {
        chai.request(server)
            .get('/api/data/header/distinct/Secteur')
            .set('x-access-token', 'randomToken')
            .end((err, res) => {
                  res.should.have.status(403);
                  res.body.should.be.a('object');
                  res.body.auth.should.equal(false);
                  res.body.message.should.equal('Failed to authenticate token.');
              done();
            });
      });
});
