const Customer = require("../model/customers.model");

const createCustomer = async (req, res) => {
  try {
    const {
      first_name,
      last_name,
      city,
      zip_code,
      street,
      house_number,
      local_number,
    } = req.body;
    if (
      !first_name ||
      !last_name ||
      !city ||
      !zip_code ||
      !street ||
      !house_number ||
      !local_number
    ) {
      return res.status(401).json({
        success: false,
        message: "Some field are requied",
      });
    }
    const customer = await Customer.create({
      first_name,
      last_name,
      city,
      zip_code,
      street,
      house_number,
      local_number,
    });
    res.status(201).json({
      success: true,
      data: customer,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getCustomer = async (req , res) => {
    try{
        const customers = await Customer.find()
        if(!customers){
            return res.status(404).json({
                success :false,
                message : "Category not found"
            })
        }
        res.status(200).json({
            success : true,
            data : customers
        })
    }catch(error){
        res.status(500).json({
            success :false,
            message : error.message
        })
    }
}
const findOneCustomer = async (req , res) => {
  try{
    const id = req.params.id
    const customer = await Customer.findById(id)
    if(!customer){
      return res.status(404).json({
        success : false,
        message : 'Customer not found'
      })
    }

    res.status(200).json({
      success : true,
      data : customer
    })
  }catch(error){
    res.status(500).json({
      success : false,
      message : error.message
    })
  }
}

const updateCustomer = async (req , res) => {
  try{
    const {
      first_name,
      last_name,
      city,
      zip_code,
      street,
      house_number,
      local_number,
    } = req.body;

    const id = req.params.id;

    const dataCustomer = {
      first_name,
      last_name,
      city,
      zip_code,
      street,
      house_number,
      local_number
    }

    const customer = await Customer.findByIdAndUpdate(id,
      {$set : true},
      {}
    )
  }catch(error){
    res.status(500).json({
      success : false,
      message : error.message
    })
  }
}
module.exports = { createCustomer , getCustomer , findOneCustomer};
