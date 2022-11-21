import pool from "./../configs/connectDB";

const getMyRating = (userId, addrId, weather, time, partner) => {
    return new Promise(async (resolve, reject) => {
        try {
            const [data] = await pool.execute(
                "SELECT rating as myRating from ratings where user_id=? AND addr_id=? AND weather=? AND time=? AND partner=?",
                [userId, addrId, weather, time, partner]
            );
            resolve(data);
        } catch (error) {
            reject(error);
        }
    });
};

const getAddressRecommend = (query) => {
    return new Promise(async (resolve, reject) => {
        try {
            const { weather, time, partner, number, id } = query;
            const [rows] = await pool.execute(
                "SELECT addr_id, name, address, lat, lng, description, COUNT(addr_id) as numberAdd, AVG(rating) as avgRating FROM `ratings` INNER JOIN address on ratings.addr_id = address.id where weather=? AND time=? AND partner=? GROUP BY addr_id ORDER BY avgRating DESC LIMIT ?;",
                [weather, time, partner, number]
            );
            const dataAddress = await Promise.all(
                rows.map(async (item) => {
                    const myRating = await getMyRating(
                        id,
                        item.addr_id,
                        weather,
                        time,
                        partner
                    );
                    return {
                        ...item,
                        avgRating: parseFloat(item.avgRating),
                        myRating: myRating[0]?.myRating || 0,
                    };
                })
            );
            resolve(dataAddress);
        } catch (error) {
            reject(error);
        }
    });
};

module.exports = {
    getAddressRecommend,
};
