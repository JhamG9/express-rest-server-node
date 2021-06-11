const Role = require('../models/role');

const isRoleValidate = async (role = '') => {
    const issetRole = await Role.findOne({ role });
    if(!issetRole){
        throw new Error(`El rol ${role} no esta registrado en la BD`); 
    }
}

module.exports= {
    isRoleValidate
}
