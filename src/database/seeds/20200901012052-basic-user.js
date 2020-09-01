module.exports = {
    up: QueryInterface => {
        return QueryInterface.bulkInsert(
            'users',
            [
                {
                    name: 'jibao',
                    created_at: new Date(),
                },
            ],
            {}
        );
    },

    down: () => {},
};
