const getMultiple = ([n1, n2]) => {
    let multiplesN1 = [];
    let multiplesN2 = [];

    for (let i = 0; i <= 1000; i++) {
        if (isMultiple(n1, i)) {
            multiplesN1 = [...multiplesN1, i];
        }
        if (isMultiple(n2, i)) {
            multiplesN2 = [...multiplesN2, i];
        }
    }

    return [
        { n: n1, m: multiplesN1},
        { n: n2, m: multiplesN2},
    ];
}

const isMultiple = (n, val) => {
    return (val % n) === 0 ? true : false;
}

module.exports = {
    getMultiple
}

