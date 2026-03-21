export const generateImage = async(req,res)=>{

const {prompt} = req.body

res.json({
image:"AI image will be generated here"
})

}