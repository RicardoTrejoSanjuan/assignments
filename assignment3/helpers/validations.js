const validateInput = (input) => {
    return new Promise((resolve) => {
        try {
            const str = input.split(' ');
            if (str.length === 2) {
                const n1 = Math.floor(str[0]);
                const n2 = Math.floor(str[1]);

                resolve({
                    data: [n1, n2],
                    error: null
                });

            } else {
                resolve({
                    data: null,
                    error: 'You do not introduce two elements'
                });
            }
        } catch (error) {
            resolve({
                data: null,
                error: 'No numerical format was entered'
            });
        }
    });
}

module.exports = {
    validateInput
}