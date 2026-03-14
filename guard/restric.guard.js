const restricGuard = (...allowRoles) => (req ,res , next) => {
    if(!req.user){
        return res.status(401).json({
            success : false,
            error : 'Unozorication'
        });
    }
    const {role} = req.user;
    if(role === "admin"){
        return next()
    }
    if(!role || !allowRoles.includes(role)){
        return res.status(403).json({
            success : false,
            message : 'You are have not permission to perform this action'
        })
    }
    next()
}

module.exports = {restricGuard}