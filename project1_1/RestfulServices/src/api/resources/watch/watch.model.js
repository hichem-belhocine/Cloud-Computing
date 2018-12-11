'use strict';
function watchModel() {
    this.schema = {
        sku: {
            type: String,
            required: [true, 'watch must have an ID'],
        },
        type: {
            type: String["watch", "chrono"],
            required: [true, 'watch must have a type'],
        },
        status: {
            type: String["old", "current", "outlet"],
            required: [true, 'watch must have a status'],

        },
        gender: {
            type: String["man", "woman"],
            required: [true, 'you must specify to which gender the watch in convenient'],
        },
        year: {
            type: Number,
            required: [true, 'you must specify the year of prodcution'],
        },
        dial_material: {
            type: String
        },
        dial_color: {
            type: String
        },
        case_material: {
            type: String
        },
        case_form: {
            type: String
        },
        bracelet_material: {
            type: String
        },
        movement: {
            type: String
        },
    };
};

module.exports = watchModel;
