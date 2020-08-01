module.exports = logOutHandler = {
    logout: (req,res,next) => {
        req.logout()
        return res.status(200).json({
            success: true,
            message: 'User successfuly logged out'
        })
    }
}