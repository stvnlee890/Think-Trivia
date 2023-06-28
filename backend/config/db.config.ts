import mongoose from "mongoose";
require('dotenv').config()

const mongodbUri:string = process.env.MONGODBURI!

mongoose.connect(mongodbUri)
const db = mongoose.connection

db.on('connected', () => {
    console.log(`Connected to MongoDB ${db.name} at ${db.host}:${db.port}`)
})

export default mongoose