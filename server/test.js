const {
    random_unimodular_matrix,
    determinant
} = require("./calculations.js");
let A = random_unimodular_matrix(5, 19, 3);
console.log(A);
console.log(determinant(A));