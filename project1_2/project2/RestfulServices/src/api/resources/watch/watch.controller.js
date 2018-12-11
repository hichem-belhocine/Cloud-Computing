const Joi = require("joi");
const watchModel = require("./watch.model");
const con = require("../../../config/db.js").mysql_pool;

exports.create = async function (req, res) {
    res.setHeader("Cache-control", new Date(Date.now() + 3600000));
    res.setHeader('Expires', new Date(Date.now() + 3600000));
    try {
        const schema = Joi.object().keys({
            sku: Joi.string().required(),
            type: Joi.string().valid(["chrono", "watch"]).required(),
            status: Joi.string().valid(["old", "current", "outlet"]).required(),
            gender: Joi.string().valid(["man", "woman"]).required(),
            year: Joi.number().required(),
            dial_material: Joi.string().optional(),
            dial_color: Joi.string().optional(),
            case_material: Joi.string().optional(),
            case_form: Joi.string().optional(),
            bracelet_material: Joi.string().optional(),
            movement: Joi.string().optional(),
        });
        const { value, error } = Joi.validate(req.body, schema);
        if (error && error.details) {
            return res.status(400).json("invalid input1 " + error);
        }
    } catch (err) {
        return res.status(500).send("invalid input2");
    }
    await con.getConnection(function (err, connection) {
        var q = 'insert into watches values("' + req.body.sku +
            '","' + req.body.type + '","' + req.body.status + '","' + req.body.gender +
            '","' + req.body.year + '","' + req.body.dial_material + '","'
            + req.body.dial_color + '","' + req.body.case_material + '","'
            + req.body.case_form + '","' + req.body.bracelet_material + '","' + req.body.movement + '")';
        console.log(q);
        connection.query(q, function (error, results) {
            if (error) {
                res.status(400).json('invalid input');
            } else {
                res.status(200).json("Successful operation");
            }
        });
        connection.release();
    });
};
exports.getAll = async function (request, reply) {
    reply.setHeader("Cache-control", new Date(Date.now() + 3600000));
    reply.setHeader('Expires', new Date(Date.now() + 3600000));
   await con.getConnection(function (err, connection) {
        connection.query('SELECT * FROM watches', function (error, results) {
            if (error) {
                reply.json('connection or query error');
            } else {
                if (results) {
                    reply.status(200).json(results);
                } else {
                    reply.status(404).json('watch not found');
                }
            }
            connection.release();
        })
    });

};

exports.getOne = async function (req, reply) {
    reply.setHeader("Cache-control", new Date(Date.now() + 3600000));
    reply.setHeader('Expires', new Date(Date.now() + 3600000));
    await con.getConnection(function (err, connection) {
        var q = 'SELECT * FROM watches where sku = "' + req.params.sku + '"';
        connection.query(q, function (error, results) {
            if (error) {
                reply.json('connection or query error');
            } else {
                if (results != '') {
                    var result = {
                        sku: results[0].sku,
                        type: results[0].type,
                        status: results[0].status,
                        gender: results[0].gender,
                        year: results[0].year,
                        dial_material: results[0].dial_material,
                        dial_color: results[0].dial_color,
                        case_material: results[0].case_material,
                        case_form: results[0].case_form,
                        bracelet_material: results[0].bracelet_material,
                        movement: results[0].movement
                    };
                    reply.status(200).json(result);
                } else {
                    reply.status(404).json('watch not found');
                }
            }
            connection.release();
        })
    });

};

