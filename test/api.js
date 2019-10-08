process.env.ENVIRONMENT = 'prod';

//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../server');
let should = chai.should();


chai.use(chaiHttp);

  describe('/GET Api Working', () => {
      it('it should GET a message from Api', (done) => {
        chai.request(server)
            .get('/api')
            .end((err, res) => {
                  res.should.have.status(200);
                  res.text.should.equal('API works.');
              done();
            });
      });
  });