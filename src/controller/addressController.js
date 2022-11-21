import addressService from "./../services/addressService";

let getAddress = async (req, res) => {
    const query = req.query;
    const address = await addressService.getAddressRecommend(query);
    return res.status(200).json({
        message: "ok",
        data: address,
    });
};

module.exports = {
    getAddress,
};