exports.update = async function (req, reply) {
    reply.setHeader("Cache-control", new Date(Date.now() + 3600000));
    reply.setHeader('Expires', new Date(Date.now() + 3600000));
    await con.getConnection(function (err, connection) {
        const sku = req.params.sku;
        var q = 'SELECT * FROM watches WHERE sku = "' + sku + '"';
        con.query(q, function (error, results) {
            if (error) {
                reply.status(400).json('invalid input');
            } else {
                if (results !='') {
                    var result = {
                        sku: results[0].sku,
                    };
                    try {
                        const schema = Joi.object().keys({
                            sku: Joi.string().required(),
                            type: Joi.string().valid(["chrono", "watch"]).required(),
                            status: Joi.string().valid(["old", "current", "outlet"]).required(),
                            gender: Joi.string().valid(["man", "woman"]).required(),
                            year: Joi.number().required(),
                            dial_material: Joi.string().optional(),
                            dial_color: Joi.string().optional(),
                            case_material: Joi.string().optional(),
                            case_form: Joi.string().optional(),
                            bracelet_material: Joi.string().optional(),
                            movement: Joi.string().optional(),
                        });
                        const { value, error } = Joi.validate(req.body, schema);
                        if (error && error.details) {
                            return reply.status(400).json(error);
                        }
                    } catch (err) {
                        return reply.status(500).send("invalid input");
                    }
                    var q = 'update watches set sku ="' + req.body.sku +
                        '",type="' + req.body.type + '",status="' + req.body.status + '",gender="' + req.body.gender +
                        '",year="' + req.body.year + '",dial_material="' + req.body.dial_material + '",dial_color="'
                        + req.body.dial_color + '",case_material="' + req.body.case_material + '",case_form="'
                        + req.body.case_form + '",bracelet_material="' + req.body.bracelet_material + '",movement="' + req.body.movement + '"where sku = "' + sku + '"';
                    console.log(q);
                    con.query(q, function (error, results) {
                        if (error) {
                            reply.status(400).json('invalid input');
                        } else {
                            reply.status(200).json('Successful operation');
                        }
                    })
                } else {
                    reply.status(404).json('watch not found');
                }
            }
        });
    });

};

exports.delete = async function (req, reply) {
    reply.setHeader("Cache-control", new Date(Date.now() + 3600000));
    reply.setHeader('Expires', new Date(Date.now() + 3600000));
    await con.getConnection(function (err, connection) {
        var sku = req.params.sku;
        var q = 'SELECT * FROM watches where sku = "' + sku + '"';
        connection.query(q, function (error, results) {
            if (error) {
                reply.status(400).json('invalid input');
            } else {
                if (results != '') {
                    var q = 'delete from watches where sku = "'+sku+'"';
                    con.query(q, function (error, results) {
                        if (error) {
                            reply.status(400).json('invalid input');
                        } else {
                            reply.status(200).json('Successful operation');
                        }
                    });
                } else {
                    reply.status(404).json('watch not found');
                }
            }
            connection.release();
        })
    });

};

exports.findPartial = async function (req, reply) {
    reply.setHeader("Cache-control", new Date(Date.now() + 3600000));
    reply.setHeader('Expires', new Date(Date.now() + 3600000));
    await con.getConnection(function (err, connection) {
        var sku = req.params.sku;
        var q = 'SELECT * FROM watches where sku like "%' + sku + '%"';
        console.log(q);
        connection.query(q, function (error, results) {
            if (error) {
                reply.json('connection or query error');
            } else {
                if (results != '') {
                    reply.status(200).json(results);
                } else {
                    reply.status(404).json('watch not found');
                }
            }
            connection.release();
        })
    });

};

exports.findOptional = async function (req, reply) {
    reply.setHeader("Cache-control", new Date(Date.now() + 3600000));
    reply.setHeader('Expires', new Date(Date.now() + 3600000));
    await con.getConnection(function (err, connection) {
        var comp = '';
        for (var p in req.query) {
            if (p == "sku" && Object.keys(req.query).length == 1) {
                console.log("start the find optinal");
                comp = 'sku like "%' + req.query[p] + '%"';
            }
            else if (p == 'sku' && Object.keys(req.query).length > 1) {
                comp = 'sku like "%' + req.query[p] + '%"';
            }
            else if (Object.keys(req.query).length == 1) {
                comp = p + ' = "' + req.query[p] + '"';
            }
            else {
                if (comp != '') {
                    comp = comp + " and " + p + ' = "' + req.query[p] + '"';
                }
                else {
                    comp = comp  + p + ' = "' + req.query[p] + '"';
                }
            }
        }
        if (Object.keys(req.query).length != 0) {
            var q = "SELECT * FROM watches where " +  comp;
        }
        console.log(q);
        connection.query(q, function (error, results) {
            if (error) {
                reply.json('connection or query error');
            } else {
                if (results != '') {
                    reply.status(200).json(results);
                } else {
                    reply.status(404).json('watch1 not found');
                }
            }
            connection.release();
        })
    });

};




