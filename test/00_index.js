"use strict";

import should from "should";
import supertest from "supertest";
import uuid from "node-uuid";

// import config from "./test_config.json";
require("../app")
let config = {
    "apikey": `pub_nLbIjlCWNKAdB_O3qgTaoQ`,
    "uri": `http://localhost:8000`,
    "timeout": 100000,
  },
    id,
    pixelid,
    eventid = "63b6a3d8-2fa2-47f4-b13a-cc9348fbdbb8"
const server = supertest.agent(config.uri);

describe("Asdeporte miscroservice for Test", function () {
  this.timeout(config.timeout);

  it("POST PixelList", (done) => {
    server.post(`/v1/pixelslist/${eventid}`)
      .set({'x-asd-apikey': config.apikey})
      .send({
        pixelname: `le pixelname :v`
      })
      .expect("Content-type", /json/)
      .expect(201)
      .end((err, res) => {
        id = res.body.data.pixelid
        res.body.should.have.properties(['data', 'code']);
        res.body.data.should.have.properties(['pixelid','created','deleted','eventid','pixelname']);
        res.body.code.should.equal(201);
        res.status.should.equal(201);
        done();
      });
  });

  it("GET:id PixelList", (done) => {
    server.get(`/v1/pixelslist/${id}`)
      .set({'x-asd-apikey': config.apikey})
      .expect("Content-type", /json/)
      .expect(200)
      .end((err, res) => {
        console.log("bodyyyy: ", res.body)
        res.body.should.be.json;
        res.body.should.have.properties(['data', 'code']);
        res.body.data.should.have.properties(['pixelid','created','deleted','eventid','pixelname']);
        res.status.should.equal(200);
        done();
      });
  });

  it("GET:LIST PixelList", (done) => {
    server.get(`/v1/pixelslist/list/`)
      .set({'x-asd-apikey': config.apikey})
      .expect("Content-type", /json/)
      .expect(200)
      .end((err, res) => {
        console.log("res.bodyyyyyyyy", res.body)
        res.body.should.be.json;
        res.body.should.have.properties(['totalrecords','page','perpage','totalpages','records']);
        res.body.records.should.be.Array()
        res.body.records[0].should.have.properties(['pixelid','created','deleted','eventid','pixelname']);
        res.status.should.equal(200);
        done();
      });
  });




  it("POST Pixel", (done) => {
    let send = {
      html:     `le html :v`,
      pixel: id
    }
    server.post(`/v1/pixels/${eventid}`)
      .set({'x-asd-apikey': config.apikey})
      .send(send)
      .expect("Content-type", /json/)
      .expect(201)
      .end((err, res) => {
        console.log("seeeeend :v ", send)
        pixelid = res.body.data.pixelid
        res.body.should.have.properties(['data', 'code']);
        res.body.data.should.have.properties(['pixelid','created','deleted','html','pixel']);
        res.body.code.should.equal(201);
        res.status.should.equal(201);
        done();
      });
  });

  it("GET:id Pixel", (done) => {
    server.get(`/v1/pixels/${pixelid}`)
      .set({'x-asd-apikey': config.apikey})
      .expect("Content-type", /json/)
      .expect(200)
      .end((err, res) => {
        res.body.should.be.json;
        res.body.should.have.properties(['data', 'code']);
        res.body.data.should.have.properties(['pixelid','created','deleted','html','pixel']);
        res.status.should.equal(200);
        done();
      });
  });

  it("GET:LIST Pixel", (done) => {
    server.get(`/v1/pixels/list/`)
      .set({'x-asd-apikey': config.apikey})
      .expect("Content-type", /json/)
      .expect(200)
      .end((err, res) => {
        console.log("res.bodyyyyyyyy", res.body)
        res.body.should.be.json;
        res.body.should.have.properties(['totalrecords','page','perpage','totalpages','records']);
        res.body.records.should.be.Array()
        res.body.records[0].should.have.properties(['pixelid','created','deleted','html','pixel']);
        res.status.should.equal(200);
        done();
      });
  });

  it("DELETE:id PixelList", (done) => {
    server.delete(`/v1/pixelslist/${id}`)
      .set({'x-asd-apikey': config.apikey})
      .expect("Content-type", /json/)
      .expect(201)
      .end((err, res) => {
        console.log("bodyyyy: ", res.body)
        res.body.should.be.json;
        res.body.should.have.properties(['data', 'code']);
        res.body.data.should.have.properties(['error','message']);
        res.body.data.error.should.equal(false);
        res.status.should.equal(201);
        done();
      });
  });

  it("DELETE:id Pixel", (done) => {
    server.delete(`/v1/pixels/${pixelid}`)
      .set({'x-asd-apikey': config.apikey})
      .expect("Content-type", /json/)
      .expect(201)
      .end((err, res) => {
        res.body.should.be.json;
        res.body.should.have.properties(['data', 'code']);
        res.body.data.should.have.properties(['error','message']);
        res.body.data.error.should.equal(false);
        res.status.should.equal(201);
        done();
      });
  });

});
