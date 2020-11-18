const mongoose = require('mongoose');

const ClientSchema = mongoose.Schema({
   first_name: {
       type: String,
        required: true
   },
   last_name: {
       type: String,
       required: true
   }, 
   mobile_number: {
       type: String,
       required: true
   },
   bills: {
       type: Number,
       required: true
   },
   gender: {
       type: String,
       required: true
   },
   paid: {
       type: String,
       required: true
   } 
})


module.exports = mongoose.model('Clients', ClientSchema);