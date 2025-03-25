function generateToken() {
    const symbols = '1234567890qwertyuiopasdfghjklzxcvbnm!@#$%^&*()-=+';
    const arr = symbols.split('');

    const shuffle = arr => {
        return arr.sort(() => Math.round(Math.random() * 100) - 50);
    };

    const res = shuffle(arr).join('');

    return res;
}

module.exports = generateToken;