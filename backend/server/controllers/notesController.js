export const summarizeNotes = async(req,res)=>{

const {text} = req.body

res.json({
summary:`Summary of: ${text}`
})

}